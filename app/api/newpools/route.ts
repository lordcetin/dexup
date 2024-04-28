import axios from "axios";
import fs from 'fs';
import { NextResponse , NextRequest} from "next/server"
import { client } from "@/lib/db";
async function getNetworkId(chain:any) {
  if(chain === undefined) return null; // chain undefined olduğunda null döndür
  const response = await axios.get(`https://pro-api.coingecko.com/api/v3/asset_platforms/`,{
    headers:{
      'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'
    }
  });


  let platform:any = response.data.filter((item:any) => item.shortname.toLowerCase() === chain?.toLowerCase())
  if (platform.length === 0) return null; // platform bulunamadığında null döndür
  let py = platform[0]
  const data = py
  return data
}

export async function GET(req:NextRequest) {

  const responseData = await fetch('https://pro-api.coingecko.com/api/v3/onchain/networks/new_pools?include=base_token%2C%20quote_token%2C%20dex%2C%20network',{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
    cache:'no-store',
  })

  const pooldata = await responseData.json();
  
  const newPair: any[] = [];

  for (const item of pooldata.data) {

    const baseId = item.relationships.base_token.data.id;
    const quoteId = item.relationships.quote_token.data.id;
    const network = item.relationships.network.data.id;
    
    const baseImg = pooldata.included.find((i: any) => i.id == baseId).attributes.image_url;
    const quoteImg = pooldata.included.find((i: any) => i.id == quoteId).attributes.image_url;
    const baseSymbol = pooldata.included.find((i: any) => i.id == baseId).attributes.symbol;
    const quoteSymbol = pooldata.included.find((i: any) => i.id == quoteId).attributes.symbol;
    const basecoinId = pooldata.included.find((i: any) => i.id == baseId).attributes.coingecko_coin_id;
    const quotecoinId = pooldata.included.find((i: any) => i.id == quoteId).attributes.coingecko_coin_id;
    const basename = pooldata.included.find((i: any) => i.id == baseId).attributes.name;
    const quotename = pooldata.included.find((i: any) => i.id == quoteId).attributes.name;
    const baseaddress = pooldata.included.find((i: any) => i.id == baseId).attributes.address;
    const quoteaddress = pooldata.included.find((i: any) => i.id == quoteId).attributes.address;

    const networkId = await getNetworkId(network ? network : undefined);
    if(networkId === null || networkId.id === null) continue; // null olduğunda veya id'si null olduğunda döngüyü devam ettir
    const { id: networkname, native_coin_id, chain_identifier, shortname } = networkId;

    const paircoin: any = {
      id: item.id,
      name: item.attributes.name,
      baseImg,
      quoteImg,
      pooladdress: item.attributes.address,
      networkname,
      chain_identifier,
      native_coin_id,
      shortname,
      basename,
      quotename,
      baseSymbol,
      quoteSymbol,
      baseaddress,
      quoteaddress,
      basecoinId,
      quotecoinId,
    };

    const ver: any = {
      id: item.id,
      paircoin,
      name: item.attributes.name,
      basename,
      quotename,
      baseSymbol,
      quoteSymbol,
      baseImg,
      quoteImg,
      baseaddress,
      quoteaddress,
      basecoinId,
      quotecoinId,
      created: item.attributes.pool_created_at,
      pooladdress: item.attributes.address,
      baseprice: item.attributes.base_token_price_usd,
      quoteprice: item.attributes.quote_token_price_usd,
      fdv: item.attributes.fdv_usd,
      cap: item.attributes.market_cap_usd,
      price_change_percentage: item.attributes.price_change_percentage,
      transactions: item.attributes.transactions,
      volume_usd: item.attributes.volume_usd,
      reserve: item.attributes.reserve_in_usd,
      dex: item.relationships.dex.data.id,
    };
    newPair.push(ver);
  }

  const agdas = newPair
  await client.set(`newPool`,JSON.stringify(agdas))
  fs.writeFileSync('./config/newpool.json', JSON.stringify(agdas));
  return NextResponse.json("Succesfull",{status:200})
}

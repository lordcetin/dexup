import axios from "axios";
import fs from 'fs';
import { NextResponse , NextRequest} from "next/server"
import { client } from "@/lib/db";
export async function GET(req:NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const networkname = searchParams.get('networkname')

  const responseData = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${networkname}/pools?include=base_token%2C%20quote_token%2C%20dex`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
    cache:'no-store',
  })

  const pooldata = await responseData.json();
  const newPair: any[] = [];

  
  for (const item of pooldata.data) {

    const baseId = item.relationships.base_token.data.id;
    const quoteId = item.relationships.quote_token.data.id;
    
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
    
    const paircoin: any = {
      name: item.attributes.name,
      baseImg,
      quoteImg,
      pooladdress: item.attributes.address,
      networkname:networkname === 'eth' ? 'ethereum' : networkname === 'bsc' ? 'binance-smart-chain' : networkname,
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
  await client.set(`newPool${networkname?.toLocaleUpperCase()}`,JSON.stringify(agdas))
  // data.push({ gainer, loser });
  // fs.writeFileSync(`./config/by${networkname}pool.json`, JSON.stringify(agdas));
  return NextResponse.json("Succesfull",{status:200})
}

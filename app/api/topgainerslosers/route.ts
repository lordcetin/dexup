import axios from "axios";
import fs from 'fs';
import { NextResponse , NextRequest} from "next/server"
import { broadcastData } from "@/pages/api/socket/io";
import { NextApiResponseServerIo } from "@/lib/types";
import { Server as NetServer,Socket } from 'net'
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = 3600
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5
// API anahtarınızı bir değişkende saklayın
const apiKey = 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ';

async function fetchCoinData(id: string) {
  const res = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${id}`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
    cache:'no-store',
  })
  const data = await res.json()
  return data;
}

async function fetchAssetPlatforms() {
  const res = await fetch(`https://pro-api.coingecko.com/api/v3/asset_platforms/`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
    cache:'no-store',
  })
  const data = await res.json()
  return data;
}

async function fetchOnchainData(assetPlatformId: string, contractAddress: string) {
  const network = assetPlatformId === "binance-smart-chain" ? 'bsc' : assetPlatformId === 'ethereum' ? 'eth' : assetPlatformId;

  const res = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${network}/tokens/${contractAddress}/pools?include=base_token%2C%20quote_token%2C%20dex`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
    cache:'no-store',
  })
  const data = await res.json()
  return data;
}

async function processToken(token: any, assetPlatforms: any[]) {
  const coinData = await fetchCoinData(token.id);
  const platform = assetPlatforms.find((p:any) => p.id === coinData.asset_platform_id);

  if (!coinData.contract_address) {
    return null; // Eğer contract_address yoksa, bu token'ı işleme almıyoruz.
  }

  const onchainData = await fetchOnchainData(coinData.asset_platform_id, coinData.contract_address);
  if (onchainData.data && onchainData.included) {
    return onchainData.data.map((item: any) => {

      const baseId = item.relationships.base_token.data.id;
      const quoteId = item.relationships.quote_token.data.id;

      const baseToken = onchainData.included.find((i: any) => i.id === baseId);
      const quoteToken = onchainData.included.find((i: any) => i.id === quoteId);

      const baseSymbol = onchainData.included.find((i:any)=> i.id  == baseId);
      const quoteSymbol = onchainData.included.find((i:any)=> i.id  == quoteId);
      const basecoinId = onchainData.included.find((i:any)=> i.id  == baseId);
      const quotecoinId = onchainData.included.find((i:any)=> i.id  == quoteId);
      const basename = onchainData.included.find((i:any)=> i.id  == baseId);
      const quotename = onchainData.included.find((i:any)=> i.id  == quoteId);
      const baseaddress = onchainData.included.find((i:any)=> i.id  == baseId);
      const quoteaddress = onchainData.included.find((i:any)=> i.id  == quoteId);

      const paircoin = {
        name:item.attributes.name,
        platform: platform ? platform.name.toLowerCase() : 'Unknown',
        platformId: platform ? platform.id.toLowerCase() : 'Unknown',
        native_coin_id: platform ? platform.native_coin_id.toLowerCase() : 'Unknown',
        shortname: platform ? platform.shortname.toLowerCase() : 'Unknown',
        chain_identifier: platform ? platform.chain_identifier : 'Unknown',
        baseImg: baseToken.attributes.image_url,
        quoteImg: quoteToken.attributes.image_url,
        pooladdress: item.attributes.address,
        basename: basename.attributes.name,
        quotename: quotename.attributes.name,
        baseSymbol: baseSymbol.attributes.symbol,
        quoteSymbol: quoteSymbol.attributes.symbol,
        baseaddress: baseaddress.attributes.address,
        quoteaddress: quoteaddress.attributes.address,
        basecoinId: basecoinId.attributes.coingecko_coin_id,
        quotecoinId: quotecoinId.attributes.coingecko_coin_id,
      }

      return {
        id: item.id,
        paircoin,
        name: item.attributes.name,
        platform: platform ? platform.name.toLowerCase() : 'Unknown',
        baseImg: baseToken.attributes.image_url,
        quoteImg: quoteToken.attributes.image_url,
        baseSymbol: baseSymbol.attributes.symbol,
        quoteSymbol: quoteSymbol.attributes.symbol,
        basecoinId: basecoinId.attributes.coingecko_coin_id,
        quotecoinId: quotecoinId.attributes.coingecko_coin_id,
        basename: basename.attributes.name,
        quotename: quotename.attributes.name,
        baseaddress: baseaddress.attributes.address,
        quoteaddress: quoteaddress.attributes.address,
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
    });
  }

  return null;
}

export async function GET(req:NextRequest,res: NextApiResponseServerIo) {
  const gainer: any[] = [];
  const loser: any[] = [];
  const data: any[] = [];

  const reser = await fetch('https://pro-api.coingecko.com/api/v3/coins/top_gainers_losers?vs_currency=usd&duration=24h',{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
    cache:'no-store',
  })

  const topGainersLosersResponse = await reser.json()

  const assetPlatforms = await fetchAssetPlatforms();

  for (const token of topGainersLosersResponse.top_gainers) {
    const processedToken = await processToken(token, assetPlatforms);

    if (processedToken) {
      gainer.push(processedToken[0]);
    }
  }

  for (const token of topGainersLosersResponse.top_losers) {
    const processedToken = await processToken(token, assetPlatforms);
    if (processedToken) {
      loser.push(processedToken[0]);
    }
  }


  data.push({ gainer, loser });


  // fs.writeFileSync('./config/data.json', JSON.stringify(data));
  // return NextResponse.json("Succesfull",{status:200})
  return NextResponse.json(data,{status:200})
}


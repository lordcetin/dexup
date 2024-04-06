import { NextResponse , NextRequest} from "next/server"
import axios from 'axios';
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = 3600
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5
export async function GET(req:NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const baseCoinId = searchParams.get('baseCoinId')
  const from = searchParams.get('from')
  const to = searchParams.get('to')


  const responseOHLC  = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${baseCoinId}/ohlc?vs_currency=usd&days=max&precision=4`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
    cache:'no-store',
  });
  const dataOHLC:any = await responseOHLC.json();

  // const responseVolume  = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${baseCoinId}/market_chart/range?vs_currency=usd&from=${from}&to=${to}&precision=4`,{
  //   method:'GET',
  //   headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
  //   cache:'no-store',
  // });
  // const dataVolume:any = await responseVolume.json();
  // console.log("dataVolume",dataVolume?.prices)


  // if (!dataVolume.prices || dataVolume.prices.length === 0) {
  //   return NextResponse.json(dataOHLC, { status: 200 });
  // }

  const data = dataOHLC
  return NextResponse.json(data,{status:200})

}
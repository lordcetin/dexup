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
  const searchParams:any = req.nextUrl.searchParams
  const baseCoinId = searchParams.get('basecoinId')
  const from = searchParams.get('from')
  const to = searchParams.get('to')


  const responseOHLC  = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${baseCoinId}/ohlc?vs_currency=usd&days=max`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
  });
  const dataOHLC:any = await responseOHLC.json();

  const responseVolume  = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${baseCoinId}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
  });
  const dataVolume:any = await responseVolume.json();


  if (!dataVolume.prices || dataVolume.prices.length === 0) {
    return NextResponse.json(dataOHLC, { status: 200 });
  }

  const data = [dataOHLC,dataVolume.prices]
  return NextResponse.json(data,{status:200})

}
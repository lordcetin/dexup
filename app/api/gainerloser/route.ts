import { NextResponse , NextRequest} from "next/server"
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = 3600
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5
export async function GET(req:NextRequest) {

  const responseData = await fetch('https://pro-api.coingecko.com/api/v3/coins/top_gainers_losers?vs_currency=usd',{
    method:'GET',
    headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
    cache:'no-store',
  })

  const response = await responseData.json();
  const data = response
  return NextResponse.json(data,{status:200})

}
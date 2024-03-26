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
  const network = searchParams.get('network')
  const tokenaddress = searchParams.get('tokenaddress')

  const response = await axios.get(`https://pro-api.coingecko.com/api/v3/coins/${network}/contract/${tokenaddress}`,{
    headers:{
      'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'
    }
  });

  const data = response.data
  return NextResponse.json(data,{status:200})

}
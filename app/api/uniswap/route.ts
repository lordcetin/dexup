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

  const response = await axios.get('https://tokens.coingecko.com/uniswap/all.json');
  const data = response.data
  return NextResponse.json(data,{status:200})

}
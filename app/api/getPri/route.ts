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
  const searchParams = req.nextUrl.searchParams;

  const chainId = searchParams.get('chainId');
  const fromTokenAddress = searchParams.get('fromTokenAddress');
  const toTokenAddress = searchParams.get('toTokenAddress');
  const amount = searchParams.get('amount');
  const slippage = searchParams.get('slippage');

  const response = await axios.get(`https://www.okx.com/priapi/v1/dx/trade/multi/v3/quote?amount=${amount}&chainId=${chainId}&toChainId=${chainId}&toTokenAddress=${toTokenAddress}&fromTokenAddress=${fromTokenAddress}&slippage=${slippage}`);
  const data = response.data
  return NextResponse.json(data,{status:200})

}
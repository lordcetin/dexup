import axios from "axios";
import { NextResponse , NextRequest} from "next/server"

export async function GET(req:NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const baseNetId = searchParams.get('baseNetId')
  const baseaddress = searchParams.get('baseaddress')


  const response = await axios.get(`https://pro-api.coingecko.com/api/v3/onchain/networks/${baseNetId}/tokens/multi/${baseaddress}`,{
    headers:{
    'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ',
    }
  });
  const data = response.data
  return NextResponse.json(data,{status:200})

}
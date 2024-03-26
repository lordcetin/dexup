import { NextResponse , NextRequest} from "next/server"
import axios from 'axios';

export async function GET(req:NextRequest) {
  const searchParams = req.nextUrl.searchParams
  let chainname = searchParams.get('chainname')

  const response = await axios.get(`https://pro-api.coingecko.com/api/v3/asset_platforms/`,{
    headers:{
      'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'
    }
  });


  let platform:any = response.data.filter((item:any) => item.shortname.toLowerCase() === chainname?.toLowerCase())
  let py = platform[0]


  const data = py
  return NextResponse.json(data,{status:200})

}
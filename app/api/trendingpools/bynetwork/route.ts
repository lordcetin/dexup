import { NextResponse , NextRequest} from "next/server"
import fs from 'fs';
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = 3600
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

export async function GET(req:NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const networkname = searchParams.get('networkname')
  
  const rawData:any = fs.readFileSync(`./config/by${networkname}pool.json`);
  const data = JSON.parse(rawData);

  return NextResponse.json(data,{status:200})

}
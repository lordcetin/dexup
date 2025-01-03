import { NextResponse , NextRequest} from "next/server"
import { client } from "@/lib/db";
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = 300
export const fetchCache = 'auto'
export const runtime = 'nodejs'
export const preferredRegion = 'auto'
export const maxDuration = 5

export async function GET(req:NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const networkname = searchParams.get('networkname')
  const data:any = await client.get(`newPool${networkname?.toUpperCase()}`)

  return NextResponse.json(data,{status:200})

}


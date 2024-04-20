import { NextResponse , NextRequest} from "next/server"
import prismadb from '@/lib/prismadb';

export async function GET(req:NextRequest) {

  const comments = await prismadb.comments.findMany();

  return NextResponse.json(comments,{status:200})

}
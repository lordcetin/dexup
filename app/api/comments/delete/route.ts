import { NextResponse , NextRequest} from "next/server"
import prismadb from '@/lib/prismadb';

export const dynamic = 'force-dynamic' // defaults to auto

export async function POST(req:NextRequest) {

  const formData = await req.formData()
  
  let id:any = formData.get('id')
  id = Number(id)

  const deleteComment = await prismadb.comments.delete({
    where: {
      id: id,
    },
  }as any)

  return NextResponse.json("Deleted!",{status:200})

}
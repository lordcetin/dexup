import { NextResponse , NextRequest} from "next/server"
import prismadb from '@/lib/prismadb';

export const dynamic = 'force-dynamic' // defaults to auto

export async function POST(req:NextRequest) {

  const formData = await req.formData()
  
  const commentId = formData.get('commentId')
  const pairAddress = formData.get('pairAddress')
  const authorWallet = formData.get('authorWallet')
  const comment = formData.get('comment')

  const comments = await prismadb.comments.create({
    data: {
    commentId,
    pairAddress, 
    authorWallet, 
    comment,
    createdAt:Date.now()
    },
  }as any);

  return NextResponse.json(comments,{status:200})

}
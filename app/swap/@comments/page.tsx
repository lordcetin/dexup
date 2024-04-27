/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import CopyClipboard from "@/components/CopyClipboard/page";
import Input from "@/components/Input/page";
import TimeAgo from "@/components/TimeAgo/page";
import axios from "axios";
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle, AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { toast } from "react-toastify";
import { uid } from "uid";
import { useAccount } from "wagmi";

type Props = {};

const Comments = ({}: Props) => {
  const searchParams = useSearchParams() as any
  const chain = searchParams.get('chain')
  const pooladdress = searchParams.get('pair')
  const router = useRouter()
  const {address,isConnected,chainId} = useAccount();
  const [commentData,setCommentData] = useState<any>([]);
  const [commentLoading,setCommentLoading] = useState<boolean>(false);
  const [comment,setComment] = useState<any>("");

  const handleComment = async () => {
    if(isConnected){
      setCommentLoading(true)
      const formData = new FormData();
      formData.append("commentId",String(uid(7)+""+address?.slice(7)));
      formData.append("pairAddress",pooladdress);
      formData.append("authorWallet",String(address));
      formData.append("comment",String(comment));
    const {data} = await axios.post(`/api/comments/add`,formData)
    setComment("")
    router.refresh()
    setCommentLoading(false)
    }
  }
  
  const handleDeleteComment = async (id:any) => {
    if(isConnected){
      setCommentLoading(true)
      const formData = new FormData();
      formData.append("id",id);
  
    const {data} = await axios.post(`/api/comments/delete`,formData)
    toast.success(data)
    router.refresh()
    setCommentLoading(false)
    }
  }

  useEffect(() => {
    const getComment = async () => {
      const res = await fetch(`/api/comments`)
      const data = await res.json()
      setCommentData(data.filter((u:any) => u.pairAddress === pooladdress))
    }
    getComment()
  },[])

  return (
    <div className="w-[400px] max-md:w-96 border border-white/10 rounded-xl px-3 py-5 h-[633px] flex-col justify-center items-center relative mt-2 bg-[#131722]">
      <p className="flex items-center w-full text-white/50">Comments</p>
      {isConnected ? 
      <>
      <div className="flex-col items-center rounded-lg h-[calc(100%-77px)] overflow-y-auto p-3 w-full space-y-2">
        {commentData.map((item:any,index:any) => {
          return (
            <>
            <div key={index} className="flex-col w-full items-center border border-slate-500 bg-slate-800 rounded-lg px-3 py-2 relative">
            {item.authorWallet === address ? <AiOutlineCloseCircle className="absolute right-3 hover:text-red-500 cursor-pointer" onClick={() => handleDeleteComment(item.id)}/> : null}
            <CopyClipboard address={item.authorWallet}/>
            <span className="text-sm whitespace-pre-wrap flex-wrap max-h-30">
            {item.comment}
            </span>
            <div className="flex justify-end items-center w-full self-end text-xs"><TimeAgo timestamp={item.createdAt}/></div>
            </div>
            </>
          )
        })}
      </div>
      <div className="absolute bottom-2 w-full left-0 outline-none h-16 flex items-center gap-x-2 p-3">
        <div className="flex items-center gap-x-2 border border-white/10 rounded-lg w-full">
        <Input
        type="text"
        id="name"
        label="Comment"
        value={comment}
        onChange={(e: any) => setComment(e.target.value)}
        onKeyDown={(e:any) => {
          if (e.key === 'Enter') {
            handleComment()
          }
        }}
        />
        {commentLoading ? <AiOutlineLoading3Quarters size={23} className="animate-spin mr-3"/> : <button type="button" onClick={() => handleComment()} className="mr-3 hover:scale-75 hover:opacity-50 transition-all"><IoSend size={23}/></button>}
        </div>
      </div>
      </>  
      :
      <div className="flex-col flex justify-center items-center w-full h-full">
        <h1 className="text-2xl font-semibold text-white/80">Wallet Not Connected</h1>
        <span className="text-sm text-white/30">Please connect a wallet to comment.</span>
        <button type="button" onClick={() => open()} className="my-3 border border-white/50 rounded-lg px-7 py-2 hover:text-white/20 hover:border-white/20">Connect Wallet</button>
      </div>
      }
    </div>
);
};

export default Comments;

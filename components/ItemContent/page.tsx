/* eslint-disable react/jsx-key */
'use client'
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BiSolidComment, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { IoChevronForward } from "react-icons/io5";
type Props = {
  news:any
};

function ItemContent({news}: Props) {
  const router = useRouter()

  function formatCreatedAt(createdAt:any) {
    const tokenDate:any = new Date(createdAt);
    const currentDate:any = new Date();
    const diffMilliseconds = currentDate - tokenDate;
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffYears = Math.floor(diffDays / 365);
  
    if (diffYears >= 1) {
        return `${diffYears} year${diffYears > 1 ? 's' : ''}`;
    } else if (diffDays >= 1) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours >= 1) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else if (diffMinutes >= 1) {
        return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    } else {
        return `${diffSeconds} second${diffSeconds > 1 ? 's' : ''}`;
    }
  }

  return (
    <div className="flex-col flex justify-center items-center w-full h-80 mt-4 relative">
      <small className="absolute -top-3 right-3">{formatCreatedAt(news.created_at)} ago</small>
      <Link href={`https://${news.domain}`} className="flex items-center w-full text-xs">{news.domain}</Link>
      <h1 className="flex items-center w-full text-2xl font-bold selection:bg-teal-500">{news.title}</h1>
      <div className="absolute bottom-0 left-0 flex items-center gap-x-4 py-1 px-2 border border-white/10 rounded-lg hover:shadow-md hover:shadow-black/50 cursor-pointer">
        <div className="flex items-center gap-x-1"><BiSolidLike title="Liked"/>{news.votes.liked + news.votes.positive + news.votes.important + news.votes.saved + news.votes.lol}</div>
        <div className="flex items-center gap-x-1"><BiSolidDislike title="Disliked" />{news.votes.disliked + news.votes.negative + news.votes.toxic}</div>
        <div className="flex items-center gap-x-1"><BiSolidComment title="Comments" />{news.votes.comments}</div>
      </div>
      <button type="button" onClick={() => router.push(`${news.url}`)} className="absolute bottom-0 right-5 border border-white/10 px-2 py-1 rounded-lg text-white/70 font-thin hover:text-white hover:border-white transition-all flex items-center gap-x-1 group">Read More <IoChevronForward className="group-hover:translate-x-1 group-hover:transition-all"/></button>
    </div>
);
}

export default ItemContent;

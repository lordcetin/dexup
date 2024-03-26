'use client'
import { useAppContext } from "@/context/AppContext";
import React from "react";

type Props = {title:string};

function DowngradientText({title}: Props) {

  const {isActive} = useAppContext()
  return (
    <button type="button" className="py-2 rounded-full relative hover:shadow-2xl hover:shadow-black/[0.1] transition duration-200 group outline-none">
    <div className={isActive === 'gainers' && title  === 'Gainers' ?
    "absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" 
    : isActive === 'losers' && title === 'Losers' ? "absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px shadow-2xl  bg-gradient-to-r from-transparent via-purple-300 to-transparent"
    : "absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px shadow-2xl  bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-transparent group-hover:via-white group-hover:to-transparent"} />
    <span className={isActive === 'gainers' && title  === 'Gainers' ?
     "text-teal-500" 
     : isActive === 'losers' && title === 'Losers' ? "text-purple-300" : "relative z-20"}>{title}</span>
    </button>
  );
}

export default DowngradientText;

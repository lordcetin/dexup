'use client'

import React from "react";

type Props = {title:string};

function Buttongr({title}: Props) {
  return (
    <button className="px-8 py-2 rounded-full relative bg-brandsecond hover:bg-brandblack text-white text-sm hover:shadow-2xl hover:shadow-black/[0.1] transition duration-200 border border-white border-opacity-10 group">
    <div className="absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent group-hover:from-transparent group-hover:via-purple-300 group-hover:to-transparent" />
    <span className="relative z-20">{title}</span>
    </button>
  );
}

export default Buttongr;

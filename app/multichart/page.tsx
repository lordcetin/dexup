/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Script from "next/script";
import React, { useEffect, useLayoutEffect, useRef, useState,memo, Suspense, useCallback} from "react";

export default function Multichart() {

  return (

    <main className="flex-col items-center w-full mt-7 gap-x-6">
      <div className="flex-col items-center w-full bg-[#131722] rounded-xl border border-white/20 p-5 mb-3 relative">
        <h1 className="text-xl font-bold">Pair Multicharts</h1>
        <p className="text-sm text-white/50">Examine the token you want at the same time by splitting from a single monitor to multiple monitors</p>
        <div className="absolute top-0 right-0 flex justify-center items-center h-full px-5 max-md:text-xs max-md:static max-md:mt-3 max-md:justify-end"><span className="border border-white/20 rounded-md px-3 py-1 text-white/40">Maximum 6 columns</span></div>
      </div>
    </main>

  );
}
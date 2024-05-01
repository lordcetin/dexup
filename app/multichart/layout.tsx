'use client'

import { useAppContext } from "@/context/AppContext"
import Script from "next/script";
import { useState } from "react";

export default function MultichartLayout({
  children,
  chart,
}:{
  children:React.ReactNode,
  chart:React.ReactNode,
}) {
  const {isChart,setIsChart} = useAppContext()
  const [isScriptReady,setIsScriptReady] = useState(false)
  return (
    <div>
      <div>{children}</div>
      <div className="flex justify-center items-center w-full">
      <Script
        src="/static/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
        onReady={() => {
          setIsScriptReady(true);
        }}
        />
        {isScriptReady && chart}
        </div>
    </div>
  )
}
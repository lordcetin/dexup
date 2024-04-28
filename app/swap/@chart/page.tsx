/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useAppContext } from "@/context/AppContext";
import { ResolutionString } from "@/public/static/charting_library/charting_library";
import axios from "axios";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import React, {useEffect, useState} from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {};

const TVChartContainer = dynamic(
  () =>
    import('@/components/TVChartContainer/page').then((mod:any) => mod.TVChartContainer),
  { 
    loading: () => <div className="w-[980px] max-md:w-96 h-[600px] rounded-lg bg-[#131722] border border-white/10 flex justify-center items-center"><AiOutlineLoading3Quarters className="text-blue-700/50 animate-spin" size={23}/></div>,
    ssr: false 
  }
);

declare global {
  interface Window {
    TradingView: any; // Değişkenin tipini uygun bir şekilde tanımlayın
  }
}

const useViewport = () => {
  const [width, setWidth] = useState<number | undefined>(undefined);
  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    };

    // Initial width on component mount
    setWidth(window.innerWidth);

    // Event listener for window resize
    window.addEventListener('resize', handleWindowResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []); // Run effect only on component mount

  return width;
};

const Chart = ({}: Props) => {
  const viewportWidth:any = useViewport();
  const searchParams = useSearchParams() as any
  const chain = searchParams.get('chain')
  const pooladdress = searchParams.get('pair')
  const [isScriptReady,setIsScriptReady] = useState(false)
  const [pairdata,setPairData] = useState<any>([]);
  const {setBaseCoinId} = useAppContext()

  useEffect(() => {
    const getPairs:any = async () => {
      const response = await fetch(`/api/pairData?chain=${chain}&pooladdress=${pooladdress}`)
      const pairData = await response.json()
      setPairData(pairData)
      setBaseCoinId(pairData?.basecoinId)
    }
    getPairs()
  },[])

  const defaultWidgetProps:any= {
    symbol: `${pairdata?.baseTokenSymbol && pairdata?.baseTokenSymbol.toUpperCase()}/${pairdata?.quoteTokenSymbol && pairdata?.quoteTokenSymbol.toUpperCase()}`,
    width:viewportWidth < 768 ? 380 : 780,
    height:viewportWidth < 768 ? 380 : 600,
    interval: '15' as ResolutionString,
    library_path: "/static/charting_library/charting_library",
    locale: "en",
    theme: 'dark',
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    container: 'tv_chart_container',
    user_id: "public_user_id",
    timezone: 'exchange',
    supports_group_request: false,
    supports_marks: false,
    supports_search: false,
    supports_timescale_marks: false,
  };

  return (
    <>
    <Script
    src="/static/datafeeds/udf/dist/bundle.js"
    strategy="lazyOnload"
    onReady={() => {
      setIsScriptReady(true);
    }}
    />
    {isScriptReady &&
    //@ts-ignore
    <TVChartContainer poolAddress={pooladdress} {...defaultWidgetProps}/>
    }
    </>
);
};

export default Chart;

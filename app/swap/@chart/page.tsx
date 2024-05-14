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
import { FaArrowsAltV } from "react-icons/fa";
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
  const [dragging, setDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [initialChartHeight, setInitialChartHeight] = useState(600); // Örnek başlangıç yüksekliği
  const [chartHeight, setChartHeight] = useState(initialChartHeight);


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
    width:viewportWidth < 768 ? 380 : viewportWidth > 1920 ? 1600 : 780,
    height:viewportWidth < 768 ? 380 : chartHeight,
    interval: '15' as ResolutionString,
    library_path: "/static/charting_library/charting_library",
    locale: "en",
    theme: 'dark',
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    container: 'tv_chart_container',
    user_id: "public_user_id",
    timezone: 'exchange',
    supportSymbolSearch:false,
    enabled_features: [
      "show_spread_operators",
      "adaptive_logo",
      "side_toolbar_in_fullscreen_mode",
      // "show_symbol_logos",
      // "show_symbol_logo_in_legend",
    ],
    disabled_features: [
      "use_localstorage_for_settings",
      "header_symbol_search",
      "header_compare",
      "header_quick_search",
      "symbol_search_hot_key",
      "header_undo_redo",
      "display_market_status",
      "edit_buttons_in_legend"
    ],
  };

  useEffect(() => {
    const handleMouseMove = (e:any) => {
      if (!dragging) return;
      const deltaY = e.clientY - dragStartY;
      const newHeight = initialChartHeight + deltaY;
      setChartHeight(newHeight);
    };
  
    const handleMouseUp = () => {
      setDragging(false);
      setInitialChartHeight(chartHeight);
    };
  
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, dragStartY, initialChartHeight, chartHeight]);

  return (
    <div className="relative">
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
    <div
      id="resize-handle"
      style={{ height: '7px', cursor: 'row-resize' }}
      className={dragging ? "absolute bg-gradient-to-l to-transparent via-slate-800 from-transparent rounded-full flex items-center justify-center w-full bottom-0" : "bg-gradient-to-l to-transparent via-slate-800 from-transparent rounded-full flex items-center justify-center w-full absolute bottom-0"}
      onMouseDown={(e) => {
        setDragging(true);
        setDragStartY(e.clientY);
      }}
    >
      <FaArrowsAltV />
    </div>
    </div>
);
};

export default Chart;

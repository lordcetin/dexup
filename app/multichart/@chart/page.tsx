/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import PairImage from "@/components/PairImage/page";
import { useAppContext } from "@/context/AppContext";
import { ResolutionString } from "@/public/static/charting_library/charting_library";
import axios from "axios";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import React, {useEffect, useState} from "react";
import { AiOutlineCloseCircle, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
type Props = {};

const MultiChartContainer = dynamic(
  () =>
    import('@/components/MultiChartContainer/page').then((mod:any) => mod.MultiChartContainer),
  { 
    loading: () => <div className="w-96 h-96 rounded-lg bg-[#131722] border border-white/10 flex justify-center items-center"><AiOutlineLoading3Quarters className="text-blue-700/50 animate-spin" size={23}/></div>,
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

const MChart = ({}: Props) => {
  const viewportWidth:any = useViewport();
  const searchParams = useSearchParams() as any
  const chain = searchParams.get('chain')
  const pooladdress = searchParams.get('pair')

  const [chartModal,setChartModal] = useState(false)
  const [pairdata,setPairData] = useState<any>([]);
  const [poollData,setSearchPoolData] = useState<any>([]);
  const {isChart,setIsChart} = useAppContext()
  const [searchModal,setSearchModal] = useState<boolean>(false)
  const [loadingPools,setLoadingSearch] = useState<boolean>(false)
  const [searchVal,setSearchVal] = useState<any>('')
  const [topGainers, setTopGainers] = useState([]);
  const [gailosloading, setLoadingGainLos] = useState<boolean>(false);
  const [chartindex,setChartId] = useState<any>(0)
  const [charts, setCharts] = useState<any>([]);


  useEffect(() => {
    const savedCharts = JSON.parse(localStorage.getItem('charts') || '[]');
    setCharts(savedCharts);
  }, []);

  // useEffect(() => {
  //   // localStorage.setItem(`chart`, JSON.stringify({ chain: chain, pair:pooladdress }));
  //   const storedPairs:any = localStorage.getItem(`chart`);
  //   if (storedPairs) {
  //     // let { chain: storedChain, pair } = JSON.parse(storedPairs);
  //     setIsChart(JSON.parse(storedPairs))
  //     // setPlayedSeconds(storedProgressValue?.playedSeconds);
  //     // playerRef?.current?.seekTo(storedProgressValue?.playedSeconds)
  //   }else{
  //     setIsChart(false)
  //   }
  // },[])





  useEffect(() => {
    const getGainLos = async () => {
      setLoadingGainLos(true);
      // const resto = await axios.get(`/api/topgainerslosers`)
      // const res = await axios.get(`/api/pooldatas`)
      const res = await fetch(`/api/getter/topgainerslosers`,{

      })
      let getter = await res.json()
      getter = JSON.parse(getter)
      getter = getter[0]
      // const getter = res.data[0];
      setTopGainers(getter?.gainer.slice(0,6))
      setLoadingGainLos(false);
    }
    getGainLos()
  },[])

  const handleSearch = async (e:any) => {
    let value = e
    setSearchVal(e)
    setLoadingSearch(true)
    const response = await fetch(`/api/searchpools?value=${value}`)
    const data = await response.json()
    setSearchPoolData(data.slice(0,6))
    setLoadingSearch(false)
  }

  const handleAdd = async (chain:any,pooladdress:any) => {
    const tokenPair = {chain,pooladdress}
    const newCharts:any = [...charts, tokenPair];
    setCharts(newCharts);
    localStorage.setItem('charts', JSON.stringify(newCharts));
    // if(storedPairs){
    //   localStorage.setItem(`chart${chartindex}`, JSON.stringify([{ id:chartindex, chain: chain, pair:pooladdress }]));
    // }else{
    //   localStorage.setItem(`chart0`, JSON.stringify([{ id:0, chain: chain, pair:pooladdress }]));
    // }
  }

  const removeChart = (index:any) => {
    const newCharts = charts.filter((_:any, i:any) => i !== index);
    setCharts(newCharts);
    localStorage.setItem('charts', JSON.stringify(newCharts));
  };


  return (
    <>
    {chartModal ? 
    <div onClick={() => setChartModal(false)} className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-[9999999999999] flex justify-center items-center">
      <div className="w-80 flex-col items-center rounded-xl bg-brandblack border border-white/20 p-3 z-[9999999999999]">
      <div className="flex items-center rounded-full bg-black/30 hover:bg-black/50 border border-white/10 hover:border-white transition-all px-1 group w-full ">
      <IoIosSearch size={36} className="text-white/50 group-focus:text-white group-hover:text-white"/>
      <input 
      type="text"
      value={searchVal}
      onChange={(e:any) => handleSearch(e.target.value)}
      autoComplete='off'
      placeholder="Quick search..."
      className="bg-transparent outline-none border-none px-3 py-1 selection:bg-white/50 selection:text-black placeholder:text-sm placeholder:text-white/50 group-hover:placeholder:text-white w-full"
      />
      <small className="text-xs px-2 p-1 border border-white/10 rounded-full text-white/50 group-focus:text-white group-hover:text-white cursor-pointer group-hover:border-white">Ctrl+K</small>
      </div>
      {gailosloading ?
          <div className="flex-col items-center w-full bg-brandblack rounded-xl overflow-hidden z-[9999]">

              <div className="flex items-center w-full gap-x-5 px-3 py-4 hover:bg-black/50 group cursor-pointer">
              <div className='flex items-center relative'>
                <div className='size-6 object-cover rounded-full bg-slate-800/40 animate-pulse'/>
                <div className='size-6 object-cover rounded-full absolute -top-2 -right-3 bg-slate-800/50 animate-pulse' />
              </div>
              <div className='flex items-center gap-x-1 text-sm text-white/80 h-7 animate-pulse'><div className='uppercase w-12 bg-slate-800/50 rounded-lg h-7'></div><div className='uppercase w-12 h-7 bg-slate-800/50 rounded-lg'></div></div>
              </div>
              <div className="h-[1px] bg-gradient-to-l to-transparent via-white/10 from-transparent rounded-full"></div>
              <div className="flex items-center w-full gap-x-5 px-3 py-4 hover:bg-black/50 group cursor-pointer">
              <div className='flex items-center relative'>
                <div className='size-6 object-cover rounded-full bg-slate-800/40 animate-pulse'/>
                <div className='size-6 object-cover rounded-full absolute -top-2 -right-3 bg-slate-800/50 animate-pulse' />
              </div>
              <div className='flex items-center gap-x-1 text-sm text-white/80 h-7 animate-pulse'><div className='uppercase w-12 bg-slate-800/50 rounded-lg h-7'></div><div className='uppercase w-12 h-7 bg-slate-800/50 rounded-lg'></div></div>
              </div>
              <div className="h-[1px] bg-gradient-to-l to-transparent via-white/10 from-transparent rounded-full"></div>
              <div className="flex items-center w-full gap-x-5 px-3 py-4 hover:bg-black/50 group cursor-pointer">
              <div className='flex items-center relative'>
                <div className='size-6 object-cover rounded-full bg-slate-800/40 animate-pulse'/>
                <div className='size-6 object-cover rounded-full absolute -top-2 -right-3 bg-slate-800/50 animate-pulse' />
              </div>
              <div className='flex items-center gap-x-1 text-sm text-white/80 h-7 animate-pulse'><div className='uppercase w-12 bg-slate-800/50 rounded-lg h-7'></div><div className='uppercase w-12 h-7 bg-slate-800/50 rounded-lg'></div></div>
              </div>
              <div className="h-[1px] bg-gradient-to-l to-transparent via-white/10 from-transparent rounded-full"></div>

          </div>
        :
        <div className="flex-col items-center w-full bg-brandblack overflow-hidden z-[9999] mt-4">
          {topGainers.map((token:any,index:any) => {
          let baseimage = token?.baseImg.includes('missing') ? '/assets/missing.png' : token?.baseImg;
          let quoteimage = token?.quoteImg.includes('missing') ? '/assets/missing.png' : token?.quoteImg;

          let chain = token?.id.split('_')
          chain = chain[0]

            return (
              <>
              <div onClick={() => handleAdd(chain,token?.pooladdress)} key={index} className="flex items-center w-full gap-x-5 px-3 py-4 hover:bg-black/50 group cursor-pointer">
              <div className='flex items-center relative'>
                <img src={baseimage} width={800} height={800} className='size-6 object-cover rounded-full' alt=" "/>
                <img src={quoteimage} width={800} height={800} className='size-6 object-cover rounded-full absolute -top-2 -right-3' alt=" "/>
              </div>
              <div className='flex items-center gap-x-1 text-sm text-white/80'><h1 className='uppercase'>{token?.name}</h1><h3 className='uppercase opacity-35'>{token?.symbol}</h3></div>
              </div>
              <div className="h-[1px] bg-gradient-to-l to-transparent via-white/10 from-transparent rounded-full"></div>
              </>
            )
          })}
        </div>
        }
      </div>
    </div>
    : null}

      <div className="grid grid-cols-3 gap-3 w-full max-md:grid-cols-1">

        {Array.from({length:6})?.map((_:any,index:any) => {

          return (
            <>
            <div className="bg-[#131722] rounded-[12px] p-[0.8px] flex-col items-center w-full relative h-[500px] overflow-hidden border border-white/20">
              <ChartBox key={index} index={index} tokenPair={charts[index]} setChartModal={setChartModal} onRemoveChart={removeChart}/>
            </div>
          </>
          )
        })}

      </div>
    </>
);
};

export default MChart;

export const ChartBox = ({ index,tokenPair,setChartModal,onRemoveChart}:{index:any,tokenPair:any,setChartModal:any,onRemoveChart:any}) => {

  return (
    <>
    {tokenPair ?
    <>
    <button type="button" onClick={() => onRemoveChart(index)} className="absolute top-3 right-3"><AiOutlineCloseCircle size={18}/></button>
    <Chart tokenPair={tokenPair}/>
    </>
    :

    <div onClick={() => setChartModal(true)} className="bg-[#131722] rounded-xl p-[8px] w-96 h-[500px]">
    <div className="border border-white/20 transition-all hover:border-white hover:text-white rounded-lg flex-col flex justify-center items-center w-full h-full text-white/50 cursor-pointer">
      <h1 className="text-2xl font-semibold mb-3">Add Chart</h1><FaPlus size={36}/>
    </div>
    </div>

    }
    </>
  );
};


export const Chart = ({ tokenPair }:{tokenPair:any}) => {

  const {chain,pooladdress} = tokenPair
  const [pairdata,setPairData] = useState<any>([]);
  const getAmount = (fiat:any) => {
    let amount = parseFloat(fiat)
    const formatted = new Intl.NumberFormat("en-US",{
      style:"currency",
      currency: "USD",
      notation: 'compact',
      compactDisplay: 'short',
    }).format(amount)
    return formatted
  }
  useEffect(() => {
    const getPairs:any = async () => {
      const response = await fetch(`/api/pairData?chain=${chain}&pooladdress=${pooladdress}`)
      const pairData = await response.json()
      setPairData(pairData)
    }
    getPairs()
  },[])

  const defaultWidgetProps:any= {
    symbol: `${pairdata?.baseTokenSymbol && pairdata?.baseTokenSymbol.toUpperCase()}/${pairdata?.quoteTokenSymbol && pairdata?.quoteTokenSymbol.toUpperCase()}`,
    width:380,
    height:380,
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
    <div className="flex items-center gap-x-5 px-3 py-5">
      <PairImage baseimage={pairdata?.baseImg} quoteimage={pairdata?.quoteImg} classes={''} size1={8} size2={6} /> 
      <div className="flex-col items-center">
        <h1 className="font-bold">{pairdata?.name}</h1>
        <div className="flex items-center gap-x-2 bg-slate-800 px-2 py-1 rounded-lg text-xs">
          <h1 className="">{getAmount(pairdata?.baseprice)}</h1>
          <div className={pairdata?.price_change_percentage?.h24.includes('-') ? "text-red-600" : pairdata?.price_change_percentage?.h24 === "0" ? "text-white" : "text-green-500"}>{pairdata?.price_change_percentage?.h24}%</div>
        </div>
      </div>
      </div>
    <div className="relative flex h-96 overflow-hidden">

    {/*@ts-ignore*/}
    <MultiChartContainer chain={chain} pooladdress={pooladdress} props={defaultWidgetProps}/>
    
    
    </div>
    </>
  );
};
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client'
import React, { useEffect, useState } from "react";
import styles from './styles.module.scss';
import { DataTable } from "./DataTable/data-table";
import { columns } from "./DataTable/columns";
import axios from "axios";
import { AiOutlineCloseCircle, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdOutlineNewReleases } from "react-icons/md";
import { IoChevronDown } from "react-icons/io5";
import CustomSelectionBox from "../CustomSelectionBox/page";

type Props = {};


const Pool = (props: Props) => {
  const [loadingtrendingpool,setLoadingPool] = useState<boolean>(false);
  const [loadingnewpool,setLoadingNewPool] = useState<boolean>(false);
  const [trendingpools,setTrendingPool] = useState<boolean>(true);
  const [netdexModal,setNetdexModal] = useState<boolean>(true);
  const [newpools,setNewPools] = useState<boolean>(false);
  const [trendingpoolData,setTrendingPoolData] = useState<any[]>([]);
  const [newpoolData,setNewPoolData] = useState<any[]>([]);
  const router = useRouter()
  const [selectOpen, setSelectOpen] = useState(false);
  const [selected, setSelected] = useState<any>("");

  const [networkname,setNetworkName] = useState('all');
  const [networkpoolData,setNetworkPoolData] = useState<any[]>([]);
  const [dexname,setDexName] = useState('all');
  const [dexpoolData,setDexPoolData] = useState<any[]>([]);

  const getNetworkId = async (chain:any) => {
    const res = await axios.get(`/api/network?chainname=${chain}`)
    const data = res.data
    return data
  }
  const getCoinData = async (network:any,tokenaddress:any) => {
    const res = await axios.get(`/api/coin?network=${network}&tokenaddress=${tokenaddress}`)
    const data = res.data
    return data
  }

  useEffect(() => {
    const getTrendingPoolData = async () => {
        setLoadingPool(true)
        // const data = await fetch(`/api/trendingpools`,{
        //   method:'GET',
        //   headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
        //   cache:'no-store',
        // })
        // const response = await data.json()
        const res = await fetch(`/api/getter/trendingpools`,{
          method:'GET',
          cache:'no-cache',
          next:{revalidate:200}
        })
        let data = await res.json()
        data = JSON.parse(data)
        setTrendingPoolData(data)
        setLoadingPool(false)
    }
    const getNewPoolData = async () => {
        setLoadingNewPool(true)
        const res = await fetch(`/api/getter/newpool`,{
          method:'GET',
          cache:'no-cache',
          next:{revalidate:200}
        })
        let data = await res.json()
        data = JSON.parse(data)

        setNewPoolData(data)
        setLoadingNewPool(false)
    }

    // Intervali kurma
    const intervalId = setInterval(() => {
      getTrendingPoolData();
      getNewPoolData();
    }, 3000); // her 3 saniyede bir çalıştır

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  },[])

  useEffect(() => {
    const getNetworkByPool = async () => {
      if(networkname === 'all') return
      // const data = await fetch(`/api/trendingpools/bynetwork?networkname=${networkname}`,{
      //   method:'GET',
      //   headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
      //   cache:'no-store',
      // })
      // const response = await data.json()

      const res = await fetch(`/api/getter/newpool/bynetwork?networkname=${networkname}`,{
        method:'GET',
        cache:'no-store',
        next:{revalidate:200}
      })
      let data = await res.json()
      data = JSON.parse(data)
      setNetworkPoolData(data)

    }
    getNetworkByPool()
  },[networkname])

  useEffect(() => {
    const getNetworkByPool = async () => {
      if(dexname === 'all') return

      // const data = await fetch(`/api/trendingpools/bydex?networkname=${dexname === 'uniswap_v3' ? 'eth' : dexname === 'uniswap_v2' ? 'eth' : dexname === 'pancakeswap_v2' ? 'bsc' : dexname === 'raydium' ? 'solana' : dexname === 'stonfi' ? 'ton' : dexname === 'aerodrome-base' ? 'base' : 'eth'}&dexname=${dexname}`,{
      //   method:'GET',
      //   headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
      //   cache:'no-store',
      // })
      // const response = await data.json()
      const res = await fetch(`/api/getter/newpool/bydex?dexname=${dexname}`,{
        method:'GET',
        cache:'no-store',
        next:{revalidate:200}
      })
      let data = await res.json()
      data = JSON.parse(data)
      setDexPoolData(data)

    }
    getNetworkByPool()
  },[dexname])

  let networksdexes:any = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "eth",
      label: "Ethereum",
    },
    {
      value: "bsc",
      label: "Binance",
    },
    {
      value: "solana",
      label: "Solana",
    },
    {
      value: "arbitrum",
      label: "Arbitrum",
    },
    {
      value: "uniswap_v3",
      label: "Uniswap v3",
    },
    {
      value: "uniswap_v2",
      label: "Uniswap v2",
    },
    {
      value: "pancakeswap_v2",
      label: "Pancakeswap",
    },
    {
      value: "raydium",
      label: "Raydium",
    },
    {
      value: "stonfi",
      label: "Stonfi",
    },
    {
      value: "aerodrome-base",
      label: "Aerodrome",
    },
  ]

  return (
  <div className="flex-col flex justify-center items-center w-full mt-6 relative">
    <div className="flex items-center w-full gap-x-2 transition-all duration-500 ease-in-out relative">
    <button type="button" onClick={() => {setTrendingPool(true),setNewPools(false)}} className={trendingpools ? "flex justify-start items-center max-md:text-xs text-xl outline-none bg-gradient-to-tl to-transparent via-emerald-800/20 from-transparent border-emerald-300/50  hover:bg-brandsecond border-[1px] hover:border-[1px] hover:border-white/10 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out gap-x-4" : "flex justify-start items-center max-md:text-xs text-xl hover:bg-brandsecond border-[1px] border-transparent hover:border-[1px] hover:border-white/10 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out gap-x-4"}><FaArrowTrendUp /> Trending Pools</button>
    <button type="button" onClick={() => {setNewPools(true),setTrendingPool(false)}} className={newpools ? "flex justify-start items-center max-md:text-xs text-xl outline-none bg-gradient-to-tl to-transparent via-emerald-800/20 from-transparent border-emerald-300/50  hover:bg-brandsecond border-[1px] hover:border-[1px] hover:border-white/10 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out gap-x-4" : "flex justify-start items-center max-md:text-xs text-xl hover:bg-brandsecond border-[1px] border-transparent hover:border-[1px] hover:border-white/10 px-3 py-2 rounded-lg transition-all duration-300 ease-in-out gap-x-4"}><MdOutlineNewReleases /> New Pools</button>
    <button onClick={() => setNetdexModal(!netdexModal)} type="button" className="px-3 py-1 border border-white/10 text-xs max-md:flex hidden rounded-lg items-center gap-x-1 first-letter:uppercase">{networkname !== 'all' ? networkname : dexname !== 'all' ? dexname : "Network/DEX"} <IoChevronDown className={netdexModal ? 'rotate-180 transition-all' : 'rotate-0 transition-all'}/></button>
    {/* <CustomSelectionBox contents={networksdexes} selectOpen={selectOpen} selected={selected} setSelectOpen={setSelectOpen} setSelected={setSelected}/> */}
    {netdexModal ? 
    <div className="absolute top-12 left-0 z-[99999] bg-brandblack w-96 flex justify-center items-center border border-white/20 rounded-lg py-5 animate-opener">
      <AiOutlineCloseCircle className="absolute top-3 right-3 text-2xl" onClick={() => setNetdexModal(false)}/>
    <div className="flex-col flex items-center w-full gap-x-2 gap-y-4 text-md">
    <small className="text-white/50">Network : </small>
    <button type="button" onClick={() => {setDexName('all'),setNetworkName('all')}} className={networkname === 'all' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}>ALL</button>
    <button type="button" onClick={() => setNetworkName('eth')} className={networkname === 'eth' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029" alt="Ethereum Logo" className="size-4"/> ETH</button>
    <button type="button" onClick={() => setNetworkName('bsc')} className={networkname === 'bsc' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=029" alt="Binance Smart Chain Logo" className="size-4"/> BSC</button>
    <button type="button" onClick={() => setNetworkName('solana')} className={networkname === 'solana' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=029" alt="Solana Logo" className="size-4"/> Solana</button>
    <button type="button" onClick={() => setNetworkName('arbitrum')} className={networkname === 'arbitrum' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=029" alt="Arbitrum Logo" className="size-4"/> Arbitrum</button>
    <div className="h-[1px] bg-gradient-to-l to-transparent via-white/10 from-transparent rounded-full w-full"></div>
    <small className="text-white/50">Dex : </small>
    <button type="button" onClick={() => {setDexName('all'),setNetworkName('all')}} className={dexname === 'all' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}>ALL</button>
    <button type="button" onClick={() => {setNetworkName('all'),setDexName('uniswap_v3')}} className={dexname === 'uniswap_v3' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="./assets/uniswap_v3.svg" alt="Uniswap V3 Logo" className="size-4"/> Uniswap<small>v3</small></button>
    <button type="button" onClick={() => {setNetworkName('all'),setDexName('uniswap_v2')}} className={dexname === 'uniswap_v2' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=029" alt="Uniswap V2 Logo" className="size-4"/> Uniswap<small>v2</small></button>
    <button type="button" onClick={() => {setNetworkName('all'),setDexName('pancakeswap_v2')}} className={dexname === 'pancakeswap_v2' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://cryptologos.cc/logos/pancakeswap-cake-logo.svg?v=029" alt="Ethereum Logo" className="size-4"/> Pancakeswap</button>
    <button type="button" onClick={() => {setNetworkName('all'),setDexName('raydium')}} className={dexname === 'raydium' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://s1.coincarp.com/logo/1/raydium.png?style=200&v=1631063519" alt="Ethereum Logo" className="size-4"/> Raydium</button>
    <button type="button" onClick={() => {setNetworkName('all'),setDexName('stonfi')}} className={dexname === 'stonfi' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://ton.app/media/0f34939b-44b1-4be6-9ac1-2f97d61655d4.png?w=640&q=50" alt="Ethereum Logo" className="size-4"/> Stonfi</button>
    <button type="button" onClick={() => {setNetworkName('all'),setDexName('aerodrome-base')}} className={dexname === 'aerodrome-base' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://aerodrome.finance/brand-kit/symbol.png" alt="Ethereum Logo" className="size-4"/> Aerodrome</button>
    </div>
    </div>
    :null}
    </div>
    <div className="flex max-md:hidden items-center w-full gap-x-2 mt-5 text-xs">
    <small className="text-white/50">Network : </small>
    <button type="button" onClick={() => {setDexName('all'),setNetworkName('all')}} className={networkname === 'all' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}>ALL</button>
    <button type="button" onClick={() => setNetworkName('eth')} className={networkname === 'eth' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=029" alt="Ethereum Logo" className="size-4"/> ETH</button>
    <button type="button" onClick={() => setNetworkName('bsc')} className={networkname === 'bsc' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=029" alt="Binance Smart Chain Logo" className="size-4"/> BSC</button>
    <button type="button" onClick={() => setNetworkName('solana')} className={networkname === 'solana' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=029" alt="Solana Logo" className="size-4"/> Solana</button>
    <button type="button" onClick={() => setNetworkName('arbitrum')} className={networkname === 'arbitrum' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=029" alt="Arbitrum Logo" className="size-4"/> Arbitrum</button>
    <div className="border-l-[1px] h-6 border-white/50 mx-6"></div>
    <small className="text-white/50">Dex : </small>
    <button type="button" onClick={() => {setDexName('all'),setNetworkName('all')}} className={dexname === 'all' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}>ALL</button>
    <button type="button" onClick={() => {setNetworkName('all'),setDexName('uniswap_v3')}} className={dexname === 'uniswap_v3' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="./assets/uniswap_v3.svg" alt="Uniswap V3 Logo" className="size-4"/> Uniswap<small>v3</small></button>
    <button type="button" onClick={() => {setNetworkName('all'),setDexName('uniswap_v2')}} className={dexname === 'uniswap_v2' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=029" alt="Uniswap V2 Logo" className="size-4"/> Uniswap<small>v2</small></button>
    <button type="button" onClick={() => {setNetworkName('all'),setDexName('pancakeswap_v2')}} className={dexname === 'pancakeswap_v2' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://cryptologos.cc/logos/pancakeswap-cake-logo.svg?v=029" alt="Ethereum Logo" className="size-4"/> Pancakeswap</button>
    <button type="button" onClick={() => {setNetworkName('all'),setDexName('raydium')}} className={dexname === 'raydium' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://s1.coincarp.com/logo/1/raydium.png?style=200&v=1631063519" alt="Ethereum Logo" className="size-4"/> Raydium</button>
    <button type="button" onClick={() => {setNetworkName('all'),setDexName('stonfi')}} className={dexname === 'stonfi' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://ton.app/media/0f34939b-44b1-4be6-9ac1-2f97d61655d4.png?w=640&q=50" alt="Ethereum Logo" className="size-4"/> Stonfi</button>
    <button type="button" onClick={() => {setNetworkName('all'),setDexName('aerodrome-base')}} className={dexname === 'aerodrome-base' ? "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 bg-gradient-to-tl to-transparent via-fuchsia-700/50 from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center" : "px-3 py-1 border-[1px] border-white/20 rounded-md text-white/75 hover:bg-gradient-to-tl hover:to-transparent hover:via-slate-700/50 hover:from-transparent transition-all duration-300 ease-in-out outline-none flex gap-x-1 items-center"}><img src="https://aerodrome.finance/brand-kit/symbol.png" alt="Ethereum Logo" className="size-4"/> Aerodrome</button>
    </div>
    {trendingpools ? <DataTable loadingpool={loadingtrendingpool} columns={columns} data={
      networkname === 'eth' ? networkpoolData 
    : networkname === 'bsc' ? networkpoolData 
    : networkname === 'solana' ? networkpoolData 
    : networkname === 'arbitrum' ? networkpoolData 
    : networkname === 'all' && dexname === 'all' ? trendingpoolData
    : dexname === 'uniswap_v3' ? dexpoolData 
    : dexname === 'uniswap_v2' ? dexpoolData
    : dexname === 'pancakeswap_v2' ? dexpoolData
    : dexname === 'raydium' ? dexpoolData
    : dexname === 'stonfi' ? dexpoolData
    : dexname === 'aerodrome-base' ? dexpoolData
    : trendingpoolData } /> : null}
    {newpools ? <DataTable loadingpool={loadingnewpool} columns={columns} data={newpoolData} /> : null}
  </div>
  );
};

export default Pool;


'use client'
import React, {  useEffect, useState } from "react";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import CopyClipboard from "@/components/CopyClipboard/page";
import CustomProgressBar from "@/components/CustomProgressBar/page";
import TokenScan from "@/components/TokenScan/page";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { FaCircleCheck, FaFacebook, FaReddit, FaTelegram, FaTwitter } from "react-icons/fa6";
import { GoCodescan } from "react-icons/go";
import { IoChevronDown } from "react-icons/io5";
import { MdDangerous } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import DexImage from "@/components/DexImage/page";
import PairImage from "@/components/PairImage/page";
import { ChevronDown } from "lucide-react";
type Props = {};

const ShortDetail = ({}: Props) => {
  const searchParams = useSearchParams() as any
  const chain = searchParams.get('chain')
  const pooladdress = searchParams.get('pair')
  const [goplusecure,setGoPlus] = useState<any>([]);
  const [pairdata,setPairData] = useState<any>([]);
  const [tokenInfo,setTokenInfo] = useState<any>([]);
  // const [details,setOpenDetails] = useState<boolean>(false);
  const { details,setOpenDetails } = useAppContext()
  const [detailError,setDetailError] = useState("");
  const [transtime,setTransacitonTime] = useState("24");
  const [editModal,setEditDetailsModal] = useState(false);
  const [openModal,setOpenModal] = useState(false);
  const router = useRouter()
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

  const zeroCount = (price:any) => {
    const significantZeros = price.toString().includes('e') 
    ? parseInt(price.toString().split('e-')[1], 10) 
    : price.toString().split('.')[1]?.length || 0;

    return significantZeros
  }

  useEffect(() => {
    const getDetails = async () => {
      const response = await fetch(`/api/pairData?chain=${chain}&pooladdress=${pooladdress}`)
      const pairData = await response.json()
      setPairData(pairData)

      const res = await fetch(`https://api.gopluslabs.io/api/v1/token_security/${chain === 'arbitrum' ? '42161' : chain  === 'eth' ? '1' : chain === 'bsc' ? '56' : chain === 'solana' ? 'solana' : chain === 'base' ? '8453' : "1"}?contract_addresses=${pairData?.baseaddress}`)
      const data = await res.json();
      setGoPlus(data.result[`${pairData?.baseaddress}`])

      const responseTokenInfo = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chain}/tokens/${pairData?.baseaddress}?include=top_pools`,{
        method:'GET',
        headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
      })
      const tokenData = await responseTokenInfo.json()
      
      if(tokenData.error === 'coin not found'){
        setDetailError('It will take time for the data for this token to be generated')
      }

      setTokenInfo(tokenData)
    }
    getDetails()
    const intervalId = setInterval(() => {
      getDetails()
    },3000)
    return () => clearInterval(intervalId)
  },[])

  return (
    <>
    {!details ? 
  <div className="flex items-center w-full rounded-xl border border-white/10 bg-[#131722] mb-2 gap-x-2 px-7 py-5">
    <div className="flex items-center gap-x-6 max-md:grid max-md:grid-cols-2 max-md:gap-y-2">
      <div className="flex items-center gap-x-6 relative">
        <img src={tokenInfo?.data?.attributes?.image_url === 'missing.png' ? '/assets/missing.png' : tokenInfo?.data?.attributes?.image_url} alt={tokenInfo?.data?.attributes?.name} className="w-12 object-cover border border-white/10 rounded-full"/>
        <div className="absolute bottom-3 left-6"><DexImage dex={pairdata?.dex} size={8}/></div>
        <div className="flex-col items-center mt-3">
        <h1 className="text-xl flex gap-x-2">{tokenInfo?.data?.attributes?.name} <small className="text-white/50">{tokenInfo?.data?.attributes?.symbol}</small></h1>
        <div className="flex items-center gap-x-2 bg-white text-brandblack font-bold text-xl p-2 rounded-lg mt-2"><h1 className="">{getAmount(pairdata?.baseprice)}</h1><div className={pairdata?.price_change_percentage?.h24.includes('-') ? "text-xl max-md:text-sm font-bold text-red-600" : pairdata?.price_change_percentage?.h24 === "0" ? "text-xl max-md:text-sm font-bold text-brandblack" : "text-xl max-md:text-sm font-bold text-green-500"}>{pairdata?.price_change_percentage?.h24}%</div></div>
        </div>
      </div>
      <div className="hidden max-md:flex"></div>
      <div className="h-20 w-[2px] bg-gradient-to-b to-translate via-slate-600 from-transparent rounded-full max-md:hidden"></div>
      <div className="flex items-center gap-x-3">
        <div className="flex-col items-center mt-3">
        <h1 className="text-xl flex gap-x-2">Liquidity</h1>
        <div className="flex items-center gap-x-2 font-bold text-xl p-2 border border-white/10 rounded-lg mt-2"><h1 className="">{getAmount(pairdata?.reserve)}</h1></div>
        </div>
      </div>
      <div className="h-20 w-[2px] bg-gradient-to-b to-translate via-slate-600 from-transparent rounded-full max-md:hidden"></div>
      <div className="flex items-center gap-x-3">
        <div className="flex-col items-center mt-3">
        <h1 className="text-xl flex gap-x-2">FDV</h1>
        <div className="flex items-center gap-x-2 font-bold text-xl p-2 border border-white/10 rounded-lg mt-2"><h1 className="">{getAmount(pairdata?.fdv)}</h1></div>
        </div>
      </div>
      <div className="h-20 w-[2px] bg-gradient-to-b to-translate via-slate-600 from-transparent rounded-full max-md:hidden"></div>
      <div className="flex items-center gap-x-3">
        <div className="flex-col items-center mt-3">
        <h1 className="text-xl flex gap-x-2">Volume</h1>
        <Tippy content={`H24`}>
        <div className="flex items-center gap-x-2 font-bold text-xl p-2 border border-white/10 rounded-lg mt-2"><h1 className="">{getAmount(pairdata?.volume_usd?.h24)}</h1></div>
        </Tippy>
        </div>
      </div>
      <div className="h-20 w-[2px] bg-gradient-to-b to-translate via-slate-600 from-transparent rounded-full max-md:hidden"></div>
      <div className="flex items-center gap-x-3">
        <div className="flex-col items-center mt-3">
        <h1 className="text-xl flex gap-x-2">M. Cap</h1>
        <div className="flex items-center gap-x-2 font-bold text-xl p-2 border border-white/10 rounded-lg mt-2"><h1 className="">{pairdata?.cap === null ? '<$1' : pairdata?.cap === 0 ? '<$1' : getAmount(pairdata?.cap)}</h1></div>
        </div>
      </div>
      <div className="h-20 w-[2px] bg-gradient-to-b to-translate via-slate-600 from-transparent rounded-full max-md:hidden"></div>
      <div className="flex items-center gap-x-3">
        <div className="flex-col items-center mt-3 relative">
        <h1 className="text-xl flex gap-x-2">Top Pools</h1>
        <div className="flex items-center gap-x-2 font-bold p-2 border border-white/10 rounded-lg mt-2 hover:border-white transition-all text-sm"><div onClick={() => setOpenModal(!openModal)} className="flex items-center gap-x-2 cursor-pointer">{tokenInfo?.included?.map((item:any) => item?.attributes?.name)[0]} <ChevronDown className={openModal ? "rotate-180 transition-all" : "rotate-0 transition-all"}/></div></div>
        {openModal ? <div className="absolute top-20 border border-white/10 rounded-lg bg-[#131722] flex-col items-center w-[12vw] max-md:w-full max-md:top-24 overflow-hidden z-[99999] text-sm">
        {tokenInfo?.included?.map((item:any) => {
          let id = item?.id
          let chain = id.split('_')[0]
          return(
            <>
            <Link target="_blank" href={`/swap?chain=${chain}&pair=${item?.attributes?.address}`} onClick={() => {setOpenModal(false),router.refresh()}} className="flex items-center w-full hover:bg-brandblack/50 px-7 py-5 cursor-pointer border-b-[1px] border-white/10 text-sm">{item?.attributes?.name}</Link>
            </>
          )
        })}
        </div>:null}
        </div>
      </div>
      <div className="h-20 w-[2px] bg-gradient-to-b to-translate via-slate-600 from-transparent rounded-full max-md:hidden"></div>
      <div className="flex items-center gap-x-3">
        <div className="flex-col items-center mt-3">
        <h1 className="text-xl flex gap-x-2">Pool Address</h1>
        <div className="flex items-center gap-x-2 font-bold text-xl p-2 border border-white/10 rounded-lg mt-2"><CopyClipboard address={pairdata?.pooladdress} /></div>
        </div>
      </div>
    </div>
  </div>
  : null}
    </>
  );
};

export default ShortDetail;
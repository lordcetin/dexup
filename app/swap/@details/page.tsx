'use client'
import AuroBanner from "@/components/AuroBanner/page";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import CopyClipboard from "@/components/CopyClipboard/page";
import CustomProgressBar from "@/components/CustomProgressBar/page";
import TokenScan from "@/components/TokenScan/page";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, {  useEffect, useState } from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { FaCircleCheck, FaFacebook, FaReddit, FaTelegram, FaTwitter } from "react-icons/fa6";
import { GoCodescan } from "react-icons/go";
import { IoChevronDown } from "react-icons/io5";
import { MdDangerous } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";

type Props = {};

const Details = ({}: Props) => {
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
  
  const getAmount = (fiat:any) => {
    const formatted = new Intl.NumberFormat("en-US",{
      style:"currency",
      currency: "USD",
      notation: 'compact',
      compactDisplay: 'short'
    }).format(fiat)
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
  },[])

  return (

    <div>
    <div className={details ? "flex-col items-center gap-x-6 mb-2 bg-[#131722] border border-white/10 rounded-xl p-5 w-[780px] h-full max-md:h-full flex-shrink-0 box-border max-md:w-96" : "flex justify-between items-center gap-x-6 mb-2 bg-[#131722] border border-white/10 rounded-xl p-5 w-full max-md:w-96"}>

    <div className="flex justify-between items-center gap-x-6 w-full">
    <div className={details ? "flex items-center gap-x-6 w-1/12 max-md:w-96 self-start z-50" : "flex items-center gap-x-6 w-1/12 max-md:w-96 z-50"}>
    <div className="flex-col flex gap-2 max-md:text-xs">
      <div className="flex gap-x-2 items-center">
        <img src={pairdata?.baseImg === 'missing.png' ? '/assets/missing.png' : pairdata?.baseImg} alt={pairdata?.basename} width={800} height={800} className="size-5 rounded-full object-cover"/>
        <h1 className="truncate">{pairdata?.baseTokenSymbol}</h1>
      </div>
      <div className="flex items-center gap-x-1">
        <CopyClipboard address={pairdata && pairdata?.baseaddress}/>
      </div>
    </div>

    <div className="flex-col flex gap-2 max-md:text-xs">
      <div className="flex gap-x-2 items-center">
        <img src={pairdata?.quoteImg === 'missing.png' ? '/assets/missing.png' : pairdata?.quoteImg} alt={pairdata?.quotename} width={800} height={800} className="size-5 rounded-full object-cover"/>
        <h1 className="truncate">{pairdata?.quoteTokenSymbol}</h1>
      </div>
      <div className="flex items-center gap-x-1">
        <CopyClipboard address={pairdata && pairdata?.quoteaddress}/>
      </div>
    </div>
    </div>

    <div className={details ? "flex justify-center items-center w-full self-start" : "flex justify-center items-center w-full"}>
      <button disabled={detailError !== ''} onClick={() => setOpenDetails(!details)} className="flex items-center gap-x-1 outline-none border border-white/10 rounded-lg px-3 py-2 text-white/50 hover:text-white hover:border-white transition-all cursor-pointer">
        <h1 className={detailError ? 'text-xs':''}>{detailError ? detailError : "Details"}</h1>
        {detailError ? null :<IoChevronDown size={23}/>}
      </button>
    </div>

    <div className={details ? "flex items-center gap-x-2 max-md:hidden" : "flex ju items-center gap-x-2 max-md:hidden"}>
      <div className="flex items-center gap-x-1">
        <TokenScan chain={chain} address={pairdata?.baseaddress}/>
      </div> 
    </div>
    </div>


    {details ? 
    <div className="flex max-md:flex-col items-center w-full mt-5 gap-x-6 max-md:gap-y-6">
      <div className="flex-col items-center p-5 rounded-lg border border-white/10 self-start">
        <Image src='https://files.readme.io/3fb6486-small-image.png' alt="Go Plus Logo" width={800} height={800} className="object-cover w-20" />
        <div className="items-center mt-5 text-xs">
          <div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Honeypot</p><div className={goplusecure?.is_honeypot === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.is_honeypot === "0" ? <span className="flex items-center gap-x-1">No <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">Yes <PiWarningCircleFill size={16}/></span>}</div></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Whitelisted</p><div className={goplusecure?.is_whitelisted === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.is_whitelisted  === "0" ? <span className="flex items-center gap-x-1">No <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">Yes <PiWarningCircleFill size={16}/></span>}</div></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Blacklisted</p><div className={goplusecure?.is_blacklisted === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.is_blacklisted  === "0" ? <span className="flex items-center gap-x-1">No <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">Yes <PiWarningCircleFill size={16}/></span>}</div></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Buy Tax</p><div className={goplusecure?.buy_tax === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.buy_tax === "0" ? <span className="flex items-center gap-x-1">{goplusecure?.buy_tax}% <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">{goplusecure?.buy_tax}% <PiWarningCircleFill size={16}/></span>}</div></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Sell Tax</p><div className={goplusecure?.sell_tax === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.sell_tax === "0" ? <span className="flex items-center gap-x-1">{goplusecure?.sell_tax}% <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">{goplusecure?.sell_tax}% <PiWarningCircleFill size={16}/></span>}</div></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Cannot Buy</p><div className={goplusecure?.cannot_buy === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.cannot_buy === "0" ? <span className="flex items-center gap-x-1">No <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">Yes <PiWarningCircleFill size={16}/></span>}</div></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">External Call</p><div className={goplusecure?.external_call === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.external_call === "0" ? <span className="flex items-center gap-x-1">No <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">Yes <PiWarningCircleFill size={16}/></span>}</div></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Hidden Owner</p><div className={goplusecure?.hidden_owner === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.hidden_owner === "0" ? <span className="flex items-center gap-x-1">No <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">Yes <PiWarningCircleFill size={16}/></span>}</div></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Open Source</p><div className={goplusecure?.is_open_source === "1" ? "text-green-500" : "text-orange-500"}>{goplusecure?.is_open_source  === "1" ? <span className="flex items-center gap-x-1">Yes <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">No <PiWarningCircleFill size={16}/></span>}</div></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Anti Whale</p><div className={goplusecure?.is_anti_whale === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.is_anti_whale  === "0" ? <span className="flex items-center gap-x-1">No <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">Yes <PiWarningCircleFill size={16}/></span>}</div></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Mintable</p><div className={goplusecure?.is_mintable === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.is_mintable  === "0" ? <span className="flex items-center gap-x-1">No <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">Yes <PiWarningCircleFill size={16}/></span>}</div></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Proxy</p><div className={goplusecure?.is_proxy === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.is_proxy  === "0" ? <span className="flex items-center gap-x-1">No <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">Yes <PiWarningCircleFill size={16}/></span>}</div></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Trading Cooldown</p><div className={goplusecure?.trading_cooldown === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.trading_cooldown  === "0" ? <span className="flex items-center gap-x-1">No <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">Yes <PiWarningCircleFill size={16}/></span>}</div></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Transfer Pausable</p><div className={goplusecure?.transfer_pausable === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.transfer_pausable  === "0" ? <span className="flex items-center gap-x-1">No <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">Yes <PiWarningCircleFill size={16}/></span>}</div></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Holder Count</p><p>{goplusecure?.holder_count}</p></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Lp Holder_count</p><p>{goplusecure?.lp_holder_count}</p></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Lp Total Supply</p><p>{goplusecure?.lp_total_supply}</p></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Total Supply</p><p>{goplusecure?.total_supply}</p></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Owner Address</p><CopyClipboard address={goplusecure?.owner_address}/></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Owner Balance</p><p>{goplusecure?.owner_balance} <span className="text-white/50">{parseFloat(goplusecure?.owner_percent).toFixed(2)}%</span></p></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Creator Address</p><CopyClipboard address={goplusecure?.creator_address}/></div>
            <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Creator Balance</p><p>{goplusecure?.creator_balance} <span className="text-white/50">{parseFloat(goplusecure?.creator_percent).toFixed(2)}%</span></p></div>
          </div>
        </div>
      </div>

      <div className="flex-col items-center self-start max-md:w-96">
        <div className="flex max-md:flex-col justify-center items-center gap-x-4 max-md:w-96">

      <div className="grid grid-cols-2 gap-4 items-center p-5 rounded-lg border border-white/10 self-start text-xs max-md:w-80">
        <div className="flex-col flex justify-center items-center p-3 border border-white/50 rounded-lg">{pairdata?.baseTokenSymbol} <span className="font-bold ml-1 text-xl">{zeroCount(pairdata?.baseprice) > 10 ? getAmount(pairdata?.baseprice) : "$"+parseFloat(pairdata?.baseprice).toFixed(6)}</span></div>
        <div className="flex-col flex justify-center items-center p-3 border border-white/50 rounded-lg">{pairdata?.quoteTokenSymbol} <span className="font-bold ml-1 text-xl">${parseFloat(pairdata?.quoteprice).toFixed(2)}</span></div>
        <div className="flex-col flex justify-center items-center p-3 border border-white/50 rounded-lg">M. Cap <span className="font-bold ml-1 text-xl">{pairdata?.cap !== null ? getAmount(pairdata?.cap) : '<$1'}</span></div>
        <div className="flex-col flex justify-center items-center p-3 border border-white/50 rounded-lg">FDV <span className="font-bold ml-1 text-xl">{getAmount(pairdata?.fdv)}</span></div>
        <div className="flex-col flex justify-center items-center p-3 border border-white/50 rounded-lg">Reserve <span className="font-bold ml-1 text-xl">{getAmount(pairdata?.reserve)}</span></div>
        <div className="flex-col flex justify-center items-center p-3 border border-white/50 rounded-lg">Volume (24h) <span className="font-bold ml-1 text-xl">{getAmount(pairdata?.volume_usd?.h24)}</span></div>
      </div>

      <div className="grid grid-cols-1 gap-4 items-center p-5 rounded-lg border border-white/10 self-start max-md:w-80">
        {/* <div className="flex-col flex justify-center items-center p-3 border border-white/50 rounded-lg gap-x-1 text-xs box-border flex-shrink-0">Trust {tokenInfo?.tickers[0]?.trust_score === "green" ? <AiFillSafetyCertificate size={32} className="text-green-500"/> : <MdDangerous size={32} className="text-red-600"/>}</div>
        <div className="flex-col flex justify-center items-center p-3 border border-white/50 rounded-lg gap-x-1 text-xs box-border flex-shrink-0">Rank <span className={tokenInfo?.market_cap_rank <= 300 ? "text-purple-500 text-lg max-md:text-xs font-bold" : "text-orange-500 text-lg max-md:text-xs font-bold"}>{tokenInfo?.market_cap_rank}</span></div> */}
        <div className="flex-col flex justify-center items-center p-3 border border-white/50 rounded-lg gap-x-1 text-xs box-border flex-shrink-0">Created <span className="text-sm font-bold">{formatCreatedAt(pairdata?.created)}</span></div>
      </div>

      </div>

      <div className="flex-col items-center p-5 border border-white/10 rounded-lg mt-4 max-md:w-80 max-md:text-xs">
        <div className="flex justify-between items-center w-full border border-white/50 p-3 rounded-lg">
          <div>Price Change</div>
          <div className="flex-col flex justify-center text-center items-center">
              <div className="flex items-center gap-x-4 justify-center text-center py-1 px-2 w-full">
              <div className="flex-col items-center gap-y-2 cursor-pointer">
                <div className="text-xs">5 minute</div>
                <div className={pairdata?.price_change_percentage?.m5.includes('-') ? "text-lg max-md:text-xs font-bold text-red-600" : pairdata?.price_change_percentage.m5 === "0" ? "text-lg max-md:text-xs font-bold" : "text-lg max-md:text-xs font-bold text-green-500"}>{pairdata?.price_change_percentage.m5}%</div>
              </div>
              <div className="flex-col items-center gap-y-2 cursor-pointer">
                <div className="text-xs">1 hour</div>
                <div className={pairdata?.price_change_percentage?.h1.includes('-') ? "text-lg max-md:text-xs font-bold text-red-600" : pairdata?.price_change_percentage.h1 === "0" ? "text-lg max-md:text-xs font-bold" : "text-lg max-md:text-xs font-bold text-green-500"}>{pairdata?.price_change_percentage.h1}%</div>
              </div>
              <div className="flex-col items-center gap-y-2 cursor-pointer">
                <div className="text-xs">6 hour</div>
                <div className={pairdata?.price_change_percentage?.h6.includes('-') ? "text-lg max-md:text-xs font-bold text-red-600" : pairdata?.price_change_percentage.h6 === "0" ? "text-lg max-md:text-xs font-bold" : "text-lg max-md:text-xs font-bold text-green-500"}>{pairdata?.price_change_percentage.h6}%</div>
              </div>
              <div className="flex-col items-center gap-y-2 cursor-pointer">
                <div className="text-xs">24 hour</div>
                <div className={pairdata?.price_change_percentage?.h24.includes('-') ? "text-lg max-md:text-xs font-bold text-red-600" : pairdata?.price_change_percentage.h24 === "0" ? "text-lg max-md:text-xs font-bold" : "text-lg max-md:text-xs font-bold text-green-500"}>{pairdata?.price_change_percentage.h24}%</div>
              </div>
              </div>

          </div>
        </div>
        <div className="flex justify-between items-center w-full border border-white/50 p-3 rounded-lg mt-4">
          <div>Volume</div>
          <div className="flex-col flex justify-center text-center items-center">
              <div className="flex items-center gap-x-4 justify-center text-center py-1 px-2 w-full">
              <div className="flex-col items-center gap-y-2 cursor-pointer">
                <div className="text-xs">5 minute</div>
                <div className="text-lg max-md:text-xs font-bold">{getAmount(pairdata?.volume_usd.m5)}</div>
              </div>
              <div className="flex-col items-center gap-y-2 cursor-pointer">
                <div className="text-xs">1 hour</div>
                <div className="text-lg max-md:text-xs font-bold">{getAmount(pairdata?.volume_usd.h1)}</div>
              </div>
              <div className="flex-col items-center gap-y-2 cursor-pointer">
                <div className="text-xs">6 hour</div>
                <div className="text-lg max-md:text-xs font-bold">{getAmount(pairdata?.volume_usd.h6)}</div>
              </div>
              <div className="flex-col items-center gap-y-2 cursor-pointer">
                <div className="text-xs">24 hour</div>
                <div className="text-lg max-md:text-xs font-bold">{getAmount(pairdata?.volume_usd.h24)}</div>
              </div>
              </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full border border-white/50 p-3 rounded-lg mt-4">
          <div className="pr-7">Transaction</div>
          <div className="flex-col flex justify-center text-center items-center relative">
              <div className="flex items-center gap-x-1 justify-center text-center py-1 px-2 w-full text-[10px] max-md:text-[8px] absolute top-0 max-md:-left-14 -left-0">
                <button className={transtime === '30' ? "border bg-zinc-900 rounded-md px-3" : "px-3 hover:border hover:bg-zinc-900 rounded-md"} type="button" onClick={() => setTransacitonTime('30')}>30 minute</button>
                <button className={transtime === '15' ? "border bg-zinc-900 rounded-md px-3" : "px-3 hover:border hover:bg-zinc-900 rounded-md"} type="button" onClick={() => setTransacitonTime('15')}>15 minute</button>
                <button className={transtime === '5' ? "border bg-zinc-900 rounded-md px-3" : "px-3 hover:border hover:bg-zinc-900 rounded-md"} type="button" onClick={() => setTransacitonTime('5')}>5 minute</button>
                <button className={transtime === '1' ? "border bg-zinc-900 rounded-md px-3" : "px-3 hover:border hover:bg-zinc-900 rounded-md"} type="button" onClick={() => setTransacitonTime('1')}>1 hour</button>
                <button className={transtime === '24' ? "border bg-zinc-900 rounded-md px-3" : "px-3 hover:border hover:bg-zinc-900 rounded-md"} type="button" onClick={() => setTransacitonTime('24')}>24 hour</button>
              </div>
              <div className="flex-col flex text-xs justify-center items-center w-full mt-12">
                <CustomProgressBar title1="Buys" title2="Sells"
                buys={transtime === '30' ? pairdata?.transactions.m30.buys : transtime === '15' ? pairdata?.transactions.m15.buys : transtime === '5' ? pairdata?.transactions.m5.buys : transtime === '1' ? pairdata?.transactions.h1.buys : transtime === '24' ? pairdata?.transactions.h24.buys : 0}
                sells={transtime === '30' ? pairdata?.transactions.m30.sells : transtime === '15' ? pairdata?.transactions.m15.sells : transtime === '5' ? pairdata?.transactions.m5.sells : transtime === '1' ? pairdata?.transactions.h1.sells : transtime === '24' ? pairdata?.transactions.h24.sells : 0} />

                <CustomProgressBar title1="Buyers" title2="Sellers"
                buys={transtime === '30' ? pairdata?.transactions.m30.buyers : transtime === '15' ? pairdata?.transactions.m15.buyers : transtime === '5' ? pairdata?.transactions.m5.buyers : transtime === '1' ? pairdata?.transactions.h1.buyers : transtime === '24' ? pairdata?.transactions.h24.buyers : 0}
                sells={transtime === '30' ? pairdata?.transactions.m30.sellers : transtime === '15' ? pairdata?.transactions.m15.sellers : transtime === '5' ? pairdata?.transactions.m5.sellers : transtime === '1' ? pairdata?.transactions.h1.sellers : transtime === '24' ? pairdata?.transactions.h24.sellers : 0} />
              </div>
          </div>
        </div>
      </div>

      </div>

    </div>
    
    : null}
    </div>

  </div>
);
};

export default Details;

/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import CopyClipboard from "@/components/CopyClipboard/page";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { PiWarningCircleFill } from "react-icons/pi";

type Props = {};

const Honeypot = (props: Props) => {
  const searchParams = useSearchParams() as any
  const chain = searchParams.get('chain')
  const pooladdress = searchParams.get('pair')
  const [goplusecure,setGoPlus] = useState<any>([]);

  useEffect(() => {
    const getGosec = async () => {
      const response = await fetch(`/api/pairData?chain=${chain}&pooladdress=${pooladdress}`)
      const pairData = await response.json()

      const res = await fetch(`https://api.gopluslabs.io/api/v1/token_security/${chain === 'arbitrum' ? '42161' : chain  === 'eth' ? '1' : chain === 'bsc' ? '56' : chain === 'solana' ? 'solana' : chain === 'base' ? '8453' : "1"}?contract_addresses=${pairData?.baseaddress}`)
      const data = await res.json();
      setGoPlus(data.result[`${pairData?.baseaddress}`])
    }
    getGosec()
  },[])

  return (
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
);
};

export default Honeypot;

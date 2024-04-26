// export default function ConnectButton() {
//   return <w3m-button />
// }
'use client'
import React, { useState } from "react";
import { useAccount,useBalance } from 'wagmi'
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { CiWallet } from "react-icons/ci";
import CopyClipboard from "../CopyClipboard/page";
import { parseEther, parseUnits } from "ethers";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


type Props = {
};

const ConnectButton = ({}: Props) => {
  const { address,chainId,isConnected,isConnecting,isReconnecting,connector } = useAccount()
  const { open,close } = useWeb3Modal()
  const { data:balanceData ,isLoading:balanceLoading } = useBalance({address,chainId})

  // const { decimals,formatted,symbol,value,} = balanceData as any

  return (
  <div className="flex justify-center items-center py-2 gap-x-2">

    {isConnected ? 
    <div className="flex items-center gap-x-2 cursor-pointer border border-white/10 hover:border-white transition-all group px-2 py-1 rounded-lg" onClick={() => open()}>
    <CiWallet size={23}/>
    <div className="flex gap-x-1">
      {balanceLoading ?
      <AiOutlineLoading3Quarters className="animate-spin"/>
      :
      <> 
      <span>{
      //@ts-ignore
      balanceData?.value === 0n ? '0' : balanceData?.value as any
      }</span>
      <span>{balanceData?.symbol}</span>
      </>
      }
    </div>
    <div className="border border-white/10 rounded-lg px-2 py-1 text-sm group-hover:border-white transition-all">
    <span>{address?.slice(0,5) + '...' + address?.slice(38)}</span>
    </div>
    <span className="border-[1px] border-cyan-300 px-3 py-1 rounded-lg text-xs bg-gradient-to-tl to-cyan-500 via-cyan-400 from-cyan-700 text-cyan-950 font-bold">Beginer</span>
    </div>
    :  
    <div className="flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white transition-all w-36 py-1 rounded-lg cursor-pointer" onClick={() => open()}>Connect Wallet {isConnecting ? <AiOutlineLoading3Quarters className="animate-spin"/> : isReconnecting ? <AiOutlineLoading3Quarters className="animate-spin"/> : null}</div>
    }
  </div>
  );
};

export default ConnectButton;

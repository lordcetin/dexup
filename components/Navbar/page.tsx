/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from "react";
import ConnectButton from "../ConnectButton";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useAppContext } from "@/context/AppContext";
import { SocketIndicator } from "../SocketIndicator/page";
import { useAccount, useAccountEffect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

type Props = {
};

const Navbar = ({}: Props) => {
  const {isWallet,setIsWallet} = useAppContext();
  const { open, close } = useWeb3Modal()
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const query = new URLSearchParams((window as any)?.location?.search);

  useEffect(() => {
    if(query.get('chain') === 'solana'){
      setIsWallet(true)
    }else{
      setIsWallet(false)
    }
  },[query])

  return (
  <nav className="h-16 w-full flex fixed left-[256px] top-0 justify-center items-center z-[999]">
    <div className="w-3/6"></div>
    <div></div>
    <div className="flex justify-end items-center gap-x-4">
      {/* {isWallet ? <WalletMultiButton className='!bg-orange-500 hover:!bg-black transition-all duration-200 !rounded-full' /> : <ConnectButton/>} */}
      <ConnectButton/>
      <button type="button" onClick={() => open()}>Wallet Connect</button>
      {/* <div className="fixed top-0 right-2"><SocketIndicator/></div> */}
    </div>
  </nav>
  );
};

export default Navbar;

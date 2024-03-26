/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from "react";
import ConnectButton from "../ConnectButton";


type Props = {
};

const Navbar = ({}: Props) => {
  // const {isWallet,setIsWallet} = useAppContext();
  // const { open, close } = useWeb3Modal()
  // const { connection } = useConnection();
  // const { publicKey } = useWallet();
  // const query = new URLSearchParams((window as any)?.location?.search);

  // useEffect(() => {
  //   if(query.get('chain') === 'solana'){
  //     setIsWallet(true)
  //   }else{
  //     setIsWallet(false)
  //   }
  // },[query])

  return (
  <nav className="h-16 w-full flex fixed left-[256px] top-0 justify-center items-center z-[999]">
    <div className="w-3/6"></div>
    <div></div>
    <div className="flex justify-end items-center gap-x-4">
      {/* {isWallet ? <WalletMultiButton className='!bg-orange-500 hover:!bg-black transition-all duration-200 !rounded-full' /> : <ConnectButton/>} */}
      <ConnectButton/>
      {/* <div className="fixed top-0 right-2"><SocketIndicator/></div> */}
    </div>
  </nav>
  );
};

export default Navbar;

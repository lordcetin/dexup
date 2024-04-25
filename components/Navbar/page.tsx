/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { ReactEventHandler, useEffect, useState } from "react";
import ConnectButton from "../ConnectButton";
import { SocketIndicator } from "../SocketIndicator/page";
import { FaUser } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { FaCircleChevronUp } from "react-icons/fa6";
import Link from "next/link";
import Image from 'next/image'
import { IoIosSearch } from "react-icons/io";
type Props = {
};

const Navbar = ({}: Props) => {
  const [accountModal,setAccountModal] = useState<boolean>(false)
  const [searchModal,setSearchModal] = useState<boolean>(false)
  const [searchVal,setSearchVal] = useState<any>('')

  const [topGainers, setTopGainers] = useState([]);
  const [searchPoolData, setSearchPoolData] = useState([]);
  const [gailosloading, setLoadingGainLos] = useState<boolean>(false);
  const [loadingsearch, setLoadingSearch] = useState<boolean>(false);
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

  const handleSearch = async (e:any) => {
    let value = e
    setSearchVal(e)
    console.log("value",value)
    setLoadingSearch(true)
    const response = await fetch(`/api/searchpools?value=${value}`)
    const data = await response.json()
    setSearchPoolData(data.slice(0,6))
    setLoadingSearch(false)
  }

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

      setTopGainers(getter?.gainer.slice(0,3))
      setLoadingGainLos(false);
    }
    getGainLos()
  },[])

  return (
  <nav className="h-16 w-full flex fixed left-0 top-0 justify-between items-center z-[9999] px-12">
    <div className="w-3/6 "></div>
    <div className="flex items-center relative w-full">
    <div className="flex items-center rounded-full bg-black/30 hover:bg-black/50 border border-white/10 hover:border-white transition-all px-1 group">
      <IoIosSearch size={23} className="text-white/50 group-focus:text-white group-hover:text-white"/>
      <input 
      type="text"
      value={searchVal}
      onFocus={() => setSearchModal(true)}
      onChange={(e:any) => handleSearch(e.target.value)}
      autoComplete='off'
      placeholder="Quick search..."
      className="bg-transparent outline-none border-none px-3 py-1 selection:bg-white/50 selection:text-black placeholder:text-sm placeholder:text-white/50 group-hover:placeholder:text-white"
      />
      <small className="text-xs px-2 p-1 border border-white/10 rounded-full text-white/50 group-focus:text-white group-hover:text-white cursor-pointer group-hover:border-white">Ctrl+K</small>
    </div>
    {searchModal ? 
    <div onBlur={() => setSearchModal(false)} onMouseLeave={() => setSearchModal(false)} className="absolute top-10 border border-white/10 hover:border-white/30 rounded-xl transition-all w-80 z-[9999]">
    {searchVal !== '' ?
    <>
    {loadingsearch ? 
    <div onBlur={() => setSearchModal(false)} onMouseLeave={() => setSearchModal(false)} className="flex-col items-center w-full bg-brandblack rounded-xl overflow-hidden z-[9999]">

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
    :<div onBlur={() => setSearchModal(false)} onMouseLeave={() => setSearchModal(false)} className="flex-col items-center w-full bg-brandblack rounded-xl overflow-hidden z-[9999]">
      {searchPoolData.map((token:any,index:any) => {
      let baseimage = token?.baseImg.includes('missing') ? '/assets/missing.png' : token?.baseImg;
      let quoteimage = token?.quoteImg.includes('missing') ? '/assets/missing.png' : token?.quoteImg;
        return (
          <>
          <div key={index} className="flex items-center w-full gap-x-5 px-3 py-4 hover:bg-black/50 group cursor-pointer">
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
    </div>}
    </>
    :
    <>
    {gailosloading ?
      <div onBlur={() => setSearchModal(false)} onMouseLeave={() => setSearchModal(false)} className="flex-col items-center w-full bg-brandblack rounded-xl overflow-hidden z-[9999]">

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
    <div onBlur={() => setSearchModal(false)} onMouseLeave={() => setSearchModal(false)} className="flex-col items-center w-full bg-brandblack rounded-xl overflow-hidden z-[9999]">
      {topGainers.map((token:any,index:any) => {
      let baseimage = token?.baseImg.includes('missing') ? '/assets/missing.png' : token?.baseImg;
      let quoteimage = token?.quoteImg.includes('missing') ? '/assets/missing.png' : token?.quoteImg;
        return (
          <>
          <div key={index} className="flex items-center w-full gap-x-5 px-3 py-4 hover:bg-black/50 group cursor-pointer">
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
    </>
    }
    </div>
    :
    null
    }
    </div>
    <div className="flex justify-end items-center gap-x-6 relative">
      {/* {isWallet ? <WalletMultiButton className='!bg-orange-500 hover:!bg-black transition-all duration-200 !rounded-full' /> : <ConnectButton/>} */}
      
      <ConnectButton />
      <div onClick={() => setAccountModal(!accountModal)} className="border border-white/10 rounded-lg p-2 hover:border-white cursor-pointer flex items-center gap-x-1 peer"><FaUser/><IoChevronDown className={accountModal ? 'rotate-180 transition-all' : 'rotate-0 transition-all'}/></div>
      <div className="fixed top-0 right-2"><SocketIndicator/></div>
      {accountModal ? 
      <div className="flex-col items-center border border-white/10 rounded-xl w-72 h-80 absolute top-14 backdrop-blur-sm bg-brandblack transition-all duration-500 ease-in-out translate-y-2">
        <FaCircleChevronUp onClick={() => setAccountModal(false)} className="absolute right-3 top-3 text-xl cursor-pointer hover:scale-90 transition-all"/>
        <h1 className="flex items-center w-full pt-3 pl-5">Profile</h1>
        <div className="h-[1px] bg-white/10 mt-3 rounded-full"></div>
        <div className="flex-col items-center w-full">
        <Link href='/dashboard' className="p-5 bg-black/10 flex items-center w-full hover:bg-black/30 transition-all text-white/50 hover:text-white text-right self-end justify-end relative overflow-hidden group"><img src={'/assets/dashboard.svg'} alt="Dashboard" width={800} height={800} className="object-cover absolute -top-3 left-0 w-36 z-50 opacity-20 -rotate-12 group-hover:opacity-30 group-hover:rotate-0"/> Dashboard</Link>
        <div className="h-[1px] bg-gradient-to-l to-transparent via-white/10 from-transparent rounded-full"></div>
        <Link href='/subscription' className="p-5 bg-black/10 flex items-center w-full hover:bg-black/30 transition-all text-white/50 hover:text-white text-right self-end justify-end relative overflow-hidden group"><img src={'/assets/subscribe.svg'} alt="Subscription" width={800} height={800} className="object-cover absolute top-1 left-0 w-36 z-50 opacity-20 -rotate-12 group-hover:opacity-30 group-hover:rotate-0"/> Subscription</Link>
        <div className="h-[1px] bg-gradient-to-l to-transparent via-white/10 from-transparent rounded-full"></div>
        <Link href='/score' className="p-5 bg-black/10 flex items-center w-full hover:bg-black/30 transition-all text-white/50 hover:text-white text-right self-end justify-end relative overflow-hidden group"><img src={'/assets/score.svg'} alt="Score Points" width={800} height={800} className="object-cover absolute top-1 left-0 w-36 z-50 opacity-20 -rotate-12 group-hover:opacity-30 group-hover:rotate-0"/> Score Points</Link>
        <div className="h-[1px] bg-gradient-to-l to-transparent via-white/10 from-transparent rounded-full"></div>
        <Link href='/dashboard' className="p-5 bg-black/10 flex items-center w-full hover:bg-black/30 transition-all text-white/50 hover:text-white text-right self-end justify-end relative overflow-hidden group"><img src={'/assets/settings.svg'} alt="Settings" width={800} height={800} className="object-cover absolute top-1 left-3 w-36 z-50 opacity-20 -rotate-12 group-hover:opacity-30 group-hover:rotate-0"/> Settings</Link>

        </div>
      </div>
      : null}
    </div>
  </nav>
  );
};

export default Navbar;

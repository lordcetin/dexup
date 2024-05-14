/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { IoIosArrowDown } from "react-icons/io";
import React, { useEffect, useLayoutEffect, useRef, useState,memo, Suspense, useCallback} from "react";
import {Contract, ethers, formatEther, formatUnits, parseUnits} from 'ethers'
import axios from "axios";
import { useRouter, useSearchParams } from 'next/navigation'
import {
  useAccount,
  useReadContract,
  useBalance,
  usePrepareTransactionRequest,
  useWriteContract,
  useSwitchChain,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useSendTransaction,
  useTransaction,
  useReadContracts,

} from "wagmi";
import { erc20Abi, type Address, parseEther, parseGwei } from "viem";
//@ts-ignore
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";
//@ts-ignore
import { createChart,CrosshairMode,LineStyle} from 'lightweight-charts';
import Chart from '@/components/Chart/page'
import { AiOutlineCloseCircle, AiOutlineLoading3Quarters } from "react-icons/ai";
import {isEmpty} from 'lodash';
import {abi} from "@/lib/abi";
import DexRouter from "@/lib/DexRouter.json";
import { MAX_ALLOWANCE } from "@/lib/constants";
import { useAppContext } from "@/context/AppContext";
import dynamic from "next/dynamic";
import Script from "next/script";
import { ChartingLibraryWidgetOptions,ResolutionString, } from "@/public/static/charting_library/charting_library";
import { IoMdSettings } from "react-icons/io";
import {config} from '@/config'
import { useWeb3js } from "@/hooks/useWeb3";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { MdContentCopy } from "react-icons/md";
import Link from "next/link";
import { GoCodescan } from "react-icons/go";
import { DataTable } from "./DataTable/data-table";
import { columns } from "./DataTable/columns";
import { IoChevronDown } from "react-icons/io5";
import { FaCircleCheck, FaFacebook, FaReddit, FaTelegram, FaTwitter } from "react-icons/fa6";
import { PiWarningCircleFill } from "react-icons/pi";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { MdDangerous } from "react-icons/md";
import CustomProgressBar from "@/components/CustomProgressBar/page";
import AuroBanner from "@/components/AuroBanner/page";
import { BiWorld } from "react-icons/bi";
import ImageColorPalette from "@/components/AuroBanner/page";
import { NextPageContext } from "next";
import Input from "@/components/Input/page";
import { IoSend } from "react-icons/io5";
import {uid} from 'uid';
import TimeAgo from '@/components/TimeAgo/page'
import CopyClipboard from "@/components/CopyClipboard/page";
import { toast } from "react-toastify";
import EditModal from "@/components/EditModal/page";

export default function Swap() {
  // const searchParams = useSearchParams() as any
  // const chain = searchParams.get('chain')

  // useEffect(() => {
  //   const getNetworkId = async () => {
  //     const res = await axios.get(`/api/network?chainname=${chain}`)
  //     const data = res.data
  //     let filter = data.filter((item:any) => item.attributes.name === chain || item.attributes.coingecko_asset_platform_id === chain)
  //     let chaId = filter[0]?.id
  //     console.log("chaId",chaId)
  //     return data
  //   }
  //   getNetworkId()
  // },[])

  const {info,setInfo,charttxns,setChartTxns,charts,setChart,txns,setTxns} = useAppContext();


  return (

    <main className="flex-col items-center w-full mt-7 gap-x-6 relative">
      {/* {editModal ? 
      <EditModal setEditDetailsModal={setEditDetailsModal}/>
      : null
      } */}

      <div className="fixed bottom-0 w-full h-12 bg-zinc-800 z-[999999] justify-between items-center hidden max-md:flex border-t-[1px] border-white/30">
        <div className={info ? "px-5 bg-black h-12 flex items-center" : "px-5 hover:bg-black h-12 flex items-center"} onClick={() => {setInfo(true),setChartTxns(false),setChart(false),setTxns(false)}}>Info</div>
        <div className={charttxns ? "px-5 hover:bg-black h-12 flex items-center" : "px-5 hover:bg-black h-12 flex items-center"} onClick={() => {setInfo(false),setChartTxns(true),setChart(false),setTxns(false)}}>Chart+Txns</div>
        <div className={charts ? "px-5 bg-black h-12 flex items-center" : "px-5 hover:bg-black h-12 flex items-center"} onClick={() => {setInfo(false),setChartTxns(false),setChart(true),setTxns(false)}}>Chart</div>
        <div className={txns ? "px-5 bg-black h-12 flex items-center" : "px-5 hover:bg-black h-12 flex items-center"} onClick={() => {setInfo(false),setChartTxns(false),setChart(false),setTxns(true)}}>Txns</div>
      </div>

    </main>

  );
}
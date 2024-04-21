/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { IoIosArrowDown } from "react-icons/io";
import React, { useEffect, useLayoutEffect, useRef, useState,memo} from "react";
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

const TEST_PLATFORM_FEE_AND_ACCOUNTS = {
  referralAccount: "2XEYFwLBkLUxkQx5ZpFAAMzWhQxS4A9QzjhcPhUwhfwy",
  feeBps: 100,
};

const TVChartContainer = dynamic(
  () =>
    import('@/components/TVChartContainer/page').then((mod:any) => mod.TVChartContainer),
  { ssr: false }
);

declare global {
  interface Window {
    TradingView: any; // Değişkenin tipini uygun bir şekilde tanımlayın
  }
}


export default function Swap() {
  const searchParams = useSearchParams() as any
  const chain = searchParams.get('chain')
  const pooladdress = searchParams.get('pair')

  const [isScriptReady, setIsScriptReady] = useState(false);

  const {isWallet,setIsWallet} = useAppContext();
  const container = useRef<any>(null);
  let tvScriptLoadingPromise: Promise<void>;
  const onLoadScriptRef = useRef<(() => void) | null>(null);

  const [paid,setPaid] = useState<any>(10);
  const [received,setReceived] = useState<any>(0);
  const [CHAINID,setCHAINID] = useState<any>();
  const [switchtoken,setSwitch] = useState<boolean>(false);
  const [commentLoading,setCommentLoading] = useState<boolean>(false);
  const [details,setOpenDetails] = useState<boolean>(false);
  const [copied,setCopied] = useState<boolean>(false);
  const [loadingtrader,setloadingtrader] = useState<boolean>(false);
  const [frombase,setFromBase] = useState<any>(null);
  const [toquote,setToQuote] = useState<any>(null);
  const [baseSymbol,setBaseSymbol] = useState<any>("");
  const [uniswap,setUniswap] = useState<boolean>(false);
  const [urluni,setUniUrl] = useState<any>("");
  const [quoteSymbol,setQuoteSymbol] = useState<any>("");
  const [quoteData,setQuteData] = useState("");
  const [baseAddress,setBaseAddress] = useState("");
  const [quoteAddress,setQuoteAddress] = useState("");
  const [transtime,setTransacitonTime] = useState("24");
  // const [basecoinId,setBaseCoinId] = useState("");
  // const [quotecoinId,setQuoteCoinId] = useState("");
  const [solanaAddress,setSolanaAddress] = useState("");
  const [realamount,setRealAmout] = useState<any>("");
  const [baseNetID,setBaseNetId] = useState<any>("");
  const [quoteNetID,setQuoteNetId] = useState<any>("");
  const [comment,setComment] = useState<any>("");
  const [calldata,setCallData] = useState<any>([]);
  const [goplusecure,setGoPlus] = useState<any>([]);
  const [commentData,setCommentData] = useState<any>([]);
  const [tokenInfo,setTokenInfo] = useState<any>([]);
  const [approveData,setApproveData] = useState<any>([]);
  const [traderData,setTraderData] = useState<any>([]);
  const [baseDecimal,setBaseDecimal] = useState<any>();
  const [toDecimal,setToDecimal] = useState<any>();
  const [fromDecimal,setFromDecimal] = useState<any>();
  const [geckoId,setGeckoId] = useState("");
  const [detailError,setDetailError] = useState("");
  const [slippage,setSlippage] = useState<any>(0.5);
  const [estimateGasFee,setEstimateGasFee] = useState<any>("");

  const [dexAddress,setDexTokenApproveAddress] = useState<Address>();
  const [pairdata,setPairData] = useState<any>([]);
  const [alltoken,setDataALLTOKEN] = useState<any>([]);
  const [paidloading,setPaidLoading] = useState(false);
  const [settings,setSettings] = useState(false);
  const [editModal,setEditDetailsModal] = useState(false);
  const [receiveloading,setReceiveLoading] = useState(false);
  const {address,isConnected,chainId} = useAccount();
  const { open,close } = useWeb3Modal()
  const { writeContractAsync } = useWriteContract()

  const router = useRouter()

  const { switchChain,isSuccess,isPending } = useSwitchChain()
  const [pubKey, setPubKey] = useState(null);
  // const web3 = useWeb3js({chainId:chainId})

  const { 
    setBaseCoinId,
    setBTokenSymbol,
    setQTokenSymbol,
    setChain 
  } = useAppContext()
  
  const defaultWidgetProps:any= {
    symbol: `${pairdata?.baseTokenSymbol && pairdata?.baseTokenSymbol.toUpperCase()}/${pairdata?.quoteTokenSymbol && pairdata?.quoteTokenSymbol.toUpperCase()}`,
    width:980,
    height:600,
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

  
  useEffect(() => {

    const getPair = async () => {
      const response = await fetch(`/api/pairData?chain=${chain}&pooladdress=${pooladdress}`)
      const pairData = await response.json()

      setPairData(pairData)
      const res = await fetch(`https://api.gopluslabs.io/api/v1/token_security/${chain === 'arbitrum' ? '42161' : chain  === 'ethereum' ? '1' : chain === 'binance-smart-chain' ? '56' : chain === 'solana' ? 'solana' : chain === 'base' ? '8453' : "1"}?contract_addresses=${pairData?.baseaddress}`)
      const data = await res.json();


      const responseTokenInfo = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${chain === 'arbitrum' ? 'arbitrum' : chain === 'the-open-network' ? 'ton' : chain  === 'ethereum' ? 'ethereum' : chain === 'binance-smart-chain' ? 'binance-smart-chain' : chain === 'solana' ? 'solana' : chain}/contract/${pairData?.baseaddress}`,{
        method:'GET',
        headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
        cache:'no-store',
      })
      const tokenInfoData = await responseTokenInfo.json()
      if(tokenInfoData.error === 'coin not found'){
        setDetailError('It will take time for the data for this token to be generated')
      }

      const resasaf = await fetch(`/api/comments`)
      const dataasfdag = await resasaf.json()
      setCommentData(dataasfdag.filter((u:any) => u.pairAddress === pooladdress))

      let txhashs:any = []
      const ressa = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chain === 'arbitrum' ? 'arbitrum' : chain === 'the-open-network' ? 'ton' : chain  === 'ethereum' ? 'eth' : chain === 'binance-smart-chain' ? 'bsc' : chain === 'solana' ? 'solana' : chain}/pools/${pooladdress}/trades?trade_volume_in_usd_greater_than=0`,{
        method:'GET',
        headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
        cache:'no-store',
      }).then((res:any) => res.json()).then((data:any) => {
  
        const tradedata = data.data.filter((u:any) => u.attributes.to_token_address !== pairData?.baseaddress).map((item:any) => {

          return {
            block_number:item.attributes.block_number,
            block_timestamp:item.attributes.block_timestamp,
            price:Number(item.attributes.from_token_amount) * Number(item.attributes.price_to_in_usd),
            from_token_address:item.attributes.from_token_address,
            from_token_amount:item.attributes.from_token_amount,
            kind:item.attributes.kind,
            price_from_in_currency_token:item.attributes.price_from_in_currency_token,
            price_from_in_usd:item.attributes.price_from_in_usd,
            price_to_in_currency_token:item.attributes.price_to_in_currency_token,
            price_to_in_usd:item.attributes.price_to_in_usd,
            to_token_address:item.attributes.to_token_address,
            to_token_amount:item.attributes.to_token_amount,
            tx_from_address:item.attributes.tx_from_address,
            tx_hash:item.attributes.tx_hash,
            volume_in_usd:item.attributes.volume_in_usd,
          }
        })
         setTraderData(tradedata)
      }).catch((err)=>console.log('error in fetching traders',err))

      // const ressam = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chain === 'arbitrum' ? 'arbitrum' : chain === 'the-open-network' ? 'ton' : chain  === 'ethereum' ? 'eth' : chain === 'binance-smart-chain' ? 'bsc' : chain === 'solana' ? 'solana' : chain}/pools/${pooladdress}/trades?trade_volume_in_usd_greater_than=0`,{
      //   method:'GET',
      //   headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
      //   cache:'no-store',
      // })
      // const rt = await ressam.json()
      // const tradedata = rt.data.map((item:any) => {
      //   txhashs.push(...item.attributes.tx_hash)
      // })


      // const sasa = txhashs.forEach((item:any) => {

      //   const fetchTrans = fetch(`https://api.etherscan.io/api
      //   ?module=transaction
      //   &action=gettxreceiptstatus
      //   &txhash=${item}
      //   &apikey=MWEX32M9H13C1D5KMSP3CKUP5PFB3GWGAB`).then((res:any) => res.json()).then((data:any) => console.log("data",data))
      // });
    

    setTokenInfo(tokenInfoData)
    setGoPlus(data.result[`${pairData?.baseaddress}`])
    setBaseCoinId(pairData?.basecoinId)
    setBaseSymbol(pairData?.baseTokenSymbol)
    setQuoteSymbol(pairData?.quoteTokenSymbol)
    setBTokenSymbol(pairData?.baseTokenSymbol)
    setQTokenSymbol(pairData?.quoteTokenSymbol)
    setChain(chain)
    setBaseAddress(pairData?.baseaddress)
    setQuoteAddress(pairData?.quoteaddress)
    setBaseNetId(pairData?.baseNetId)
    setQuoteNetId(pairData?.baseNetId)
    


    if(chain === 'ethereum'){
      setUniUrl(`https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=${pairData?.baseaddress}&outputCurrency=${pairData?.quoteaddress}`)
    }else if(chain === 'binance-smart-chain'){
      setUniUrl(`https://pancakeswap.finance/swap?outputCurrency=${pairData?.baseaddress}&chainId=56`)
      // setUniUrl(`https://kyberswap.com/partner-swap?chainId=56&inputCurrency=${baseaddress}&outputCurrency=${quoteaddress}&clientId=dexup&feeReceiver=0xEb218F28ACEea78E20910286b1Acfef917A270Ab&enableTip=true&chargeFeeBy=currency_out&feeAmount=30`)
    }else if(chain === 'arbitrum'){
      setUniUrl(`https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=${pairData?.baseaddress}&outputCurrency=${pairData?.quoteaddress}`)
    }else if(chain === 'the-open-network'){
      //change the referal address
      setUniUrl(`https://app.ston.fi/swap?referral_address=UQCthC8ICK7K8Hkfm9smblLFroKrYrEMwZuoD4Nbm5LswUnc&chartVisible=false&ft=${pairData?.quoteTokenSymbol.toUpperCase()}&tt=${pairData?.baseTokenSymbol.toUpperCase()}`)
    }else if(chain === 'base'){
      setUniUrl(`https://aerodrome.finance/swap?from=${pairData?.baseaddress}&to=${pairData?.quoteaddress}`)
    }
        
    }
    getPair()

  }, []);
  // useEffect(() => {
  //   const chartOptions:any = { 
  //     layout: { 
  //       textColor: 'white', 
  //       background: { 
  //         type: 'solid', 
  //         color: 'transparent' 
  //       } 
  //     }, 
  //     grid: {  
  //       vertLines: { visible: false }, 
  //       horzLines: { visible: false },
  //     },
  //     crosshair: {
  //       // Change mode from default 'magnet' to 'normal'.
  //       // Allows the crosshair to move freely without snapping to datapoints
  //       mode: CrosshairMode.Normal,
  //       // Vertical crosshair line (showing Date in Label)
  //       vertLine: {
  //           width: 8,
  //           color: '#C3BCDB44',
  //           style: LineStyle.Solid,
  //           labelBackgroundColor: '#9B7DFF',
  //       },

  //       // Horizontal crosshair line (showing Price in Label)
  //       horzLine: {
  //           color: '#9B7DFF',
  //           labelBackgroundColor: '#9B7DFF',
  //       },
  //   },
  //   };
  //   const chart = createChart(container.current, chartOptions);
  //   const areaSeries = chart.addAreaSeries({
  //       // lineColor: '#2962FF', topColor: '#2962FF',
  //       // bottomColor: 'rgba(41, 98, 255, 0.28)',
  //       lastValueVisible: false, // hide the last value marker for this series
  //       crosshairMarkerVisible: false, // hide the crosshair marker for this series
  //       lineColor: 'transparent', // hide the line
  //       topColor: 'rgba(56, 33, 110,0.6)',
  //       bottomColor: 'rgba(56, 33, 110, 0.1)',
  //   });

  //   areaSeries.setData([
  //       { time: '2018-12-22', value: 32.51 },
  //       { time: '2018-12-23', value: 31.11 },
  //       { time: '2018-12-24', value: 27.02 },
  //       { time: '2018-12-25', value: 27.32 },
  //       { time: '2018-12-26', value: 25.17 },
  //       { time: '2018-12-27', value: 28.89 },
  //       { time: '2018-12-28', value: 25.46 },
  //       { time: '2018-12-29', value: 23.92 },
  //       { time: '2018-12-30', value: 22.68 },
  //       { time: '2018-12-31', value: 22.67 },
  //   ]);
  
  //   const candlestickSeries = chart.addCandlestickSeries({
  //       upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
  //       wickUpColor: '#26a69a', wickDownColor: '#ef5350',
  //   });
  //   candlestickSeries.setData([
  //       { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
  //       { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
  //       { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
  //       { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
  //       { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
  //       { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
  //       { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
  //       { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
  //       { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
  //       { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
  //   ]);
  
  //   chart.timeScale().fitContent();
  // },[])

  const generateDecimal = (amount:any,decimal:any) => {
    let parsedAmount:any = parseUnits(amount.toString(), decimal);
    parsedAmount = parsedAmount.toString()
    return parsedAmount
  }

  const formatNumber = (number: any): string => {
    // Eğer sayı 1 milyondan büyükse, milyonlar olarak göster
    if (number >= 1000000) {
      return (number / 1000000).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
    }
    // Eğer sayı 1 binden büyükse, binler olarak göster
    else if (number >= 1000) {
      return (number / 1000).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
    }
    // Diğer durumda doğrudan sayıyı göster
    else {
      return number.toString();
    }
  };

  // useEffect(() => {
  //   // Store user's public key once they connect
  //   provider.on("connect", (publicKey:any) => {
  //     setPubKey(publicKey);
  //   });
  
  //   // Forget user's public key once they disconnect
  //   provider.on("disconnect", () => {
  //     setPubKey(null);
  //   });
  // }, [provider]);

  // useEffect(() => {
  //   const provider = (window as any).phantom?.solana;
  //   provider.disconnect()
  // }, []);
  

  // useEffect(() => {
  //   const isPhantomInstalled = (window as any).phantom?.solana?.isPhantom
  //   console.log("isPhantomInstalled",isPhantomInstalled)
  //   // const provider = window.phantom?.solana;
  //   // provider.request({ method: "disconnect" });
  //   const getProvider = () => {
  //     if ('phantom' in (window as any)) {
  //       const provider = (window as any).phantom?.solana;
        
  //       if (provider?.isPhantom) {
  //         return provider;
  //       }
  //     }
    
  //     (window as any)?.open('https://phantom.app/', '_blank');
  //   };
  //   const getConnectSolana = async () => {
  //     const provider = getProvider(); // see "Detecting the Provider"
      
  //     try {
  //         const resp = await provider.connect();

  //         console.log(resp.publicKey.toString());
  //         provider.on("connect", () => console.log("connected!"));
  //         console.log(provider.publicKey.toString());// 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
  //         setSolanaAddress(provider.publicKey.toString())
  //         console.log(provider.isConnected); // true
          
  //     } catch (err) {
  //         // { code: 4001, message: 'User rejected the request.' }
  //     }
  //   }
  //   if(chain === 'solana'){
  //     getConnectSolana()
  //   }
  // }, []);


  useEffect(() => {
    (window as any)?.Jupiter?.init({
      displayMode: "integrated",
      integratedTargetId: "integrated-terminal",
      endpoint: "https://api.mainnet-beta.solana.com",
      platformFeeAndAccounts: TEST_PLATFORM_FEE_AND_ACCOUNTS,
      formProps:{
        fixedOutputMint: true,
        initialAmount: '10000000',
        initialInputMint:pairdata?.baseaddress ? pairdata?.baseaddress : null,
        initalOutputMint: pairdata?.quoteaddress ? pairdata?.quoteaddress : null,
      }
    })

  }, []);

useEffect(() => {
  const fetchTraders = async () => {
    setloadingtrader(true)
    try {


    setloadingtrader(false)
  } catch (error) {
      console.log("ERROR",error)
      setloadingtrader(false)
  }
  }
    fetchTraders()
},[])

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



const handleComment = async () => {
  if(isConnected){
    setCommentLoading(true)
    const formData = new FormData();
    formData.append("commentId",String(uid(7)+""+address?.slice(7)));
    formData.append("pairAddress",pooladdress);
    formData.append("authorWallet",String(address));
    formData.append("comment",String(comment));
  const {data} = await axios.post(`/api/comments/add`,formData)
  setComment("")
  router.refresh()
  setCommentLoading(false)
  }
}

const handleDeleteComment = async (id:any) => {
  if(isConnected){
    setCommentLoading(true)
    const formData = new FormData();
    formData.append("id",id);

  const {data} = await axios.post(`/api/comments/delete`,formData)
  toast.success(data)
  router.refresh()
  setCommentLoading(false)
  }
}

  return (
    <main className="flex-col items-center w-full mt-7 gap-x-6">
      {editModal ? 
      <EditModal setEditDetailsModal={setEditDetailsModal}/>
      : null
      }

      <div className="flex gap-x-2 items-center">
      <div className="flex-col items-center">


        <div className={details ? "flex-col items-center gap-x-6 mt-5 mb-2 bg-[#131722] rounded-xl p-5 h-[720px] flex-shrink-0 box-border" : "flex justify-between items-center gap-x-6 mt-5 mb-2 bg-[#131722] rounded-xl p-5"}>

          <div className="flex justify-between items-center gap-x-6 w-full">
          <div className={details ? "flex items-center gap-x-6 w-1/12 self-start z-50" : "flex items-center gap-x-6 w-1/12 z-50"}>
          <div className="flex-col flex gap-2">
            <div className="flex gap-x-2 items-center">
              <img src={pairdata?.baseImg === 'missing.png' ? '/assets/missing.png' : pairdata?.baseImg} alt={pairdata?.basename} width={800} height={800} className="size-5 rounded-full object-cover"/>
              <h1>{pairdata?.baseTokenSymbol}</h1>
            </div>
            <div className="flex items-center gap-x-1">
              <CopyClipboard address={pairdata && pairdata?.baseaddress}/>
            </div>
          </div>

          <div className="flex-col flex gap-2">
            <div className="flex gap-x-2 items-center">
              <img src={pairdata?.quoteImg === 'missing.png' ? '/assets/missing.png' : pairdata?.quoteImg} alt={pairdata?.quotename} width={800} height={800} className="size-5 rounded-full object-cover"/>
              <h1>{pairdata?.quoteTokenSymbol}</h1>
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

          <div className={details ? "flex items-center gap-x-2" : "flex ju items-center gap-x-2"}>
            <div className="flex items-center gap-x-1">
            <Link href={
              chain === 'ethereum' ? `https://etherscan.io/token/${pairdata?.baseaddress}` 
              : chain === 'binance-smart-chain' ? `https://bscscan.com/token/${pairdata?.baseaddress}` 
              : chain === 'the-open-network' ? `https://tonviewer.com/${pairdata?.baseaddress}` 
              : chain === 'solana' ? `https://solscan.io/token/${pairdata?.baseaddress}` 
              : chain === 'arbitrum' ? `https://arbiscan.io/token/${pairdata?.baseaddress}` 
              : chain === 'base' ? `https://basescan.org/token/${pairdata?.baseaddress}` 
              : ''
              } 
              target="_blank" title="Scan"><GoCodescan size={23} className="transition-all hover:scale-75"/></Link>
            </div> 
          </div>
          </div>


          {details ? 
          <div className="flex items-center w-full mt-5 gap-x-6">
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

            <div className="flex-col items-center self-start">
              <div className="flex justify-center items-center gap-x-4">

            <div className="grid grid-cols-2 gap-4 items-center p-5 rounded-lg border border-white/10 self-start text-xs">
              <div className="flex justify-center items-center p-3 border border-white/50 rounded-lg">{pairdata?.baseTokenSymbol}: <span className="font-bold ml-1 text-xl">${parseFloat(pairdata?.baseprice).toFixed(4)}</span></div>
              <div className="flex justify-center items-center p-3 border border-white/50 rounded-lg">{pairdata?.quoteTokenSymbol}: <span className="font-bold ml-1 text-xl">${parseFloat(pairdata?.quoteprice).toFixed(2)}</span></div>
              <div className="flex justify-center items-center p-3 border border-white/50 rounded-lg">M. Cap: <span className="font-bold ml-1 text-xl">{getAmount(pairdata?.cap)}</span></div>
              <div className="flex justify-center items-center p-3 border border-white/50 rounded-lg">FDV: <span className="font-bold ml-1 text-xl">{getAmount(pairdata?.fdv)}</span></div>
              <div className="flex justify-center items-center p-3 border border-white/50 rounded-lg">Reserve: <span className="font-bold ml-1 text-xl">{getAmount(pairdata?.reserve)}</span></div>
              <div className="flex justify-center items-center p-3 border border-white/50 rounded-lg">Volume (24h): <span className="font-bold ml-1 text-xl">{getAmount(pairdata?.volume_usd?.h24)}</span></div>
            </div>

            <div className="grid grid-cols-1 gap-4 items-center p-5 rounded-lg border border-white/10 self-start">
              <div className="flex justify-center items-center p-3 border border-white/50 rounded-lg gap-x-1 text-xs box-border flex-shrink-0">Trust: {tokenInfo?.tickers[0]?.trust_score === "green" ? <AiFillSafetyCertificate size={32} className="text-green-500"/> : <MdDangerous size={32} className="text-red-600"/>}</div>
              <div className="flex justify-center items-center p-3 border border-white/50 rounded-lg gap-x-1 text-xs box-border flex-shrink-0">Rank: <span className={tokenInfo?.market_cap_rank <= 300 ? "text-purple-500 text-lg font-bold" : "text-orange-500 text-lg font-bold"}>{tokenInfo?.market_cap_rank}</span></div>
              <div className="flex justify-center items-center p-3 border border-white/50 rounded-lg gap-x-1 text-xs box-border flex-shrink-0">Created: <span className="text-[8px] font-bold">{formatCreatedAt(pairdata?.created)}</span></div>
            </div>

            </div>

            <div className="flex-col items-center p-5 border border-white/10 rounded-lg mt-4">
              <div className="flex justify-between items-center w-full border p-3 rounded-lg">
                <div>Price Change</div>
                <div className="flex-col flex justify-center text-center items-center">
                    <div className="flex items-center gap-x-4 justify-center text-center py-1 px-2 w-full">
                    <div className="flex-col items-center gap-y-2 cursor-pointer">
                      <div className="text-xs">5 minute</div>
                      <div className={pairdata?.price_change_percentage?.m5.includes('-') ? "text-lg font-bold text-red-600" : pairdata?.price_change_percentage.m5 === "0" ? "text-lg font-bold" : "text-lg font-bold text-green-500"}>{pairdata?.price_change_percentage.m5}%</div>
                    </div>
                    <div className="flex-col items-center gap-y-2 cursor-pointer">
                      <div className="text-xs">1 hour</div>
                      <div className={pairdata?.price_change_percentage?.h1.includes('-') ? "text-lg font-bold text-red-600" : pairdata?.price_change_percentage.h1 === "0" ? "text-lg font-bold" : "text-lg font-bold text-green-500"}>{pairdata?.price_change_percentage.h1}%</div>
                    </div>
                    <div className="flex-col items-center gap-y-2 cursor-pointer">
                      <div className="text-xs">6 hour</div>
                      <div className={pairdata?.price_change_percentage?.h6.includes('-') ? "text-lg font-bold text-red-600" : pairdata?.price_change_percentage.h6 === "0" ? "text-lg font-bold" : "text-lg font-bold text-green-500"}>{pairdata?.price_change_percentage.h6}%</div>
                    </div>
                    <div className="flex-col items-center gap-y-2 cursor-pointer">
                      <div className="text-xs">24 hour</div>
                      <div className={pairdata?.price_change_percentage?.h24.includes('-') ? "text-lg font-bold text-red-600" : pairdata?.price_change_percentage.h24 === "0" ? "text-lg font-bold" : "text-lg font-bold text-green-500"}>{pairdata?.price_change_percentage.h24}%</div>
                    </div>
                    </div>

                </div>
              </div>
              <div className="flex justify-between items-center w-full border p-3 rounded-lg mt-4">
                <div>Volume</div>
                <div className="flex-col flex justify-center text-center items-center">
                    <div className="flex items-center gap-x-4 justify-center text-center py-1 px-2 w-full">
                    <div className="flex-col items-center gap-y-2 cursor-pointer">
                      <div className="text-xs">5 minute</div>
                      <div className="text-lg font-bold">{getAmount(pairdata?.volume_usd.m5)}</div>
                    </div>
                    <div className="flex-col items-center gap-y-2 cursor-pointer">
                      <div className="text-xs">1 hour</div>
                      <div className="text-lg font-bold">{getAmount(pairdata?.volume_usd.h1)}</div>
                    </div>
                    <div className="flex-col items-center gap-y-2 cursor-pointer">
                      <div className="text-xs">6 hour</div>
                      <div className="text-lg font-bold">{getAmount(pairdata?.volume_usd.h6)}</div>
                    </div>
                    <div className="flex-col items-center gap-y-2 cursor-pointer">
                      <div className="text-xs">24 hour</div>
                      <div className="text-lg font-bold">{getAmount(pairdata?.volume_usd.h24)}</div>
                    </div>
                    </div>
                </div>
              </div>
              <div className="flex justify-between items-center w-full border p-3 rounded-lg mt-4">
                <div className="pr-7">Transaction</div>
                <div className="flex-col flex justify-center text-center items-center">
                    <div className="flex items-center gap-x-1 justify-center text-center py-1 px-2 w-full text-xs">
                      <button className={transtime === '30' ? "border bg-zinc-900 rounded-md px-3" : "px-3 hover:border hover:bg-zinc-900 rounded-md"} type="button" onClick={() => setTransacitonTime('30')}>30 minute</button>
                      <button className={transtime === '15' ? "border bg-zinc-900 rounded-md px-3" : "px-3 hover:border hover:bg-zinc-900 rounded-md"} type="button" onClick={() => setTransacitonTime('15')}>15 minute</button>
                      <button className={transtime === '5' ? "border bg-zinc-900 rounded-md px-3" : "px-3 hover:border hover:bg-zinc-900 rounded-md"} type="button" onClick={() => setTransacitonTime('5')}>5 minute</button>
                      <button className={transtime === '1' ? "border bg-zinc-900 rounded-md px-3" : "px-3 hover:border hover:bg-zinc-900 rounded-md"} type="button" onClick={() => setTransacitonTime('1')}>1 hour</button>
                      <button className={transtime === '24' ? "border bg-zinc-900 rounded-md px-3" : "px-3 hover:border hover:bg-zinc-900 rounded-md"} type="button" onClick={() => setTransacitonTime('24')}>24 hour</button>
                    </div>
                    <div className="flex-col flex text-xs justify-center items-center w-full">
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


      <Script
      src="/static/datafeeds/udf/dist/bundle.js"
      strategy="lazyOnload"
      onReady={() => {
        setIsScriptReady(true);
      }}
      />
      {isScriptReady &&
      //@ts-ignore
      <TVChartContainer poolAddress={pooladdress} {...defaultWidgetProps}/>
      }

      </div>

      <div className="flex-col flex items-center w-full gap-y-2 mt-7">
      {details ? 
      <div className="flex-col items-center w-full bg-[#131722] rounded-xl h-[720px] relative flex-shrink-0 box-border">
        <AuroBanner/>
        {/* <ImageColorPalette imageUrl={tokenInfo?.image?.large === 'missing.png' ? '/assets/missing.png' : tokenInfo?.image?.large} /> */}
        <div className="flex justify-center items-center w-full absolute z-50 -translate-y-8">
          <img
          src={tokenInfo?.image?.large === 'missing.png' ? '/assets/missing.png' : tokenInfo?.image?.large}
          alt="Token Logo"
          width={800}
          height={800}
          className="object-cover rounded-full size-16"
          />
        </div>
        <div className="flex-col items-center w-full px-7 py-5 mt-5">
          <div className="flex-col items-center w-full">
          <h1 className="flex items-center w-full text-xl font-bold">{tokenInfo?.name}</h1>
          <div className="flex items-center gap-x-2 mt-2">
          <p className="font-light text-white/50">{tokenInfo?.symbol.toUpperCase()}</p>
          <CopyClipboard address={tokenInfo && tokenInfo?.contract_address}/>
          </div>
          <div className="flex items-center w-full mt-5 ">
          <p className="flex-wrap whitespace-pre-wrap w-full max-h-36 h-auto antialiased overflow-y-auto rounded-lg text-sm text-white/70">{tokenInfo?.description?.en}</p>
          </div>
          <h1 className="flex items-center w-full mt-3">Website Links</h1>
          <div className="grid grid-cols-3 gap-1 justify-center items-center mt-3">
            {tokenInfo?.links?.homepage[0] && <Link href={tokenInfo?.links?.homepage[0]} className="truncate rounded-md bg-brandblack hover:bg-zinc-800 p-1 text-sm flex mx-1 items-center gap-x-1"><BiWorld />{tokenInfo?.links?.homepage[0]?.slice(0,20)}</Link>}
            {tokenInfo?.links?.blockchain_site[0] && <Link href={tokenInfo?.links?.blockchain_site[0]} className="truncate rounded-md bg-brandblack hover:bg-zinc-800 p-1 text-sm flex mx-1 items-center gap-x-1"><BiWorld />{tokenInfo?.links?.blockchain_site[0]?.slice(0,20)}</Link>}
            {tokenInfo?.links?.blockchain_site[1] && <Link href={tokenInfo?.links?.blockchain_site[1]} className="truncate rounded-md bg-brandblack hover:bg-zinc-800 p-1 text-sm flex mx-1 items-center gap-x-1"><BiWorld />{tokenInfo?.links?.blockchain_site[1]?.slice(0,20)}</Link>}
            {tokenInfo?.links?.blockchain_site[2] && <Link href={tokenInfo?.links?.blockchain_site[2]} className="truncate rounded-md bg-brandblack hover:bg-zinc-800 p-1 text-sm flex mx-1 items-center gap-x-1"><BiWorld />{tokenInfo?.links?.blockchain_site[2]?.slice(0,20)}</Link>}
            {tokenInfo?.links?.whitepaper && <Link href={tokenInfo?.links?.whitepaper} className="truncate rounded-md bg-brandblack hover:bg-zinc-800 p-1 text-sm flex mx-1 items-center gap-x-1"><BiWorld />{tokenInfo?.links?.whitepaper?.slice(0,20)}</Link>}
          </div>
          <h1 className="flex items-center w-full mt-3">Social Media</h1>
          <div className="flex items-center w-full mt-3 gap-x-2">
            {tokenInfo?.links?.facebook_username && <Link href={`https://facebook.com/${tokenInfo?.links?.facebook_username}`}><FaFacebook size={18} className="hover:opacity-15 transition-all"/></Link>}
            {tokenInfo?.links?.telegram_channel_identifier && <Link href={`https://t.me/${tokenInfo?.links?.telegram_channel_identifier}`}><FaTelegram size={18} className="hover:opacity-15 transition-all"/></Link>}
            {tokenInfo?.links?.twitter_screen_name && <Link href={`https://twitter.com/${tokenInfo?.links?.twitter_screen_name}`}><FaTwitter size={18} className="hover:opacity-15 transition-all"/></Link>}
            {tokenInfo?.links?.subreddit_url && <Link href={tokenInfo?.links?.subreddit_url}><FaReddit size={18} className="hover:opacity-15 transition-all"/></Link>}
          </div>
          <div className="flex justify-center items-center w-full mt-3">
            <button onClick={() => setEditDetailsModal(true)} className="px-7 py-1 border border-slate-600/30 bg-slate-600/20 rounded-lg text-white/50 hover:border-slate-500 hover:bg-slate-600 hover:text-slate-200 transition-all">Edit Details</button>
          </div>
          </div>
        </div>
      </div> : null}
      <div className={details ? "flex justify-center items-center w-full h-[610px] overflow-hidden rounded-xl" : "flex justify-center items-center w-full h-[610px]"}>
      {chain === 'solana' ?
      <>
      <div id="integrated-terminal" className="border border-white/10 m-[0 auto] block rounded-xl max-w-[600px] min-w-[300px]"></div>
      </>
      : 
      <iframe
      src={urluni}
      height="660px"
      width="100%"
      scrolling="no"
      className="border-none m-[0 auto] block rounded-xl max-w-[600px] min-w-[300px] overflow-hidden"
      />
      }
      </div>
      </div>

      </div>

      <div className="flex-col items-center w-full rounded-xl p-5 bg-[#131722] mt-2">
        <h1 className="flex items-center w-full text-white/50">Past 24 Hour Trades</h1>
        <div className="flex items-center w-full gap-x-2">
        <DataTable loadingtrader={loadingtrader} columns={columns} data={traderData} />
        <div className="w-3/6 border border-white/10 rounded-xl px-3 py-5 h-[520px] flex-col justify-center items-center relative">
          <p className="flex justify-center items-center w-full text-white/50">Comments</p>
          {isConnected ? 
          <>
          <div className="flex-col items-center rounded-lg h-[calc(100%-77px)] overflow-y-auto p-3 w-full space-y-2">
            {commentData.map((item:any,index:any) => {
              return (
                <>
                <div key={index} className="flex-col w-full items-center border border-slate-500 bg-slate-800 rounded-lg px-3 py-2 relative">
                {item.authorWallet === address ? <AiOutlineCloseCircle className="absolute right-3 hover:text-red-500 cursor-pointer" onClick={() => handleDeleteComment(item.id)}/> : null}
                <CopyClipboard address={item.authorWallet}/>
                <span className="text-sm whitespace-pre-wrap flex-wrap max-h-30">
                {item.comment}
                </span>
                <div className="flex justify-end items-center w-full self-end text-xs"><TimeAgo timestamp={item.createdAt}/></div>
                </div>
                </>
              )
            })}
          </div>
          <div className="absolute bottom-2 w-full left-0 outline-none h-16 flex items-center gap-x-2 p-3">
            <div className="flex justify-center items-center gap-x-2 border border-white/10 rounded-lg">
            <Input
            type="text"
            id="name"
            label="Comment"
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
            onKeyDown={(e:any) => {
              if (e.key === 'Enter') {
                handleComment()
              }
            }}
            />
            {commentLoading ? <AiOutlineLoading3Quarters size={23} className="animate-spin mr-3"/> : <button type="button" onClick={() => handleComment()} className="mr-3 hover:scale-75 hover:opacity-50 transition-all"><IoSend size={23}/></button>}
            </div>
          </div>
          </>  
          :
          <div className="flex-col flex justify-center items-center w-full h-full">
            <h1 className="text-2xl font-semibold text-white/80">Wallet Not Connected</h1>
            <span className="text-sm text-white/30">Please connect a wallet to comment.</span>
            <button type="button" onClick={() => open()} className="my-3 border border-white/50 rounded-lg px-7 py-2 hover:text-white/20 hover:border-white/20">Connect Wallet</button>
          </div>
          }
        </div>
        </div>
      </div>

    </main>
  );
}
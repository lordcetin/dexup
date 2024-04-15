/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { IoIosArrowDown } from "react-icons/io";
import React, { useEffect, useLayoutEffect, useRef, useState,memo} from "react";
import {Contract, ethers, formatEther, formatUnits, parseUnits} from 'ethers'
import axios from "axios";
import { useSearchParams } from 'next/navigation'
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
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
import { FaCircleCheck } from "react-icons/fa6";



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

const Swap = () => {
  const [isScriptReady, setIsScriptReady] = useState(false);

  const {isWallet,setIsWallet} = useAppContext();
  const container = useRef<any>(null);
  let tvScriptLoadingPromise: Promise<void>;
  const onLoadScriptRef = useRef<(() => void) | null>(null);

  const [paid,setPaid] = useState<any>(10);
  const [received,setReceived] = useState<any>(0);
  const [CHAINID,setCHAINID] = useState<any>();
  const [switchtoken,setSwitch] = useState<boolean>(false);
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
  // const [basecoinId,setBaseCoinId] = useState("");
  // const [quotecoinId,setQuoteCoinId] = useState("");
  const [solanaAddress,setSolanaAddress] = useState("");
  const [realamount,setRealAmout] = useState<any>("");
  const [baseNetID,setBaseNetId] = useState<any>("");
  const [quoteNetID,setQuoteNetId] = useState<any>("");
  const [calldata,setCallData] = useState<any>([]);
  const [goplusecure,setGoPlus] = useState<any>([]);
  const [approveData,setApproveData] = useState<any>([]);
  const [traderData,setTraderData] = useState<any>([]);
  const [baseDecimal,setBaseDecimal] = useState<any>();
  const [toDecimal,setToDecimal] = useState<any>();
  const [fromDecimal,setFromDecimal] = useState<any>();
  const [geckoId,setGeckoId] = useState("");
  const [slippage,setSlippage] = useState<any>(0.5);
  const [estimateGasFee,setEstimateGasFee] = useState<any>("");

  const [dexAddress,setDexTokenApproveAddress] = useState<Address>();
  const [pairdata,setPairData] = useState<any>([]);
  const [alltoken,setDataALLTOKEN] = useState<any>([]);
  const [paidloading,setPaidLoading] = useState(false);
  const [settings,setSettings] = useState(false);
  const [receiveloading,setReceiveLoading] = useState(false);
  const {address,isConnected,chainId} = useAccount();
  const { open,close } = useWeb3Modal()
  const { writeContractAsync } = useWriteContract()

  const searchParams = useSearchParams() as any
  const chain = searchParams.get('chain')
  const pooladdress = searchParams.get('pair')
  const { switchChain,isSuccess,isPending } = useSwitchChain()
  const [pubKey, setPubKey] = useState(null);
  const web3 = useWeb3js({chainId:chainId})

  const { 
    setBaseCoinId,
    setBTokenSymbol,
    setQTokenSymbol,
    setChain 
  } = useAppContext()
  
  const defaultWidgetProps:any= {
    symbol: `${baseSymbol && baseSymbol.toUpperCase()}/${quoteSymbol && quoteSymbol.toUpperCase()}`,
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
    supports_group_request: false,
    supports_marks: false,
    supports_search: false,
    supports_timescale_marks: false,
  };
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

    const getPair = async () => {
      fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks`,{
        method:'GET',
        headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
      }).then((net:any) => net.json()).then((net:any) => {
        const network = net.data.filter((item:any) => item.attributes.coingecko_asset_platform_id === chain)
        const chaId = network[0]?.id
        const coingecko_asset_platform_id = network[0]?.attributes?.coingecko_asset_platform_id
        if(coingecko_asset_platform_id === null) return

        setGeckoId(coingecko_asset_platform_id)

      fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chain === 'arbitrum' ? 'arbitrum' : chain === 'the-open-network' ? 'ton' : chaId}/pools/${pooladdress}?include=base_token%2C%20quote_token%2C%20dex`,{
        method:'GET',
        headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
        cache:'no-store',
      }).then((response:any) => response.json()).then(async (response:any) => {
            const baseId = response.data.relationships.base_token.data.id
            const quoteId = response.data.relationships.quote_token.data.id
            const baseNetId = baseId.split("_")[0];
            const quoteNetId = quoteId.split("_")[0];
            let baseImg = response.included.find((i:any)=> i.id  == baseId).attributes.image_url;
            let quoteImg = response.included.find((i:any)=> i.id  == quoteId).attributes.image_url;
            const baseTokenSymbol = response.included.find((i:any)=> i.id  == baseId).attributes.symbol;
            const quoteTokenSymbol = response.included.find((i:any)=> i.id  == quoteId).attributes.symbol;
            const basecoinId = response.included.find((i:any)=> i.id  == baseId).attributes.coingecko_coin_id;
            const quotecoinId = response.included.find((i:any)=> i.id  == quoteId).attributes.coingecko_coin_id;
            const basename = response.included.find((i:any)=> i.id  == baseId).attributes.name;
            const quotename = response.included.find((i:any)=> i.id  == quoteId).attributes.name;
            const baseaddress = response.included.find((i:any)=> i.id  == baseId).attributes.address;
            const quoteaddress = response.included.find((i:any)=> i.id  == quoteId).attributes.address;

            const newPair:any = {
              id: response.data.id,
              name:response.data.attributes.name,
              baseImg,
              quoteImg,
              pooladdress:response.data.attributes.address,
              basename,
              quotename,
              baseTokenSymbol,
              quoteTokenSymbol,
              baseaddress,
              quoteaddress,
              basecoinId,
              quotecoinId,
              created:response.data.attributes.pool_created_at,
              baseprice:response.data.attributes.base_token_price_usd,
              quoteprice:response.data.attributes.quote_token_price_usd,
              fdv:response.data.attributes.fdv_usd,
              cap:response.data.attributes.market_cap_usd,
              price_change_percentage:response.data.attributes.price_change_percentage,
              transactions:response.data.attributes.transactions,
              volume_usd:response.data.attributes.volume_usd,
              reserve:response.data.attributes.reserve_in_usd,
              dex:response.data.relationships.dex.data.id,
            }
            
            const res = await fetch(`https://api.gopluslabs.io/api/v1/token_security/${chainId}?contract_addresses=${baseaddress}`)
            const data = await res.json();
          setGoPlus(data.result[`${baseaddress}`])
          setBaseCoinId(basecoinId)
          // setQuoteCoinId(quotecoinId)
          setPairData(newPair)
          setBaseSymbol(baseTokenSymbol)
          setQuoteSymbol(quoteTokenSymbol)
          setBTokenSymbol(baseTokenSymbol)
          setQTokenSymbol(quoteTokenSymbol)
          setChain(chain)
          setBaseAddress(baseaddress)
          setQuoteAddress(quoteaddress)
          setBaseNetId(baseNetId)
          setQuoteNetId(baseNetId)


          // const chains = await axios.get(`/api/network?chainname=${coingecko_asset_platform_id === 'binance-smart-chain' ? 'bsc' : coingecko_asset_platform_id}`)
          // const chaindata = chains.data
          // const chainID = chaindata?.chain_identifier

          // const dec = await axios.get(`/api/decimals?baseNetId=${switchtoken === false ? baseNetId : quoteNetId}&baseaddress=${switchtoken === false ? baseaddress : quoteaddress}`)
          // const datas = dec.data.data[0]
          // const decimal = datas.attributes.decimals
          // setBaseDecimal(decimal)

          // const amount = generateDecimal(switchtoken === false ? paid : received, decimal)
          // // const res = await axios.get(`/api/quote?fromTokenAddress=${switchtoken === false ? baseaddress : quoteaddress}&toTokenAddress=${switchtoken === false ? quoteaddress : baseaddress}&amount=${amount}&chainId=${chaId === 'solana' ? 501 : chainID}`)
          // const res = await axios.get(`/api/getPri?amount=${paid}&chainId=${chainID}&toTokenAddress=${quoteaddress}&fromTokenAddress=${baseaddress}&slippage=${slippage}`)
          // // const data = res.data.data[0]
          // const data = res.data.data
          // const paidAmount = data?.singleChainSwapInfo?.receiveAmount
          // const formattedNumber = Number(paidAmount).toLocaleString('en-US', { maximumFractionDigits: decimal })

          if(chain === 'ethereum'){
            setUniUrl(`https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=${baseaddress}&outputCurrency=${quoteaddress}`)
          }else if(chain === 'binance-smart-chain'){
            setUniUrl(`https://pancakeswap.finance/swap?outputCurrency=${baseaddress}&chainId=56`)
            // setUniUrl(`https://kyberswap.com/partner-swap?chainId=56&inputCurrency=${baseaddress}&outputCurrency=${quoteaddress}&clientId=dexup&feeReceiver=0xEb218F28ACEea78E20910286b1Acfef917A270Ab&enableTip=true&chargeFeeBy=currency_out&feeAmount=30`)
          }else if(chain === 'arbitrum'){
            setUniUrl(`https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=${baseaddress}&outputCurrency=${quoteaddress}`)
          }else if(chain === 'the-open-network'){
            //change the referal address
            setUniUrl(`https://app.ston.fi/swap?referral_address=UQCthC8ICK7K8Hkfm9smblLFroKrYrEMwZuoD4Nbm5LswUnc&chartVisible=false&ft=${quoteTokenSymbol.toUpperCase()}&tt=${baseTokenSymbol.toUpperCase()}`)
          }else if(chain === 'base'){
            setUniUrl(`https://aerodrome.finance/swap?from=${baseaddress}&to=${quoteaddress}`)
          }

          // if(res.data.msg){
          //   console.log(res.data.msg)
          // }
          // const fromTokenPrice = data?.commonDexInfo?.fromTokenPrice

          // const baseUnitPrice = parseFloat(fromTokenPrice);
          // // let baseAmount:any = formatEther(data?.fromTokenAmount.toString());
          // setRealAmout(amount)

          // let quoteAmount:any = formatEther(data?.toTokenAmount.toString());
          // const formattedBase = new Intl.NumberFormat("en-US",{
          //   style:"currency",
          //   currency: "USD",
          //   // notation: 'compact',
          //   // compactDisplay: 'short'
          // }).format(baseUnitPrice)

          // setFromBase(formattedBase)
          // // setToQuote(formattedQuote)
          // setReceived(formattedNumber)
        
      })
    })
    }
    getPair()

  }, []);

  useEffect(() => {
    (window as any)?.Jupiter?.init({
      displayMode: "integrated",
      integratedTargetId: "integrated-terminal",
      endpoint: "https://api.mainnet-beta.solana.com",
      platformFeeAndAccounts: TEST_PLATFORM_FEE_AND_ACCOUNTS,
      formProps:{
        fixedOutputMint: true,
        initialAmount: '10000000',
        initialInputMint:baseAddress ? baseAddress : null,
        initalOutputMint: quoteAddress ? quoteAddress : null,
      }
    })

  }, []);

useEffect(() => {
  const fetchTraders = async () => {
    setloadingtrader(true)
    try {
    const res = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chain === 'arbitrum' ? 'arbitrum' : chain === 'the-open-network' ? 'ton' : chain  === 'ethereum' ? 'eth' : chain === 'binance-smart-chain' ? 'bsc' : chain === 'solana' ? 'solana' : chain}/pools/${pooladdress}/trades`,{
      method:'GET',
      headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
      cache:'no-store',
    }).then((res:any) => res.json()).then((data:any) => {

      const tradedata = data.data.map((item:any) => {

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
    setloadingtrader(false)
  } catch (error) {
      console.log("ERROR",error)
      setloadingtrader(false)
  }
  }
    fetchTraders()
},[])

useEffect(() => {
  const getGoPlusSec = async () => {

  }
  getGoPlusSec()
},[])


console.log("goplusecure",goplusecure)

  return (
    <main className="flex-col items-center w-full mt-7 gap-x-6">

      <div className="flex gap-x-2 items-center">
      <div className="flex-col items-center">


        <div className={details ? "flex-col items-center gap-x-6 mt-5 mb-2 bg-[#131722] rounded-xl p-5 h-[610px]" : "flex justify-between items-center gap-x-6 mt-5 mb-2 bg-[#131722] rounded-xl p-5"}>

          <div className="flex justify-between items-center gap-x-6 w-full">
          <div className={details ? "flex items-center gap-x-6 w-1/12 self-start" : "flex items-center gap-x-6 w-1/12"}>
          <div className="flex-col flex gap-2">
            <div className="flex gap-x-2 items-center">
              <img src={pairdata?.baseImg === 'missing.png' ? '/assets/missing.png' : pairdata?.baseImg} alt={pairdata?.basename} width={800} height={800} className="size-5 rounded-full object-cover"/>
              <h1>{pairdata?.baseTokenSymbol}</h1>
            </div>
            <div className="flex items-center gap-x-1">
              <p className="text-xs">{pairdata && pairdata?.baseaddress?.slice(0,5) + '...' + pairdata?.baseaddress?.slice(38)}</p>
              <CopyToClipboard text={pairdata?.baseaddress} onCopy={() => setCopied(true)}><button type="button" className="outline-none"><MdContentCopy className='transition-all hover:scale-75'/></button></CopyToClipboard>
            </div>
          </div>

          <div className="flex-col flex gap-2">
            <div className="flex gap-x-2 items-center">
              <img src={pairdata?.quoteImg === 'missing.png' ? '/assets/missing.png' : pairdata?.quoteImg} alt={pairdata?.quotename} width={800} height={800} className="size-5 rounded-full object-cover"/>
              <h1>{pairdata?.quoteTokenSymbol}</h1>
            </div>
            <div className="flex items-center gap-x-1">
            <p className="text-xs">{pairdata && pairdata?.quoteaddress?.slice(0,5) + '...' + pairdata?.quoteaddress?.slice(38)}</p>
            <CopyToClipboard text={pairdata?.baseaddress} onCopy={() => setCopied(true)}><button type="button" className="outline-none"><MdContentCopy className='transition-all hover:scale-75'/></button></CopyToClipboard>
            </div>
          </div>
          </div>

          <div className={details ? "flex justify-center items-center w-full self-start" : "flex justify-center items-center w-full"}>
            <div onClick={() => setOpenDetails(!details)} className="flex items-center gap-x-1 outline-none border border-white/10 rounded-lg px-3 py-2 text-white/50 hover:text-white hover:border-white transition-all cursor-pointer">
              <h1>Details</h1>
              <IoChevronDown size={23}/>
            </div>
          </div>

          <div className={details ? "flex items-center gap-x-2" : "flex ju items-center gap-x-2"}>
            <div className="flex items-center gap-x-1">
            <Link href={
              chain === 'ethereum' ? `https://etherscan.io/token/${baseAddress}` 
              : chain === 'binance-smart-chain' ? `https://bscscan.com/token/${baseAddress}` 
              : chain === 'the-open-network' ? `https://tonviewer.com/${baseAddress}` 
              : chain === 'solana' ? `https://solscan.io/token/${baseAddress}` 
              : chain === 'arbitrum' ? `https://arbiscan.io/token/${baseAddress}` 
              : chain === 'base' ? `https://basescan.org/token/${baseAddress}` 
              : ''
              } 
              target="_blank" title="Scan"><GoCodescan size={23} className="transition-all hover:scale-75"/></Link>
            </div> 
          </div>
          </div>


          {details ? 
          <div className="flex items-center w-full mt-5">
            <div className="flex-col items-center p-5 rounded-lg border border-white/10">
              <Image src='https://files.readme.io/3fb6486-small-image.png' alt="Go Plus Logo" width={800} height={800} className="object-cover w-20" />
              <div className="grid grid-cols-2 gap-x-4 items-center mt-5 text-xs">
                <div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Anti Whale Modifiable</p><p>{goplusecure.anti_whale_modifiable}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Buy Tax</p><p>{goplusecure.buy_tax}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Can Take Back Ownership</p><p>{goplusecure.can_take_back_ownership}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Cannot Buy</p><p>{goplusecure.cannot_buy}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Cannot Sell All</p><p>{goplusecure.cannot_sell_all}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Creator Address</p><p>{goplusecure.creator_address?.slice(0,5) + '...' + goplusecure.creator_address?.slice(38)}</p><CopyToClipboard text={goplusecure.creator_address} onCopy={() => setCopied(true)}><button type="button" className="outline-none"><MdContentCopy className='transition-all hover:scale-75'/></button></CopyToClipboard></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Creator Balance</p><p>{goplusecure.creator_balance}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Creator Percent</p><p>{goplusecure.creator_percent}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">External Call</p><p>{goplusecure.external_call}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Hidden Owner</p><p>{goplusecure.hidden_owner}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Holder Count</p><p>{goplusecure.holder_count}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Is Anti Whale</p><p>{goplusecure.is_anti_whale}</p></div>
                </div>
                <div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Is Blacklisted</p><p>{goplusecure.is_blacklisted}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Is Honeypot</p><p>{goplusecure.is_honeypot}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Is in Dex</p><p>{goplusecure.is_in_dex}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Is Mintable</p><p>{goplusecure.is_mintable}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Is Proxy</p><p>{goplusecure.is_proxy}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Is Whitelisted</p><p>{goplusecure.is_whitelisted}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Lp Holder_count</p><p>{goplusecure.lp_holder_count}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Lp Total Supply</p><p>{parseFloat(goplusecure.lp_total_supply)}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Owner Address</p><p>{goplusecure.owner_address}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Total Supply</p><p>{goplusecure.total_supply}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Trading Cooldown</p><p>{goplusecure.trading_cooldown}</p></div>
                  <div className="flex items-center gap-x-1"><p className="text-white/50">Transfer Pausable</p><p>{goplusecure.transfer_pausable}</p></div>
                </div>
              </div>
            </div>
            <div></div>

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

      <div className="flex-col items-center w-full rounded-xl p-5 bg-[#131722] mt-2">
        <h1 className="flex items-center w-full text-white/50">Past 24 Hour Trades</h1>
        <div className="flex items-center w-full gap-x-2">
        <DataTable loadingtrader={loadingtrader} columns={columns} data={traderData} />
        <div className="w-3/6 border border-white/10 rounded-xl p-5 h-[520px] flex-col justify-center items-center">
          <p className="flex justify-center items-center w-full text-white/50">Comments</p>
        </div>
        </div>
      </div>

    </main>
  );
}

export default Swap;
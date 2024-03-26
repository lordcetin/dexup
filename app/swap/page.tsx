/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { IoIosArrowDown } from "react-icons/io";
import React, { useEffect, useLayoutEffect, useRef, useState,memo} from "react";
import {ethers, formatEther, formatUnits, parseUnits} from 'ethers'
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
} from "wagmi";
import { erc20Abi, type Address } from "viem";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";
import { createChart,CrosshairMode,LineStyle} from 'lightweight-charts';
import Chart from '@/components/Chart/page'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {isEmpty} from 'lodash';
import { abi } from "@/lib/abi";
import { MAX_ALLOWANCE } from "@/lib/constants";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useAppContext } from "@/context/AppContext";
import dynamic from "next/dynamic";
import Script from "next/script";
import { ChartingLibraryWidgetOptions,ResolutionString, } from "@/public/static/charting_library/charting_library";
import Datafeeds from '@/public/static/datafeeds/udf'
import { IoMdSettings } from "react-icons/io";

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
  const query = new URLSearchParams((window as any)?.location?.search);

  useEffect(() => {
    if(query.get('chain') === 'solana'){
      setIsWallet(true)
    }else{
      setIsWallet(false)
    }
  },[query])
  // connection context object that is injected into the browser by the wallet
  const { connection } = useConnection();
  // user's public key of the wallet they connected to our application
  const { publicKey } = useWallet();
  // const provider = (window as any).phantom?.solana;

  const [paid,setPaid] = useState<any>(10);
  const [received,setReceived] = useState<any>(0);
  const [CHAINID,setCHAINID] = useState<any>();
  const [switchtoken,setSwitch] = useState<boolean>(false);
  const [frombase,setFromBase] = useState<any>(null);
  const [toquote,setToQuote] = useState<any>(null);
  const [baseSymbol,setBaseSymbol] = useState<any>("");
  const [uniswap,setUniswap] = useState<boolean>(false);
  const [urluni,setUniUrl] = useState<any>("");
  const [quoteSymbol,setQuoteSymbol] = useState<any>("");
  const [quoteData,setQuteData] = useState("");
  const [baseAddress,setBaseAddress] = useState("");
  const [quoteAddress,setQuoteAddress] = useState("");
  const [solanaAddress,setSolanaAddress] = useState("");
  const [realamount,setRealAmout] = useState<any>("");
  const [baseNetID,setBaseNetId] = useState<any>("");
  const [quoteNetID,setQuoteNetId] = useState<any>("");
  const [baseDecimal,setBaseDecimal] = useState<any>();
  const [geckoId,setGeckoId] = useState("");
  const [slippage,setSlippage] = useState<any>(0.5);
  const [dexAddress,setDexTokenApproveAddress] = useState<Address>();
  const [pairdata,setPairData] = useState<any>([]);
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

  const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
    symbol: `${baseSymbol}USDT`,
    width:980,
    height:300,
    interval: "1D" as ResolutionString,
    library_path: "/static/charting_library/",
    locale: "en",
    theme: 'dark',
    charts_storage_url: "https://saveload.tradingview.com",
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    container: 'tv_chart_container',
    user_id: "public_user_id",
    fullscreen: true,
    autosize: true,

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
        setGeckoId(coingecko_asset_platform_id)

      fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chaId}/pools/${pooladdress}?include=base_token%2C%20quote_token%2C%20dex`,{
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
            
          setPairData(newPair)
          setBaseSymbol(baseTokenSymbol)
          setQuoteSymbol(quoteTokenSymbol)
          setBaseAddress(baseaddress)
          setQuoteAddress(quoteaddress)
          setBaseNetId(baseNetId)
          setQuoteNetId(baseNetId)


          const chain = await axios.get(`/api/network?chainname=${coingecko_asset_platform_id === 'binance-smart-chain' ? 'bsc' : coingecko_asset_platform_id}`)
          const chaindata = chain.data
          const chainID = chaindata?.chain_identifier


          // setUniUrl(`https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=${baseaddress}&outputCurrency=${quoteaddress}`)
          setUniUrl(`https://raydium.io/swap?outputCurrency=${switchtoken === false ? baseAddress : quoteAddress}`)
          // setUniUrl(`https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=${baseaddress}&amount=1000000&slippageBps=1`)

          const dec = await axios.get(`/api/decimals?baseNetId=${switchtoken === false ? baseNetId : quoteNetId}&baseaddress=${switchtoken === false ? baseaddress : quoteaddress}`)
          const datas = dec.data.data[0]
          const decimal = datas.attributes.decimals
          setBaseDecimal(decimal)

          const amount = generateDecimal(switchtoken === false ? paid : received, decimal)
          // const res = await axios.get(`/api/quote?fromTokenAddress=${switchtoken === false ? baseaddress : quoteaddress}&toTokenAddress=${switchtoken === false ? quoteaddress : baseaddress}&amount=${amount}&chainId=${chaId === 'solana' ? 501 : chainID}`)
          const res = await axios.get(`/api/getPri?amount=${paid}&chainId=${chainID}&toTokenAddress=${quoteaddress}&fromTokenAddress=${baseaddress}&slippage=${slippage}`)
          // const data = res.data.data[0]
          const data = res.data.data
          const paidAmount = data.singleChainSwapInfo.receiveAmount
          const formattedNumber = Number(paidAmount).toLocaleString('en-US', { maximumFractionDigits: decimal })

          if(res.data.msg){
            console.log(res.data.msg)
          }
          const fromTokenPrice = data.commonDexInfo.fromTokenPrice

          const baseUnitPrice = parseFloat(fromTokenPrice);
          // let baseAmount:any = formatEther(data?.fromTokenAmount.toString());
          setRealAmout(paidAmount as any)

          // let quoteAmount:any = formatEther(data?.toTokenAmount.toString());
          const formattedBase = new Intl.NumberFormat("en-US",{
            style:"currency",
            currency: "USD",
            // notation: 'compact',
            // compactDisplay: 'short'
          }).format(baseUnitPrice)
          // const price = baseAmount / quoteAmount;
          // const formattedQuote = new Intl.NumberFormat("en-US",{
          //   style:"currency",
          //   currency: "USD",
          //   notation: 'compact',
          //   compactDisplay: 'short'
          // }).format(price)
    
          
          setFromBase(formattedBase)
          // setToQuote(formattedQuote)
          setReceived(formattedNumber)
        
      })
    })
    }
    getPair()

  }, [switchtoken]);
  
  // useEffect(() => {
  //   handleAllowance()
  // },[])

  const handleSwap = async () => {
    handleAllowance()
  }

  const handleAllowance = async () => {

    
    const chains = await axios.get(`/api/network?chainname=${geckoId}`)
    const chaindata = chains.data
    const chainID = chaindata?.chain_identifier
    // const data = await writeContractAsync({
    //   chainId:chainId,
    //   address:baseAddress as any,
    //   functionName: 'allowance',
    //   abi:abi,
    //   args:[address,baseAddress]
    // })

    // console.log("DATA",data)
    const amount = generateDecimal(paid,baseDecimal)
    const approve = await axios.get(`/api/approve?chainId=${chain === 'solana' ? 501 : chainID}&tokenContractAddress=${baseAddress}&approveAmount=${amount}`)
    const datasapprove = approve.data.data[0]
    const {data,dexContractAddress,gasLimit,gasPrice} = datasapprove
    setDexTokenApproveAddress(dexContractAddress)
    // const {  } = await writeContractAsync({
    //   chainId:chainId,
    //   address:dexContractAddress as any,
    //   functionName: 'approve',
    //   abi:abi,
    //   args:[address,dexContractAddress]
    // })
      const result = await useReadContract({
        address: dexContractAddress,
        abi: abi,
        functionName: "allowance",
        args: [address, dexContractAddress],
      }as any)
      console.log("RESULT DATA",result)

      const { config }:any = await usePrepareTransactionRequest({
        address: dexContractAddress,
        abi: abi,
        functionName: "approve",
        args: [dexAddress, MAX_ALLOWANCE],
      }as any);

    console.log("APPROVE DATA",config)

  }
  // const result = useReadContract({
  //   address: dexAddress,
  //   abi: abi,
  //   functionName: "allowance",
  //   args: [address, dexAddress],
  // }as any)

  // const { config }:any = usePrepareTransactionRequest({
  //   address: dexAddress,
  //   abi: abi,
  //   functionName: "approve",
  //   args: [dexAddress, MAX_ALLOWANCE],
  // }as any);

  // const writedatas = useWriteContract(config);

  const handleChangePaid = async (paids:any) => {
    setPaid(paids)
    const chains = await axios.get(`/api/network?chainname=${geckoId === 'binance-smart-chain' ? 'bsc' : geckoId}`)
    const chaindata = chains.data
    const chainID = chaindata?.chain_identifier
    const dec = await axios.get(`/api/decimals?baseNetId=${switchtoken === false ? baseNetID : quoteNetID}&baseaddress=${switchtoken === false ? baseAddress : quoteAddress}`)
    const datas = dec.data.data[0]
    const decimal = datas.attributes.decimals
    if(!isEmpty(paids)){
    setPaidLoading(true)
    const amount = generateDecimal(paids,decimal)
    setRealAmout(amount)
    // const res = await axios.get(`/api/quote?fromTokenAddress=${switchtoken === false ? baseAddress : quoteAddress}&toTokenAddress=${switchtoken === false ? quoteAddress : baseAddress}&amount=${amount}&chainId=${chainID}`)
    const res = await axios.get(`/api/getPri?amount=${paids}&chainId=${chainID}&toTokenAddress=${switchtoken === false ? quoteAddress : baseAddress}&fromTokenAddress=${switchtoken === false ? baseAddress : quoteAddress}&slippage=${slippage}`)
    if (res.data?.msg) {
      setPaidLoading(false)
    };
    // const data = res.data.data[0]
    const data = res.data.data
    console.log("paidata",data)
    const paidAmount = data.singleChainSwapInfo.receiveAmount
    const fromTokenPrice = data.commonDexInfo.fromTokenPrice
    const formattedBase = new Intl.NumberFormat("en-US",{
      style:"currency",
      currency: "USD",
      // notation: 'compact',
      // compactDisplay: 'short'
    }).format(fromTokenPrice)
    setFromBase(formattedBase)
    // const baseAmount = formatEther(data?.toTokenAmount.toString());
    const formattedNumber = Number(paidAmount).toLocaleString('en-US', { maximumFractionDigits: decimal })
    setReceived(formattedNumber)
    setPaidLoading(false)
    }
  }

  const handleChangeReceive = async (receive:any) => {
    setReceived(receive)
    const chains = await axios.get(`/api/network?chainname=${geckoId === 'binance-smart-chain' ? 'bsc' : geckoId}`)
    const chaindata = chains.data
    const chainID = chaindata?.chain_identifier
    const dec = await axios.get(`/api/decimals?baseNetId=${switchtoken === false ? baseNetID : quoteNetID}&baseaddress=${switchtoken === false ? baseAddress : quoteAddress}`)
    const datas = dec.data.data[0]
    const decimal = datas.attributes.decimals
    if(!isEmpty(receive)){
    setReceiveLoading(true)
    // const amount = generateDecimal(receive,decimal)
    setRealAmout(receive)
    
    // const res = await axios.get(`/api/quote?fromTokenAddress=${switchtoken === false ? quoteAddress : baseAddress}&toTokenAddress=${switchtoken === false ? baseAddress : quoteAddress}&amount=${receive}&chainId=${chainID}`)
    const res = await axios.get(`/api/getPri?amount=${receive}&chainId=${chainID}&toTokenAddress=${switchtoken === false ? quoteAddress : baseAddress}&fromTokenAddress=${switchtoken === false ? baseAddress : quoteAddress}&slippage=${slippage}`)


    if (res.data?.msg) {
      setReceiveLoading(false)
    };
    // const data = res.data.data[0]
    const data = res.data.data
    console.log("data",data)
    const receiveAmount = data.singleChainSwapInfo.receiveAmount
    const fromTokenPrice = data.commonDexInfo.fromTokenPrice
    const formattedBase = new Intl.NumberFormat("en-US",{
      style:"currency",
      currency: "USD",
      notation: 'compact',
      compactDisplay: 'short'
    }).format(fromTokenPrice)
    setFromBase(formattedBase)
    // const quoteAmount = formatNumber(parseFloat(switchtoken === false ? data?.fromTokenAmount : data?.toTokenAmount));
    // const calc = data?.fromTokenAmount / data?.toTokenAmount;
    // const total = String(calc)
    const formattedNumber = Number(receiveAmount).toLocaleString('en-US', { maximumFractionDigits: decimal })

    setPaid(formattedNumber)
    setReceiveLoading(false)
    }
  }



  return (
    <main className="flex justify-center items-center w-full mt-28 gap-x-6">
        <Script
        src="/static/datafeeds/udf/dist/bundle.js"
        strategy="lazyOnload"
        onReady={() => {
          setIsScriptReady(true);
        }}
      />
      {isScriptReady && 
      //@ts-ignore
      <TVChartContainer {...defaultWidgetProps} />
      }
      {/* {pairdata?.baseTokenSymbol ? <Chart baseSymbol={pairdata?.baseTokenSymbol}/> : null} */}
      {/* <div className="border rounded-xl border-white border-opacity-10" ref={container} style={{ height: "600px", width: "100%" }}>
      </div> */}
      <div className={chain === 'solana' ? "hidden" : "flex-col flex gap-y-1 justify-center items-center relative bg-gradient-to-t to-brandblack via-brandblack from-transparent p-12 rounded-xl border border-white border-opacity-10"}>
        <div className="absolute top-5 right-5 z-50 self-end">
        <IoMdSettings onClick={() => setSettings(!settings)} title="Settings" size={22} className="text-neutral-400 hover:rotate-90 transition-all duration-500 cursor-pointer"/>
        </div>
        {settings ?
        <div className="transition-all duration-500 translate-y-6 border-[1px] border-white/20 rounded-xl p-5 flex-col absolute top-6 right-6 z-50 bg-brandblack">
          <h1>Slippage</h1>
          <div className="flex items-center gap-x-1 mt-2">
          <input onChange={(e:any) => setSlippage(e.target.value)} value={slippage} className="bg-transparent px-3 py-1 border-[1px] border-white/20 rounded-lg text-right outline-none text-neutral-300 font-semibold placeholder:text-neutral-500 w-20" inputMode="decimal" autoComplete="off" autoCorrect="off" type="number" pattern="^(0(\.\d+)?|1(\.0)?)$" placeholder="0.5" minLength={1} maxLength={3} spellCheck="false"></input>
          <span>%</span>
          </div>
        </div>
        : null}
      {paidloading ? <div className="absolute z-[999] w-full flex justify-center items-center h-full bg-black/25 rounded-xl"><AiOutlineLoading3Quarters className="animate-spin size-10"/></div> : null}
      {receiveloading ? <div className="absolute z-[999] w-full flex justify-center items-center h-full bg-black/25 rounded-xl"><AiOutlineLoading3Quarters className="animate-spin size-10"/></div> : null}
      <div className="flex-col flex gap-y-1 justify-center items-center relative">
      {switchtoken === false ?
      <div className="flex justify-center items-center w-[500px] box-content flex-shrink-0">
        <div className="border border-transparent hover:border-white hover:border-opacity-10 w-full rounded-xl flex justify-between items-center bg-brandsecond p-7 transition-all">
          <div className="flex-col justify-start items-center w-full">
          <h1 className="text-lg antialiased text-neutral-500 font-semibold">From</h1>
          <input onChange={(e:any) => handleChangePaid(e.target.value)} className="bg-transparent py-3 text-3xl outline-none text-neutral-300 font-semibold placeholder:text-neutral-500 w-full" inputMode="decimal" autoComplete="off" autoCorrect="off" type="number" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0" minLength={1} maxLength={10000000000} spellCheck="false" value={paid}></input>
          <small className="text-neutral-600 font-semibold">{frombase}</small>
          </div>
          <div className="flex-col justify-end items-center w-full">
            <div className="flex items-center justify-end self-end px-3 py-2">
              <button className="border px-3 py-2 rounded-lg border-white border-opacity-10 flex justify-center items-center gap-x-2 hover:border-opacity-20 transition-all">
                <img src={pairdata?.baseImg === 'missing.png' ? '/assets/missing.png' : pairdata?.baseImg} alt={pairdata?.basename} width={800} height={800} className="size-5 rounded-full object-cover"/>
                {pairdata?.baseTokenSymbol} <IoIosArrowDown className="size-5"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      :
      <div className="flex justify-center items-center w-[500px] box-content flex-shrink-0">
        <div className="border border-transparent hover:border-white hover:border-opacity-10 w-full rounded-xl flex justify-between items-center bg-brandsecond p-7 transition-all">
          <div className="flex-col justify-start items-center w-full">
          <h1 className="text-lg antialiased text-neutral-500 font-semibold">To</h1>
          <input onChange={(e:any) => handleChangeReceive(e.target.value)} className="bg-transparent py-3 text-3xl outline-none text-neutral-300 font-semibold placeholder:text-neutral-500 w-full" inputMode="decimal" autoComplete="off" autoCorrect="off" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0" minLength={1} maxLength={10000000000} spellCheck="false" value={received}></input>
          <small className="text-neutral-600 font-semibold">{frombase}</small>
          </div>
          <div className="flex-col justify-end items-center w-full">
            <div className="flex items-center justify-end self-end px-3 py-2">
              <button className="border px-3 py-2 rounded-lg border-white border-opacity-10 flex justify-center items-center gap-x-2 hover:border-opacity-20 transition-all">
                <img src={pairdata?.quoteImg === 'missing.png' ? '/assets/missing.png' : pairdata?.quoteImg} alt={pairdata?.quotename} width={800} height={800} className="size-5 rounded-full object-cover"/>
                {pairdata?.quoteTokenSymbol} <IoIosArrowDown className="size-5"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      }
      <div onClick={() => setSwitch(!switchtoken)} className="size-9 rounded-md bg-brandsecond ring-4 group transition-all ring-brandblack border border-transparent hover:border-white hover:border-opacity-10 cursor-pointer flex justify-center items-center absolute mt-5">
        <IoIosArrowDown className="group-hover:rotate-180 transition-all duration-500 ease-in-out"/>
      </div>
      {switchtoken === false ? 
      <div className="flex justify-center items-center w-[500px] box-content flex-shrink-0">
        <div className="border border-transparent hover:border-white hover:border-opacity-10 w-full rounded-xl flex justify-between items-center bg-brandsecond p-7 transition-all">
          <div className="flex-col justify-start items-center w-full">
          <h1 className="text-lg antialiased text-neutral-500 font-semibold">To</h1>
          <input onChange={(e:any) => handleChangeReceive(e.target.value)} disabled className="bg-transparent py-3 text-3xl outline-none text-neutral-300 font-semibold placeholder:text-neutral-500 w-full" inputMode="decimal" autoComplete="off" autoCorrect="off" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0" minLength={1} maxLength={10000000000} spellCheck="false" value={received}></input>
          {/* <small className="text-neutral-600 font-semibold">{toquote}</small> */}
          </div>
          <div className="flex-col justify-end items-center w-full">
            <div className="flex items-center justify-end self-end px-3 py-2">
              <button className="border px-3 py-2 rounded-lg border-white border-opacity-10 flex justify-center items-center gap-x-2 hover:border-opacity-20 transition-all">
                <img src={pairdata?.quoteImg === 'missing.png' ? '/assets/missing.png' : pairdata?.quoteImg} alt={pairdata?.quotename} width={800} height={800} className="size-5 rounded-full object-cover"/>
                {pairdata?.quoteTokenSymbol} <IoIosArrowDown className="size-5"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      :
      <div className="flex justify-center items-center w-[500px] box-content flex-shrink-0">
        <div className="border border-transparent hover:border-white hover:border-opacity-10 w-full rounded-xl flex justify-between items-center bg-brandsecond p-7 transition-all">
          <div className="flex-col justify-start items-center w-full">
          <h1 className="text-lg antialiased text-neutral-500 font-semibold">From</h1>
          <input onChange={(e:any) => handleChangePaid(e.target.value)} className="bg-transparent py-3 text-3xl outline-none text-neutral-300 font-semibold placeholder:text-neutral-500 w-full" disabled inputMode="decimal" autoComplete="off" autoCorrect="off" type="text" pattern="^[0-9]*[.,]?[0-9]*$" placeholder="0" minLength={1} maxLength={10000000000} spellCheck="false" value={paid}></input>
          </div>
          <div className="flex-col justify-end items-center w-full">
            <div className="flex items-center justify-end self-end px-3 py-2">
              <button className="border px-3 py-2 rounded-lg border-white border-opacity-10 flex justify-center items-center gap-x-2 hover:border-opacity-20 transition-all">
                <img src={pairdata?.baseImg === 'missing.png' ? '/assets/missing.png' : pairdata?.baseImg} alt={pairdata?.basename} width={800} height={800} className="size-5 rounded-full object-cover"/>
                {pairdata?.baseTokenSymbol} <IoIosArrowDown className="size-5"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      }
      </div>
      {address || publicKey ?
      <ApproveOrReviewButton amount={realamount} geckoId={geckoId} takerAddress={address as Address} sellTokenAddress={switchtoken === false ? baseAddress as Address : quoteAddress as Address} fromTokenAddress={switchtoken === false ? quoteAddress as Address : baseAddress as Address} slippage={slippage} dexAdress={dexAddress as Address} />
      : chain === 'solana' ?
      <WalletMultiButton className='!bg-orange-500 hover:!bg-black transition-all duration-200 !rounded-full' />
      :
      <button type="button" onClick={() => open()} className="border border-transparent hover:border-white hover:border-opacity-10 w-full rounded-xl flex justify-center items-center bg-fuchsia-800 bg-opacity-30 hover:bg-opacity-100 p-3 transition-all text-neutral-400 hover:text-neutral-200">
      Connect Wallet
      </button>
      }

      </div>
      {/* {uniswap === true ? 
      <iframe
      src={urluni}
      height="660px"
      width="100%"
      className="border-none m-[0 auto] block rounded-xl max-w-[600px] min-w-[300px]"
      /> : null} */}

      {chain === 'solana' ?<iframe
      src={urluni}
      height="660px"
      width="100%"
      className="border-none m-[0 auto] block rounded-xl max-w-[600px] min-w-[300px]"
      /> : null}

    </main>
  );
}

function ApproveOrReviewButton({
  takerAddress,
  sellTokenAddress,
  fromTokenAddress,
  dexAdress,
  amount,
  geckoId,
  slippage,
}: {
  takerAddress: Address;
  sellTokenAddress: Address;
  fromTokenAddress:Address;
  dexAdress:Address;
  amount: any;
  geckoId:any;
  slippage:any;
}) {
  // 1. Read from erc20, does spender (0x Exchange Proxy) have allowance?
  const { data: allowance, refetch }:any = useReadContract({
    address: sellTokenAddress,
    abi: abi,
    functionName: "allowance",
    args: [takerAddress, dexAdress],
  });

  // 2. (only if no allowance): write to erc20, approve 0x Exchange Proxy to spend max integer
  const { data }:any = useSimulateContract({//usePrepareTransaciton
    address: sellTokenAddress,
    abi: abi,
    functionName: "approve",
    args: [dexAdress, MAX_ALLOWANCE],
  });

  const { 
    data:writeContractResult,
    writeContractAsync:approveAsync,
    error,
  }:any = useWriteContract(data);

  const { isLoading: isApproving, isSuccess  }:any = useWaitForTransactionReceipt({
    hash: writeContractResult ? writeContractResult?.hash : undefined,
    onSuccess(data:any) {
      handleSwapR();
    },
  }as any);

  const handleSwapR = async () => {
    refetch()
    const chains = await axios.get(`/api/network?chainname=${geckoId === 'binance-smart-chain' ? 'bsc' : geckoId}`)
    const chaindata = chains.data
    const chainID = chaindata?.chain_identifier
    const res = await axios.get(`/api/swap?amount=${amount}&chainId=${chainID}&toTokenAddress=${sellTokenAddress}&fromTokenAddress=${fromTokenAddress}&slippage=${slippage}&userWalletAddress=${takerAddress}`)
    const data = res.data;
    console.log("swap",data)
  }

  if (error) {
    return <div>Something went wrong: {error.message}</div>;
  }
  //@ts-ignore
  if (allowance === 0n && approveAsync) {
    return (
      <>
        {isSuccess ? 
          <button
          type="button"
          className="border border-transparent hover:border-white hover:border-opacity-10 w-full rounded-xl flex justify-center items-center bg-fuchsia-800 bg-opacity-30 hover:bg-opacity-100 p-3 transition-all text-neutral-400 hover:text-neutral-200"
          onClick={async () => {
            const handleSwap = await handleSwapR();
          }}
        >
          Swap
        </button>
        :
        <button
          type="button"
          className="border border-transparent hover:border-white hover:border-opacity-10 w-full rounded-xl flex justify-center items-center bg-fuchsia-800 bg-opacity-30 hover:bg-opacity-100 p-3 transition-all text-neutral-400 hover:text-neutral-200"
          onClick={async () => {
            const writtenValue = await approveAsync();
          }}
        >
          {isApproving ? "Approving…" : "Approve"}
        </button>
        }
      </>
    );
  }

  return (
    <button
      type="button"

      className="border border-transparent hover:border-white hover:border-opacity-10 w-full rounded-xl flex justify-center items-center bg-fuchsia-800 bg-opacity-30 hover:bg-opacity-100 p-3 transition-all text-neutral-400 hover:text-neutral-200"
    >
      Insufficient Balance
    </button>
  );
}
export default Swap;
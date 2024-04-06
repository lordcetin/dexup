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
import {getEthersProvider} from '@/lib/ethersProvider'
import {getEthersSigner } from '@/lib/ethersSigner'
import DataFeed from '@/app/swap/datafeed/datafeed'

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
  const [approveData,setApproveData] = useState<any>([]);
  const [baseDecimal,setBaseDecimal] = useState<any>();
  const [toDecimal,setToDecimal] = useState<any>();
  const [fromDecimal,setFromDecimal] = useState<any>();
  const [geckoId,setGeckoId] = useState("");
  const [slippage,setSlippage] = useState<any>(0.5);
  const [estimateGasFee,setEstimateGasFee] = useState<any>("");

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
  const web3 = useWeb3js({chainId:chainId})

  const { setBaseCoinId } = useAppContext()
  const defaultWidgetProps:any= {
    symbol: `${baseSymbol && baseSymbol.toUpperCase()}/${quoteSymbol && quoteSymbol.toUpperCase()}`,
    width:980,
    height:600,
    interval: "D" as ResolutionString,
    library_path: "/static/charting_library/",
    locale: "en",
    theme: 'dark',
    charts_storage_url: "https://saveload.tradingview.com",
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    container: 'tv_chart_container',
    user_id: "public_user_id",
    show_exchange_logos: 'true'
    // fullscreen: true,
    // autosize:true,
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
            
          setBaseCoinId(basecoinId)
          // setQuoteCoinId(quotecoinId)
          setPairData(newPair)
          setBaseSymbol(baseTokenSymbol)
          setQuoteSymbol(quoteTokenSymbol)
          setBaseAddress(baseaddress)
          setQuoteAddress(quoteaddress)
          setBaseNetId(baseNetId)
          setQuoteNetId(baseNetId)


          const chains = await axios.get(`/api/network?chainname=${coingecko_asset_platform_id === 'binance-smart-chain' ? 'bsc' : coingecko_asset_platform_id}`)
          const chaindata = chains.data
          const chainID = chaindata?.chain_identifier

          const dec = await axios.get(`/api/decimals?baseNetId=${switchtoken === false ? baseNetId : quoteNetId}&baseaddress=${switchtoken === false ? baseaddress : quoteaddress}`)
          const datas = dec.data.data[0]
          const decimal = datas.attributes.decimals
          setBaseDecimal(decimal)

          const amount = generateDecimal(switchtoken === false ? paid : received, decimal)
          // const res = await axios.get(`/api/quote?fromTokenAddress=${switchtoken === false ? baseaddress : quoteaddress}&toTokenAddress=${switchtoken === false ? quoteaddress : baseaddress}&amount=${amount}&chainId=${chaId === 'solana' ? 501 : chainID}`)
          const res = await axios.get(`/api/getPri?amount=${paid}&chainId=${chainID}&toTokenAddress=${quoteaddress}&fromTokenAddress=${baseaddress}&slippage=${slippage}`)
          // const data = res.data.data[0]
          const data = res.data.data
          const paidAmount = data?.singleChainSwapInfo?.receiveAmount
          const formattedNumber = Number(paidAmount).toLocaleString('en-US', { maximumFractionDigits: decimal })

          if(chain === 'ethereum'){
            setUniUrl(`https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=${baseaddress}&outputCurrency=${quoteaddress}`)
          }else if(chain === 'binance-smart-chain'){
            setUniUrl(`https://pancakeswap.finance/swap?outputCurrency=${baseaddress}&chainId=56`)
            // setUniUrl(`https://kyberswap.com/partner-swap?chainId=56&inputCurrency=${baseaddress}&outputCurrency=${quoteaddress}&clientId=dexup&feeReceiver=0xEb218F28ACEea78E20910286b1Acfef917A270Ab&enableTip=true&chargeFeeBy=currency_out&feeAmount=30`)
          }

          if(res.data.msg){
            console.log(res.data.msg)
          }
          const fromTokenPrice = data?.commonDexInfo?.fromTokenPrice

          const baseUnitPrice = parseFloat(fromTokenPrice);
          // let baseAmount:any = formatEther(data?.fromTokenAmount.toString());
          setRealAmout(amount)

          // let quoteAmount:any = formatEther(data?.toTokenAmount.toString());
          const formattedBase = new Intl.NumberFormat("en-US",{
            style:"currency",
            currency: "USD",
            // notation: 'compact',
            // compactDisplay: 'short'
          }).format(baseUnitPrice)

          setFromBase(formattedBase)
          // setToQuote(formattedQuote)
          setReceived(formattedNumber)
        
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

  return (
    <main className="flex justify-between items-center w-full mt-28 gap-x-6">

      <div className="flex-col items-center">


        <div className="flex items-center gap-x-6 my-5">

          <div className="flex-col flex gap-2">
            <div className="flex gap-x-2 items-center">
              <img src={pairdata?.baseImg === 'missing.png' ? '/assets/missing.png' : pairdata?.baseImg} alt={pairdata?.basename} width={800} height={800} className="size-5 rounded-full object-cover"/>
              <h1>{pairdata?.baseTokenSymbol}</h1>
            </div>
              <p className="text-xs">{pairdata && pairdata?.baseaddress?.slice(0,5) + '...' + pairdata?.baseaddress?.slice(38)}</p>
          </div>

          <div className="flex-col flex gap-2">
            <div className="flex gap-x-2 items-center">
              <img src={pairdata?.quoteImg === 'missing.png' ? '/assets/missing.png' : pairdata?.quoteImg} alt={pairdata?.quotename} width={800} height={800} className="size-5 rounded-full object-cover"/>
              <h1>{pairdata?.quoteTokenSymbol}</h1>
            </div>
            <p className="text-xs">{pairdata && pairdata?.quoteaddress?.slice(0,5) + '...' + pairdata?.quoteaddress?.slice(38)}</p>
          </div>

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

    </main>
  );
}

export default Swap;
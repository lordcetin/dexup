/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import AuroBanner from "@/components/AuroBanner/page";
import CopyClipboard from "@/components/CopyClipboard/page";
import { Button } from "@/components/ui/moving-border";
import { useAppContext } from "@/context/AppContext";
import { ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiChevronDown, BiWorld } from "react-icons/bi";
import { FaDiscord } from "react-icons/fa";
import { FaFacebook, FaReddit, FaTelegram, FaTwitter } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { PiWarningCircleFill } from "react-icons/pi";
const TEST_PLATFORM_FEE_AND_ACCOUNTS = {
  referralAccount: "23fJ9Kc32yhgAeUtZPcKQ9J9ozKZ7z1QZUnPWmdb29tJ",
  feeBps: 100,
};
type Props = {};

const Iframes = ({}: Props) => {
  const searchParams = useSearchParams() as any
  const chain = searchParams.get('chain')
  const pooladdress = searchParams.get('pair')
  const [urluni,setUniUrl] = useState<any>("");
  const [isOpenSwap,setOpenSwap] = useState(false);
  const [moreInfo,setMoreInfo] = useState(false);
  const [goplusecure,setGoPlus] = useState<any>([]);

  useEffect(() => {
    const getSol = async () => {
      const response = await fetch(`/api/pairData?chain=${chain}&pooladdress=${pooladdress}`)
      const pairData = await response.json();

      if(chain === 'eth'){
        setUniUrl(`https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=${pairData?.baseaddress}&outputCurrency=${pairData?.quoteaddress}`)
      }else if(chain === 'bsc'){
        setUniUrl(`https://pancakeswap.finance/swap?outputCurrency=${pairData?.baseaddress}&chainId=56`)
        // setUniUrl(`https://kyberswap.com/partner-swap?chainId=56&inputCurrency=${baseaddress}&outputCurrency=${quoteaddress}&clientId=dexup&feeReceiver=0xEb218F28ACEea78E20910286b1Acfef917A270Ab&enableTip=true&chargeFeeBy=currency_out&feeAmount=30`)
      }else if(chain === 'arbitrum'){
        setUniUrl(`https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=${pairData?.baseaddress}&outputCurrency=${pairData?.quoteaddress}`)
      }else if(chain === 'ton'){
        //change the referal address
        setUniUrl(`https://app.ston.fi/swap?referral_address=EQDArEQdgdAw1jy-15uy5FbDw99GphiACeYy3OhkpF5Nqky8&chartVisible=false&ft=${pairData?.quoteTokenSymbol.toUpperCase()}&tt=${pairData?.baseTokenSymbol.toUpperCase()}`)
      }else if(chain === 'base'){
        setUniUrl(`https://aerodrome.finance/swap?from=${pairData?.baseaddress}&to=${pairData?.quoteaddress}`)
      }

      (window as any)?.Jupiter?.init({
        displayMode: "integrated",
        integratedTargetId: "integrated-terminal",
        endpoint: "https://api.mainnet-beta.solana.com",
        platformFeeAndAccounts: TEST_PLATFORM_FEE_AND_ACCOUNTS,
        formProps:{
          fixedOutputMint: true,
          initialAmount: '10000000',
          initialInputMint:pairData?.baseaddress ? pairData?.baseaddress : null,
          initalOutputMint: pairData?.quoteaddress ? pairData?.quoteaddress : null,
        }
      })
    }
    getSol()
  }, []);


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
  <div className="flex-col items-center w-80 max-md:w-96 space-y-2">

    <div onClick={() => setOpenSwap(!isOpenSwap)} className="relative w-80 justify-center items-center group overflow-hidden cursor-pointer rounded-xl max-md:w-full">
      <button className="flex justify-center items-center w-full border-[1px] border-sky-300/30 group-hover:border-sky-300/50 overflow-hidden rounded-xl p-5 bg-gradient-to-tl to-[#131722] from-transparent font-light text-lg text-sky-500 group-hover:text-sky-300 transition-all">Swap <BiChevronDown size={32} className={isOpenSwap ? "flex justify-end items-center absolute right-6 rotate-180 transition-all" : "flex justify-end items-center absolute right-6 rotate-0 transition-all"}/></button>
      <div className="absolute bottom-0 bg-gradient-to-l to-transparent via-sky-300 from-transparent w-[310px] h-[1px] ml-1 transition-all group-hover:via-sky-300 animate-pulse before:absolute before:w-80 before:left-3 before:h-20 before:rounded-full before:-bottom-5 before:rotate-12 before:shadow-2xl before:shadow-sky-700 group-hover:before:-rotate-12 group-hover:before:-left-3 group-hover:before:transition-all"></div>
    </div>

    {isOpenSwap ? <div>
    {chain === 'solana' ?
    <>
    <div id="integrated-terminal" className="border border-white/10 block rounded-xl max-w-[400px] min-w-[300px] max-md:w-96 max-md:h-96"></div>
    </>
    : 
    <iframe
    src={urluni}
    height="660px"
    width="100%"
    scrolling="no"
    className="border-none block rounded-xl max-w-[400px] min-w-[300px] overflow-hidden max-md:h-96"
    />
    }
    </div> : null}

    {chain === 'eth' || chain === 'bsc' ?
    <div className="border border-white/10 rounded-xl p-3 bg-[#131722]">
    <div className="flex items-center w-full gap-x-2">
      <div className="p-3 border border-white/10 rounded-lg">
        <Image src='https://files.readme.io/3fb6486-small-image.png' alt="Go Plus Logo" width={800} height={800} className="object-cover w-20" />
      </div>
      {/* <div className="p-3 border border-white/10 rounded-lg">
        <Image src='https://files.readme.io/3fb6486-small-image.png' alt="Go Plus Logo" width={800} height={800} className="object-cover w-20" />
      </div> */}
    </div>

    <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Honeypot</p><div className={goplusecure?.is_honeypot === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.is_honeypot === "0" ? <span className="flex items-center gap-x-1">No <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">Yes <PiWarningCircleFill size={16}/></span>}</div></div>
    <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Buy Tax</p><div className={goplusecure?.buy_tax === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.buy_tax === "0" ? <span className="flex items-center gap-x-1">{goplusecure?.buy_tax}% <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">{goplusecure?.buy_tax}% <PiWarningCircleFill size={16}/></span>}</div></div>
    <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Sell Tax</p><div className={goplusecure?.sell_tax === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.sell_tax === "0" ? <span className="flex items-center gap-x-1">{goplusecure?.sell_tax}% <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">{goplusecure?.sell_tax}% <PiWarningCircleFill size={16}/></span>}</div></div>
    {moreInfo ?
    <>
    <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Whitelisted</p><div className={goplusecure?.is_whitelisted === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.is_whitelisted  === "0" ? <span className="flex items-center gap-x-1">No <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">Yes <PiWarningCircleFill size={16}/></span>}</div></div>
    <div className="flex items-center gap-x-1 py-1"><p className="text-white/50">Blacklisted</p><div className={goplusecure?.is_blacklisted === "0" ? "text-green-500" : "text-orange-500"}>{goplusecure?.is_blacklisted  === "0" ? <span className="flex items-center gap-x-1">No <FaCircleCheck/></span> : <span className="flex items-center gap-x-1">Yes <PiWarningCircleFill size={16}/></span>}</div></div>
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
    </>
    : null}
        <button type="button" onClick={() => setMoreInfo(!moreInfo)} className="flex items-center gap-x-1 text-sm text-sky-500">{moreInfo ? "Less" : "More"} Info <ChevronDown className={moreInfo ? "rotate-180" : "rotate-0"}/></button>
    </div> : null}
  </div>
);
};

export default Iframes;

/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import AuroBanner from "@/components/AuroBanner/page";
import CopyClipboard from "@/components/CopyClipboard/page";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiWorld } from "react-icons/bi";
import { FaDiscord } from "react-icons/fa";
import { FaFacebook, FaReddit, FaTelegram, FaTwitter } from "react-icons/fa6";
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
  const [tokenInfo,setTokenInfo] = useState<any>([]);
  const { details,setOpenDetails,setEditDetailsModal } = useAppContext()

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
    const tokenInf = async () => {
      const response = await fetch(`/api/pairData?chain=${chain}&pooladdress=${pooladdress}`)
      const pairData = await response.json()

      const responseTokenInfo = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chain}/tokens/${pairData?.baseaddress}/info`,{
        method:'GET',
        headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
      })
      const tokenInfoData = await responseTokenInfo.json()

      setTokenInfo(tokenInfoData?.data?.attributes)
    }
    tokenInf()
  },[])

  
  return (
  <div className="flex-col items-center w-[400px] max-md:w-96">
        {details ? 
      <div className="flex-col items-center w-[400px] max-md:w-96 bg-[#131722] rounded-xl h-fit relative flex-shrink-0 box-border mb-2 border border-white/10 self-start">
        <AuroBanner/>
        {/* <ImageColorPalette imageUrl={tokenInfo?.image?.large === 'missing.png' ? '/assets/missing.png' : tokenInfo?.image?.large} /> */}
        <div className="flex justify-center items-center w-full absolute z-50 -translate-y-8">
          <img
          src={tokenInfo?.image_url === 'missing.png' ? '/assets/missing.png' : tokenInfo?.image_url}
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
          <p className="font-light text-white/50">{tokenInfo?.symbol?.toUpperCase()}</p>
          <CopyClipboard address={tokenInfo && tokenInfo?.address}/>
          </div>
          <div className="flex items-center w-full mt-5 ">
          <p className="flex-wrap whitespace-pre-wrap w-full max-h-36 h-auto antialiased overflow-y-auto rounded-lg text-sm text-white/70">{tokenInfo?.description}</p>
          </div>
          {tokenInfo?.websites?.length ? <h1 className="flex items-center w-full mt-3">Website Links</h1> : null}
          <div className="flex-wrap justify-center items-center mt-3">
            {tokenInfo?.websites?.map((links:any,index:any) => {
            return (
            <div key={index} className="flex gap-x-1">
            <Link href={links} className="rounded-md bg-brandblack hover:bg-zinc-800 text-xs mx-1 items-center gap-x-1 flex p-2"><BiWorld />{links}</Link>
            </div>
            )}
            )}
          </div>
          {tokenInfo?.discord_url || tokenInfo?.telegram_handle || tokenInfo?.twitter_handle ? <h1 className="flex items-center w-full mt-3">Social Media</h1> : null}
          <div className="flex items-center w-full mt-3 gap-x-2">
            {tokenInfo?.discord_url && <Link href={`${tokenInfo?.discord_url}`}><FaDiscord size={18} className="hover:opacity-15 transition-all"/></Link>}
            {tokenInfo?.telegram_handle && <Link href={`https://t.me/${tokenInfo?.telegram_handle}`}><FaTelegram size={18} className="hover:opacity-15 transition-all"/></Link>}
            {tokenInfo?.twitter_handle && <Link href={`https://twitter.com/${tokenInfo?.twitter_handle}`}><FaTwitter size={18} className="hover:opacity-15 transition-all"/></Link>}
          </div>
          <div className="flex justify-center items-center w-full mt-3">
            <button onClick={() => setEditDetailsModal(true)} className="px-7 py-1 border border-slate-600/30 bg-slate-600/20 rounded-lg text-white/50 hover:border-slate-500 hover:bg-slate-600 hover:text-slate-200 transition-all">Edit Details</button>
          </div>
          </div>
        </div>
      </div> : null}
    <div className={details ? "w-[400px] h-[600px] overflow-hidden rounded-xl max-md:w-96" : ""}>
    {chain === 'solana' ?
    <>
    <div id="integrated-terminal" className={details ? "border border-white/10 m-[0 auto] block rounded-xl max-w-[400px] min-w-[300px]" : "border border-white/10 mt-5 block rounded-xl max-w-[400px] min-w-[300px]"}></div>
    </>
    : 
    <iframe
    src={urluni}
    height="660px"
    width="100%"
    scrolling="no"
    className={details ? "border-none m-[0 auto] block rounded-xl max-w-[400px] min-w-[300px] overflow-hidden" : "border-none mt-5 block rounded-xl max-w-[400px] min-w-[300px] overflow-hidden"}
    />
    }
    </div>
  </div>
);
};

export default Iframes;

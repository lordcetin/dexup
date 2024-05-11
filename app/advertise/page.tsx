/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client'
import { Link } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import TypewriterComponent from "typewriter-effect";
import ss1 from '@/public/ss1.png'
import ss2 from '@/public/ss2.png'
import ss3 from '@/public/ss3.png'
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { InputIcon } from "@radix-ui/react-icons";
import InputSecond from "@/components/InputSecond/page";
import { toast } from "react-toastify";
import { FaImage } from "react-icons/fa";
import { useAccount, usePrepareTransactionRequest, useReadContract, useSendTransaction, useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Address, erc20Abi, parseEther } from "viem";
import { parseUnits } from "ethers";


type Props = {
  setEditDetailsModal:any
};


function EditModal({setEditDetailsModal}: Props) {
  const { address,chain,chainId } = useAccount();
  const [selectOpen, setSelectOpen] = useState(false);
  const [transferAmountETH, setTransferAmountETH] = useState<any>("");
  const [transferAmountBNB, setTransferAmountBNB] = useState<any>("");
  const [selected, setSelected] = useState<any>("");
  const [tokenAddress, setTokenAddress] = useState<any>("");
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [selectedpackage, setPackage] = useState<any>("");
  
  const [logoloading, setLogoLoading] = useState(false);
  const [logoFileURL, setLogoFileUrl] = useState<any>("");
  const [openLogo, setOpenLogo] = useState(false);
  
  const [bannerloading, setBannerLoading] = useState(false);
  const [bannerFileURL, setBannerFileUrl] = useState<any>("");
  const [openBanner, setOpenBanner] = useState(false);
  
  const [website, setWebsite] = useState<any>("");
  const [otherwebsite, setOtherWebsite] = useState<any>("");
  const [otherwebsite2, setOther2Website] = useState<any>("");
  const [otherwebsite3, setOther3Website] = useState<any>("");
  const [twitter, setTwitter] = useState<any>("");
  const [telegram, setTelegram] = useState<any>("");
  const [reddit, setReddit] = useState<any>("");
  const [discord, setDiscord] = useState<any>("");
  const [facebook, setFacebook] = useState<any>("");

  const [email, setEmail] = useState<any>("");
  const [mytelegram, setMyTelegram] = useState<any>("");
  const [mydiscord, setMyDiscord] = useState<any>("");

  const adpackage = [
    {id:0,title:'10K views',price:'299'},
    {id:1,title:'25K views',price:'699'},
    {id:2,title:'50K views',price:'999'},
    {id:3,title:'100K views',price:'1999'},
    {id:4,title:'200K views',price:'3999'},
    {id:5,title:'400K views',price:'6999'},
  ]

  useEffect(() => {
    const getPrice = async () => {
      if(chainId === 1){
      const response = await fetch(`/api/getPri?amount=${!adpackage[selectedpackage]?.price ? '299' : adpackage[selectedpackage]?.price}&chainId=${'1'}&toTokenAddress=${'0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'}&fromTokenAddress=${'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'}&slippage=${'0.014'}`)
      const data = await response.json()

      const datas = data.data
      const paidAmount = datas.singleChainSwapInfo.receiveAmount
      const formattedNumber = Number(paidAmount).toLocaleString('en-US', { maximumFractionDigits: 6 })
      setTransferAmountETH(formattedNumber)
    }else if(chainId === 56 ){
      const response = await fetch(`/api/getPri?amount=${!adpackage[selectedpackage]?.price ? '299' : adpackage[selectedpackage]?.price}&chainId=${'56'}&toTokenAddress=${'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'}&fromTokenAddress=${'0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'}&slippage=${'0.01'}`)
      const data = await response.json()

      const datas = data.data
      const paidAmount = datas.singleChainSwapInfo.receiveAmount
      const formattedNumber = Number(paidAmount).toLocaleString('en-US', { maximumFractionDigits: 6 })
      setTransferAmountBNB(formattedNumber)
    }
    }
    getPrice()
  },[])

  useEffect(() => {
    const getPrice = async () => {
      if(chainId === 1){
      const response = await fetch(`/api/getPri?amount=${!adpackage[selectedpackage]?.price ? '299' : adpackage[selectedpackage]?.price}&chainId=${'1'}&toTokenAddress=${'0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'}&fromTokenAddress=${'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'}&slippage=${'0.014'}`)
      const data = await response.json()

      const datas = data.data
      const paidAmount = datas.singleChainSwapInfo.receiveAmount
      const formattedNumber = Number(paidAmount).toLocaleString('en-US', { maximumFractionDigits: 6 })
      setTransferAmountETH(formattedNumber)
    }else if(chainId === 56 ){
      const response = await fetch(`/api/getPri?amount=${!adpackage[selectedpackage]?.price ? '299' : adpackage[selectedpackage]?.price}&chainId=${'56'}&toTokenAddress=${'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'}&fromTokenAddress=${'0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'}&slippage=${'0.01'}`)
      const data = await response.json()

      const datas = data.data
      const paidAmount = datas.singleChainSwapInfo.receiveAmount
      const formattedNumber = Number(paidAmount).toLocaleString('en-US', { maximumFractionDigits: 6 })
      setTransferAmountBNB(formattedNumber)
    }
    }
    getPrice()
  },[selectedpackage,chainId])



  async function onChangeLogo(e:any) {
    setLogoLoading(true);
    const file = e.target.files[0];
    try {
      setLogoFileUrl(file);
      setOpenLogo(false);
      toast.success("Logo is uploaded!");
    } catch (error) {
      toast.error(`Error uploading file: ${error} `)
    }
    setLogoLoading(false);
  }

  async function onChangeBanner(e:any) {
    setBannerLoading(true);
    const file = e.target.files[0];
    try {
      setBannerFileUrl(file);
      setOpenBanner(false);
      toast.success("Banner is uploaded!");
    } catch (error) {
      toast.error(`Error uploading file: ${error} `)
    }
    setBannerLoading(false);
  }

  let frameworks:any = [
    {
      value: "Select to Chain...",
      label: "Select to Chain...",
    },
    {
      value: "ethereum",
      label: "Ethereum",
    },
    {
      value: "binance-smart-chain",
      label: "Binance Smart Chain",
    },
    {
      value: "solana",
      label: "Solana",
    },
    {
      value: "the-open-network",
      label: "The Open Network",
    },
    {
      value: "base",
      label: "Base",
    },
  ]

  return (
  <div className="flex justify-center items-center w-full overflow-x-hidden">
    <div className="flex-col items-center w-full p-7 overflow-x-hidden max-md:w-96 animate-drawer">

      <div className="flex-col flex justify-center items-center w-full mt-28 text-5xl font-bold">
        <TypewriterComponent
        options={{
          autoStart:true,
          loop:true
        }}
        onInit={(typewriter) => {
          typewriter.typeString("ADVERTISE DETAILS")
          .pauseFor(1500)
          .deleteAll()
          .start();
        }}
        />
        <p className="w-[520px] max-md:w-80 h-16 text-xs font-light text-white/50 mt-2 z-50">Hurry up! Don't miss the hype and advertise your token immediately on Dexup, which has millions of monthly visitors.</p>
      </div>

      <div className="flex justify-center items-center w-full mt-28 border-t border-white/10"></div>

        <div className="flex-col flex justify-center items-center w-full mt-10">
          <div className="flex-col flex justify-center items-center w-full mt-10 gap-y-2">
            <h1 className="w-80 text-xl font-semibold">Chain</h1>
            <span className="w-80 text-sm text-white/50">Select the network on which chain you deployed your token from the list below.</span>
            <div className="flex-col items-center w-80 z-20">
            {!selectOpen ?
            <div onClick={() => setSelectOpen(!selectOpen)} className="border border-white/20 w-80 rounded-lg p-5 flex justify-between items-center text-white/80 hover:text-white hover:border-white transition-all cursor-pointer">
            <p className="first-letter:uppercase">{selected ? frameworks[selected]?.label : "Select to Chain..."}</p>
            {selectOpen ? 
            <IoChevronUp />
            :<IoChevronDown />
            }
            </div>
            :
            <div className="border border-white/20 p-2 w-80 rounded-lg flex-col items-center text-white/80 hover:text-white hover:border-white transition-all cursor-pointer">
              {frameworks.map((item:any,index:any) => {
                return(
                  <div key={index} onClick={() => {setSelected(index),setSelectOpen(false)}} className="p-3 border-b-[1px] border-b-white/10 hover:border-white/10 hover:rounded-lg hover:bg-black/20 active:border-white outline-none">
                    {item?.label}
                  </div>
                )
              })}
            </div>
            }
            </div>
          </div>
          <div className="flex-col flex justify-center items-center w-full mt-10 gap-y-2">
            <h1 className="w-80 text-xl font-semibold">Token Address</h1>
            <span className="w-80 text-sm text-white/50">Enter your token's address</span>
            <InputSecond
            type="text"
            id="name"
            label="Token Address"
            value={tokenAddress}
            onChange={(e: any) => setTokenAddress(e.target.value)}
            />
          </div>
          <div className="flex-col flex justify-center items-center w-full mt-10 gap-y-2">
            <h1 className="w-80 text-xl font-semibold">Select Package</h1>
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 w-80">
              {adpackage?.map((item:any,index:any) => {

                return(
                  <div key={index} onClick={() => setPackage(index)} className={selectedpackage === item?.id ? "bg-slate-900 border border-teal-400 rounded-lg p-3 hover:bg-slate-800 transition-all hover:border-white cursor-pointer flex-col items-center text-sm justify-center text-center": "bg-slate-900 border border-white/10 rounded-lg p-3 hover:bg-slate-800 transition-all hover:border-white cursor-pointer flex-col items-center text-sm justify-center text-center"}><h1 className="text-xs">{item?.title}</h1><p>${parseFloat(item?.price)?.toLocaleString('en-US', { maximumFractionDigits: 6 })}</p></div>
                )
              })}

            </div>
          </div>
          <div className="flex-col flex justify-center items-center w-full mt-10 gap-y-2">
            <h1 className="w-80 text-xl font-semibold">Title</h1>
            <InputSecond
            type="text"
            id="name"
            label="Title"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex-col flex justify-center items-center w-full mt-10 gap-y-2">
            <h1 className="w-80 text-xl font-semibold">Short Description</h1>
            <span className="w-80 text-sm text-white/50">A short description of your project to get people interested</span>
            <InputSecond
            type="text"
            id="name"
            label="Short Description"
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex-col flex justify-center items-center w-full mt-10 gap-y-2">
            <h1 className="w-80 text-xl font-semibold">Token Logo</h1>

            <span className="w-80 text-xs text-white/50">• Requirements: 500 x 500 px | 1:1 aspect ratio</span>
            <label className="w-80 cursor-pointer p-5 flex justify-center items-center border border-white/20 rounded-lg hover:border-white text-sm gap-x-2 text-white/50 hover:text-white">
              <FaImage /> Upload Logo
              <input
                className="hidden absolute h-52 -left-96"
                type="file"
                name="Asset"
                onChange={onChangeLogo}
              />
              </label>
          </div>
          <div className="flex-col flex justify-center items-center w-full mt-10 gap-y-2">
            <h1 className="w-80 text-xl font-semibold">Banner Image</h1>
            <span className="w-80 text-xs text-white/50">• Minimum: 548 x 224 px </span>
            <label className="w-80 cursor-pointer p-5 flex justify-center items-center border border-white/20 rounded-lg hover:border-white text-sm gap-x-2 text-white/50 hover:text-white">
              <FaImage /> Upload Banner
              <input
                className="hidden absolute h-52 -left-96"
                type="file"
                name="Asset"
                onChange={onChangeBanner}
              />
              </label>
          </div>
          <div className="flex-col flex justify-center items-center w-full mt-10 gap-y-2">
            <h1 className="w-80 text-xl font-semibold">Project Links</h1>
            <span className="w-80 text-sm text-white/50">Enter your project links</span>
            <InputSecond
            type="text"
            id="name"
            label="Website Link"
            value={website}
            onChange={(e: any) => setWebsite(e.target.value)}
            />
            <InputSecond
            type="text"
            id="name"
            label="Other Link"
            value={otherwebsite}
            onChange={(e: any) => setOtherWebsite(e.target.value)}
            />
            <InputSecond
            type="text"
            id="name"
            label="Other Link 2"
            value={otherwebsite2}
            onChange={(e: any) => setOther2Website(e.target.value)}
            />
            <InputSecond
            type="text"
            id="name"
            label="Other Link 3"
            value={otherwebsite3}
            onChange={(e: any) => setOther3Website(e.target.value)}
            />
          </div>
          <div className="flex-col flex justify-center items-center w-full mt-10 gap-y-2">
            <h1 className="w-80 text-xl font-semibold">Social Media Links</h1>
            <span className="w-80 text-sm text-white/50">Enter your social media links</span>
            <InputSecond
            type="text"
            id="name"
            label="Facebook Link"
            value={facebook}
            onChange={(e: any) => setFacebook(e.target.value)}
            />
            <InputSecond
            type="text"
            id="name"
            label="Twitter / X Link"
            value={twitter}
            onChange={(e: any) => setTwitter(e.target.value)}
            />
            <InputSecond
            type="text"
            id="name"
            label="Telegram Link"
            value={telegram}
            onChange={(e: any) => setTelegram(e.target.value)}
            />
            <InputSecond
            type="text"
            id="name"
            label="Discord Link"
            value={discord}
            onChange={(e: any) => setDiscord(e.target.value)}
            />
            <InputSecond
            type="text"
            id="name"
            label="Reddit Link"
            value={reddit}
            onChange={(e: any) => setReddit(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center items-center w-full mt-28 border-t border-white/10"></div>

        <div className="flex-col flex justify-center items-center w-full mt-10">
        <div className="flex-col flex justify-center items-center w-full mt-10 gap-y-2">
            <h1 className="w-80 text-xl font-semibold">Your or Token Owner Contacts</h1>
            <span className="w-80 text-sm text-white/50">Enter your or token owner contact address</span>
            <span className="w-80 text-xs text-white/50">• Before entering your Telegram or Discord username, check whether you have hidden your profile on Telegram or Discord.</span>
            <InputSecond
            type="text"
            id="name"
            label="Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            />
            <InputSecond
            type="text"
            id="name"
            label="Telegram Username"
            value={mytelegram}
            onChange={(e: any) => setMyTelegram(e.target.value)}
            />
            <InputSecond
            type="text"
            id="name"
            label="Discord Username"
            value={mydiscord}
            onChange={(e: any) => setMyDiscord(e.target.value)}
            />
        </div>
        </div>

        <div className="flex justify-center items-center w-full mt-28 border-t border-white/10"></div>

        <div className="flex-col flex justify-center items-center w-full mt-10 mb-20">
        <div className="flex-col flex justify-center items-center w-full mt-10 gap-y-2">
            <h1 className="w-80 text-xl font-semibold">Order Summary</h1>
            <span className="w-80 text-sm text-white/50">The information you send for advertising will be reviewed by our team and, if appropriate, your ad will be displayed.</span>
            <div className="flex justify-between items-center w-80 mt-3">
              <div>Price:</div>
              <div className="flex items-center gap-x-1 text-xl font-bold"><p>{!adpackage[selectedpackage]?.price ? '$299' : '$'+parseFloat(adpackage[selectedpackage]?.price)?.toLocaleString('en-US', { maximumFractionDigits: 6 })}</p></div>
            </div>
              <div className="flex items-center w-80 justify-end text-xs text-white/20"><p>{chainId === 1 ? transferAmountETH : chainId === 56 ? transferAmountBNB : null} {chainId === 1 ? 'ETH' : chainId === 56 ? 'BNB' : null}</p></div>
            <TransferButton transferAmount={chainId === 1 ? transferAmountETH : chainId === 56 ? transferAmountBNB : ''} takerAddress={address} sellTokenAddress={'0xdAC17F958D2ee523a2206206994597C13D831ec7'} chainId={chainId} contractAddress={chainId === 1 ? '0x24999A8188a103a742828a933212F03e349e18C5' : chainId === 56 ? '0x24999A8188a103a742828a933212F03e349e18C5' : '0x24999A8188a103a742828a933212F03e349e18C5'} />
            {/* <button type="button" className="p-5 border border-white/20 modalgradient w-80 rounded-lg hover:bg-slate-800 transition-all mt-3">Order Now</button> */}
        </div>
        </div>

        <div className="opacity-10">
        <div className="w-[800px] absolute top-28 -right-56 rotate-12 z-20 rounded-xl flex justify-center items-center border border-white/20">
        <Image src={ss3} alt="Home Page" width={800} height={800} className="w-[800px] object-cover rounded-xl select-none pointer-events-none"/>
        </div>
        <div className="w-[800px] absolute -top-16 -right-36 rotate-12 z-10 rounded-xl flex justify-center items-center border border-white/20">
        <Image src={ss1} alt="Home Page" width={800} height={800} className="w-[800px] object-cover rounded-xl select-none pointer-events-none"/>
        </div>
        </div>

    </div>
  </div>
  );
}

export default EditModal;
function TransferButton({
  takerAddress,
  sellTokenAddress,
  contractAddress,
  chainId,
  transferAmount
}: {
  takerAddress: any;
  sellTokenAddress: any;
  contractAddress:any;
  chainId:any
  transferAmount:any
}) {


  // const { data: allowance }:any = useReadContract({
  //   address: sellTokenAddress, // usdt or dexup token address
  //   abi: erc20Abi,
  //   functionName: "allowance",
  //   args: [takerAddress, contractAddress],
  // });

  // // Approve işlemi simüle et
  // const { data: approveSimulate, error: apprvErr } = useSimulateContract({
  //   address: sellTokenAddress, // usdt or dexup token address
  //   abi: erc20Abi,
  //   functionName: 'approve',
  //   args: [contractAddress, parseUnits('299', 6)]
  // });

  // const {
  //   data:writeContractResult,
  //   writeContractAsync:approveAsync,
  //   error,
  // }:any = useWriteContract();

  // const { isLoading: isApproving , error:approveError }:any = useWaitForTransactionReceipt({
  //   hash: writeContractResult ? writeContractResult : undefined,
  //   onSuccess(data:any) {
  //     console.log("SUCCESS",data)
  //     // handleSwapR();
  //   },
  // }as any);

  // console.log("writeContractResult",writeContractResult)

  const { writeContractAsync } = useWriteContract()
  const { sendTransaction,error } = useSendTransaction();
  const handleTransfer = async () => {
    try {
      // const result = await writeContractAsync({ 
      //   abi: erc20Abi,
      //   address: sellTokenAddress, // Emin olun bu adres doğru
      //   functionName: 'transferFrom',
      //   args: [
      //     takerAddress,
      //     contractAddress, // Alıcı adresi
      //     parseUnits('299', 6), // Miktarı doğru ondalık basamağa çevirin
      //   ],
      // });
      const result = sendTransaction({
        to: takerAddress, // Buraya kendi adresinizi girin
        value: parseEther(transferAmount),
      });
      if(result !== undefined){
        toast.success("Transfer successful")
      }
    } catch (error) {
      toast.error("Insufficient Balance")
      console.error('Transaction failed:', error);
    }
  };

  const handleSwapR = async () => {

    // const approved = await approveAsync({
    //   abi:erc20Abi,
    //   address: contractAddress,
    //   functionName:"approve",
    //   args: [contractAddress, parseUnits('300', 6)]
    // })
    // console.log("apprv",approved)

  }

  // if (error || approveError) {
  //   return <div className="whitespace-pre-wrap h-32 w-96 overflow-y-auto overflow-x-hidden mt-10">Something went wrong: {error.message}</div>;
  // }
  //@ts-ignore
  // if (allowance === 0n ) {
  //   return (
  //     <>

  //       <button
  //         type="button"
  //         className="border border-transparent hover:border-white hover:border-opacity-10 w-full rounded-xl flex justify-center items-center bg-fuchsia-800 bg-opacity-30 hover:bg-opacity-100 p-3 transition-all text-neutral-400 hover:text-neutral-200"
  //         onClick={async () => {
  //           // const writtenValue = await approveAsync();
  //           await handleSwapR()
  //         }}
  //       >
  //         {isApproving ? "Approving…" : "Approve"}
  //       </button>
        
  //     </>
  //   );
  // }

  return (
    <>
    {/* {error && <div className="whitespace-pre-wrap h-32 w-96 overflow-y-auto overflow-x-hidden mt-10">Something went wrong: {error?.message}</div>} */}
    <button
      type="button"
      onClick={() => handleTransfer()}
      className={error ? "p-5 border border-white/20 modalgradient hue-rotate-90 w-80 rounded-lg hover:bg-slate-800 transition-all mt-3" : "p-5 border border-white/20 modalgradient w-80 rounded-lg hover:bg-slate-800 transition-all mt-3"}
    >
      {error ? "Insufficient Balance" : "Order Now"}
    </button>
    </>
  );
}
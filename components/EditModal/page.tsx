/* eslint-disable react/no-unescaped-entities */
import { Link } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import TypewriterComponent from "typewriter-effect";
import ss1 from '@/public/ss1.png'
import ss2 from '@/public/ss2.png'
import ss3 from '@/public/ss3.png'
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import Input from "../Input/page";
import { InputIcon } from "@radix-ui/react-icons";
import InputSecond from "../InputSecond/page";
import { toast } from "react-toastify";
import { FaImage } from "react-icons/fa";


type Props = {
  setEditDetailsModal:any
};


function EditModal({setEditDetailsModal}: Props) {
  const [selectOpen, setSelectOpen] = useState(false);
  const [selected, setSelected] = useState<any>("");
  const [tokenAddress, setTokenAddress] = useState<any>("");
  
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
  <div className="fixed top-0 left-0 w-screen h-screen bg-black/80 flex justify-center items-center z-[999999]">
    <div className="flex-col fixed items-center w-3/6 bottom-0 translate-y-1 h-[800px] rounded-t-xl modalgradient border border-gray-700 p-7 overflow-y-auto overflow-x-hidden max-md:w-96 animate-drawer">
      <AiFillCloseCircle onClick={() => setEditDetailsModal(false)} size={26} className="fixed right-3 top-3 text-white hover:text-white/50 cursor-pointer transition-all z-[9999]"/>
      <div className="flex items-center">
        <Image src='/logo.svg' alt="Dexup Logo" width={800} height={800} className="w-44 object-cover select-none pointer-events-none"/>
      </div>
      <div className="flex-col flex justify-center items-center w-full mt-28 text-5xl font-bold">
        <TypewriterComponent
        options={{
          autoStart:true,
          loop:true
        }}
        onInit={(typewriter) => {
          typewriter.typeString("EDIT TOKEN DETAILS")
          .pauseFor(1500)
          .deleteAll()
          .start();
        }}
        />
        <p className="w-[520px] max-md:w-80 h-16 text-xs font-light text-white/50 mt-2 z-50">Update your token information as quickly as possible. Update your social media and website links. You can upload your logo and banner design for your token page on Dexup.</p>
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
            <h1 className="w-80 text-xl font-semibold">Description</h1>
            <span className="w-80 text-sm text-white/50">You can edit your token page by stating the most striking aspects of the project in your description.</span>
            <textarea className="border border-white/20 w-80 max-h-96 min-h-24 rounded-lg p-5 flex justify-between items-center text-white/80 hover:text-white hover:border-white transition-all bg-transparent" placeholder="Description"></textarea>
          </div>
          <div className="flex-col flex justify-center items-center w-full mt-10 gap-y-2">
            <h1 className="w-80 text-xl font-semibold">Token Logo</h1>
            <span className="w-80 text-sm text-white/50">You can update your token's logo for your token page in Dexup.</span>
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
            <span className="w-80 text-sm text-white/50">You can add your banner image to the banner area above your logo for your token page on dexup.</span>
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
            <span className="w-80 text-sm text-white/50">The details of your token page on Dexup will be updated within approximately 15 minutes after you make the payment.</span>
            <div className="flex justify-between items-center w-80 mt-3">
              <div>Price:</div>
              <div className="flex items-center gap-x-1 text-xl font-bold"><p className="line-through text-white/50">$499</p>$299</div>
            </div>
            <button type="button" className="p-5 border border-white/20 modalgradient w-80 rounded-lg hover:bg-slate-800 transition-all mt-3">Order Now</button>
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

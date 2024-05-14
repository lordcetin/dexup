import { useRouter } from "next/navigation";
import React from "react";
import { BsCart2 } from "react-icons/bs";
import { GrMultiple } from "react-icons/gr";
import { LiaRobotSolid } from "react-icons/lia";
import { LuNetwork } from "react-icons/lu";
import { MdOutlineFeedback, MdOutlineTipsAndUpdates, MdOutlineWaterDrop } from "react-icons/md";
import { PiSquaresFour, PiSwap } from "react-icons/pi";
import { RiUserVoiceLine } from "react-icons/ri";
import { SiWireshark } from "react-icons/si";
import { TbDrone } from "react-icons/tb";
import { TfiCup } from "react-icons/tfi";

type Props = {
  setMobileMenu:any
};

const MobileMenu = ({setMobileMenu}: Props) => {
  const router = useRouter();
  return (
  <div className="fixed z-[99999999999] w-screen h-screen bg-black/50">
  <div onBlur={() => setMobileMenu(false)} className="fixed z-[9999999999999] flex-col items-center w-full h-[400px] rounded-t-3xl bg-brandblack border border-white/10 bottom-0 left-0 transition-all duration-500 ease-in-out animate-drawer">
    <div className="flex justify-center items-center w-full"><div onClick={() => setMobileMenu(false)} className=" w-28 h-2 rounded-full bg-neutral-800 my-3 animate-pulse"></div></div>
    <div className="flex-col items-center w-full h-full mt-3 pb-12 overflow-y-scroll">
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 p-5">
    <div>
      <div onClick={() => router.push('/')} className="flex-col flex items-center">
      <div className="text-2xl border border-white/20 rounded-xl size-16 mb-1 flex items-center justify-center bg-gradient-to-tr to-neutral-700 via-neutral-500 from-neutral-800"><PiSquaresFour/></div>
      <div className="items-center gap-x-3 text-sm hover:scale-110 transition-all cursor-pointer">Home</div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/swap?chain=eth&pair=0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852`)} className="flex-col flex items-center">
      <div className="text-2xl border border-white/20 rounded-xl size-16 mb-1 flex items-center justify-center bg-gradient-to-tr to-neutral-700 via-neutral-500 from-neutral-800"><PiSwap/></div>
      <div className="items-center gap-x-3 text-sm hover:scale-110 transition-all cursor-pointer">Swap</div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)} className="flex-col flex items-center">
      <div className="text-2xl border border-white/20 rounded-xl size-16 mb-1 flex items-center justify-center bg-gradient-to-tr to-neutral-700 via-neutral-500 from-neutral-800"><BsCart2/></div>
      <div className="items-center gap-x-3 text-sm hover:scale-110 transition-all cursor-pointer">Cart</div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)} className="flex-col flex items-center">
      <div className="text-2xl border border-white/20 rounded-xl size-16 mb-1 flex items-center justify-center bg-gradient-to-tr to-neutral-700 via-neutral-500 from-neutral-800"><RiUserVoiceLine /></div>
      <div className="items-center gap-x-3 text-sm hover:scale-110 transition-all cursor-pointer"><span className="text-sm">AMA Room</span></div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)} className="flex-col flex items-center">
      <div className="text-2xl border border-white/20 rounded-xl size-16 mb-1 flex items-center justify-center bg-gradient-to-tr to-neutral-700 via-neutral-500 from-neutral-800"><MdOutlineWaterDrop /></div>
      <div className="items-center gap-x-3 text-sm hover:scale-110 transition-all cursor-pointer"><span className="text-sm">New Pairs</span></div>
      </div>
    </div>
      </div>
    <div className="h-[1px] bg-gradient-to-l to-transparent via-white/10 from-transparent rounded-full w-full"></div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 p-5">
    <div>
      <div onClick={() => router.push(`/multichart`)} className="flex-col flex items-center">
      <div className="text-2xl border border-white/20 rounded-xl size-16 mb-1 flex items-center justify-center bg-gradient-to-tr to-neutral-700 via-neutral-500 from-neutral-800"><GrMultiple /></div>
      <div className="items-center gap-x-3 text-sm hover:scale-110 transition-all cursor-pointer"><span className="text-sm">Multichart</span></div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)} className="flex-col flex items-center">
      <div className="text-2xl border border-white/20 rounded-xl size-16 mb-1 flex items-center justify-center bg-gradient-to-tr to-neutral-700 via-neutral-500 from-neutral-800"><TfiCup /></div>
      <div className="items-center gap-x-3 text-sm hover:scale-110 transition-all cursor-pointer"><span className="text-sm">Top Traders</span></div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)} className="flex-col flex items-center">
      <div className="text-2xl border border-white/20 rounded-xl size-16 mb-1 flex items-center justify-center bg-gradient-to-tr to-neutral-700 via-neutral-500 from-neutral-800"><SiWireshark /></div>
      <div className="items-center gap-x-3 text-sm hover:scale-110 transition-all cursor-pointer"><span className="text-sm">Top Whales</span></div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)} className="flex-col flex items-center">
      <div className="text-2xl border border-white/20 rounded-xl size-16 mb-1 flex items-center justify-center bg-gradient-to-tr to-neutral-700 via-neutral-500 from-neutral-800"><TbDrone /></div>
      <div className="items-center gap-x-3 text-sm hover:scale-110 transition-all cursor-pointer"><span className="text-sm">AI Analysis</span></div>
      </div>
    </div>
      </div>
    <div className="h-[1px] bg-gradient-to-l to-transparent via-white/10 from-transparent rounded-full w-full"></div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 p-5">
    <div>
      <div onClick={() => router.push(`/comingsoon`)} className="flex-col flex items-center">
      <div className="text-2xl border border-white/20 rounded-xl size-16 mb-1 flex items-center justify-center bg-gradient-to-tr to-neutral-700 via-neutral-500 from-neutral-800"><LuNetwork /></div>
      <div className="items-center gap-x-3 text-sm hover:scale-110 transition-all cursor-pointer"><span className="text-sm">Advertise</span></div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)} className="flex-col flex items-center">
      <div className="text-2xl border border-white/20 rounded-xl size-16 mb-1 flex items-center justify-center bg-gradient-to-tr to-neutral-700 via-neutral-500 from-neutral-800"><MdOutlineTipsAndUpdates /></div>
      <div className="items-center gap-x-3 text-sm hover:scale-110 transition-all cursor-pointer"><span className="text-xs">Token Update</span></div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)} className="flex-col flex items-center">
      <div className="text-2xl border border-white/20 rounded-xl size-16 mb-1 flex items-center justify-center bg-gradient-to-tr to-neutral-700 via-neutral-500 from-neutral-800"><LiaRobotSolid /></div>
      <div className="items-center gap-x-3 text-sm hover:scale-110 transition-all cursor-pointer"><span className="text-xs">Telegram Bots</span></div>
      </div>
    </div>
      </div>
    <div className="h-[1px] bg-gradient-to-l to-transparent via-white/10 from-transparent rounded-full w-full"></div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 p-5">
    <div>
      <div onClick={() => router.push(`/comingsoon`)} className="flex-col flex items-center">
      <div className="text-2xl border border-white/20 rounded-xl size-16 mb-1 flex items-center justify-center bg-gradient-to-tr to-neutral-700 via-neutral-500 from-neutral-800"><MdOutlineFeedback /></div>
      <div className="items-center gap-x-3 text-sm hover:scale-110 transition-all cursor-pointer"><span className="text-sm">Feedback</span></div>
      </div>
    </div>
      </div>
    </div>
  </div>
  </div>
);
};

export default MobileMenu;

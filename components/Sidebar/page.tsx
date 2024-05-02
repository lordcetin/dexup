'use client'
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { TbMenu2, TbMenuDeep } from "react-icons/tb";
import { PiSquaresFour,PiSwap } from "react-icons/pi";
import { HiMiniSquaresPlus } from "react-icons/hi2";
import { useRouter,usePathname } from "next/navigation";
import { GrMultiple } from "react-icons/gr";
import { TfiCup } from "react-icons/tfi";
import { SiWireshark } from "react-icons/si";
import { TbDrone } from "react-icons/tb";
import { BsCart2 } from "react-icons/bs";
import { RiUserVoiceLine } from "react-icons/ri";
import { LuNetwork } from "react-icons/lu";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { MdOutlineWaterDrop } from "react-icons/md";
import { LiaRobotSolid } from "react-icons/lia";
import { MdOutlineFeedback } from "react-icons/md";
import { TbStairs } from "react-icons/tb";
import { IoChevronDown } from "react-icons/io5";
import MobileMenu from "../MobileMenu/page";
type Props = {};

const Sidebar = (props: Props) => {

  const {isOpenSidebar,setSidebarToggle} = useAppContext();
  const [mobileMenu,setMobileMenu] = useState<boolean>(false)

  const router = useRouter()
  const pathname = usePathname()

  return (
    <>
    <div onClick={() => setMobileMenu(!mobileMenu)} className="max-md:flex items-center gap-x-1 hidden top-4 left-4 z-[99999999999] fixed">
    <Image src={'/logoicon.svg'} alt="Dexup Logo" width={800} height={800} className="size-6 object-cover"/>
    <div className="animate-bounce mt-3"><IoChevronDown size={23} className={mobileMenu ? 'rotate-180 transition-all' : 'rotate-0 transition-all'}/></div>
    </div>
    {mobileMenu ? <MobileMenu setMobileMenu={setMobileMenu} /> : null}
    <div className="flex group max-md:hidden">
  <aside className="w-[56px] flex-col flex group-hover:w-[180px] overflow-x-hidden flex-shrink-0 z-[999999999] h-full border-r-[1px] border-r-white fixed border-opacity-5 transition-all duration-300 ease-in-out group-hover:bg-brandblack group-hover:bg-opacity-30 group-hover:backdrop-blur-sm group-hover:overflow-y-auto group-hover:pb-5">
    <div className="flex justify-between items-center py-4">
      <div className="flex justify-center items-center w-full group-hover:hidden"><Link href={'/'}><Image src={'/logoicon.svg'} alt="Dexup Logo" width={800} height={800} className="size-6 object-cover"/></Link></div>
      <div className="hidden justify-center items-center w-full group-hover:flex"><Link href={'/'}><Image src={'/logo.svg'} alt="Dexup Logo" width={800} height={800} className="w-[120px] object-cover"/></Link></div>
      <div></div>
    </div>

    <div className="flex-col flex justify-center items-center gap-y-8 mt-12">
    <div className="w-full justify-center items-center flex relative">
      <div onClick={() => router.push('/')} className="">
        {pathname === '/' ? <span className="h-11 w-[2px] bg-gradient-to-t to-transparent via-sky-500 from-transparent absolute -right-[1px] -top-2"></span> : null}
      <div className={pathname === '/' ? "group-hover:hidden text-2xl text-sky-500" : "group-hover:hidden text-2xl"}><PiSquaresFour/></div>
      <div className={pathname === '/' ? "items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer text-sky-500" : "items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer"}><PiSquaresFour/> Home</div>
      </div>
    </div>
    <div className="w-full justify-center items-center flex relative group/btn">
      <div onClick={() => router.push(`/swap?chain=ethereum&pair=0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852`)}>
      {pathname === '/swap' ? <span className="h-11 w-[2px] bg-gradient-to-t to-transparent via-sky-500 from-transparent absolute -right-[1px] -top-2"></span> : null}
      {/* <span className="h-11 w-[2px] bg-gradient-to-t to-transparent via-sky-500 from-transparent absolute -right-[1px] -top-2 group-hover/btn:block hidden transition-all"></span> */}
      <div className={pathname === '/swap' ? "group-hover:hidden text-2xl text-sky-500" : "group-hover:hidden text-2xl"}><PiSwap/></div>
      <div className={pathname === '/swap' ? "items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer text-sky-500" : "items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer"}><PiSwap/> Swap</div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)}>
      <div className="group-hover:hidden text-2xl"><BsCart2/></div>
      <div className="items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer"><BsCart2/> Cart</div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)}>
      <div className="group-hover:hidden text-2xl"><RiUserVoiceLine /></div>
      <div className="items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer"><RiUserVoiceLine /> <span className="text-sm">AMA Room</span></div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)}>
      <div className="group-hover:hidden text-2xl"><MdOutlineWaterDrop /></div>
      <div className="items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer"><MdOutlineWaterDrop /> <span className="text-sm">New Pairs</span></div>
      </div>
    </div>
    <div className="h-[1px] bg-gradient-to-l to-transparent via-white/10 from-transparent rounded-full w-full"></div>
    <div className="w-full justify-center items-center flex relative">
      <div onClick={() => router.push(`/multichart`)}>
      {pathname === '/multichart' ? <span className="h-11 w-[2px] bg-gradient-to-t to-transparent via-sky-500 from-transparent absolute -right-[1px] -top-2"></span> : null}
      <div className={pathname === '/multichart' ? "group-hover:hidden text-2xl text-sky-500" : "group-hover:hidden text-2xl"}><GrMultiple /></div>
      <div className={pathname === '/multichart' ? "items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer text-sky-500" : "items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer"}><GrMultiple /> <span className="text-sm">Multichart</span></div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)}>
      <div className="group-hover:hidden text-2xl"><TfiCup /></div>
      <div className="items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer"><TfiCup /> <span className="text-sm">Top Traders</span></div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)}>
      <div className="group-hover:hidden text-2xl"><SiWireshark /></div>
      <div className="items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer"><SiWireshark /> <span className="text-sm">Top Whales</span></div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)}>
      <div className="group-hover:hidden text-2xl"><TbDrone /></div>
      <div className="items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer"><TbDrone /> <span className="text-sm">AI Analysis</span></div>
      </div>
    </div>
    <div className="h-[1px] bg-gradient-to-l to-transparent via-white/10 from-transparent rounded-full w-full"></div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)}>
      <div className="group-hover:hidden text-2xl"><LuNetwork /></div>
      <div className="items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer"><LuNetwork /> <span className="text-sm">Advertise</span></div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)}>
      <div className="group-hover:hidden text-2xl"><MdOutlineTipsAndUpdates /></div>
      <div className="items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer"><MdOutlineTipsAndUpdates /> <span className="text-sm">Token Update</span></div>
      </div>
    </div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)}>
      <div className="group-hover:hidden text-2xl"><LiaRobotSolid /></div>
      <div className="items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer"><LiaRobotSolid /> <span className="text-sm">Telegram Bots</span></div>
      </div>
    </div>
    <div className="h-[1px] bg-gradient-to-l to-transparent via-white/10 from-transparent rounded-full w-full"></div>
    <div>
      <div onClick={() => router.push(`/comingsoon`)}>
      <div className="group-hover:hidden text-2xl"><MdOutlineFeedback /></div>
      <div className="items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer"><MdOutlineFeedback /> <span className="text-sm">Feedback</span></div>
      </div>
    </div>
    </div>
  </aside>
    </div>
    </>
  );
};

export default Sidebar;

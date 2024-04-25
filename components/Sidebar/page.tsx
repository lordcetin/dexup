'use client'
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TbMenu2, TbMenuDeep } from "react-icons/tb";
import { PiSquaresFour,PiSwap } from "react-icons/pi";
type Props = {};

const Sidebar = (props: Props) => {

  const {isOpenSidebar,setSidebarToggle} = useAppContext();

  return (
    <div className="flex group">
  <aside className="w-[56px] flex-col flex group-hover:w-[180px] flex-shrink-0 z-[999999999] h-full border-r-[1px] border-r-white fixed border-opacity-5 transition-all duration-300 ease-in-out group-hover:bg-brandblack group-hover:bg-opacity-30 group-hover:backdrop-blur-sm">
    <div className="flex justify-between items-center py-4">
      <div className="flex justify-center items-center w-full group-hover:hidden"><Link href={'/'}><Image src={'/logoicon.svg'} alt="Dexup Logo" width={800} height={800} className="size-6 object-cover"/></Link></div>
      <div className="hidden justify-center items-center w-full group-hover:flex"><Link href={'/'}><Image src={'/logo.svg'} alt="Dexup Logo" width={800} height={800} className="w-[120px] object-cover"/></Link></div>
      <div></div>
    </div>
    <div className="flex-col flex justify-center items-center gap-y-8 mt-12">
    <div>
      <Link href="/">
      <div className="group-hover:hidden text-2xl"><PiSquaresFour/></div>
      <div className="items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer"><PiSquaresFour/> Home</div>
      </Link>
    </div>
    <div>
      <Link href="/swap">
      <div className="group-hover:hidden text-2xl"><PiSwap/></div>
      <div className="items-center gap-x-3 hidden group-hover:flex text-lg hover:scale-110 transition-all cursor-pointer"><PiSwap/> Swap</div>
      </Link>
    </div>
    </div>
  </aside>
    </div>
  );
};

export default Sidebar;

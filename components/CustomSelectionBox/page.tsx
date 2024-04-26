'use client';

import React from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

type Props = {
  contents:any,
  setSelectOpen:any
  selected:any
  selectOpen:any
  setSelected:any
};

const CustomSelectionBox = ({contents,selectOpen,setSelectOpen,selected,setSelected}: Props) => {
  return (
  <>
  {!selectOpen ?
  <div onClick={() => setSelectOpen(!selectOpen)} className="border border-white/20 rounded-lg px-3 py-2 gap-x-2 text-xs flex justify-between items-center text-white/80 hover:text-white hover:border-white transition-all cursor-pointer">
  <p className="first-letter:uppercase">{selected ? contents[selected]?.label : "All"}</p>
  {selectOpen ? 
  <IoChevronUp />
  :<IoChevronDown />
  }
  </div>
  :
  <div className="border border-white/20 p-2 w-96 rounded-lg flex-col items-center text-white/80 hover:text-white hover:border-white transition-all cursor-pointer absolute z-[99999999] bg-brandblack top-12">
    {contents.map((item:any,index:any) => {
      return(
        <div key={index} onClick={() => {setSelected(index),setSelectOpen(false)}} className="p-3 border-b-[1px] border-b-white/10 hover:border-white/10 hover:rounded-lg hover:bg-black/20 active:border-white outline-none">
          {item?.label}
        </div>
      )
    })}
  </div>
  }
  </>
);
};

export default CustomSelectionBox;

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
'use client'
import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa";
import { useSpring,animated } from 'react-spring';
import { datas,datax } from '@/lib/datas'
import { Area,LineChart,AreaChart,Line } from "recharts";
import Image from "next/image";
import { MdOutlineContentCopy } from "react-icons/md";


const Cronjobs = () => {

  return (
    <div className="flex-col items-center w-full max-md:w-96">
    {/*Investment*/}
    <div className="flex justify-center items-center gap-x-5">
    <div className="flex-col justify-start items-center w-[269px] h-[200px] boxgradient2 rounded-xl py-2 px-3 overflow-hidden">
    <h1>Investments</h1>
    <div className="flex justify-between items-center w-full">
      <div className="flex-col justify-start items-center px-2 grid gap-y-5 text-5xl">
      <div className="flex items-end gap-x-1">
      <FaBriefcase/>
      <AiOutlineArrowUp size={18} className="text-[#17E505]"/>
      </div>
      <p><Number n={88}/></p>
      </div>
      <div className="flex justify-end items-center overflow-hidden relative -right-5">
        <div className="">
        <AreaChart width={150} height={180} data={datas}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#17E505" stopOpacity={0.5}/>
            <stop offset="95%" stopColor="#17E505" stopOpacity={0}/>
          </linearGradient>
        </defs>
        
        <Area type="monotone" dataKey="uv" stroke="#17E505" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
        </div>
      </div>
    </div>
    </div>
    <div className="flex-col justify-start items-center w-[269px] h-[200px] boxgradient2 rounded-xl py-10">
    <div className="flex justify-center items-center w-full">
      <div className="flex justify-center items-center w-full text-center">
        <div className="">
          <div className="inline-block">
          <Image src='/assets/people.png' width={50} height={46} alt='' className="object-cover" />
          </div>
          <h1 className="text-3xl font-bold"><Number n={2648}/></h1>
          <p>people using <strong>DXP</strong></p>
        </div>
      </div>
    </div>
    </div>
    </div>
    {/*REFERRAL CODE*/}
    <div className="flex justify-between items-center mt-5 max-md:gap-x-4">
  
    <div className="flex justify-start items-center w-[269px] h-[95px] max-md:w-full max-md:text-xs py-2 px-5 rounded-xl boxgradient2 border border-orange-400">
    <div className="flex-col">
    <h1>Referral Code</h1>
    <p>3542516520</p>
    </div>
    <MdOutlineContentCopy className="text-xl mt-6 ml-3"/>
    </div>
    <div className="flex justify-start items-center w-[269px] max-md:w-full max-md:text-xs h-[95px] py-2 px-5 rounded-xl boxgradient2">
    <div className="flex-col">
    <h1>Link Referral Code</h1>
    <p>dexup.com/u/3542416520</p>
    </div>
    <MdOutlineContentCopy className="text-xl mt-6 ml-3"/>
    </div>
  
    </div>
    {/*DXP TOKENS & LINECHARTS*/}
    <div className="boxgradient2 w-[557px] h-[230px] max-md:w-96 rounded-xl py-2 px-4 mt-5">
  
    <div className="flex justify-between items-center w-full">
  
    <div className="flex justify-start items-center w-full">
  
      <div className="">
        <h1>Staking DXP Tokens</h1>
        <p className="text-lg font-semibold text-green-500">APY 16%</p>
      </div>
  
    </div>
  
    <div className="flex justify-end items-center">
      <LineChart
        width={150}
        height={50}
        data={datax}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 0
        }}
      >
    <Line type="monotone" dataKey="uv" dot={{ stroke: 'green', strokeWidth: 2 }} stroke="#FFFF" />
      </LineChart>
    </div>
  
    </div>
    <div className="flex justify-between items-center w-full">
  
    <div className="flex justify-start items-center w-full">
  
      <div className="">
        <h1>Total Validators</h1>
        <p className="text-lg font-semibold text-green-500">890</p>
      </div>
  
    </div>
  
    <div className="flex justify-end items-center">
      <LineChart
        width={150}
        height={50}
        data={datax}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 0
        }}
      >
    <Line type="monotone" dataKey="uv" dot={{ stroke: 'green', strokeWidth: 2 }} stroke="#FFFF" />
      </LineChart>
    </div>
  
    </div>
    <div className="flex justify-between items-center w-full">
  
    <div className="flex justify-start items-center w-full">
  
      <div className="">
        <h1>Total Stake</h1>
        <p className="text-lg font-semibold text-green-500">2.703.800 DXP</p>
      </div>
  
    </div>
  
    <div className="flex justify-end items-center">
      <LineChart
        width={150}
        height={50}
        data={datax}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 0
        }}
      >
    <Line type="monotone" dataKey="uv" dot={{ stroke: 'green', strokeWidth: 2 }} stroke="#FFFF" />
      </LineChart>
    </div>
  
    </div>
    <div className="flex justify-between items-center w-full">
  
    <div className="flex justify-start items-center w-full">
  
      <div className="">
        <h1>Total Reward Distributed</h1>
        <p className="text-lg font-semibold text-green-500">5.768.726 DXP</p>
      </div>
  
    </div>
  
    <div className="flex justify-end items-center">
      <LineChart
        width={150}
        height={50}
        data={datax}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 0
        }}
      >
    <Line type="monotone" dataKey="uv" dot={{ stroke: 'green', strokeWidth: 2 }} stroke="#FFFF" />
      </LineChart>
    </div>
  
    </div>
  
    </div>
    </div>
);
};

export default Cronjobs;
function Number({n}){
  const {number} = useSpring({
    from: {number:0},
    number: n,
    delay: 100,
    config: {mass:1,tension:20,friction:10},
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
}
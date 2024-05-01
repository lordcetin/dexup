'use client'
import React, { useEffect, useState } from "react";
import { AiFillFire } from "react-icons/ai";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { useSpring,animated } from 'react-spring';
import { RadialBar, RadialBarChart } from "recharts";
import { data,data2,datas,datax } from '@/lib/datas'
import ProgressBar from "../components/ProgressBar";

const Coingecko = () => {
  const [coingeckoDatas,setCoingeckoDatas] = useState([]);
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'}
    };
    const fetchCoingeckoApi = async () => {
      const response = await fetch(`https://pro-api.coingecko.com/api/v3/key`,options)
      const data = await response.json()
      console.log("data",data)
      setCoingeckoDatas(data)
    }
    fetchCoingeckoApi()
  },[])

  return (
  <div className="flex-col items-center w-full max-md:w-96">
  {/*Comparison*/}
  <div className="w-[391px] h-[200px] boxgradient2 rounded-xl py-2 px-3">
      <h1 className="text-xl font-semibold">Plan: {coingeckoDatas?.plan}</h1>
      <p className="text-white/60">Dakikada <strong>{coingeckoDatas?.rate_limit_request_per_minute}</strong> istek</p>
      <div className="flex justify-center items-center w-full mt-7 gap-x-6">
        <ProgressBar buys={coingeckoDatas?.monthly_call_credit} sells={coingeckoDatas?.current_remaining_monthly_calls} used={coingeckoDatas?.current_total_monthly_calls} title1="Toplam Aylık Call" title2="Kalan Aylık Call" title3="Kullanılan"/>
      </div>
      <div className="flex justify-center items-center w-full text-xs gap-x-2 mt-3">
          <div className="flex justify-center items-center gap-x-2">
            <div className="size-3 rounded-full bg-[#6366f1] box-content shrink-0"></div>
            <span title="toplam">Toplam {coingeckoDatas?.monthly_call_credit}</span>
          </div>
          <div className="flex justify-center items-center gap-x-2">
            <div className="size-3 rounded-full bg-[#fbbf24] box-content shrink-0"></div>
            <span>Kullanılan {coingeckoDatas?.current_total_monthly_calls}</span>
          </div>
          <div className="flex justify-center items-center gap-x-2">
            <div className="size-3 rounded-full bg-[#312e81] box-content shrink-0"></div>
            <span>Kalan {coingeckoDatas?.current_remaining_monthly_calls}</span>
          </div>
      </div>
  </div>
  {/*Comparison2*/}
  <div className="w-[391px] h-[200px] boxgradient2 rounded-xl py-2 px-3 mt-5">
      <h1 className="text-xl font-semibold">Comparison</h1>
      <div className="flex justify-center items-center w-full mt-5 gap-x-6">
          <div className="flex justify-center items-center relative overflow-hidden">
          <div className="bg-[#584A2F] flex justify-center items-center w-24 h-24 rounded-full absolute text-slate-50">
          45%
          </div>
          <RadialBarChart
          width={105}
          height={105}
          cx={48}
          cy={58}
          innerRadius={0}
          outerRadius={60}
          barSize={20}
          data={data}
          isAnimationActive
        >
          <RadialBar
            minAngle={15}
            background={false}     
            dataKey="uv"
          />
          </RadialBarChart>
          </div>
          <div className="flex justify-center items-center relative overflow-hidden">
          <div className="bg-[#582F42] flex justify-center items-center w-24 h-24 rounded-full absolute text-slate-50">
          59%
          </div>
          <RadialBarChart
          width={105}
          height={105}
          cx={50}
          cy={58}
          innerRadius={0}
          outerRadius={60}
          barSize={20}
          data={data2}
          isAnimationActive
        >
          <RadialBar
            minAngle={15}
            background={false}     
            dataKey="uv"
          />
          </RadialBarChart>
          </div>
      </div>
      <div className="flex justify-center items-center w-full text-xs gap-x-10 mt-3">
          <div className="flex justify-center items-center gap-x-2">
            <div className="w-4 h-4 rounded-full bg-[#ECBA3B]"></div>
            <span>Last Month</span>
          </div>
          <div className="flex justify-center items-center gap-x-2">
            <div className="w-4 h-4 rounded-full bg-[#EC853B]"></div>
            <span>Currently Month</span>
          </div>
      </div>
  </div>
  {/*Saved day*/}
  <div className="w-[391px] h-[125px] boxgradient2 rounded-xl py-2 px-3 mt-5 relative">
    <div className="absolute right-5">
      <div className="flex justify-center items-center text-[#F0883B] gap-x-1 text-sm">
        <span>4%</span>
        <BsArrowUpRightSquare />
      </div>
    </div>

    <div className="flex justify-start items-center w-full mt-5 gap-x-1">
      <AiFillFire size={56} className="text-[#FF6D00]"/>
      <span className="text-4xl"><Number n={2000}/></span>
    </div>
      <p className="ml-5">more than 20% is saved every day</p>
  </div>
  </div>
  );
};

export default Coingecko;
function Number({n}){
  const {number} = useSpring({
    from: {number:0},
    number: n,
    delay: 100,
    config: {mass:1,tension:20,friction:10},
  });
  return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
}
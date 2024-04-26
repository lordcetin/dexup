/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from "react";
import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";
import { CardStack } from "../ui/card-stack";
import meshobject from '@/public/assets/3dobjects.png'
import Image from "next/image";
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from "recharts";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import ItemContent from "../ItemContent/page";

const Landing = () => {

  
  const [tokenid,setTokenId] =  useState('bitcoin');
  const [selectedToken,setSelectedToken] = useState<any>();
  const [tokens,setTokens] = useState<any[]>([]);
  const [days,setDays] = useState('7');
  const [chartdata,setChartData] = useState([]);
  const [items,setItems] = useState([]);
  useEffect(() => {
    getPriceHistory()
  },[tokenid,days])

  const  getPriceHistory = async ()=>{

    // Fetch all tokens
    fetch(`https://pro-api.coingecko.com/api/v3/coins/${tokenid}`,{
      method:'GET',
      headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
      cache:'no-store',

    })
      .then((response:any) => response.json())
      .then((response:any) => {
        setTokens([response])
      })
      .catch(err => console.error(err));

      const res = await axios.get(`/api/getPrices?coinId=${tokenid}&currency=usd&days=${days}`)
      const data = res.data
      
      setChartData(data)

    // Fetch token price and timestamp by token id
    // const res = await axios.get(`/api/getPrices?coinId=${coinId}&currency=${currency}&days=${days}`)
    // const data = res.data
  }

  const toolstyle:any ={
    background: 'rgba(0, 0, 0, 0.00)',
    color: "#80D0C7",
    borderRadius:10,
    WebkitBorderRadius:10,
    MozBorderRadius:10,
    MsBorderRadius:10,
    OBorderRadius:10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    gap:5,
    fontWeight: "bold",
  }

  const labelstyle:any ={
    display: "none",
  }
  
  const contstyle:any ={
    background: 'rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(5px)',
    border:"none",
    outline:"none",
    width:160,
    margin:0,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:10,
    WebkitBorderRadius:10,
    MozBorderRadius:10,
    MsBorderRadius:10,
    OBorderRadius:10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize:12,
    boxShadow:'0px 5px 10px rgba(0, 0, 0, 0.09)',
  }

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ];
useEffect(() => {
  const getNews = async () => {
    const res = await fetch(`/api/news`)
    const data = await res.json()
    const newsItems = data.results.slice(0,4).map((news:any, index:any) => ({
      id: index,
      name: news.domain, // API'den gelen veri yapısına göre ayarlayın
      designation: news.title, // API'den gelen veri yapısına göre ayarlayın
      content: (
        <ItemContent news={news}/>
      )
    }));
    setItems(newsItems);
  }
  getNews()
},[])
  // const items = [
  //   {
  //   id:1,
  //   name:"BTC",
  //   designation:'bitcoin',
  //   content:  (
  //   <div className="flex-col flex items-center w-full">
  //     <div className="flex justify-between items-center w-full p-3">
  //       <div>BTC/USD</div>
  //       <div>$100</div>
  //     </div>
  //     <div className="flex justify-center items-center overflow-hidden w-full h-60">
  //       <div className="flex w-full h-[180px] items-center border">

  //       </div>
  //     </div>
  //   </div>
  //   )
  //   },
  //   {
  //   id:2,
  //   name:"ETH",
  //   designation:'ethereum',
  //   content:  (
  //     <div className="flex-col flex items-center w-full">
  //       <div className="flex justify-between items-center w-full p-3">
  //         <div>BTC/USD</div>
  //         <div>$100</div>
  //       </div>
  //       <div className="flex justify-center items-center overflow-hidden w-full h-60">
  //       <div className="flex w-full h-[180px] items-center border">

  //         </div>
  //       </div>
  //     </div>
  //     )
  //   },
  //   {
  //   id:3,
  //   name:"BNB",
  //   designation:'binance',
  //   content:  (
  //     <div className="flex-col flex items-center w-full">
  //       <div className="flex justify-between items-center w-full p-3">
  //         <div>BTC/USD</div>
  //         <div>$100</div>
  //       </div>
  //       <div className="flex justify-center items-center overflow-hidden w-full h-60">
  //       <div className="flex w-full h-[180px] items-center border">

  //         </div>
  //       </div>
  //     </div>
  //     )
  //   },
  // ]


  return (
    <div className="flex justify-center items-center w-full gap-x-6">
    <div className="w-[800px] h-[430px] overflow-hidden rounded-xl relative">
    <div className="absolute z-[999] flex-col items-center p-7 pointer-events-none">
      <h5 className="text-xs font-semibold mb-3">ETHEREUM 2.0</h5>
      <h1 className="text-4xl font-bold mb-3">Your Gateway<br/>into Blockchain</h1>
      <p className="">Dexup is a blockchain platform.<br/>We make blockchain accessible.</p>
      <button type="button" className="py-4 rounded-xl bg-black bg-opacity-40 block justify-center items-center text-xs mt-16 w-64 pointer-events-auto hover:bg-opacity-60 transition-all duration-300 ease-in-out">What is blockchain?</button>
    </div>
    <div className="absolute -right-24 animate-fifth z-50 top-36 pointer-events-none select-none">
      <Image src={meshobject} alt="Objects" width={500} height={500} className="w-full object-cover "/>
    </div>
    <BackgroundGradientAnimation/>
    </div>

    {items.length > 0 && <CardStack items={items} offset={12} scaleFactor={0.1}/>}

    {/* <div className="w-[465px] h-[430px] rounded-xl flex-col flex items-center white-glassmorphism py-7 px-5">


    <div className="flex justify-between self-start items-center w-full">

    {tokens.map((token:any) => {
      const price = token?.market_data?.current_price?.usd
      const amount = parseFloat(price)
      const formatted = new Intl.NumberFormat("en-US",{
        style:"currency",
        currency: "USD",
      }).format(amount)
      return (
        <>
        <div key={token.id} style={{borderRadius:'10px'}} className="rounded-md dark-glassmorphism px-3 py-2 cursor-pointer hover:shadow-xl hover:shadow-teal-300/10 flex items-center gap-x-2 text-neutral-300">
          <Image src={token?.image?.large} alt={token.name} width={300} height={300} className="size-4 rounded-full object-cover"/>
          <h1 className="uppercase text-sm">{token.symbol}/USD</h1>
          <IoIosArrowDown />
        </div>
        
        <div className="flex-col flex space-y-2 justify-end items-center">
          <div className="flex items-center gap-x-2">
            <h1 className="text-green-500 font-semibold self-end">{formatted}</h1>
            <h1 className="font-semibold self-end">{parseFloat(token.market_data.price_change_24h).toFixed(2)}%</h1>
          </div>
         <div className="flex items-center gap-x-2 text-[13px] text-neutral-400 self-end">
          <button type="button" onClick={() => setDays('1')} className={days === '1' ? "bg-black bg-opacity-80 hover:bg-opacity-50 px-2 py-1 rounded-lg text-white" : "bg-black bg-opacity-50 hover:bg-opacity-70 px-2 py-1 rounded-lg"}>1D</button>
          <button type="button" onClick={() => setDays('7')} className={days === '7' ? "bg-black bg-opacity-80 hover:bg-opacity-50 px-2 py-1 rounded-lg text-white" : "bg-black bg-opacity-50 hover:bg-opacity-70 px-2 py-1 rounded-lg"}>1W</button>
          <button type="button" onClick={() => setDays('30')} className={days === '30' ? "bg-black bg-opacity-80 hover:bg-opacity-50 px-2 py-1 rounded-lg text-white" : "bg-black bg-opacity-50 hover:bg-opacity-70 px-2 py-1 rounded-lg"}>1M</button>
         </div>
        </div>
        </>
      )
    })}
    </div>

    <div className="flex justify-center items-center w-full h-60 mt-6">
      <div className="flex items-center w-[465px] h-[250px] self-start">
      <AreaChart width={465} height={250} data={chartdata}
        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#82ca9d" stopOpacity={0.2}/>
            <stop offset="100%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Tooltip cursor={false} itemStyle={toolstyle} labelStyle={labelstyle} contentStyle={contstyle}/>
        <Area type="monotone" dataKey="Price" stroke="#82ca9d" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
      </div>
    
    </div>

    </div> */}

    </div>
  );
};

export default Landing;

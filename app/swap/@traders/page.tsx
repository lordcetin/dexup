/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DataTable } from "../DataTable/data-table";
import { columns } from "../DataTable/columns";
import { useAppContext } from "@/context/AppContext";

type Props = {};

const Traders = ({}: Props) => {
  const searchParams = useSearchParams() as any
  const chain = searchParams.get('chain')
  const pooladdress = searchParams.get('pair')
  const [traderData,setTraderData] = useState<any>([]);
  const [loadingtrader,setloadingtrader] = useState<boolean>(false);
  
  const { 
    setChain 
  } = useAppContext()

  useEffect(() => {
    const getTraders = async () => {
      setChain(chain)
      const response = await fetch(`/api/pairData?chain=${chain}&pooladdress=${pooladdress}`)
      const pairData = await response.json()

      const ressa = await fetch(`https://pro-api.coingecko.com/api/v3/onchain/networks/${chain}/pools/${pooladdress}/trades?trade_volume_in_usd_greater_than=0`,{
        method:'GET',
        headers:{'x-cg-pro-api-key': 'CG-HNRTG1Cfx4hwNN9DPjZGtrLQ'},
        cache:'no-cache'
      }).then((res:any) => res.json()).then((data:any) => {

        const tradedata = data.data.map((item:any) => { //filter((u:any) => u.attributes.to_token_address !== pairData?.baseaddress)
          const attributes = item.attributes;
          // İşlem türüne göre fiyatı seç
          const priceInUsd = attributes.kind === 'sell' ? attributes.price_from_in_usd : attributes.price_to_in_usd;
          const tokenAmount = attributes.kind === 'sell' ? attributes.to_token_amount : attributes.from_token_amount;
          return {
            id:item.id,
            block_number:item.attributes.block_number,
            block_timestamp:item.attributes.block_timestamp,
            price:priceInUsd,
            from_token_address:item.attributes.from_token_address,
            from_token_amount:item.attributes.from_token_amount,
            kind:item.attributes.kind,
            price_from_in_currency_token:item.attributes.price_from_in_currency_token,
            price_from_in_usd:item.attributes.price_from_in_usd,
            price_to_in_currency_token:item.attributes.price_to_in_currency_token,
            price_to_in_usd:item.attributes.price_to_in_usd,
            to_token_address:item.attributes.to_token_address,
            tokenAmount:tokenAmount,
            tx_from_address:item.attributes.tx_from_address,
            tx_hash:item.attributes.tx_hash,
            volume_in_usd:item.attributes.volume_in_usd,
          }

        })
         setTraderData(tradedata)
      }).catch((err)=>console.log('error in fetching traders',err))
    }
    
    getTraders()
    const intervalId = setInterval(() => {
      getTraders()
    },3000)
    return () => clearInterval(intervalId)
  },[])

  return (
    <div className="flex-col items-center w-[780px] rounded-xl p-5 bg-[#131722] mt-2 border border-white/10 max-md:w-96">
    <h1 className="flex items-center w-full text-white/50">Past 24 Hour Trades</h1>
    <div className="flex items-center w-full gap-x-2">
    <DataTable loadingtrader={loadingtrader} columns={columns} data={traderData} />
    </div>
  </div>
);
};

export default Traders;

/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from "react";
import styles from './styles.module.scss';
import axios from "axios";
import { DataTable } from "./DataTable/data-table";
import { Token, columns } from "./DataTable/columns";
import { useAppContext } from "@/context/AppContext";
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from "recharts";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

type Props = {};
type Prices = {
  Date:string,
  Price:number
};
const TopGainerLoser = ({}: Props) => {
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [netId, setNetId] = useState("");
  const [gailosloading, setLoadingGainLos] = useState<boolean>(false);
  const [netData, setNetData] = useState([]);
  const {isActive,networkId,networkShort} = useAppContext()
  const router = useRouter()

  useEffect(() => {
    const getGainLos = async () => {
      setLoadingGainLos(true);
      const res = await axios.get(`/api/topgainerslosers`)
      // const res = await axios.get(`/api/pooldatas`)
      const getter = res.data[0];
      setTopGainers(getter?.gainer)
      setTopLosers(getter?.loser)
      setLoadingGainLos(false);
    }
    setTimeout(() => {     
      getGainLos()
    }, 3000);

  }, [router]);
  


  return (
  <div className="flex-col flex justify-center items-center w-full">
    <div className="flex items-center gap-x-4 relative">

    <DataTable gailosloading={gailosloading} columns={columns} data={isActive === 'gainers' ? topGainers : topLosers} />
    <div className="w-[456px] h-[540px] border rounded-xl border-white/10 bg-gradient-to-tr from-black/15 via-slate-500/10 to-transparent flex justify-center items-center">
    <div className="flex-col flex justify-center items-center w-full h-full text-neutral-500">AD PLACE</div>
    </div>
    </div>

  </div>
  );
}

export default TopGainerLoser;

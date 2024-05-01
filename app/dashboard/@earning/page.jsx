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


const Earning = () => {
  function Number({n}){
    const {number} = useSpring({
      from: {number:0},
      number: n,
      delay: 100,
      config: {mass:1,tension:20,friction:10},
    });
    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
  }
  return (
  <div className="flex-col items-center w-full max-md:w-96">

  </div>
);
};

export default Earning;

'use client'
import React from "react";
import Image from "next/image";
import {motion} from 'framer-motion';
type Props = {};

const Loading = ({}: Props) => {

  return (
    <div className="">
    <div className="fixed top-0 left-0 z-[9999999] bg-zinc-950 w-full h-full flex justify-center items-center">
    <div className="flex justify-center items-center w-full text-center">
    <div className="flex-col justify-center items-center text-center">
    {/*<Image src={logo} width={100} height={80} alt="Cosmeta" className="justify-center items-center flex w-full relative top-24" />*/}
    <motion.div
    initial={{scale:0.5}}
    transition={{ duration:1, ease:'easeInOut'}}
    animate={{scale:1}}
    >
    <Image src={'/logo.svg'} width={500} height={500} className="w-full h-full flex justify-center" alt="Loading" />
    </motion.div>
{/*      <div className="w-12 h-12 border-t-2 border-b-0 border-l-0 border-r-0 border-purple-500 rounded-full shadow-xl shadow-purple-400 animate-spin">
        &nbsp;
      </div>*/}
    </div>
    </div>
    </div>
    </div>
    );
};

export default Loading;

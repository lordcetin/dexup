import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import React from "react";

type Props = {};

const ComingSoon = ({}: Props) => {
  return (
    <div className="flex justify-center items-center w-full">
    <h1 className="text-6xl font-bold z-[999999] mt-56 select-none pointer-events-none">COMING SOON</h1>
  <div className="w-screen h-screen flex justify-center items-center rounded-xl fixed top-0 left-0 z-0 opacity-50">
    <BackgroundGradientAnimation/>
  </div>
  </div>
  
);
};

export default ComingSoon;

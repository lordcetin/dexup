import React from "react";

type Props = {};

const Banner = (props: Props) => {
  return (
  <div className="w-[450px] max-md:w-80 h-56 border border-white/20 rounded-xl flex justify-center items-center bg-gradient-to-tr from-black/15 via-slate-500/10 to-transparent text-white/50">
    <span>AD PLACE</span>
  </div>
  );
};

export default Banner;

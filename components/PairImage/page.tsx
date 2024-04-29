/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {
  baseimage:any;
  quoteimage:any;
  size1:any;
  size2:any;
  classes:any
};

const PairImage = ({baseimage,quoteimage,size1,size2,classes}: Props) => {
  return (
    <div className={`relative flex items-center ${classes}`}>
    <img src={baseimage} width={800} height={800} className={`size-${size1} object-cover rounded-full`} alt=" "/>
    <img src={quoteimage} width={800} height={800} className={`size-${size2} object-cover rounded-full absolute -top-2 -right-3`} alt=" "/>
    </div>
);
};

export default PairImage;


import React from "react";
import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";

type Props = {

};

const AuroBanner = ({}: Props) => {


  return (
    <div className="flex justify-center items-center w-full h-56 object-cover rounded-t-xl overflow-hidden">
    <BackgroundGradientAnimation/>
    </div>
);
};

export default AuroBanner;

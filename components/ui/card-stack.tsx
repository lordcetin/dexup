"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  content: any;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);

    return () => clearInterval(interval);
  };

  return (
    <div className="relative w-[435px] max-md:w-96 h-96 mt-12">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute bg-brandblack h-96 w-[435px] max-md:w-96 rounded-3xl p-4 shadow-xl border border-white/[0.1] shadow-black/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <div className="flex-col items-center w-full font-normal text-neutral-200 backdropbackdrop-blur-2xl relative overflow-hidden">
            <div className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
            `[transform-origin:calc(50%-200px)]`,
            `animate-sixth`,
            `opacity-15`)}></div>
              {card.content}
            </div>
            <div>
              {/* <p className=" font-medium text-white ">
                {card.name}
              </p>
              <p className="font-normal text-neutral-200">
                {card.designation}
              </p> */}
            </div>

          </motion.div>
        );
      })}

    </div>
  );
};

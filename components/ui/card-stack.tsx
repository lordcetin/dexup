"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    <div className="relative w-[435px] h-96 mt-12">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute bg-brandblack h-96 w-[435px] rounded-3xl p-4 shadow-xl border border-white/[0.1] shadow-black/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <div className="flex-col items-center w-full font-normal text-neutral-200 backdropbackdrop-blur-2xl">
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

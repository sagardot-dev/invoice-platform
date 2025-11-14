"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

export const Landing = () => {
  return (
    <div className=" relative md:min-h-140 min-h-70  w-full  pt-21 perspective-distant transform-3d pr-8 p-2 md:p-4 ">
      <motion.div
      initial={{
        opacity: 0,
        y: -100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut'
      }}
      className=" perspective-[4000px] shadow-2xl"
      >
        <Image
          src={"/white.png"}
          alt="hero"
          width={1400}
          height={1900}
          className={cn(
            " absolute inset-0 rounded-2xl mask-r-from-30% mask-b-from-50% shadow-2xl"
          )}
          style={{
            transform: 'rotateY(30deg) rotateX(40deg) rotateZ(-15deg)',
          }}
        />
       
      </motion.div>
      <motion.div
      initial={{
        opacity: 0,
        y: -300,
      }}
      animate={{
        opacity: 1,
        y: -10,
      }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut'
      }}
      className=" perspective-[4000px] translate-x-30 -translate-y-20 shadow-2xl rounded-2xl "
      >
        <Image
          src={"/white1.png"}
          alt="hero"
          width={1400}
          height={1900}
          className={cn(
            " absolute inset-0 rounded-2xl  mask-b-from-85% shadow-2xl border-8 border-accent dark:border-accent-foreground/70 "
          )}
          style={{
            transform: 'rotateY(30deg) rotateX(40deg) rotateZ(-15deg)',
          }}
        />
       
      </motion.div>
    </div>
  );
};

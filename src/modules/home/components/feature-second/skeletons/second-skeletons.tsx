"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import React, { ElementType } from "react";
import {
  SiReact,
  SiGooglecloud,
  SiGooglesheets,
  SiJenkins,

} from "react-icons/si";

export const CardSkeletonTwo = () => {
  return (
    <div className=" flex-1 absolute  mx-auto w-full h-full inset-x-0 rounded-t-3xl  p-2 gap-y-3 flex items-center justify-center mask-b-from-90% transform rotate-20 -skew-x-10 -skew-y-12 mask-t-from-90%   ">
      <Circle
        duration={3}
        className="size-20 flex items-center justify-center border-accent/50 shadow-md bg-muted-foreground/10 z-99"
      >
        <Image
          src={"/logo.svg"}
          width={20}
          height={20}
          alt="logo"
          className=" size-8 text-accent opacity-90 "
        />
      </Circle>
      <Circle
        duration={3}
        className=" size-42 border-accent/50 shadow-sm bg-muted-foreground/10  relative"
      >
        <SiReact className=" absolute m-auto top-10 left-6" />
      </Circle>
      <Circle
        duration={5}
        className=" size-62 border-accent/40 shadow-md/10 bg-muted-foreground/10 z-7"
      >
        <SiGooglesheets className=" absolute m-auto top-10 left-6" />
      </Circle>{" "}
      <Circle
        duration={13}
        className=" size-82 border-accent/20 shadow-md/10 bg-muted-foreground/10 z-5"
      >
        <SiJenkins className=" absolute m-auto top-20 left-6" />
      </Circle>{" "}
      <Circle
        duration={20}
        className=" size-105 border-accent/10 shadow-sm bg-muted-foreground/10 z-4"
      >
        <SiGooglecloud className=" absolute m-auto top-40 left-6" />
      </Circle>
    </div>
  );
};

const Circle = ({
  className,
  children,
  duration,
}: {
  className: string;
  children: React.ReactNode;
  duration: number;
}) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: duration, ease: "easeInOut", delay: 0.9 }}
      className={cn(
        "  border border-transparent rounded-full absolute inset-0 m-auto z-10   ",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

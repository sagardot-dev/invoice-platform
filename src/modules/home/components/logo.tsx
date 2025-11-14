'use client'
import { Container } from "@/components/global/container";
import { logos } from "@/const";
import Image from "next/image";
import React from "react";
import { Heading, SubHeading } from "./heading";
import { motion } from "motion/react";

export const Logos = () => {
  return (
    <Container className=" py-15 flex flex-col justify-center items-center md:gap-y-14 gap-y-9">
      <div className=" flex flex-col justify-center items-center ">
        <h2  className=" py-2 tracking-tight font-bold text-xl">
          Trusted by 1000+ Tailor Brand
        </h2>
        <SubHeading className=" text-accent-foreground/40">
          From paper to digital without any headache
        </SubHeading>
      </div>
      <div className=" grid grid-cols-3 grid-rows-2 lg:gap-x-50 gap-x-30 md:gap-y-20 gap-y-10 max-w-4xl mx-auto ">
        {logos.map((logo) => (
          <motion.div
          initial={{
            y: -10,
            opacity: 0,
            filter: 'blur(10px)'
          }}
          whileInView={{
            y: 0,
            opacity: 1,
            filter: 'blur(0px)'
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
            delay: 0.1,
          }}
          className=" animate-pulse" key={logo.name} >
            <Image alt="logo" width={50} height={50} src={logo.src} />
          </motion.div>
        ))}
      </div>
    </Container>
  );
};

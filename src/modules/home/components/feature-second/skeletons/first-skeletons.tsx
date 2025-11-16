"use client";
import { STACK_THREE, STACK_THREE_B, STACK_THREE_C } from "@/const";
import { cn } from "@/lib/utils";
import { ClipboardCheck, CloudDownload, FileIcon, Webhook } from "lucide-react";
import { motion } from "motion/react";
import React, { ElementType } from "react";

export const CardSkeletonOne = () => {
  return (
    <div className=" flex-1 bg-accent absolute max-w-sm mx-auto w-full h-full inset-x-0 rounded-t-3xl border border-border p-2 gap-y-3 flex flex-col mask-b-from-90%">
      <Card
        heading=" Invoice Management"
        description="Generate and track invoices, keeping your workflow smooth."
        Svg={FileIcon}
        stack={STACK_THREE}
        className=" bg-muted-foreground"
      />
      <Card
        heading=" Real-Time Performance"
        description="Monitor your sales and payments instantly, with analytics at a glance."
        Svg={Webhook}
        stack={STACK_THREE_B}
        className="bg-chart-2"
      />
      <Card
        heading=" Secure Cloud Storage"
        description="Store all your invoices safely in the cloud and access them from anywhere."
        Svg={CloudDownload}
        stack={STACK_THREE_C}
        className="bg-primary"
      />
    </div>
  );
};

const Tag = ({ stack }: { stack: typeof STACK_THREE }) => {
  return (
    <>
      {stack.map((item) => (
        <div
          key={item.name}
          className=" rounded-md  flex items-center gap-1 px-1 py-0.5 border border-border/80 text-sm w-fit justify-center"
        >
          <item.icon className=" size-3" />
          <span className=" text-sm">{item.name}</span>
        </div>
      ))}
    </>
  );
};

const Card = ({
  heading,
  description,
  Svg,
  stack,
  className,
}: {
  heading: string;
  description: string;
  Svg: ElementType;
  stack: typeof STACK_THREE;
  className?: string;
}) => {
  return (
    <>
      <div className=" p-4  shadow-black/10 border border-transparent ring-1 ring-accent-foreground/10 rounded-2xl bg-background flex flex-col gap-2 ">
        <div className=" flex gap-x-2">
          <div
            className={cn(
              " size-7 rounded-full flex items-center justify-center shrink-0 ",
              className
            )}
          >
            <Svg className=" size-4 text-accent" />
          </div>
          <div className=" flex flex-col gap-1">
            <p className=" text-lg font-bold text-accent-foreground">
              {heading}
            </p>
            <p className=" text-base text-accent-foreground/70 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        <div className=" flex flex-wrap gap-y-2 items-center justify-start max-w-3xs mx-auto gap-x-1">
          <Tag stack={stack} />
        </div>
      </div>
    </>
  );
};

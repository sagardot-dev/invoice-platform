"use client";
import { Container } from "@/components/global/container";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

export const SecondFeature = () => {
  return (
    <section className=" py-12 px-6 md:px-0">
      <Container className=" ">
        <div className=" grid grid-cols-1 md:grid-cols-2 border-y border-border divide-x divide-border ">
          <div className="p-8">
            <h2 className=" text-lg font-bold">Smart Invoice Platform</h2>
            <CardDescription>
              Create invoices fast and monitor performance in real time  and time efficent.
            </CardDescription>
            <CardSkeleton>lee</CardSkeleton>
          </div>
          <div className="p-8">
            <h2 className=" text-lg font-bold">Next-Gen Billing System</h2>
            <CardDescription>
              Generate invoices, track payments, and analyze metrics from one
              dashboard.
            </CardDescription>
            <CardSkeleton>
                
            </CardSkeleton>
          </div>
        </div>
      </Container>
    </section>
  );
};

export const CardDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className=" mt-2 max-w-sm text-balance">{children}</p>;
};

export const CardSkeleton = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative h-80 sm:h-60 md:h-80 overflow-hidden perspective-distant",
        className
      )}
    >
      {children}
    </div>
  );
};


export const CardSkeletonOne = ()=>{
    
}

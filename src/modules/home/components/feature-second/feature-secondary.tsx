"use client";
import { Container } from "@/components/global/container";
import { cn } from "@/lib/utils";
import React from "react";
import { CardSkeletonOne } from "./skeletons/first-skeletons";
import { CardSkeletonTwo } from "./skeletons/second-skeletons";

export const SecondFeature = () => {
  return (
    <section className=" py-22 px-6 md:px-0">
      <Container className=" ">
        <div className=" grid grid-cols-1 md:grid-cols-2 md:border-y border-border md:divide-x divide-border  gap-y-14 md:gap-y-0 ">
          <div className=" flex flex-col gap-y-4">
            <div className=" p-6 flex flex-col items-center justify-center md:items-start">
              <h2 className=" text-lg font-bold">Smart Invoice Platform</h2>
              <CardDescription>
                Create invoices fast and monitor performance in real time and
                time efficent.
              </CardDescription>
            </div>

            <CardSkeleton>
              <CardSkeletonOne />
            </CardSkeleton>
          </div>
          <div className="  flex flex-col gap-y-4">
            <div className="p-6 flex flex-col items-center justify-center md:items-start">
              <h2 className=" text-lg font-bold">Next-Gen Billing System</h2>
              <CardDescription>
                Generate invoices, track payments, and analyze metrics from one
                dashboard.
              </CardDescription>
            </div>

            <CardSkeleton>
              <CardSkeletonTwo />
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
  return (
    <p className=" mt-2 max-w-sm text-balance text-center md:text-start">
      {children}
    </p>
  );
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
        "relative h-80 sm:h-60 md:h-90 flex flex-col overflow-hidden perspective-distant",
        className
      )}
    >
      {children}
    </div>
  );
};

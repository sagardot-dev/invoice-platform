import { Container } from "@/components/global/container";
import React from "react";
import { Heading, SubHeading } from "./heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowBigRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Landing } from "./landinImage";

export const Hero = () => {
  return (
    <div className=" pt-15 md:pt-26 lg:pt-36  px-8">
      <Container className=" gap-y-5 ">
        <Heading as="h1" className=" font-bold  ">
          Simplify <span className=" text-primary px-3">Invoice</span>
          and Get Paid Faster <br /> All From a Single Easy-to-Use Platform.
        </Heading>
        <SubHeading className=" py-7 ">
          "Create, send, and track invoices in seconds — all in one intuitive
          platform. Say goodbye to paperwork and stay organized effortlessly."
        </SubHeading>
        <div className=" flex items-center gap-x-6 py-3">
          <Button
            asChild
            className=" shadow-brand h-8! bg-linear-0 from-chart-5 via-primary to-chart-1 text-shadow-xs"
          >
            <Link prefetch href={"/invoices"}>
              Get Start Now <ArrowRight className=" size-4" />
            </Link>
          </Button>
          <Button
            className=" border border-border h-8!"
            variant={"ghost"}
            asChild
          >
            <Link
              className=" flex justify-center items-center gap-x-3"
              href={"#"}
            >
              View Demo Try
              <ArrowRight className=" size-4" />
            </Link>
          </Button>
        </div>
        <Landing />
      </Container>
    </div>
  );
};

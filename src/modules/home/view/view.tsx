import React from "react";
import Nav from "../components/nav";
import { Hero } from "../components/hero";
import InvoiceFeatures from "../components/feature";
import Footer from "../components/footer";
import { Logos } from "../components/logo";
import { SecondFeature } from "../components/feature-second/feature-secondary";

export const HomeView = () => {
  return (
    <div className=" min-h-screen relative">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,black_70%,transparent_110%)] opacity-25 -z-5" />
      <Nav />
      <Hero />
      <Logos />
      <InvoiceFeatures />
      <SecondFeature />
      <Footer />
    </div>
  );
};

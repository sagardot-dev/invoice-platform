"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Star,
  ArrowRight,
  FileText,
  TrendingUp,
  BarChart3,
  Clock,
  Quote,
  DollarSign,
  Users,
  Zap,
  CheckCircle,
  Receipt,
} from "lucide-react";
import InvoiceFeatures from "./feature";
import Link from "next/link";
import { ModeToggle } from "@/components/global/mode-toggle";
import Footer from "./footer";
import { testimonials } from "@/const";

export default function InvoiceLandingPage() {
  const stats = [
    { value: "50K+", label: "Invoices Created" },
    { value: "$10M+", label: "Revenue Tracked" },
    { value: "5K+", label: "Happy Businesses" },
    { value: "4.9/5", label: "User Rating" },
  ];

  return (
    <div className="min-h-screen  antialiased">
      <div className=" w-full max-w-7xl  mx-auto">
        <div className="fixed inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,black_70%,transparent_110%)] opacity-35" />
        <div className="relative">
          {/* Navigation */}
          <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center ">
            <div className="flex items-center justify-center space-x-3">
              <Image
                src="/logo.svg"
                alt="Invoice App Logo"
                width={16}
                height={20}
              />
              <span className="font-bold text-foreground text-lg">
                D-Invoice
              </span>
            </div>

            <div className=" flex gap-x-4 justify-center items-center">
              <Button className="rounded-full">
                <Link prefetch href={"/dashboard"}>
                  Get Started
                </Link>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <ModeToggle />
            </div>
          </nav>

          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 pt-20 pb-32  text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              💼 Trusted by 5,000+ Businesses
            </Badge>

            <h1 className="font-bold text-4xl md:text-7xl text-foreground max-w-4xl mx-auto tracking-tight leading-tight">
              Create Invoices &{" "}
              <span className="text-primary">Track Sales</span> Effortlessly
            </h1>

            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
              The ultimate invoicing platform for businesses. Generate
              professional invoices in seconds and track your sales performance
              year over year. Simplify your billing and grow your revenue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
              <Button size="lg" className="rounded-full text-base px-8">
                <Link prefetch href={"/dashboard"}>
                  Start today
                </Link>
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
            {/* Stats Section */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card className="bg-card border-border p-6 text-center">
                <Receipt className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">
                  50K+
                </div>
                <div className="text-sm text-muted-foreground">
                  Invoices Created
                </div>
              </Card>
              <Card className="bg-card border-border p-6 text-center">
                <DollarSign className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">
                  $10M+
                </div>
                <div className="text-sm text-muted-foreground">
                  Revenue Tracked
                </div>
              </Card>
              <Card className="bg-card border-border p-6 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">
                  5K+
                </div>
                <div className="text-sm text-muted-foreground">
                  Happy Businesses
                </div>
              </Card>
              <Card className="bg-card border-border p-6 text-center">
                <CheckCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">
                  99.9%
                </div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </Card>
            </div>
          </section>

          <>
            <InvoiceFeatures />
          </>

          {/* Features Section */}

          {/* Testimonials Section */}

          {/* Footer */}
          <>
            <Footer />
          </>
        </div>
      </div>
    </div>
  );
}

export const Testimonial = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  return (
    <section className="max-w-7xl mx-auto px-6 md:pb-32 pb-26 pt-0 md:pt-10 md:py-20">
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-secondary text-secondary-foreground">
          Testimonials
        </Badge>
        <h2 className="text-xl md:text-5xl font-bold text-foreground mb-4">
          Loved by Business Owners
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          See how businesses like yours are saving time and growing revenue with
          our invoicing platform.
        </p>
      </div>

      {/* Additional Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {testimonials.map((testimonial, i) => (
          <Card
            key={i}
            className="bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
            onClick={() => setActiveTestimonial(i)}
          >
            <CardContent className="p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-primary/50 flex items-center justify-center text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export const Features = () => {
  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Create Invoices",
      description:
        "Generate professional invoices in seconds with customizable templates and automated calculations.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Track Sales",
      description:
        "Monitor your revenue over time with detailed sales tracking and year-over-year comparisons.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics Dashboard",
      description:
        "Visualize your business performance with comprehensive charts and actionable insights.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Save Time",
      description:
        "Automate repetitive tasks and reduce invoice creation time by up to 90%.",
    },
  ];
  return (
    <section className="max-w-7xl mx-auto px-6 pb-30 md:pt-10  ">
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-secondary text-secondary-foreground">
          Features
        </Badge>
        <h2 className="text-xl md:text-5xl font-bold text-foreground mb-4">
          Everything Your Business Needs
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          Powerful invoicing and sales tracking tools designed to help your
          business grow and stay organized.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <Card
            key={i}
            className="bg-card border-border hover:border-primary/50 transition-all duration-300 group"
          >
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

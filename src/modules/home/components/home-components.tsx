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
} from "lucide-react";
import InvoiceFeatures from "./feature";

export default function InvoiceLandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "David Miller",
      role: "Founder",
      company: "Miller Consulting",
      avatar: "👨‍💼",
      content:
        "This invoice platform saved me hours every week. Creating professional invoices is now effortless, and tracking my sales has never been easier. Best investment for my business!",
      rating: 5,
    },
    {
      name: "Jessica Thompson",
      role: "Small Business Owner",
      company: "Thompson Design Studio",
      avatar: "👩‍💼",
      content:
        "Finally, an invoicing solution that actually works! The sales tracking features help me understand my business growth. My clients love how professional the invoices look.",
      rating: 5,
    },
    {
      name: "Robert Chen",
      role: "Freelance Developer",
      company: "Chen Tech Solutions",
      avatar: "👨‍💻",
      content:
        "I've tried many invoicing tools, but this one stands out. The yearly sales analytics give me insights I never had before. Managing my finances has become stress-free.",
      rating: 5,
    },
  ];

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

  const stats = [
    { value: "50K+", label: "Invoices Created" },
    { value: "$10M+", label: "Revenue Tracked" },
    { value: "5K+", label: "Happy Businesses" },
    { value: "4.9/5", label: "User Rating" },
  ];

  return (
    <div className="min-h-screen bg-background antialiased">
      <div className=" w-full max-w-7xl  mx-auto">
        {/* Background Pattern */}
        <div className="fixed inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />

        <div className="relative">
          {/* Navigation */}
          <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.svg"
                alt="Invoice App Logo"
                width={20}
                height={20}
              />
              <span className="font-bold text-foreground text-lg">
                D-Invoice
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-1 border border-border bg-card rounded-full px-2 py-1.5">
              <Button variant="ghost" size="sm" className="rounded-full">
                Features
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full">
                Pricing
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full">
                About
              </Button>
            </div>

            <Button className="rounded-full">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </nav>

          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              💼 Trusted by 5,000+ Businesses
            </Badge>

            <h1 className="font-bold text-4xl md:text-7xl text-foreground max-w-4xl mx-auto leading-tight">
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
                Start today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-20">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="max-w-7xl mx-auto px-6 pb-20">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-secondary text-secondary-foreground">
                Features
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Everything Your Business Needs
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Powerful invoicing and sales tracking tools designed to help
                your business grow and stay organized.
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

          {/* How It Works */}
          <section className="max-w-7xl mx-auto px-6 pb-20">
            <div className="text-center mb-10">
              <Badge className="mb-4 bg-secondary text-secondary-foreground">
                How It Works
              </Badge>
              <h2 className="text-2xl md:text-5xl font-bold text-foreground mb-4">
                Get Started in 3 Simple Steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: <Users className="w-8 h-8" />,
                  title: "Sign Up Free",
                  description:
                    "Create your account in under 60 seconds. No credit card required.",
                },
                {
                  step: "02",
                  icon: <FileText className="w-8 h-8" />,
                  title: "Create Invoice",
                  description:
                    "Use our templates to generate professional invoices instantly.",
                },
                {
                  step: "03",
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "Track Growth",
                  description:
                    "Monitor your sales and revenue with powerful analytics.",
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="bg-card border-border relative overflow-hidden"
                >
                  <CardContent className="p-8">
                    <div className="absolute top-4 right-4 text-6xl font-bold text-muted opacity-10">
                      {item.step}
                    </div>
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="max-w-7xl mx-auto px-6 pb-32">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-secondary text-secondary-foreground">
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Loved by Business Owners
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                See how businesses like yours are saving time and growing
                revenue with our invoicing platform.
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
                        <Star
                          key={j}
                          className="w-4 h-4 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-lg">
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

          <>
            <InvoiceFeatures />
          </>

          {/* Footer */}
          <footer className="border-t border-border mt-20 py-10">
            <div className=" mx-auto px-6 py-12">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/logo.svg"
                    alt="Invoice App Logo"
                    width={32}
                    height={32}
                    className="rounded-lg"
                  />
                  <span className="font-bold text-foreground">D-Invoice</span>
                </div>

                <p className="text-sm text-muted-foreground">
                  © 2025 D-Invoice. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  DollarSign,
  TrendingUp,
  Users,
  Terminal,
  Receipt,
  CreditCard,
  PieChart,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { motion } from "motion/react";

const InvoiceFeatures = () => {
  const [activeItems, setActiveItems] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveItems([0, 1, 2, 3, 4, 5]);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const recentActivity = [
    {
      icon: "📄",
      title: "Invoice Created",
      status: "success",
      time: "2min ago",
      description: "Invoice #INV-2847 sent to Acme Corp - $3,250.00",
      color: "blue",
    },
    {
      icon: "💰",
      title: "Payment Received",
      status: "success",
      time: "15min ago",
      description: "Invoice #INV-2845 fully paid by Tech Solutions Ltd",
      color: "green",
    },
    {
      icon: "⏰",
      title: "Payment Reminder",
      status: "processing",
      description: "Auto reminder sent for Invoice #INV-2832 - Due in 3 days",
      color: "orange",
    },
    {
      icon: "✅",
      title: "Invoice Approved",
      status: "success",
      time: "1hr ago",
      description: "Client approved Invoice #INV-2846 - Ready to send",
      color: "purple",
    },
    {
      icon: "📊",
      title: "Monthly Report",
      status: "processing",
      description: "Generating November 2025 sales analytics report",
      color: "cyan",
    },
    {
      icon: "🎯",
      title: "Revenue Milestone",
      status: "success",
      time: "3hr ago",
      description: "Congratulations! You've reached $100K in revenue",
      color: "indigo",
    },
  ];

  const platformFeatures = [
    { name: "Invoice Builder", icon: "📝", category: "Core" },
    { name: "Payment Gateway", icon: "💳", category: "Payments" },
    { name: "Analytics", icon: "📊", category: "Reports" },
    { name: "Client Portal", icon: "👥", category: "Client" },
    { name: "Auto Reminders", icon: "🔔", category: "Automation" },
    { name: "Tax Calculator", icon: "🧮", category: "Finance" },
  ];

  const capabilities = [
    {
      icon: FileText,
      label: "Invoice Management",
      color: "blue",
      active: false,
    },
    {
      icon: BarChart3,
      label: "Sales Analytics",
      color: "green",
      active: false,
    },
    {
      icon: DollarSign,
      label: "Payment Tracking",
      color: "purple",
      active: true,
    },
    {
      icon: Users,
      label: "Client Management",
      color: "cyan",
      active: false,
    },
  ];

  const businessTools = [
    "Professional Templates",
    "Multi-Currency Support",
    "Tax Automation",
    "PDF Export",
    "Email Integration",
    "Recurring Invoices",
    "Payment Gateway",
    "Custom Branding",
    "Client Dashboard",
    "Mobile App",
    "Expense Tracking",
    "Time Tracking",
  ];

  return (
    <section className="lg:py-10 relative overflow-hidden">
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee var(--marquee-duration) linear infinite;
        }
      `}</style>

      <div className="max-w-7xl px-4 md:px-8 mx-auto md:py-10 md:pt-60 py-5 ">
        {/* Section Header */}
        <div className="mb-10 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-center">
            How D-Invoice Works
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl text-center mx-auto">
            Complete invoicing solution with real-time tracking and powerful
            analytics
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0.1,
          }}
          className=" rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-10 border-border/70 p-2 "
        >
          <div className=" grid grid-cols-1 md:grid-cols-2 bg-accent/5  backdrop-blur-2xl rounded-xl ">
            {/* Recent Activity */}
            <div className="border-b md:border-b border-border md:border-r pb-5">
              <div className="p-4 md:p-8">
                <h2 className="text-lg font-bold text-card-foreground">
                  Recent Activity
                </h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Real-time updates on invoices, payments, and business
                  operations.
                </p>
              </div>
              <div className="relative h-80 overflow-hidden p-4">
                <Card className="bg-muted border-border h-full overflow-hidden shadow-[inset_-12px_-8px_40px_#46464620] ">
                  <div className="border-b border-border p-4 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm font-bold text-card-foreground">
                      Business Activity
                    </p>
                  </div>
                  <div className="p-4 space-y-3 overflow-auto max-h-[280px]">
                    {recentActivity.map((activity, i) => (
                      <div
                        key={i}
                        className="animate-slide-in"
                        style={{
                          opacity: activeItems.includes(i) ? 1 : 0,
                          animationDelay: `${i * 150}ms`,
                        }}
                      >
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="size-5 rounded-sm flex items-center justify-center text-sm bg-linear-to-br from-primary to-primary/50">
                              {activity.icon}
                            </div>
                            <p className="text-sm text-foreground truncate">
                              {activity.title}
                            </p>
                            {activity.status === "success" && activity.time && (
                              <Badge
                                variant="secondary"
                                className="bg-primary/10 text-primary border-primary/20 text-xs"
                              >
                                ✓
                              </Badge>
                            )}
                            {activity.status === "processing" && (
                              <Badge className="bg-secondary text-secondary-foreground text-xs">
                                PENDING
                              </Badge>
                            )}
                          </div>
                          {activity.time && (
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {activity.time}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 ml-7 truncate">
                          {activity.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* Platform Features */}
            <div className="border-b md:border-b border-border">
              <div className="p-4 md:p-8">
                <h2 className="text-lg font-bold text-card-foreground">
                  Platform Features
                </h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Powerful tools to streamline your invoicing and business
                  management.
                </p>
              </div>
              <div className="relative h-80 overflow-hidden flex items-center justify-center p-7">
                <div className="grid grid-cols-3 gap-4 mx-auto w-full max-w-md">
                  {platformFeatures.map((feature, i) => (
                    <div
                      key={i}
                      className=" rounded-xl border border-border bg-linear-to-br from-card to-muted relative overflow-hidden group hover:border-primary/50 transition-all duration-300"
                      style={{
                        animationDelay: `${i * 100}ms`,
                      }}
                    >
                      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10 flex flex-col items-center justify-center h-full p-2">
                        <span
                          className="text-3xl mb-2 animate-float"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        >
                          {feature.icon}
                        </span>
                        <p className="text-xs text-foreground font-medium text-center">
                          {feature.name}
                        </p>
                        <Badge
                          variant="secondary"
                          className="bg-muted text-muted-foreground border-border text-[10px] mt-1"
                        >
                          {feature.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size[40px_40px] opacity-10 pointer-events-none" />
              </div>
            </div>

            {/* Invoice Operations */}
            <div className="md:border-r border-border w-full border-b md:border-b-0 pb-6">
              <div className="px-3 py-2 md:px-8 md:py-2 mt-6">
                <h2 className="text-lg font-bold text-card-foreground">
                  Core Operations
                </h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Essential features for complete invoice and payment
                  management.
                </p>
              </div>
              <div className="relative overflow-hidden flex flex-wrap items-center justify-center px-4">
                <div className="relative z-10 w-full">
                  <div className="w-full flex gap-x-2">
                    <Card className="bg-linear-to-br from-primary/10 to-transparent border-primary/20 p-4 mt-6 w-full">
                      <FileText className="w-8 h-7 text-primary mb-2" />
                      <h3 className="text-sm font-bold text-foreground">
                        Create Invoices
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Templates & Auto-calc
                      </p>
                    </Card>
                    <Card className="bg-linear-to-br from-primary/10 to-transparent border-primary/20 p-4 mt-6 w-full">
                      <TrendingUp className="w-8 h-7 text-primary mb-2" />
                      <h3 className="text-sm font-bold text-foreground">
                        Track Sales
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Analytics & Reports
                      </p>
                    </Card>
                  </div>
                  <div className="mt-3">
                    <Card className="bg-linear-to-r from-primary/10 via-transparent to-primary/10 border-primary/20 p-4">
                      <DollarSign className="w-8 h-6 text-primary mb-2" />
                      <h3 className="text-sm font-bold text-foreground">
                        Payment Management
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Gateway Integration, Multi-Currency, Auto Reminders
                      </p>
                    </Card>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[40px_40px] opacity-10 pointer-events-none" />
              </div>
            </div>

            {/* Business Capabilities */}
            <div>
              <div className="p-4 md:p-8 pt-6">
                <h2 className="text-lg font-bold text-card-foreground">
                  Business Tools
                </h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Everything you need to manage invoices and grow your business.
                </p>
              </div>
              <div className="relative">
                <div className="p-4">
                  <div className="flex gap-2 flex-wrap mb-6">
                    {capabilities.map((capability, i) => (
                      <button
                        key={i}
                        className={`px-3 py-2 rounded-lg text-xs flex items-center gap-2 transition-all ${
                          capability.active
                            ? "bg-muted border border-border text-foreground shadow-lg"
                            : "bg-card/50 border border-border text-muted-foreground opacity-70 hover:opacity-100"
                        }`}
                      >
                        <capability.icon
                          className={`w-3 h-3 ${
                            capability.active
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        />
                        {capability.label}
                      </button>
                    ))}
                  </div>
                  <Card className="bg-muted border-border p-4 py-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-primary/50 flex items-center justify-center shrink-0">
                        <DollarSign className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-bold text-foreground mb-2">
                          Payment Tracking
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Track all payments, manage currencies, set up
                          automated reminders, and integrate with multiple
                          payment gateways seamlessly.
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {["Stripe", "PayPal", "Bank Transfer", "Crypto"].map(
                            (method, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="bg-secondary text-secondary-foreground border-border"
                              >
                                {method}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>

                  <div className="overflow-hidden relative mt-6">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-card to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-card to-transparent z-10 pointer-events-none" />

                    <div
                      className="flex animate-marquee"
                      style={
                        { "--marquee-duration": "30s" } as React.CSSProperties
                      }
                    >
                      <div className="flex gap-4 shrink-0">
                        {businessTools.map((tool) => (
                          <Badge
                            key={tool}
                            variant="secondary"
                            className="bg-muted text-muted-foreground border-border"
                          >
                            {tool}
                          </Badge>
                        ))}
                      </div>
                      <div className="w-4 shrink-0" />
                      <div className="flex gap-4 shrink-0">
                        {businessTools.map((tool) => (
                          <Badge
                            key={`${tool}-2`}
                            variant="secondary"
                            className="bg-muted text-muted-foreground border-border"
                          >
                            {tool}
                          </Badge>
                        ))}
                      </div>
                      <div className="w-4 shrink-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InvoiceFeatures;

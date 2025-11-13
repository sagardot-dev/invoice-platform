"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Printer } from "lucide-react";
import { useRouter } from "next/navigation";

import { invoiceSchema } from "@/schema";
import { InvoiceForm } from "./invoice-from";
import { InvoiceJacketForm } from "./invoice-jacket";
import { InvoicePantForm } from "./invoice-pant";
import { InvoiceShirttForm } from "./invoice-shirt";
import { cn } from "@/lib/utils";

export const InvoiceFormWrapper = () => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoiceNumber: "",
      date: new Date(),
      customerStatus: "UNPAID",
      paymentMethod: "CA",
      totalAmount: 0,
      notes: "",
      reselling: false,
      isReadymade: false,
      isMultiSaleMan: false,
      customerId: "",
      salesMan: "",
      moreSaleMan: [],
      helperId: "",
      customerSignature: "",
      customer: {
        name: "",
        phoneNumber: "",
        email: "",
        address: "",
        gender: "MALE",
        userId: crypto.randomUUID(),
        height: 0,
        weight: 0,
        stayDays: 0,
      },
      jacket: {
        quantity: 0,
        tailorName: "",
        fittingDate: undefined,
        addVest: false,
        addMonogram: false,
        jacketType: undefined,
        jacketFabricImage: "",
        jacketStyleDrawing: "",
        jacketCustomStyle: "",
        monogramName: "",
        monogramImage: "",
        liningImage: "",
        ch: 0,
        wa: 0,
        hip: 0,
        nk: 0,
        sh: 0,
        sleeve: 0,
        arm: 0,
        fr: 0,
        ba: 0,
        lg: 0,
        vLg: 0,
        ocLg: 0,
        nSho: false,
        sqSho: false,
        rdSho: false,
        sloSho: false,
        hBk: false,
        curveBk: false,
        shoNk: false,
        bigM: false,
        holBk: false,
        holCh: false,
        brBly: false,
        lLo: false,
        rLo: false,
        erect: false,
        flatB: false,
        note: "",
      },
      pant: {
        quantity: 0,
        tailorName: "",
        fittingDate: undefined,
        addInnerLining: false,
        pantType: undefined,
        pantLength: undefined,
        pantFabricImage: "",
        pantStyleDrawing: "",
        pantCustomStyle: "",
        monogramName: "",
        monogramImage: "",
        wa: 0,
        hip: 0,
        cr: 0,
        th: 0,
        kn: 0,
        bo: 0,
        lg: 0,
        slantingPkt: false,
        straightPkt: false,
        americanPkt: false,
        backRhtPkt: false,
        backLhtPkt: false,
        cuffs: false,
        wpIn: false,
        wpOut: false,
        flatB: false,
        lowFront: false,
        underBelly: false,
        note: "",
      },
      shirt: {
        quantity: 0,
        tailorName: "",
        fittingDate: undefined,
        addMonogram: false,
        addTie: false,
        shirtType: undefined,
        shirtFabricImage: "",
        shirtStyleDrawing: "",
        shirtCustomStyle: "",
        shirtMonogramName: "",
        shirtMonogramImage: "",
        ch: 0,
        wa: 0,
        hip: 0,
        nk: 0,
        sh: 0,
        sleeve: 0,
        arm: 0,
        fr: 0,
        ba: 0,
        lg: 0,
        stb: 0,
        stw: 0,
        ah: 0,
        dressLg: 0,
        skirtLg: 0,
        nLow: 0,
        sqSho: false,
        rdSho: false,
        sloSho: false,
        brBly: false,
        sloNk: false,
        note: "",
      },
      onBoard: {
        name: "",
        email: "",
        image: "",
        address: "",
        phoneNumber: "",
        taxId: "",
        websiteUrl: "",
        whatsappNumber: "",
      },
    },
  });

  const isPending = form.formState.isSubmitting || isLoading;

  async function onSubmit(data: z.infer<typeof invoiceSchema>) {
    console.log("✅ Invoice data:", data);
  }

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  const getStepButtons = () => {
    const steps = [
      { label: "Invoice", index: 0 },
      { label: "Jacket", index: 1 },
      { label: "Pant", index: 2 },
      { label: "Shirt", index: 3 },
    ];

    return steps.map((stepItem) => (
      <Button
        className={cn(
          " h-7 px-4 ",
          step === stepItem.index &&
            " bg-linear-0 from-chart-5 via-primary to-chart-5"
        )}
        key={stepItem.index}
        type="button"
        variant={step === stepItem.index ? "default" : "outline"}
        onClick={() => setStep(stepItem.index)}
        disabled={isPending}
      >
        {stepItem.label}
      </Button>
    ));
  };

  return (
    <Card className="w-full border-none py-6">
      <CardHeader className="border-b pb-5! px-8 flex justify-between items-center gap-x-19">
        <div>
          <CardTitle className="text-xl">Create a new Invoice</CardTitle>
        </div>
        <div className="flex gap-x-4 flex-1 ">{getStepButtons()}</div>
        <CardAction>
          <Button variant="custom">
            <Printer />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className=" flex w-full  items-center">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 0 && <InvoiceForm />}
            {step === 1 && <InvoiceJacketForm />}
            {step === 2 && <InvoicePantForm />}
            {step === 3 && <InvoiceShirttForm />}

            <div className="flex justify-between mt-6">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={isPending}
                  className=" h-8"
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={isPending}
                  className="bg-linear-0 from-chart-5 via-primary to-chart-5 h-8"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-linear-0 from-chart-5 via-primary to-chart-5 border border-primary h-8"
                >
                  Create Invoice
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

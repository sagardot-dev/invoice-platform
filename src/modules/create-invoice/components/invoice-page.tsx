"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";

import { invoiceSchema } from "@/schema";
import { InvoiceForm } from "./invoice-from";
import { InvoiceJacketForm } from "./invoice-jacket";
import { InvoicePantForm } from "./invoice-pant";
import { InvoiceShirttForm } from "./invoice-shirt";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useGetComapnyData } from "@/modules/dashboard/server/get-companydat";
import { Company, Helper, SaleMan } from "@/generated/prisma/client";
import { useCreateInvoice } from "../server/create-invoice";
import { useGetInvoice } from "@/modules/invoices/server/use-get-invoice";
import { useUpdateInvoice } from "@/modules/invoices/server/use-mutate-invoice";
import { CheckOut } from "./checkout";
import { s3URL } from "@/const";

export const InvoiceFormWrapper = ({ invoiceId }: { invoiceId?: string }) => {
  const { data: invoice } = useGetInvoice(invoiceId || "");
  const invoiceMutation = useCreateInvoice();
  const updateMutationInvoice = useUpdateInvoice();
  const getCompanyDataQuery = useGetComapnyData() as {
    data: Company | undefined;
    isLoading: boolean;
  };
  const [step, setStep] = useState(0);
  const { data } = getCompanyDataQuery;
  const router = useRouter();

  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema) as any,
    defaultValues: {
      invoiceNumber: "",
      date: new Date(),
      customerStatus: "UNPAID",
      paymentMethod: "CA",
      totalAmount: 0,
      notes: "",
      reselling: false,
      isReadymade: false,
      customerId: "",
      saleManIds: [],
      helperIds: [],
      customerSignature: "",
      customer: {
        name: "",
        phoneNumber: "",
        email: "",
        address: "",
        gender: "MALE",
        height: 0,
        weight: 0,
        stayDays: 0,
      },
      jacket: {
        quantity: 0,
        tailorName: "",
        fittingDate: new Date(),
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
        fittingDate: new Date(),
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
        fittingDate: new Date(),
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
        name: data?.name || "",
        email: data?.email || "",
        image: data?.image || "",
        address: data?.address || "",
        phoneNumber: data?.phoneNumber || "",
        taxId: data?.taxId || "",
        websiteUrl: data?.websiteUrl || "",
        whatsappNumber: data?.whatsappNumber || "",
      },
    },
  });

  useEffect(() => {
    if (!data) return;

    form.reset({
      onBoard: {
        name: data.name ?? "",
        email: data.email ?? "",
        image: data.image ?? "",
        address: data.address ?? "",
        phoneNumber: data.phoneNumber ?? "",
        taxId: data.taxId ?? "",
        websiteUrl: data.websiteUrl ?? "",
        whatsappNumber: data.whatsappNumber ?? "",
      },
    });
  }, [data, form]);

  useEffect(() => {
    if (!invoice) return;

    form.reset({
      invoiceNumber: invoice.invoiceNumber ?? "",
      date: invoice.date ? new Date(invoice.date) : new Date(),
      customerStatus: invoice.customerStatus ?? "UNPAID",
      paymentMethod: invoice.paymentMethod ?? "CA",
      totalAmount: invoice.totalAmount ?? 0,
      notes: invoice.notes ?? "",
      reselling: invoice.reselling ?? false,
      isReadymade: invoice.isReadymade ?? false,
      customerId: invoice.customer?.id ?? "",
      saleManIds: invoice.saleMen?.map((s: SaleMan) => s.id) ?? [],
      helperIds: invoice.helpers?.map((h: Helper) => h.id) ?? [],

      customerSignature: invoice.customerSignature
        ? `${s3URL}/${invoice.customerSignature}`
        : "",

      customer: {
        name: invoice.customer?.name ?? "",
        phoneNumber: invoice.customer?.phoneNumber ?? "",
        email: invoice.customer?.email ?? "",
        address: invoice.customer?.address ?? "",
        gender: invoice.customer?.gender ?? "MALE",
        height: invoice.customer?.height ?? 0,
        weight: invoice.customer?.weight ?? 0,
        stayDays: invoice.customer?.stayDays ?? 0,
      },

      jacket: {
        quantity: invoice.jacket?.quantity ?? 0,
        tailorName: invoice.jacket?.tailorName ?? "",
        fittingDate: invoice.jacket?.fittingDate
          ? new Date(invoice.jacket.fittingDate)
          : new Date(),
        addVest: invoice.jacket?.addVest ?? false,
        addMonogram: invoice.jacket?.addMonogram ?? false,
        jacketType: invoice.jacket?.jacketType ?? "NORMAL",
        jacketFabricImage: invoice.jacket?.jacketFabricImage
          ? `${s3URL}/${invoice.jacket.jacketFabricImage}`
          : "",
        jacketStyleDrawing: invoice.jacket?.jacketStyleDrawing
          ? `${s3URL}/${invoice.jacket.jacketStyleDrawing}`
          : "",
        jacketCustomStyle: invoice.jacket?.jacketCustomStyle ?? "",
        monogramName: invoice.jacket?.monogramName ?? "",
        monogramImage: invoice.jacket?.monogramImage
          ? `${s3URL}/${invoice.jacket.monogramImage}`
          : "",
        liningImage: invoice.jacket?.liningImage
          ? `${s3URL}/${invoice.jacket.liningImage}`
          : "",
        ch: invoice.jacket?.ch ?? 0,
        wa: invoice.jacket?.wa ?? 0,
        hip: invoice.jacket?.hip ?? 0,
        nk: invoice.jacket?.nk ?? 0,
        sh: invoice.jacket?.sh ?? 0,
        sleeve: invoice.jacket?.sleeve ?? 0,
        arm: invoice.jacket?.arm ?? 0,
        fr: invoice.jacket?.fr ?? 0,
        ba: invoice.jacket?.ba ?? 0,
        lg: invoice.jacket?.lg ?? 0,
        vLg: invoice.jacket?.vLg ?? 0,
        ocLg: invoice.jacket?.ocLg ?? 0,
        nSho: invoice.jacket?.nSho ?? false,
        sqSho: invoice.jacket?.sqSho ?? false,
        rdSho: invoice.jacket?.rdSho ?? false,
        sloSho: invoice.jacket?.sloSho ?? false,
        hBk: invoice.jacket?.hBk ?? false,
        curveBk: invoice.jacket?.curveBk ?? false,
        shoNk: invoice.jacket?.shoNk ?? false,
        bigM: invoice.jacket?.bigM ?? false,
        holBk: invoice.jacket?.holBk ?? false,
        holCh: invoice.jacket?.holCh ?? false,
        brBly: invoice.jacket?.brBly ?? false,
        lLo: invoice.jacket?.lLo ?? false,
        rLo: invoice.jacket?.rLo ?? false,
        erect: invoice.jacket?.erect ?? false,
        flatB: invoice.jacket?.flatB ?? false,
        note: invoice.jacket?.note ?? "",
      },

      pant: {
        quantity: invoice.pant?.quantity ?? 0,
        tailorName: invoice.pant?.tailorName ?? "",
        fittingDate: invoice.pant?.fittingDate
          ? new Date(invoice.pant.fittingDate)
          : new Date(),
        addInnerLining: invoice.pant?.addInnerLining ?? false,
        pantType: invoice.pant?.pantType ?? "NORMAL",
        pantLength: invoice.pant?.pantLength ?? "TROUSER",
        pantFabricImage: invoice.pant?.pantFabricImage
          ? `${s3URL}/${invoice.pant.pantFabricImage}`
          : "",
        pantStyleDrawing: invoice.pant?.pantStyleDrawing
          ? `${s3URL}/${invoice.pant.pantStyleDrawing}`
          : "",
        pantCustomStyle: invoice.pant?.pantCustomStyle ?? "",
        monogramName: invoice.pant?.monogramName ?? "",
        monogramImage: invoice.pant?.monogramImage
          ? `${s3URL}/${invoice.pant.monogramImage}`
          : "",
        wa: invoice.pant?.wa ?? 0,
        hip: invoice.pant?.hip ?? 0,
        cr: invoice.pant?.cr ?? 0,
        th: invoice.pant?.th ?? 0,
        kn: invoice.pant?.kn ?? 0,
        bo: invoice.pant?.bo ?? 0,
        lg: invoice.pant?.lg ?? 0,
        slantingPkt: invoice.pant?.slantingPkt ?? false,
        straightPkt: invoice.pant?.straightPkt ?? false,
        americanPkt: invoice.pant?.americanPkt ?? false,
        backRhtPkt: invoice.pant?.backRhtPkt ?? false,
        backLhtPkt: invoice.pant?.backLhtPkt ?? false,
        cuffs: invoice.pant?.cuffs ?? false,
        wpIn: invoice.pant?.wpIn ?? false,
        wpOut: invoice.pant?.wpOut ?? false,
        flatB: invoice.pant?.flatB ?? false,
        lowFront: invoice.pant?.lowFront ?? false,
        underBelly: invoice.pant?.underBelly ?? false,
        note: invoice.pant?.note ?? "",
      },

      shirt: {
        quantity: invoice.shirt?.quantity ?? 0,
        tailorName: invoice.shirt?.tailorName ?? "",
        fittingDate: invoice.shirt?.fittingDate
          ? new Date(invoice.shirt.fittingDate)
          : new Date(),
        addMonogram: invoice.shirt?.addMonogram ?? false,
        addTie: invoice.shirt?.addTie ?? false,
        shirtType: invoice.shirt?.shirtType ?? "DRESSSHIRT",
        shirtFabricImage: invoice.shirt?.shirtFabricImage
          ? `${s3URL}/${invoice.shirt.shirtFabricImage}`
          : "",
        shirtStyleDrawing: invoice.shirt?.shirtStyleDrawing
          ? `${s3URL}/${invoice.shirt.shirtStyleDrawing}`
          : "",
        shirtCustomStyle: invoice.shirt?.shirtCustomStyle ?? "",
        shirtMonogramName: invoice.shirt?.shirtMonogramName ?? "",
        shirtMonogramImage: invoice.shirt?.shirtMonogramImage
          ? `${s3URL}/${invoice.shirt.shirtMonogramImage}`
          : "",
        ch: invoice.shirt?.ch ?? 0,
        wa: invoice.shirt?.wa ?? 0,
        hip: invoice.shirt?.hip ?? 0,
        nk: invoice.shirt?.nk ?? 0,
        sh: invoice.shirt?.sh ?? 0,
        sleeve: invoice.shirt?.sleeve ?? 0,
        arm: invoice.shirt?.arm ?? 0,
        fr: invoice.shirt?.fr ?? 0,
        ba: invoice.shirt?.ba ?? 0,
        lg: invoice.shirt?.lg ?? 0,
        stb: invoice.shirt?.stb ?? 0,
        stw: invoice.shirt?.stw ?? 0,
        ah: invoice.shirt?.ah ?? 0,
        dressLg: invoice.shirt?.dressLg ?? 0,
        skirtLg: invoice.shirt?.skirtLg ?? 0,
        nLow: invoice.shirt?.nLow ?? 0,
        sqSho: invoice.shirt?.sqSho ?? false,
        rdSho: invoice.shirt?.rdSho ?? false,
        sloSho: invoice.shirt?.sloSho ?? false,
        brBly: invoice.shirt?.brBly ?? false,
        sloNk: invoice.shirt?.sloNk ?? false,
        note: invoice.shirt?.note ?? "",
      },

      onBoard: {
        name: data?.name ?? "",
        email: data?.email ?? "",
        image: data?.image ? `${s3URL}/${data.image}` : "",
        address: data?.address ?? "",
        phoneNumber: data?.phoneNumber ?? "",
        taxId: data?.taxId ?? "",
        websiteUrl: data?.websiteUrl ?? "",
        whatsappNumber: data?.whatsappNumber ?? "",
      },
    });
  }, [invoice, data, form]);

  const isLoading = getCompanyDataQuery.isLoading;
  const isPending = form.formState.isSubmitting || isLoading;

  const isDisabled = getCompanyDataQuery.isLoading || isPending;

  async function onSubmit(data: z.infer<typeof invoiceSchema>) {
    if (invoice && invoiceId) {
      updateMutationInvoice.mutateAsync(
        { id: invoiceId, data },
        {
          onSuccess: () => router.push(`/pdf/${invoiceId}`),
        }
      );
    } else {
      invoiceMutation.mutate(
        { data },
        {
          onSuccess: (res) => {
            const id = res.data?.id;
            if (id) {
              router.push(`/pdf/${id}`);
            }
          },
        }
      );
    }
  }

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
  const getStepButtons = () => {
    const steps = [
      { label: "Invoice", index: 0 },
      { label: "Jacket", index: 1 },
      { label: "Pant", index: 2 },
      { label: "Shirt", index: 3 },
      { label: "checkout", index: 4 },
    ];

    return steps.map((stepItem) => (
      <Button
        key={stepItem.index}
        disabled={isPending}
        className={cn(
          " h-7 px-4 ",
          step === stepItem.index &&
            " bg-linear-0 from-chart-5 via-primary to-chart-5"
        )}
        type="button"
        variant={step === stepItem.index ? "default" : "outline"}
        onClick={() => setStep(stepItem.index)}
      >
        {stepItem.label}
      </Button>
    ));
  };

  return (
    <Card className="w-full h-full border-none flex">
      <CardHeader className="border-b pb-5! px-8 flex justify-between items-center gap-x-19">
        <div>
          <CardTitle className="text-xl">Create a new Invoice</CardTitle>
        </div>
        <div className="flex flex-wrap gap-y-3 gap-x-4 lg:flex-1 ">
          {getStepButtons()}
        </div>
        <CardAction>
          <Badge className=" py-0 rounded-sm bg-accent">invoice data</Badge>
        </CardAction>
      </CardHeader>

      <CardContent className=" flex justify-center items-center">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (error) => {
              console.log(error);
              toast.error("please fill all the nessaey feilds", {
                description: error.invoiceNumber?.message,
              });
            })}
            className="space-y-6 flex flex-col h-full w-full py-4"
          >
            {step === 0 && <InvoiceForm />}
            {step === 1 && <InvoiceJacketForm />}
            {step === 2 && <InvoicePantForm />}
            {step === 3 && <InvoiceShirttForm />}
            {step === 4 && <CheckOut />}

            <div className="flex justify-between items-end flex-wrap w-full ">
              {step > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={isDisabled}
                  className=" h-8"
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={isDisabled}
                  className="bg-linear-0 from-chart-5 via-primary to-chart-5 h-8"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isDisabled || updateMutationInvoice.isPending}
                  className="bg-linear-0 from-chart-5 via-primary to-chart-5 border border-primary h-8"
                >
                  {invoice ? "Update Invoice" : "Create Invoice"}
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

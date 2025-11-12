"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { useRouter } from "next/navigation";
import { InvoiceForm } from "./invoice-from";
import { Printer } from "lucide-react";
import { InvoiceJacketForm } from "./invoice-jacket";
import { InvoicePantForm } from "./invoice-pant";
import { InvoiceShirttForm } from "./invoice-shirt";

const formSchema = z.object({
  email: z.string().email("Please enter valid email"),
  password: z.string().min(6, "Password is required, 6 characters"),
});

export const InvoiceFormWrapper = () => {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isPending = form.formState.isSubmitting || isLoading;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Card className="w-full border-none  py-6 ">
      <CardHeader className=" border-b pb-5! px-8">
        <div className=" flex flex-col justify-start items-start gap-y-2 ">
          <CardTitle className=" text-xl"> Create a new Invoice </CardTitle>
        </div>
        <div className=" flex gap-x-4 flex-wrap gap-3">
          <Button className=" h-8! bg-linear-0 from-chart-5 via-primary/30 to-primary text-shadow-xs">
            Customer information
          </Button>
          <Button className=" h-8! bg-linear-0 from-chart-5 via-primary/30 to-primary text-shadow-xs">
            Jacket Size
          </Button>
          <Button className=" h-8! bg-linear-0 from-chart-5 via-primary/30 to-primary text-shadow-xs">
            Pant Size
          </Button>
          <Button className=" h-8! bg-linear-0 from-chart-5 via-primary/30 to-primary text-shadow-xs">
            Shirt Size
          </Button>
          <Button className=" h-8! bg-linear-0 from-chart-5 via-primary/30 to-primary text-shadow-xs">
            Check Out
          </Button>
        </div>

        <CardAction>
          <Button variant={"custom"}>
            <Printer />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <InvoiceShirttForm />
      </CardContent>
    </Card>
  );
};

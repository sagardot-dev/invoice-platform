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
    <Card className="w-full border-none px-3 py-6 col-span-3">
      <CardHeader className=" border-b">
        <CardTitle className=" text-2xl"> Create a new Invoice </CardTitle>
        <CardDescription>Please Fill all the data</CardDescription>
        <CardAction>
          <Button variant={"custom"}>
            <Printer />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <InvoiceForm />
      </CardContent>
    </Card>
  );
};

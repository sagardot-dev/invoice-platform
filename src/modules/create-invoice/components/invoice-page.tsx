"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
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
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InvoiceSchema } from "@/schema";
import { DatePicker } from "./date-picker";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().email("Please enter valid email"),
  password: z.string().min(6, "Password is required, 6 characters"),
});

export const InvoiceForm = () => {
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
    <Card className="w-full border-none px-3 py-8">
      <CardHeader className=" border-b">
        <CardTitle className=" text-2xl"> Create a new Invoice </CardTitle>
        <CardDescription>Please Fill all the data</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

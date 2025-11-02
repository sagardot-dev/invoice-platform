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
  const form = useForm<z.infer<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      invoiceID: "",
      status: "Unpaid",
      customerName: "",
      date: new Date(),
      saleMan: "",
      amount: 0,
      paymentMethod: "CC",
    },
  });

  const isPending = form.formState.isSubmitting || isLoading;

  async function onSubmit(data: z.infer<typeof InvoiceSchema>) {
    console.log(data);
  }

  return (
    <Card className="w-full border-none px-3 py-8">
      <CardHeader className=" border-b">
        <CardTitle className=" text-2xl"> Create a new Invoice </CardTitle>
        <CardDescription>Please Fill all the data</CardDescription>
      </CardHeader>
      <div className=" gap-y-8 flex flex-col">
        <CardContent>
          <form
            className=" flex flex-col gap-y-5"
            id="form-rhf-submit"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className=" customer-data  ">
              <FieldGroup className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4">
                <Controller
                  name="invoiceID"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">
                        Invoice ID
                      </FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="sagar@gmail.com"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-password">
                        Status
                      </FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="******"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="customerName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">
                        Customer Name
                      </FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="sagar@gmail.com"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="date"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">Date</FieldLabel>
                      <DatePicker />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="saleMan"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">SaleMan</FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="sagar@gmail.com"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="amount"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">Amount</FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="sagar@gmail.com"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="paymentMethod"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">
                        Payment Method
                      </FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="sagar@gmail.com"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>
            <Separator/>
            <div className=" customer-data  ">
              <FieldGroup className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4">
                <Controller
                  name="invoiceID"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">
                        Invoice ID
                      </FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="sagar@gmail.com"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-password">
                        Status
                      </FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="******"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="customerName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">
                        Customer Name
                      </FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="sagar@gmail.com"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="date"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">Date</FieldLabel>
                      <DatePicker />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="saleMan"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">SaleMan</FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="sagar@gmail.com"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="amount"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">Amount</FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="sagar@gmail.com"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="paymentMethod"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">
                        Payment Method
                      </FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="sagar@gmail.com"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>
            <Separator/>
            <div className=" customer-data  ">
              <FieldGroup className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4">
                <Controller
                  name="invoiceID"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">
                        Invoice ID
                      </FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="sagar@gmail.com"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-password">
                        Status
                      </FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="******"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="customerName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">
                        Customer Name
                      </FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="sagar@gmail.com"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="date"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">Date</FieldLabel>
                      <DatePicker />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="saleMan"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">SaleMan</FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="sagar@gmail.com"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="amount"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">Amount</FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="sagar@gmail.com"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="paymentMethod"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email">
                        Payment Method
                      </FieldLabel>
                      <Input
                        disabled={isPending}
                        {...field}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="sagar@gmail.com"
                        autoComplete="on"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Field
            className=" text-center flex justify-center items-center"
            orientation="horizontal"
          >
            <Button
              disabled={isPending}
              className=" w-1/2"
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button className=" w-1/2" type="submit" form="form-rhf-submit">
              sign in
            </Button>
          </Field>
        </CardFooter>
        <CardFooter>
          <Field
            className=" text-center flex justify-center items-center"
            orientation="horizontal"
          >
            <Button
              disabled={isPending}
              className=" w-1/2 text-muted-foreground/50"
              type="button"
              variant="link"
            >
              <Link href={"/auth/sign-up"}>
                <p>Dont have an account yet?</p>
              </Link>
            </Button>
          </Field>
        </CardFooter>
      </div>
    </Card>
  );
};

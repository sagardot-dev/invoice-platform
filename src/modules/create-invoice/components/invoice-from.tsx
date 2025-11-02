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
    toast("You submit a form please wait", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <p className=" animate-pulse">Submitting the from...</p>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
    console.log(data);
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
          setIsloading(true);
        },
        onSuccess: (ctx) => {
          setIsloading(false);
          toast("sign-up successfully", {
            description: (
              <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                <p className=" animate-pulse">Redirecting to dashborad</p>
              </pre>
            ),
            position: "bottom-right",
            classNames: {
              content: "flex flex-col gap-2",
            },
            style: {
              "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
          });
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setIsloading(false);
          toast.error(ctx.error.message, {
            description: (
              <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                <p className=" animate-pulse">
                  Error while sign up please try again
                </p>
              </pre>
            ),
          });
        },
      }
    );
  }

  return (
    <Card className="w-full md:max-w-lg md:min-w-md sm:max-w-md px-3 py-8 max-w-sm">
      <CardHeader className=" text-center">
        <CardTitle className=" text-2xl">Sign-In</CardTitle>
        <CardDescription>Sign-in to get start with D-invoice</CardDescription>
      </CardHeader>
      <div className=" gap-y-8 flex flex-col">
        <CardContent>
          <form
            className=" flex flex-col gap-y-5"
            id="form-rhf-submit"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup className=" flex flex-col gap-y-4">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-email">Email</FieldLabel>
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
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-password">
                      Password
                    </FieldLabel>
                    <Input
                      type="password"
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
            </FieldGroup>
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

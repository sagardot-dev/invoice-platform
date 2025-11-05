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
  username: z.string().min(3, "Username is required"),
});

export const SignUpForm = () => {
  const router = useRouter();
  const [isloading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const isPending = form.formState.isSubmitting || isloading;

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
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.username,
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
          setIsLoading(true);
        },
        onSuccess: (ctx) => {
          setIsLoading(false);
          toast("sign-up successfully", {
            description: (
              <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                <p className=" animate-pulse">Redirecting to Dashboard</p>
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
          console.log(ctx);
          setIsLoading(false);
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
    <Card className="w-full md:max-w-md md:min-w-md  px-2 py-8 max-w-sm">
      <CardHeader className=" text-center">
        <CardTitle className=" text-2xl">Sign-Up</CardTitle>
        <CardDescription>Sign-up to get start with D-voice</CardDescription>
      </CardHeader>
      <div className=" gap-y-8 flex flex-col">
        <CardContent>
          <form
            className=" flex flex-col gap-y-5"
            id="form-rhf-demo"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup className=" flex flex-col gap-y-4">
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-username">
                      Username
                    </FieldLabel>
                    <Input
                      disabled={isPending}
                      {...field}
                      id="form-rhf-demo-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="sagar gautham"
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-email">Email</FieldLabel>
                    <Input
                      disabled={isPending}
                      {...field}
                      id="form-rhf-demo-email"
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
                      disabled={isPending}
                      {...field}
                      id="form-rhf-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="******"
                      type="password"
                      autoComplete="om"
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
              disabled={isloading}
              className=" w-1/2"
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              disabled={isPending}
              className=" w-1/2"
              type="submit"
              form="form-rhf-demo"
            >
              Sign-up
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
              <Link href={"/auth/sign-in"}>
                <p>Already have an account ?</p>
              </Link>
            </Button>
          </Field>
        </CardFooter>
      </div>
    </Card>
  );
};

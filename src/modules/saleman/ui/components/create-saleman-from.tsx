"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PackagePlusIcon } from "lucide-react";
import { useEffect } from "react";
import { Kbd } from "@/components/ui/kbd";
import { onBoardSchema, saleManSchema } from "@/schema";
import { useEditCompanyData } from "@/modules/dashboard/server/edit-company-data";
import { useSearchParams } from "next/navigation";
import { useCreateSaleman } from "../../server/create-saleman";
import { useGetSalemanData } from "../../server/get-saleman";
import { useIsClient } from "@/hooks/use-client";

const SalemanForm = () => {
  const isClient = useIsClient();
  const params = useSearchParams();
  const id = params.get("id");
  const editMuation = useEditCompanyData();
  const getSaleManDataQuery = useGetSalemanData(id);
  const salemanMutation = useCreateSaleman();
  const loading = salemanMutation.isPending;
  const pending = Boolean(loading || (id && getSaleManDataQuery.isPending));


  const form = useForm<z.infer<typeof saleManSchema>>({
    resolver: zodResolver(saleManSchema),
    defaultValues: getSaleManDataQuery.data
      ? {
          name: getSaleManDataQuery.data.name,
          email: getSaleManDataQuery.data.email,
          status: getSaleManDataQuery.data.status,
        }
      : {
          name: "",
          email: "",
          status: "ACTIVE",
        },
  });

  useEffect(() => {
    if (getSaleManDataQuery.data) {
      form.reset({
        name: getSaleManDataQuery.data.name || "",
        email: getSaleManDataQuery.data.email || "",
      });
    }
  }, [getSaleManDataQuery.data, form]);

  async function onSubmit(values: z.infer<typeof saleManSchema>) {
    console.log(values);
    salemanMutation.mutate({
      ...values,
    });
    console.log("hello");
  }

  const onEdit = (values: z.infer<typeof onBoardSchema>) => {
    editMuation.mutate({ ...values });
  };
  if (!isClient) return null;

  return (
    <>
      <Card className=" space-y-2 py-8 pb-7 border-accent-foreground/4 shadow-sm">
        <CardHeader className=" border-b px-9">
          <CardTitle className=" lg:text-xl text-md ">Create saleman</CardTitle>
          <CardDescription className=" text-xs lg:text-sm">
            please fill the real data
          </CardDescription>
          <CardAction>
            <Kbd>saleman data</Kbd>
          </CardAction>
        </CardHeader>

        <CardContent className="w-full px-5 md:px-9 divide-y">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 w-full"
            >
              <div className=" space-y-4 flex flex-col items-start md:items-stretch w-full ">
                <div className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-5 ">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Saleman Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={pending || loading}
                            placeholder="Bespoke Tailor"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            disabled={pending}
                            placeholder="custome@tailor.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className=" mb-4">
                {!!id ? (
                  <Button
                    // onClick={() => onEdit(form.getValues())}
                    disabled={loading}
                    className=" bg-linear-0 from-primary via-primary/10 to-chart-1 text-shadow-2xs border-primary"
                    type="button"
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    disabled={pending}
                    className=" bg-linear-0 from-primary via-primary/10 to-chart-1 text-shadow-2xs border-primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </Form>
          <div className="pt-4 text-center text-xs text-muted-foreground gap-y-3 flex flex-col">
            <div className=" w-full flex justify-center items-center">
              <Button variant={"custom"}>
                <PackagePlusIcon className=" text-secondary" />
              </Button>
            </div>
            <div className=" flex-col flex gap-y-1 animate-pulse">
              <p>💡 Tip: Double-check your form info before submitting.</p>
              <p>Your data will auto-save securely to the cloud.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SalemanForm;

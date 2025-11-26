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
import { CameraIcon, PackagePlusIcon } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Kbd } from "@/components/ui/kbd";
import { onBoardSchema } from "@/schema";
import axios from "axios";
import { useGetSignUrlMutation } from "../../server/get-signUrl";
import Image from "next/image";
import { useCreateCompany } from "../../server/create-company";
import { useGetComapnyData } from "../../server/get-companydat";
import { useEditCompanyData } from "../../server/edit-company-data";
import { Textarea } from "@/components/ui/textarea";
import { useIsClient } from "@/hooks/use-client";
import { s3URL } from "@/const";

const OnboradForm = () => {
  const isClient = useIsClient();
  const editMuation = useEditCompanyData();
  const getCompanyDataQuery = useGetComapnyData();
  const onboadringMutation = useCreateCompany();
  const [preview, setPreview] = useState("");
  const signUrlMutation = useGetSignUrlMutation();
  const loading = onboadringMutation.isPending;
  const pending =
    signUrlMutation.isPending ||
    loading ||
    getCompanyDataQuery.isPending ||
    editMuation.isPending;

  const form = useForm<z.infer<typeof onBoardSchema>>({
    resolver: zodResolver(onBoardSchema),
    defaultValues: getCompanyDataQuery.data
      ? {
          name: getCompanyDataQuery.data.name,
          email: getCompanyDataQuery.data.email,
          image: getCompanyDataQuery.data.image,
          address: getCompanyDataQuery.data.address,
          phoneNumber: getCompanyDataQuery.data.phoneNumber,
          taxId: getCompanyDataQuery.data.taxId,
          websiteUrl: getCompanyDataQuery.data.websiteUrl,
          whatsappNumber: getCompanyDataQuery.data.whatsappNumber,
        }
      : {
          name: "",
          email: "",
          image: "",
          address: "",
          phoneNumber: "",
          taxId: "",
          websiteUrl: "",
          whatsappNumber: "",
        },
  });

  useEffect(() => {
    if (getCompanyDataQuery.data) {
      form.reset({
        name: getCompanyDataQuery.data.name || "",
        email: getCompanyDataQuery.data.email || "",
        image: getCompanyDataQuery.data.image || "",
        address: getCompanyDataQuery.data.address || "",
        phoneNumber: getCompanyDataQuery.data.phoneNumber || "",
        taxId: getCompanyDataQuery.data.taxId || "",
        websiteUrl: getCompanyDataQuery.data.websiteUrl || "",
        whatsappNumber: getCompanyDataQuery.data.whatsappNumber || "",
      });
    }
  }, [getCompanyDataQuery.data, form]);

  if (!isClient) return null;

  async function onSubmit(values: z.infer<typeof onBoardSchema>) {
    onboadringMutation.mutate({
      ...values,
    });
  }

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl);
    const mime = file?.type || "application/octet-stream";
    let ext = mime.split("/")[1] || file.name.split(".").pop() || "bin";

    ext = ext.split("+")[0];
    const fileName = file.name.split(".")[0];
    console.log(fileName, ext, mime);
    signUrlMutation.mutate(
      { fileName, ext, type: mime },
      {
        onError: () => {
          return;
        },
        onSuccess: async (data) => {
          const res = await axios.put(data.signUrl, file, {
            headers: { "Content-Type": file.type },
          });
          const signedUrl = data.signUrl;
          const key = signedUrl.split(".amazonaws.com/")[1].split("?")[0];
          const imageUrl = decodeURIComponent(key.split("%")[0]);
          console.log(imageUrl);

          form.setValue("image", imageUrl);
        },
      }
    );
  };

  const onEdit = (values: z.infer<typeof onBoardSchema>) => {
    editMuation.mutate({ ...values });
  };

  return (
    <>
      <Card className=" space-y-2 py-10 border-accent-foreground/4 shadow-sm md:min-w-2xl">
        <CardHeader className=" border-b px-9">
          <CardTitle className=" md:text-2xl text-lg ">
            Fill Conpany Information
          </CardTitle>
          <CardDescription className=" text-xs md:text-sm">
            please fill the real data and fill all
          </CardDescription>
          <CardAction>
            <Kbd>company data</Kbd>
          </CardAction>
        </CardHeader>

        <CardContent className="w-full px-5 md:px-9 divide-y">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-7 w-full"
            >
              <div className=" space-y-5 flex flex-col items-stretch w-full ">
                <div className=" flex justify-between items-center pb-3 w-full ">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <div className=" md:flex-row flex flex-col gap-y-5 gap-x-2 md:items-center items-start">
                            <Input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id="comapnyImage"
                              onChange={(e) => {
                                onUpload(e);
                              }}
                            />
                            <Button
                              disabled={pending}
                              variant={"custom"}
                              type="button"
                              onClick={() =>
                                document.getElementById("comapnyImage")?.click()
                              }
                              className=""
                            >
                              <CameraIcon className=" text-accent size-4" />
                            </Button>
                            <p className=" text-xs text-accent-foreground/50">
                              Upload image
                            </p>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Image
                    src={
                      preview ||
                      `${s3URL}/${getCompanyDataQuery?.data?.image}` ||
                      "/default-logo.png"
                    }
                    width={29}
                    height={29}
                    alt="logo"
                    className=""
                  />
                </div>

                <div className=" w-full md:grid-cols-2 grid grid-cols-1 gap-5 ">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
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
                            disabled={pending || loading}
                            placeholder="custome@tailor.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className=" w-full md:grid-cols-2 grid grid-cols-1 gap-5 ">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            disabled={pending || loading}
                            placeholder="Bangkok Thailand, 10400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            disabled={pending || loading}
                            placeholder="+66 956421706"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" w-full md:grid-cols-2 grid grid-cols-1 gap-5 ">
                  <FormField
                    control={form.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax-id</FormLabel>
                        <FormControl>
                          <Input
                            disabled={pending || loading}
                            placeholder="tax-id"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="whatsappNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Whatsapp Number</FormLabel>
                        <FormControl>
                          <Input
                            disabled={pending || loading}
                            placeholder="+66 959401706"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WebSite Url</FormLabel>
                      <FormControl>
                        <Textarea
                          className=" h-20 w-full! resize-none"
                          disabled={pending || loading}
                          placeholder="www.bespoketailor.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" mb-4">
                {!getCompanyDataQuery.data ? (
                  <Button
                    disabled={pending || loading}
                    className=" bg-linear-0 from-primary via-primary/10 to-chart-1 text-shadow-2xs border-primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    onClick={() => onEdit(form.getValues())}
                    disabled={loading}
                    className=" bg-linear-0 from-primary via-primary/10 to-chart-1 text-shadow-2xs border-primary"
                    type="button"
                  >
                    update
                  </Button>
                )}
              </div>
            </form>
          </Form>
          <div className="pt-10 text-center text-xs text-muted-foreground gap-y-7 flex flex-col">
            <div className=" w-full flex justify-center items-center">
              <Button variant={"custom"}>
                <PackagePlusIcon className=" text-secondary" />
              </Button>
            </div>
            <div className=" flex-col flex gap-y-1 animate-pulse">
              <p>💡 Tip: Double-check your company info before submitting.</p>
              <p>Your data will auto-save securely to the cloud.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default OnboradForm;

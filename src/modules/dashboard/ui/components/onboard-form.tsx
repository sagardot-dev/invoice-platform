"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { CameraIcon, LocationEditIcon, UploadCloud } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { Kbd } from "@/components/ui/kbd";
import { onBoardSchema } from "@/schema";
import axios from "axios";
import { useGetSignUrlMutation } from "../../server/get-signUrl";
import { headers } from "next/headers";
import Image from "next/image";

const OnboradForm = () => {
  const [preview, setPreview] = useState("");
  const signUrlMutation = useGetSignUrlMutation();
  const pending =signUrlMutation.isPending;
  const form = useForm<z.infer<typeof onBoardSchema>>({
    resolver: zodResolver(onBoardSchema),
    defaultValues: {
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

  async function  onSubmit(values: z.infer<typeof onBoardSchema>) {
      const res = await axios.post('/')
  }

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl);
    const mime = file?.type || "application/octet-stream";
    const ext = mime.split("/")[1] || file.name.split(".").pop() || "bin";
    const fileName = file.name.split(".")[0];

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
          form.setValue("image", data.fileName);
          console.log("✅ Uploaded:", res);
        },
      }
    );
  };

  return (
    <div className=" w-full h-full md:max-w-6xl  flex justify-center items-center ">
      <Card className=" md:max-w-5xl  md:min-w-2xl   space-y-2 py-10 border-accent-foreground/4 shadow-sm">
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

        <CardContent className=" px-5 md:px-9">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
              <div className=" space-y-5 flex flex-col items-start md:items-stretch ">
                <div className=" flex justify-between items-center pb-3">
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
                              id="cameraInput"
                              onChange={(e) => {
                                onUpload(e);
                              }}
                            />
                            <Button
                            disabled={pending}
                              variant={"custom"}
                              type="button"
                              onClick={() =>
                                document.getElementById("cameraInput")?.click()
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
                  {preview && (
                    <>
                      <Image
                        src={preview}
                        width={29}
                        height={29}
                        alt="logo"
                        className=" rounded-full"
                      />
                    </>
                  )}
                </div>

                <div className=" md:flex-row flex flex-col gap-y-5 gap-x-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Bespoke Tailor" {...field} />
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
                          <Input placeholder="custome@tailor.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" md:flex-row flex flex-col gap-y-5 gap-x-5">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
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
                          <Input placeholder="+66 956421706" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className=" md:flex-row flex flex-col gap-y-5 gap-x-5">
                  <FormField
                    control={form.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax-id</FormLabel>
                        <FormControl>
                          <Input placeholder="tax-id" {...field} />
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
                          <Input placeholder="+66 959401706" {...field} />
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
                        <Input placeholder="www.bespoketailor.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                className=" bg-linear-0 from-primary via-primary/10 to-chart-1 text-shadow-2xs border-primary"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboradForm;

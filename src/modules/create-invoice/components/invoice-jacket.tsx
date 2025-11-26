"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { JacketTypeEnum, MeasurementType, shapeType } from "@/schema";

import { UploadCloud } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawing } from "./drawing";
import { useGetSignUrlMutation } from "@/modules/dashboard/server/get-signUrl";
import { toast } from "sonner";
import axios from "axios";
import { Calendar28 } from "./date-picker";

export const InvoiceJacketForm = () => {
  const { control, setValue, watch } = useFormContext();
  const signUrlMutation = useGetSignUrlMutation();
  const [pending, setPending] = useState(false);
  const measurementFields: (keyof MeasurementType)[] = [
    "ch",
    "wa",
    "hip",
    "nk",
    "sh",
    "sleeve",
    "arm",
    "fr",
    "ba",
    "lg",
    "vLg",
    "ocLg",
  ];

  const shapeFields: (keyof shapeType)[] = [
    "nSho",
    "sqSho",
    "rdSho",
    "sloSho",
    "hBk",
    "curveBk",
    "shoNk",
    "bigM",
    "holBk",
    "holCh",
    "brBly",
    "lLo",
    "rLo",
    "erect",
    "flatB",
  ];

  const onUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPending(true);
    const mime = file.type || "application/octet-stream";
    const ext = mime.split("/")[1] || file.name.split(".").pop() || "bin";
    const fileName = `${fieldName}-${Date.now()}`;

    signUrlMutation.mutate(
      { fileName, ext, type: mime },
      {
        onError: () => {
          toast.error("Failed to get signed URL");
          setPending(false);
        },
        onSuccess: async (data) => {
          await axios.put(data.signUrl, file, {
            headers: { "Content-Type": file.type },
          });
          const uploadedUrl = data.signUrl.split("?")[0];
          setValue(fieldName, uploadedUrl);
          toast.success(`${fieldName} uploaded!`);
          setPending(false);
        },
      }
    );
  };

  return (
    <>
      <div className="flex flex-col h-full gap-x-8 gap-y-8 w-full">
        <div className=" flex flex-wrap gap-7 md:gap-x-12 justify-start items-center px-4  w-full">
          {/* Invoice Number */}
          <FormField
            control={control}
            name="jacket.quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1"
                    {...field}
                    value={field.value ?? 0}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="jacket.tailorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tailor Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Chan Dee"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="jacket.fittingDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fitting Date</FormLabel>
                <FormControl>
                  <Calendar28
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="jacket.jacketType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jacket Type</FormLabel>
                <FormControl>
                  <NativeSelect className=" bg-accent" {...field}>
                    {JacketTypeEnum.options.map((type) => (
                      <option
                        className=" bg-accent ring-0! border-0"
                        key={type}
                        value={type}
                      >
                        {type.charAt(0) + type.slice(1).toLowerCase()}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="jacket.addVest"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-between ">
                <FormLabel>Add Vest</FormLabel>
                <FormControl>
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="jacket.addMonogram"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-between ">
                <FormLabel>Add MonoGram</FormLabel>
                <FormControl>
                  <Switch
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 bar grid xl:grid-cols-3 xl:grid-rows-1  grid-cols-1 grid-rows-2 gap-y-3 gap-x-3 rounded-2xl  pt-5 px-2">
          <div className=" col-span-2  gap-y-3  w-full h-full justify-start grid grid-cols-2 bar ">
            <div className="border col-span-2 border-chart-1/10 rounded-2xl p-6 space-y-4 bar">
              <div className=" flex flex-col gap-y-3">
                <Badge className="bg-primary/20 text-primary backdrop-blur-2xl">
                  Jacket Sizes
                </Badge>

                <div className="grid grid-cols-4 gap-5">
                  {measurementFields.map((m) => (
                    <FormField
                      key={m}
                      control={control}
                      name={`jacket.${m}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="capitalize">{m}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="1"
                              className="bg-background/40 border border-border"
                              {...field}
                              value={field.value ?? 0}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className=" pt-6 border-t flex-col flex gap-y-5 ">
                {/* Upload Buttons */}
                <div className="space-y-3 flex flex-wrap gap-x-2.5">
                  {/* Hidden Inputs */}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="fabricUpload"
                    onChange={(e) => onUpload(e, "jacket.jacketFabricImage")}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="liningUpload"
                    onChange={(e) => onUpload(e, "jacket.liningImage")}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="monogramUpload"
                    onChange={(e) => onUpload(e, "jacket.monogramImage")}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="suitUpload"
                    onChange={(e) => onUpload(e, "jacket.jacketCustomStyle")}
                  />

                  {/* Buttons */}
                  <Button
                    type="button"
                    variant="secondary"
                    className="justify-start gap-2 h-7! bg-linear-0 from-chart-4/40 via-secondary to-secondary text-shadow-xs"
                    onClick={() =>
                      document.getElementById("fabricUpload")?.click()
                    }
                  >
                    <UploadCloud className="h-4 w-4" />
                    Fabric Image
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    className="justify-start gap-2 h-7! bg-linear-0 from-chart-4/40 via-secondary to-secondary text-shadow-xs"
                    onClick={() =>
                      document.getElementById("liningUpload")?.click()
                    }
                  >
                    <UploadCloud className="h-4 w-4" />
                    Lining Image
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    className="justify-start gap-2 h-7! bg-linear-0 from-chart-4/40 via-secondary to-secondary text-shadow-xs"
                    onClick={() =>
                      document.getElementById("monogramUpload")?.click()
                    }
                  >
                    <UploadCloud className="h-4 w-4" />
                    Monogram Image
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    className="justify-start gap-2 h-7! bg-linear-0 from-chart-4/40 via-secondary to-secondary text-shadow-xs"
                    onClick={() =>
                      document.getElementById("suitUpload")?.click()
                    }
                  >
                    <UploadCloud className="h-4 w-4" />
                    Suit Image
                  </Button>
                </div>

                <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3 w-full">
                  <FormField
                    control={control}
                    name="jacket.monogramName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            className=" w-full bar border border-border max-h-13! resize-none"
                            placeholder="Monogram Name ect.. JOHN"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="jacket.note"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            className=" border border-border max-h-13! bar resize-none"
                            placeholder="Note"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full grid lg:grid-cols-6 md:grid-cols-3 grid-cols-3 grid-rows-3  gap-4 flex-wrap items-center">
                  {shapeFields.map((m) => (
                    <FormField
                      key={m}
                      control={control}
                      name={`jacket.${m}`}
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={!!field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="capitalize">{m}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className=" flex flex-col gap-y-1  w-full h-full border border-dashed rounded-lg px-1 py-1 overflow-hidden items-center ">
            <Drawing
              bgImage={watch("jacket.jacketStyleDrawing")}
              onSave={(url) => setValue("jacket.jacketStyleDrawing", url)}
              onRemoveBg={() => setValue("jacket.jacketStyleDrawing", "")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

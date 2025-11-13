import React, { useEffect, useRef, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { DatePicker } from "./date-picker";
import { Textarea } from "@/components/ui/textarea";
import {
  shirtSchema,
  ShirtTypeEnum,
  ShirtMeasurementType,
  ShirtShapeType,
} from "@/schema";

import { Save, UploadCloud } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawing } from "./drawing";
import { useGetSignUrlMutation } from "@/modules/dashboard/server/get-signUrl";
import { toast } from "sonner";
import axios from "axios";
import { useJacketFromStore } from "../store/store";

export const InvoiceShirttForm = () => {
  const { control, watch, setValue } = useFormContext();
  const { data, setData, reset } = useJacketFromStore();
  const signUrlMutation = useGetSignUrlMutation();
  const [pending, setPending] = useState(false);
  const measurementFields: (keyof ShirtMeasurementType)[] = [
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
    "stb",
    "stw",
    "ah",
    "dressLg",
    "skirtLg",
    "nLow",
  ];

  const shapeFields: (keyof ShirtShapeType)[] = [
    "sqSho",
    "rdSho",
    "sloSho",
    "brBly",
    "sloNk",
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
      <div className=" flex flex-wrap gap-x-7 md:gap-x-9 gap-y-5  justify-start items-center px-4  w-full">
        {/* Invoice Number */}
        <FormField
          control={control}
          name="shirt.quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="shirt.tailorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tailor Name</FormLabel>
              <FormControl>
                <Input className=" w-55" placeholder="Chan Dee" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="shirt.fittingDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fitting Date</FormLabel>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="shirt.shirtType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jacket Type</FormLabel>
              <FormControl>
                <NativeSelect className=" bg-accent" {...field}>
                  {ShirtTypeEnum.options.map((type) => (
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
          name="shirt.addMonogram"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-between ">
              <FormLabel>Add MonoGram</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="shirt.addTie"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-between ">
              <FormLabel>Add MonoGram</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4 bar grid lg:grid-cols-3 xl:grid-rows-1  grid-cols-1 grid-rows-2 gap-y-3 gap-x-3 rounded-2xl  pt-5 px-2 w-full">
        <div className=" col-span-2  gap-y-5  w-full h-full justify-start flex bar ">
          <div className="border w-full col-span-2 border-chart-1/10 rounded-2xl p-6 space-y-4 bar">
            <div className=" flex flex-col gap-y-3">
              <Badge className="bg-primary/20 text-primary backdrop-blur-2xl">
                Shirt Sizes
              </Badge>

              <div className="grid grid-cols-4 gap-x-5 gap-y-3">
                {measurementFields.map((m) => (
                  <FormField
                    key={m}
                    control={control}
                    name={`shirt.${m}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize">{m}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            className="bg-background/40 border border-border"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value) || 0)
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
                  id="shirtFabricUpload"
                  onChange={(e) => onUpload(e, "shirt.shirtFabricImage")}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="monogramUpload"
                  onChange={(e) => onUpload(e, "shirt.shirtMonogramImage")}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="shirtCustomUpload"
                  onChange={(e) => onUpload(e, "shirt.shirtCustomStyle")}
                />

                {/* Buttons */}
                <Button
                  type="button"
                  variant="secondary"
                  className="justify-start gap-2 h-7! bg-linear-0 from-chart-4/40 via-secondary to-secondary text-shadow-xs"
                  onClick={() =>
                    document.getElementById("shirtFabricUpload")?.click()
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
                    document.getElementById("shirtCustomUpload")?.click()
                  }
                >
                  <UploadCloud className="h-4 w-4" />
                  Shirt Image
                </Button>
              </div>

              <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3 w-full">
                <FormField
                  control={control}
                  name="shirt.shirtMonogramName"
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
                  name="shirt.note"
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

              <div className="w-full grid lg:grid-cols-5 md:grid-cols-3 grid-cols-3 grid-rows-1 lg:grid-rows-1  gap-4 flex-wrap items-center">
                {shapeFields.map((m) => (
                  <FormField
                    key={m}
                    control={control}
                    name={`shirt.${m}`}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
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

        <div className=" flex flex-col gap-y-1  w-full h-full border border-dashed rounded-lg px-1 py-1 overflow-hidden items-center col-span-1 ">
          <Drawing onSave={(url) => setValue("shirt.shirtStyleDrawing", url)} />
        </div>
      </div>
    </>
  );
};

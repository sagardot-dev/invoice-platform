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
import {
  PantTypeEnum,
  PantMeasurementType,
  PantStyleType,
  PantLengthEnum,
} from "@/schema";
import { UploadCloud } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawing } from "./drawing";
import { useGetSignUrlMutation } from "@/modules/dashboard/server/get-signUrl";
import { toast } from "sonner";
import axios from "axios";
import { Calendar28 } from "./date-picker";

export const InvoicePantForm = () => {
  const { control, setValue, watch } = useFormContext();
  const signUrlMutation = useGetSignUrlMutation();
  const [pending, setPending] = useState(false);

  const measurementFields: (keyof PantMeasurementType)[] = [
    "wa",
    "hip",
    "cr",
    "th",
    "kn",
    "bo",
    "lg",
  ];

  const styleFields: (keyof PantStyleType)[] = [
    "slantingPkt",
    "straightPkt",
    "americanPkt",
    "backRhtPkt",
    "backLhtPkt",
    "cuffs",
    "wpIn",
    "wpOut",
    "flatB",
    "lowFront",
    "underBelly",
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
      <div className="flex flex-wrap gap-x-7 md:gap-x-12 gap-y-4 justify-start items-center px-4  w-full">
        <FormField
          control={control}
          name="pant.quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  {...field}
                  value={field.value ?? 0}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="pant.tailorName"
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
          name="pant.fittingDate"
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
          name="pant.pantType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pant Type</FormLabel>
              <FormControl>
                <NativeSelect className="bg-accent" {...field}>
                  {PantTypeEnum.options.map((type) => (
                    <option
                      className="bg-accent ring-0! border-0"
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
          name="pant.pantLength"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pant Length</FormLabel>
              <FormControl>
                <NativeSelect className="bg-accent" {...field}>
                  {PantLengthEnum.options.map((type) => (
                    <option
                      className="bg-accent ring-0! border-0"
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
          name="pant.addInnerLining"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center justify-between">
              <FormLabel>Add InnerLining</FormLabel>
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

      <div className="space-y-4 bar grid xl:grid-cols-3 xl:grid-rows-1 grid-cols-1 grid-rows-2 gap-y-5 gap-x-3 rounded-2xl pt-5 px-2">
        <div className="col-span-2  w-full h-full justify-start grid grid-cols-2 bar">
          <div className="border col-span-2 border-chart-1/10 rounded-2xl p-6 space-y-9 bar">
            <div className="flex flex-col gap-y-3">
              <Badge className="bg-primary/20 text-primary backdrop-blur-2xl">
                Pant Sizes
              </Badge>

              <div className="grid grid-cols-4 gap-5">
                {measurementFields.map((m) => (
                  <FormField
                    key={m}
                    control={control}
                    name={`pant.${m}`}
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

            <div className="pt-6 border-t flex-col flex gap-y-5">
              {/* Upload Buttons */}
              <div className="space-y-3 flex flex-wrap gap-x-2.5">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="pantFabricUpload"
                  onChange={(e) => onUpload(e, "pant.pantFabricImage")}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="pantCustomStyleUpload"
                  onChange={(e) => onUpload(e, "pant.pantCustomStyle")}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="pantMonogramUpload"
                  onChange={(e) => onUpload(e, "pant.monogramImage")}
                />

                <Button
                  type="button"
                  variant="secondary"
                  className="justify-start gap-2 h-7! bg-linear-0 from-chart-4/40 via-secondary to-secondary text-shadow-xs"
                  onClick={() =>
                    document.getElementById("pantFabricUpload")?.click()
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
                    document.getElementById("pantMonogramUpload")?.click()
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
                    document.getElementById("pantCustomStyleUpload")?.click()
                  }
                >
                  <UploadCloud className="h-4 w-4" />
                  Pant Image
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3 w-full">
                <FormField
                  control={control}
                  name="pant.monogramName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="border border-border max-h-13! bar resize-none"
                          placeholder="Add monogram name e.g., John..."
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="pant.note"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="border border-border max-h-13! bar resize-none"
                          placeholder="Note"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full grid lg:grid-cols-5 md:grid-cols-3 grid-cols-3 grid-rows-3 gap-4 flex-wrap items-center">
                {styleFields.map((m) => (
                  <FormField
                    key={m}
                    control={control}
                    name={`pant.${m}`}
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

        <div className="flex flex-col gap-y-1 w-full h-full border border-dashed rounded-lg px-1 py-1 overflow-hidden items-center">
          <Drawing
            bgImage={watch("pant.pantStyleDrawing")}
            onSave={(url) => setValue("pant.pantStyleDrawing", url)}
            onRemoveBg={() => setValue("pant.pantStyleDrawing", "")}
          />
        </div>
      </div>
    </>
  );
};

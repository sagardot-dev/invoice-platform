import React, { useRef } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { DatePicker } from "./date-picker";
import { Textarea } from "@/components/ui/textarea";
import { jacketSchema, MeasurementType, shapeType } from "@/schema";

import { Save, UploadCloud } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Drawing } from "./drawing";
import { Pencil, Eraser, RotateCcw, RotateCw, Trash2 } from "lucide-react";

export const InvoiceJacketForm = () => {
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

  const form = useForm<z.infer<typeof jacketSchema>>({
    resolver: zodResolver(jacketSchema) as any,
    defaultValues: {
      quantity: 1,
      tailorName: "",
      fittingDate: new Date(),
      addVest: false,
      addMonogram: false,
      jacketFabricImage: "",
      jacketStyleDrawing: "",
      monogramName: "",
      monogramImage: "",
      liningImage: "",
      ch: 0,
      wa: 0,
      hip: 0,
      nk: 0,
      sh: 0,
      sleeve: 0,
      arm: 0,
      fr: 0,
      ba: 0,
      lg: 0,
      vLg: 0,
      ocLg: 0,
      note: "",
    },
  });

  function onSubmit(values: z.infer<typeof jacketSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className=" flex flex-col gap-y-3  w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap gap-6 justify-between px-4 pb-3 items-center w-full">
          {/* Invoice Number */}
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    className=" w-50"
                    type="number"
                    min={1}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tailorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tailor Name</FormLabel>
                <FormControl>
                  <Input className=" w-50" placeholder="Chan Dee" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fittingDate"
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
            control={form.control}
            name="jacketType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jacket Type</FormLabel>
                <FormControl>
                  <NativeSelect {...field}>
                    <option value="NORMAL">Normal</option>
                    <option value="DOUBLE">Double</option>
                    <option value="TUXEDO">Tuxedo</option>
                  </NativeSelect>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addVest"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-between ">
                <FormLabel>Add Vest</FormLabel>
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
            control={form.control}
            name="addMonogram"
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

        <div className="space-y-4 grid grid-cols-3 gap-x-3 rounded-2xl  pt-5 px-2">
          <div className=" col-span-2  gap-y-5  w-full h-full justify-start grid grid-cols-2  ">
            <div className="border col-span-2 border-chart-1/10 rounded-2xl p-6 space-y-4">
              <div className=" flex flex-col gap-y-3">
                <Badge className="bg-primary/30 text-white">Jacket Sizes</Badge>

                <div className="grid grid-cols-4 gap-5">
                  {measurementFields.map((m) => (
                    <FormField
                      key={m}
                      control={form.control}
                      name={m}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="capitalize">{m}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.1"
                              className="bg-background/40 border-0"
                              {...field}
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
                <div className="space-y-3  flex flex-wrap gap-x-2.5">
                  <Button
                    type="button"
                    variant="secondary"
                    className=" justify-start gap-2 h-7! bg-linear-0 from-chart-4/40 via-secondary to-secondary text-shadow-xs"
                  >
                    <UploadCloud className="h-4 w-4" />
                    Upload Fabric Image
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    className=" justify-start gap-2 h-7! bg-linear-0 from-chart-4/40 via-secondary to-secondary text-shadow-xs"
                  >
                    <UploadCloud className="h-4 w-4" />
                    Upload Lining Image
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className=" justify-start gap-2 h-7! bg-linear-0 from-chart-4/40 via-secondary to-secondary text-shadow-xs"
                  >
                    <UploadCloud className="h-4 w-4" />
                    Monogram Image
                  </Button>
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-3 w-full">
                  <FormField
                    control={form.control}
                    name="monogramName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            className=" w-full bar border-0 max-h-13! resize-none"
                            placeholder="Monogram Name ect.. JOHN"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            className=" border-0 max-h-13! bar resize-none"
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
                      control={form.control}
                      name={m}
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

          <div className=" flex flex-col gap-y-1  w-full h-full border border-dashed rounded-lg px-1 py-1 overflow-hidden justify-center items-center ">
            <Drawing />
          </div>
        </div>
        <div className=" w-full items-end flex justify-end">
          <Button
            className=" text-end w-fit h-8! bg-linear-0 from-chart-5 via-primary/30 to-primary text-shadow-xs"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

import React from "react";

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
import { jacketSchema, MeasurementType } from "@/schema";
import { UploadCloud } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

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
  ];

  const form = useForm<z.infer<typeof jacketSchema>>({
    resolver: zodResolver(jacketSchema) as any,
    defaultValues: {
      quantity: 1,
      tailorName: "",
      addVest: false,
      jacketFabricImage: "",
      jacketStyleDrawing: "",
      monogramName: "",
      monogramImage: "",
      liningImage: "",
      ch: undefined,
      wa: undefined,
      hip: undefined,
      nk: undefined,
      sh: undefined,
      sleeve: undefined,
      arm: undefined,
      fr: undefined,
      ba: undefined,
      lg: undefined,
      vLg: undefined,
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
                  <Input className=" w-50" type="number" min={1} {...field} />
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
            name="tailorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fitting Date</FormLabel>
                <FormControl>
                  <Input
                    className=" w-50"
                    placeholder="11.12.2025"
                    {...field}
                  />
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
            name="addVest"
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
                <div className="space-y-3  flex gap-x-2.5">
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
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Textarea
                          className=" border-0 h-8! resize-none"
                          placeholder="Note"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="w-full grid grid-cols-6 grid-rows-2 gap-4 flex-wrap items-center">
                  <FormField
                    control={form.control}
                    name="nSho"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center justify-between">
                        <FormLabel>N.SHO</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sqSho"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center justify-between">
                        <FormLabel>SQ.SHO</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rdSho"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center justify-between">
                        <FormLabel>RD.SHO</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sloSho"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center justify-between">
                        <FormLabel>SLO.SHO</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hBk"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center justify-between">
                        <FormLabel>H.BK</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="curveBk"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center justify-between">
                        <FormLabel>Curve.BK</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shoNk"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center justify-between">
                        <FormLabel>SHO.NK</FormLabel>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className=" flex flex-col gap-y-4  w-full h-full border border-dashed rounded-lg ">
            <div className=" w-full flex justify-end border-b pb-2 p-3">
              <Button
                type="button"
                variant={"customsm"}
                className=" justify-start gap-2"
              >
                <UploadCloud className=" size-3" />
              </Button>
            </div>
            draw
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

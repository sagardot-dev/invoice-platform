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

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

export const InvoiceForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        className=" flex flex-col gap-y-7 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-wrap gap-6 justify-between items-center w-full">
          {/* Invoice Number */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <Input className="w-50" placeholder="INV-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Payment Method */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <NativeSelect {...field}>
                    <NativeSelectOption value="">
                      Select method
                    </NativeSelectOption>
                    <NativeSelectOption value="CC">
                      Credit Card
                    </NativeSelectOption>
                    <NativeSelectOption value="CA">Cash</NativeSelectOption>
                    <NativeSelectOption value="BANKTRANSFER">
                      Bank Transfer
                    </NativeSelectOption>
                    <NativeSelectOption value="CRYPTO">
                      Crypto
                    </NativeSelectOption>
                    <NativeSelectOption value="CHECK">Check</NativeSelectOption>
                  </NativeSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DatePicker {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ready Made */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col-reverse  items-start">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Ready made?</FormLabel>
              </FormItem>
            )}
          />

          {/* Reselling */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col-reverse  items-start">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Reselling?</FormLabel>
              </FormItem>
            )}
          />

          {/* Salesman */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salesman</FormLabel>
                <FormControl>
                  <NativeSelect {...field}>
                    <NativeSelectOption value="">
                      Select salesman
                    </NativeSelectOption>
                    <NativeSelectOption value="apple">Apple</NativeSelectOption>
                    <NativeSelectOption value="banana">
                      Banana
                    </NativeSelectOption>
                  </NativeSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6 grid grid-cols-2 gap-x-3 border border-accent-foreground/5 px-4 rounded-2xl py-5  ">
          <div className=" flex flex-col gap-y-5 p-4 w-full h-full justify-start  ">
            <Badge className=" rounded-lg bg-chart-2">From</Badge>
            <div className=" gap-x-3 grid grid-cols-2 w-full justify-start items-center">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className=" grid grid-cols-2  w-full gap-x-3 justify-start items-center">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" w-full justify-start flex gap-y-4 flex-col">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Url</FormLabel>
                    <FormControl>
                      <Textarea placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className=" flex flex-col gap-y-4 p-4 w-full h-full ">
            <div>
              <Badge className=" rounded-lg bg-chart-2">To</Badge>
            </div>
            <div className=" grid grid-cols-2  justify-start items-center gap-x-3 w-full">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className=" grid grid-cols-2  justify-start items-center gap-x-3 w-full">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number </FormLabel>
                    <FormControl>
                      <Input className="" placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <NativeSelect className="w-full" {...field}>
                        <NativeSelectOption value="">
                          Select method
                        </NativeSelectOption>
                        <NativeSelectOption value="CC">
                          Credit Card
                        </NativeSelectOption>
                        <NativeSelectOption value="CA">Cash</NativeSelectOption>
                        <NativeSelectOption value="BANKTRANSFER">
                          Bank Transfer
                        </NativeSelectOption>
                        <NativeSelectOption value="CRYPTO">
                          Crypto
                        </NativeSelectOption>
                        <NativeSelectOption value="CHECK">
                          Check
                        </NativeSelectOption>
                      </NativeSelect>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hotel</FormLabel>
                  <FormControl>
                    <Textarea placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className=" w-full flex justify-end">
          <Button className=" h-8! bg-linear-0 from-chart-5 via-primary/30 to-primary text-shadow-xs w-fit"type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

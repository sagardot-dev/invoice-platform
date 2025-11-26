"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
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
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { PaymentMethodEnum } from "@/schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { Drawing } from "./drawing";
import { useGetHelpersData } from "@/modules/helper/server/get-many-helper";
import { Helper, SaleMan } from "@/generated/prisma/client";
import { useGetSalemenData } from "@/modules/saleman/server/get-many-saleman";
import { Calendar28 } from "./date-picker";
import { generatePrefix } from "@/lib/prefix/invoice-prefix";
import { useIsClient } from "@/hooks/use-client";

export const InvoiceForm = () => {
  const isClient = useIsClient();
  const [unique] = useState(() =>
    (Math.random().toString(36).substring(2) + Date.now().toString(36))
      .substring(0, 6)
      .toUpperCase()
  );
  const queryHelper = useGetHelpersData();
  const querySalemen = useGetSalemenData();
  const [reselling, setReselling] = useState(false);
  const [isReadymade, setIsReadymade] = useState(false);
  const { control, watch, setValue } = useFormContext();

  const saleManIds = watch("saleManIds");



  useEffect(() => {
    const subscription = watch((value) => {
      setReselling(value.reselling);
      setIsReadymade(value.isReadymade);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (!reselling) {
      setValue("helperIds", []);
    }
  }, [reselling, setValue]);

  useEffect(() => {
    if (!saleManIds) return;
    if (saleManIds.length > 0) {
      const selectedSaleMen = querySalemen.data?.filter((s: SaleMan) =>
        saleManIds.includes(s.id)
      );

      if (selectedSaleMen && selectedSaleMen.length > 0) {
        const prefix = selectedSaleMen
          .map((s: { name: string }) => generatePrefix(s.name))
          .join("-")
          .toUpperCase();

        setValue("invoiceNumber", `${prefix}-${unique}`);
      }
    } else {
      setValue("invoiceNumber", "");
    }
  }, [saleManIds, setValue, unique, querySalemen.data]);

  
  if (!isClient) return null;

  return (
    <>
      <div className="flex flex-col h-full gap-x-8 gap-y-6 w-full">
        <div className=" flex flex-wrap gap-6 md:gap-x-10 justify-start items-center px-4  w-full pb-4">
          <FormField
            control={control}
            name="invoiceNumber"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Invoice Number</FormLabel>
                <FormControl>
                  <Input className="w-60" placeholder="INV-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Payment Method */}
          <FormField
            control={control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <NativeSelect {...field}>
                    <NativeSelectOption value="">
                      Select method
                    </NativeSelectOption>
                    {PaymentMethodEnum.options.map((method) => (
                      <NativeSelectOption key={method} value={method}>
                        {method === "CC"
                          ? "Credit Card"
                          : method === "CA"
                          ? "Cash"
                          : method === "BANKTRANSFER"
                          ? "Bank Transfer"
                          : method === "CRYPTO"
                          ? "Crypto"
                          : "Check"}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date */}
          <FormField
            control={control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Calendar28
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Toggles */}
          <FormField
            control={control}
            name="reselling"
            render={({ field }) => (
              <FormItem className="flex flex-col-reverse items-start">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Resale?</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="isReadymade"
            render={({ field }) => (
              <FormItem className="flex flex-col-reverse items-start">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Ready Made?</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="saleManIds"
            render={({ field }) => {
              const safeValue = Array.isArray(field.value) ? field.value : [];

              return (
                <FormItem>
                  <FormLabel>Select Saleman</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        Select Saleman
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        {querySalemen.data && (
                          <CommandGroup>
                            {querySalemen.data.map((data: SaleMan) => (
                              <CommandItem
                                key={data.id}
                                onSelect={() => {
                                  if (safeValue.includes(data.id)) {
                                    field.onChange(
                                      safeValue.filter((v) => v !== data.id)
                                    );
                                  } else {
                                    field.onChange([...safeValue, data.id]);
                                  }
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    safeValue.includes(data.id)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                />
                                {data.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {safeValue.length > 0 && (
                    <div className=" lg:flex  lg:gap-x-2 mt-2 absolute lg:right-39 lg:top-14  hidden ">
                      {safeValue.map((id: string) => {
                        const helper = querySalemen.data?.find(
                          (h: Helper) => h.id === id
                        );
                        if (!helper) return null;
                        return (
                          <Badge className="py-0" key={id}>
                            <p className="text-2xs">{helper.name}</p>
                          </Badge>
                        );
                      })}
                    </div>
                  )}

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Helper - only when resale is true */}
          {!!reselling && (
            <FormField
              control={control}
              name="helperIds"
              render={({ field }) => {
                const safeValue = Array.isArray(field.value) ? field.value : [];

                return (
                  <FormItem className="">
                    <FormLabel>Select Helpers</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        >
                          Select helper
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          {queryHelper.data && (
                            <CommandGroup>
                              {queryHelper.data.map((data: Helper) => (
                                <CommandItem
                                  key={data.id}
                                  onSelect={() => {
                                    if (safeValue.includes(data.id)) {
                                      field.onChange(
                                        safeValue.filter((v) => v !== data.id)
                                      );
                                    } else {
                                      field.onChange([...safeValue, data.id]);
                                    }
                                  }}
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${
                                      safeValue.includes(data.id)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                                  />
                                  {data.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          )}
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {safeValue.length > 0 && (
                      <div className=" lg:flex  lg:gap-x-2 mt-2 absolute lg:right-39 lg:top-6  hidden">
                        {safeValue.map((id: string) => {
                          const helper = queryHelper.data?.find(
                            (h: Helper) => h.id === id
                          );
                          if (!helper) return null;
                          return (
                            <Badge className="py-0" key={id} variant="outline">
                              <p className="text-2xs">{helper.name}</p>
                            </Badge>
                          );
                        })}
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}
        </div>

        {/* From (OnBoard Info) */}
        <div className="space-y-6 grid xl:grid-cols-7 grid-cols-1 gap-x-2 border border-accent-foreground/5 px-2 py-3 rounded-2xl ">
          <div className="flex flex-col gap-y-7 py-4 px-2 md:p-4 w-full h-full justify-start col-span-2">
            <Badge className="rounded-lg bg-chart-2">From</Badge>
            <div className="grid gap-y-4 md:grid-cols-2 gap-x-3 w-full">
              <FormField
                control={control}
                name="onBoard.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="onBoard.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="company@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid  gap-y-4 md:grid-cols-2  gap-x-3  w-full">
              <FormField
                control={control}
                name="onBoard.phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+66 123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="onBoard.whatsappNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+66 987654321" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="onBoard.taxId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tax ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="onBoard.websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourwebsite.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-col gap-y-4">
              <FormField
                control={control}
                name="onBoard.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Address</FormLabel>
                    <FormControl>
                      <Textarea
                        className=" resize-none"
                        placeholder="Enter company address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Textarea
                        className=" resize-none"
                        placeholder="Additional notes"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* To (Customer Info) */}
          <div className="flex flex-col col-span-3 gap-y-7 gap-x-3 p-4 w-full h-full">
            <Badge className="rounded-lg bg-chart-2">To</Badge>
            <div className="grid gap-y-4 md:grid-cols-2  gap-x-3  w-full">
              <FormField
                control={control}
                name="customer.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Customer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="customer.phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+66 123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-y-4 md:grid-cols-2  gap-x-3  w-full">
              <FormField
                control={control}
                name="customer.height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Height"
                        {...field}
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
                name="customer.weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Weight"
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
                name="customer.stayDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stay Days</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Days"
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
                name="totalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-y-4 md:grid-cols-  gap-x-3 w-full">
              <FormField
                control={control}
                name="customer.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Address</FormLabel>
                    <FormControl>
                      <Textarea
                        className=" resize-none"
                        placeholder="Enter customer address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-4 gap-x-3 gap-y-5 w-full">
              <FormField
                control={control}
                name="customer.gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <NativeSelect {...field}>
                        <NativeSelectOption value="MALE">
                          Male
                        </NativeSelectOption>
                        <NativeSelectOption value="FEMALE">
                          Female
                        </NativeSelectOption>
                      </NativeSelect>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="customerStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <NativeSelect {...field}>
                        <NativeSelectOption value="UNPAID">
                          Unpaid
                        </NativeSelectOption>
                        <NativeSelectOption value="PAID">
                          Paid
                        </NativeSelectOption>
                        <NativeSelectOption value="BALANCE">
                          Balance
                        </NativeSelectOption>
                        <NativeSelectOption value="PENDING">
                          Pending
                        </NativeSelectOption>
                      </NativeSelect>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="customer.email"
                render={({ field }) => (
                  <FormItem className=" col-span-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="company@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className=" flex flex-col gap-y-1 col-span-2  w-full h-full border border-dashed rounded-lg px-1 py-1 overflow-hidden items-center ">
            <Drawing onSave={(url) => setValue("customerSignature", url)} />
          </div>
        </div>
      </div>
    </>
  );
};

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
import { DatePicker } from "./date-picker";
import { Textarea } from "@/components/ui/textarea";
import { PaymentMethodEnum } from "@/schema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Drawing } from "./drawing";

export const InvoiceForm = () => {
  const [isMultiSaleMan, setIsMultiSaleMan] = useState(false);
  const [reselling, setReselling] = useState(false);
  const [isReadymade, setIsReadymade] = useState(false);
  const { control, watch, setValue } = useFormContext();

  useEffect(() => {
    const subscription = watch((value) => {
      setIsMultiSaleMan(value.isMultiSaleMan);
      setReselling(value.reselling);
      setIsReadymade(value.isReadymade);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <div className="flex flex-col h-full gap-x-8 gap-y-8 w-full">
        <div className=" flex flex-wrap gap-7 md:gap-x-12 justify-start items-center px-4  w-full pb-4">
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
                  <DatePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Salesman */}
          <FormField
            control={control}
            name="salesMan"
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
            name="isMultiSaleMan"
            render={({ field }) => (
              <FormItem className="flex flex-col-reverse items-start">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Multiple Salesmen?</FormLabel>
              </FormItem>
            )}
          />

          {/* Multiple Salesmen */}
          {!!isMultiSaleMan && (
            <FormField
              control={control}
              name="moreSaleMan"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Select Salesmen</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        Select Salesmen
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandGroup>
                          {["John", "Mike", "Sara", "Ali"].map((name) => (
                            <CommandItem
                              key={name}
                              onSelect={() => {
                                if (field.value.includes(name)) {
                                  field.onChange(
                                    field.value.filter(
                                      (v: string) => v !== name
                                    )
                                  );
                                } else {
                                  field.onChange([...field.value, name]);
                                }
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  field.value.includes(name)
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <div className="flex flex-wrap gap-2 mt-2 absolute right-44 top-10">
                    {field.value.map((name: string) => (
                      <Badge className="py-0" key={name} variant="secondary">
                        <p className="text-2xs">{name}</p>
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Helper - only when resale is true */}
          {!!reselling && (
            <FormField
              control={control}
              name="helperId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Helper</FormLabel>
                  <FormControl>
                    <NativeSelect {...field}>
                      <NativeSelectOption value="">
                        Select Helper
                      </NativeSelectOption>
                      <NativeSelectOption value="apple">
                        Apple
                      </NativeSelectOption>
                      <NativeSelectOption value="banana">
                        Banana
                      </NativeSelectOption>
                    </NativeSelect>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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

            <div className="grid gap-y-4  gap-x-3 w-full">
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

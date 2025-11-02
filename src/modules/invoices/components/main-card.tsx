import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { InvoiceTable } from "./table";

export const MainCard = () => {
  return (
    <Card className=" border-none space-y-9 ">
      <CardHeader className=" flex justify-between items-center border-b  ">
        <div>
          <CardTitle className=" text-2xl font-semibold">Invoice</CardTitle>
          <CardDescription>manage Your invoices right here</CardDescription>
        </div>
        <div className=" flex flex-col justify-center items-center gap-2">
          <Button className="" asChild variant={"custom"}>
            <Link prefetch href={"/invoices/create"}>
              <PlusIcon className="size-4 text-white" />
            </Link>
          </Button>
          <p className=" text-sm">Create Invoice</p>
        </div>
      </CardHeader>
      <CardContent className=" flex flex-col space-y-3">
        <div>
          <p className=" text-lg font-semibold text-chart-2/60 underline">
            Previous Invoices
          </p>
        </div>
        <InvoiceTable />
      </CardContent>
    </Card>
  );
};

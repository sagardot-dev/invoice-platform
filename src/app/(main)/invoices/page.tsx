import { MainCard } from "@/modules/invoices/components/main-card";
import { columns } from "./cloumns";
import { DataTable } from "./data-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
];

const page = () => {
  return (
    <>
      <Card className=" border-none space-y-2 ">
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
          <DataTable columns={columns} data={payments} />
        </CardContent>
      </Card>
    </>
  );
};

export default page;

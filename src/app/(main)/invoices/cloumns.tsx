"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { InvoiceAction } from "@/modules/invoices/components/invoice-action";
import { format } from "date-fns";
import { CustomerStatus, PaymentMethod } from "@/generated/prisma/enums";

export type Invoice = {
  id: string,
  invoiceNumber: string;
  date: string | Date;
  customerStatus: CustomerStatus;
  paymentMethod: PaymentMethod;
  totalAmount: number | null;

  customer: {
    id: string;
    name: string;
    email: string;
  };

  saleMen: {
    id: string;
    name: string;
    email: string;
    status: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
  }[];
};

export const columns: ColumnDef<Invoice>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice #",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => {
      const dateValue = getValue() as string | Date | undefined;
      if (!dateValue) return "-";

      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return "-";

      return format(date, "dd/MM/yyyy");
    },
  },

  {
    accessorFn: (row) => row.customer.name,
    id: "customerName",
    header: "Customer Name",
  },
  {
    accessorFn: (row) => row.customer.email,
    id: "customerEmail",
    header: "Customer Email",
  },
  {
    accessorFn: (row) => row.saleMen.map((s) => s.name).join(", "),
    id: "saleMen",
    header: "Salesmen",
  },
  {
    accessorKey: "totalAmount",
    header: "Amount",
    cell: ({ getValue }) => {
      const value = getValue() as number | null;
      if (value == null) return "-";
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "THB",
      }).format(value);
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const invoice = row.original;
      return <InvoiceAction invoiceId={invoice?.id} />;
    },
  },
];

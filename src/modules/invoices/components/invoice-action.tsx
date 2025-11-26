"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DownloadCloud,
  MailIcon,
  MoreHorizontalIcon,
  Pencil,
} from "lucide-react";
import Link from "next/link";

interface InvoiceActionProps {
  invoiceId: string;
}

export const InvoiceAction = ({ invoiceId }: InvoiceActionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link prefetch href={`invoices/${invoiceId}`}>
            <Pencil className=" size-3" /> Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link prefetch href={""}>
            <DownloadCloud className=" size-3" /> Download
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link prefetch href={""}>
            <MailIcon className=" size-3" /> Reminder Email
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

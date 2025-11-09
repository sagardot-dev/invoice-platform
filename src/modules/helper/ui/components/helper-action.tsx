"use client";

import { Badge } from "@/components/ui/badge";
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
  CheckCircle,
  DownloadCloud,
  MailIcon,
  MoreHorizontalIcon,
  Pencil,
  Plus,
  Trash,
} from "lucide-react";
import Link from "next/link";

export const HelperAction = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge  className=" cursor-pointer rounded-md py-px  bg-secondary-foreground">
          <MoreHorizontalIcon />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link prefetch href={""}>
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
        <DropdownMenuItem className=" bg-destructive/10" asChild>
          <Link prefetch href={""}>
            <Trash className=" text-destructive size-3" /> Delete
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className=" bg-emerald-500/10" asChild>
          <Link prefetch href={""}>
            <CheckCircle className=" text-emerald-400 size-3" /> Mark as paid
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

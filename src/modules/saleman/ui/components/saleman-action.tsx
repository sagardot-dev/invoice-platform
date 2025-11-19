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
import { SaleMan } from "@/generated/prisma/client";
import { MoreHorizontalIcon, Pencil, Trash } from "lucide-react";
import Link from "next/link";

export const SaleManAction = ({ id }: { id: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge className=" cursor-pointer rounded-md py-px  bg-muted">
          <MoreHorizontalIcon className=" text-muted-foreground" />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link prefetch href={`/sale-men/${id}`}>
            <Pencil className=" size-3" /> Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className=" bg-destructive/10" asChild>
          <Link prefetch href={""}>
            <Trash className=" text-destructive size-3" /> Delete
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

"use client";

import React from "react";
import { useGetSalemanData } from "../../server/get-saleman";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Props {
  salemanId: string;
}

export const SaleManEdit = ({ salemanId }: Props) => {
  const query = useGetSalemanData(salemanId);

  if (query.isLoading) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground text-sm">Loading saleman data...</p>
      </Card>
    );
  }

  if (query.error || !query.data?.data) {
    return (
      <Card className="p-6">
        <p className="text-red-500 text-sm">Failed to load saleman data.</p>
      </Card>
    );
  }

  const saleman = query.data.data;

  return (
    <Card className="border border-accent-foreground/5 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{saleman.name}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {saleman.email}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium">Status:</p>
          <Badge
            variant={saleman.status === "ACTIVE" ? "default" : "secondary"}
            className="rounded-md"
          >
            {saleman.status}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xs font-medium">Role:</p>
          <Badge className="rounded-md bg-blue-500/20 text-blue-500">
            {saleman.role}
          </Badge>
        </div>

        <Separator />

        <div className="text-xs space-y-1 text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">User ID:</span>{" "}
            {saleman.userId}
          </p>
          <p>
            <span className="font-medium text-foreground">Created:</span>{" "}
            {new Date(saleman.createdAt).toLocaleString()}
          </p>
          <p>
            <span className="font-medium text-foreground">Updated:</span>{" "}
            {new Date(saleman.updatedAt).toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

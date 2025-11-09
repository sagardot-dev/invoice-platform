"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useGetSalemenData } from "../../server/get-many-saleman";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { BoxIcon, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Kbd } from "@/components/ui/kbd";
import { SaleMan } from "@/generated/prisma/client";
import { SaleManAction } from "./saleman-action";

export const SalemanDataCard = () => {
  const [mouthed, setMounted] = useState(false);
  const query = useGetSalemenData();
  console.log(query.data);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mouthed) return null;

  return (
    <Card className=" border border-accent-foreground/3">
      <CardHeader>
        <CardTitle>Salemen</CardTitle>
        <CardAction>
          <Kbd>Saleman data</Kbd>
        </CardAction>
      </CardHeader>
      <CardContent className=" bar flex flex-col md:flex-row overflow-auto max-h-70 gap-2 md:flex-wrap">
        {!query.data || query.data.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <BoxIcon />
              </EmptyMedia>
              <EmptyTitle>No Saleman data</EmptyTitle>
              <EmptyDescription className=" text-xs text-accent-foreground/30">
                No data found...
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Badge className=" rounded-md bg-muted">
                add data to get start
              </Badge>
            </EmptyContent>
          </Empty>
        ) : (
          <>
            {query.data.map((data: SaleMan) => (
              <Card key={data.id} className="min-w-56">
                <CardHeader>
                  <CardTitle>
                    <p className=" text-bold text-sm">{data.name}</p>
                  </CardTitle>
                  <CardDescription className=" text-xs text-muted-foreground/40">
                    {data.role}
                  </CardDescription>
                  <CardAction>
                    <SaleManAction/>
                  </CardAction>
                </CardHeader>
                <CardContent className=" text-xs">
                  <p className=" text-xs max-w-3xs">{data.email}</p>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

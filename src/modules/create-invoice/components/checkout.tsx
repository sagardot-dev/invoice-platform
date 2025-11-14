"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const CheckOut = () => {
  const { getValues } = useFormContext();
  const data = getValues();

  const renderSizes = (sizes: Record<string, any>) =>
    Object.entries(sizes).map(([key, value]) => (
      <Badge
        key={key}
        className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm  mr-1 mb-1"
      >
        {key.toLowerCase()}: {value}
      </Badge>
    ));

  const renderOptions = (options: Record<string, boolean>) =>
    Object.entries(options)
      .filter(([, val]) => val)
      .map(([key]) => (
        <Badge
          key={key}
          className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-sm mr-1 mb-1"
        >
          {key}
        </Badge>
      ));

  return (
    <div className="space-y-6">
      {/* Invoice - full width */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className=" w-fit px-2 py-1 rounded-md">
            Invoice Details
          </CardTitle>
          <CardAction>
            <Badge className=" py-0 bg-primary/5 border border-primary/50 text-primary ">
              Invoice Details
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <div>
            Invoice Number:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
              {data.invoiceNumber || "-"}
            </Badge>
          </div>
          <div>
            Date:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
              {new Date(data.date).toLocaleDateString()}
            </Badge>
          </div>
          <div>
            Customer Status:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
              {data.customerStatus}
            </Badge>
          </div>
          <div>
            Payment Method:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
              {data.paymentMethod}
            </Badge>
          </div>
          <div>
            Total Amount:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
              {data.totalAmount}
            </Badge>
          </div>
          <div>
            Notes:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
              {data.notes || "-"}
            </Badge>
          </div>
          <div>
            Reselling:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
              {data.reselling ? "Yes" : "No"}
            </Badge>
          </div>
          <div>
            Readymade:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
              {data.isReadymade ? "Yes" : "No"}
            </Badge>
          </div>
          <div>
            Customer Name:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
              {data.customer.name || "-"}
            </Badge>
          </div>
          <div>
            Phone:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
              {data.customer.phoneNumber || "-"}
            </Badge>
          </div>
          <div>
            Email:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
              {data.customer.email || "-"}
            </Badge>
          </div>
          <div>
            Address:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
              {data.customer.address || "-"}
            </Badge>
          </div>
          <div>
            Gender:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
              {data.customer.gender}
            </Badge>
          </div>
          <div>
            Height:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
              {data.customer.height}
            </Badge>
          </div>
          <div>
            Weight:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
              {data.customer.weight}
            </Badge>
          </div>
          <div>
            Stay Days:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
              {data.customer.stayDays}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Jacket / Pant / Shirt row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Jacket */}
        <Card>
          <CardHeader>
            <CardTitle className="  px-3 py-1 rounded-md">Jacket</CardTitle>
            <CardAction>
              <Badge className=" py-0 bg-primary/5 border border-primary/50 text-primary ">
                JAcket Details
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              Quantity:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
                {data.jacket.quantity}
              </Badge>
            </div>
            <div>
              Tailor:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
                {data.jacket.tailorName || "-"}
              </Badge>
            </div>
            <div>
              Fitting Date:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
                {data.jacket.fittingDate
                  ? new Date(data.jacket.fittingDate).toLocaleDateString()
                  : "-"}
              </Badge>
            </div>
            <div className="flex flex-wrap ">
              sizes:{"  "}
              {renderSizes({
                CH: data.jacket.ch,
                WA: data.jacket.wa,
                HIP: data.jacket.hip,
                NK: data.jacket.nk,
                SH: data.jacket.sh,
                Sleeve: data.jacket.sleeve,
                Arm: data.jacket.arm,
                FR: data.jacket.fr,
                BA: data.jacket.ba,
                LG: data.jacket.lg,
              })}
            </div>
            <div className="flex flex-wrap ">
              {renderOptions({
                Vest: data.jacket.addVest,
                Monogram: data.jacket.addMonogram,
                nSho: data.jacket.nSho,
                sqSho: data.jacket.sqSho,
                rdSho: data.jacket.rdSho,
                sloSho: data.jacket.sloSho,
                hBk: data.jacket.hBk,
                curveBk: data.jacket.curveBk,
                shoNk: data.jacket.shoNk,
                bigM: data.jacket.bigM,
                holBk: data.jacket.holBk,
                holCh: data.jacket.holCh,
                brBly: data.jacket.brBly,
                lLo: data.jacket.lLo,
                rLo: data.jacket.rLo,
                erect: data.jacket.erect,
                flatB: data.jacket.flatB,
              })}
            </div>
            <div>
              Note:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
                {data.jacket.note || "-"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Pant */}
        <Card>
          <CardHeader>
            <CardTitle className="  px-3 py-1 rounded-md">Pant</CardTitle>
            <CardAction>
              <Badge className=" py-0 bg-primary/5 border border-primary/50 text-primary ">
                Pant Details
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              Quantity:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
                {data.pant.quantity}
              </Badge>
            </div>
            <div>
              Tailor:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
                {data.pant.tailorName || "-"}
              </Badge>
            </div>
            <div>
              Fitting Date:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
                {data.pant.fittingDate
                  ? new Date(data.pant.fittingDate).toLocaleDateString()
                  : "-"}
              </Badge>
            </div>
            <div className="flex flex-wrap">
              sizes:{"  "}
              {renderSizes({
                WA: data.pant.wa,
                HIP: data.pant.hip,
                CR: data.pant.cr,
                TH: data.pant.th,
                KN: data.pant.kn,
                BO: data.pant.bo,
                LG: data.pant.lg,
              })}
            </div>
            <div className="flex flex-wrap">
              {renderOptions({
                Slanting: data.pant.slantingPkt,
                Straight: data.pant.straightPkt,
                American: data.pant.americanPkt,
                backRhtPkt: data.pant.backRhtPkt,
                backLhtPkt: data.pant.backLhtPkt,
                cuffs: data.pant.cuffs,
                wpIn: data.pant.wpIn,
                wpOut: data.pant.wpOut,
                flatB: data.pant.flatB,
                lowFront: data.pant.lowFront,
                underBelly: data.pant.underBelly,
              })}
            </div>
            <div>
              Note:{" "}
              <Badge className="bg-linear-0 from-chart-3/40 text-shadow-xs py-0 rounded-sm">
                {data.pant.note || "-"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Shirt */}
        <Card>
          <CardHeader>
            <CardTitle className="  px-3 py-1 rounded-md">Shirt</CardTitle>
            <CardAction>
              <Badge className=" py-0 bg-primary/5 border border-primary/50 text-primary ">
                Shirt Details
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              Quantity:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
                {data.shirt.quantity}
              </Badge>
            </div>
            <div>
              Tailor:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
                {data.shirt.tailorName || "-"}
              </Badge>
            </div>
            <div>
              Fitting Date:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
                {data.shirt.fittingDate
                  ? new Date(data.shirt.fittingDate).toLocaleDateString()
                  : "-"}
              </Badge>
            </div>
            <div className="flex flex-wrap">
              sizes:{"  "}
              {renderSizes({
                CH: data.shirt.ch,
                WA: data.shirt.wa,
                HIP: data.shirt.hip,
                NK: data.shirt.nk,
                SH: data.shirt.sh,
                Sleeve: data.shirt.sleeve,
                Arm: data.shirt.arm,
                FR: data.shirt.fr,
                BA: data.shirt.ba,
                LG: data.shirt.lg,
                STB: data.shirt.stb,
                STW: data.shirt.stw,
                AH: data.shirt.ah,
                DressLg: data.shirt.dressLg,
                SkirtLg: data.shirt.skirtLg,
                nLow: data.shirt.nLow,
              })}
            </div>
            <div className="flex flex-wrap">
              {renderOptions({
                Monogram: data.shirt.addMonogram,
                Tie: data.shirt.addTie,
                sqSho: data.shirt.sqSho,
                rdSho: data.shirt.rdSho,
                sloSho: data.shirt.sloSho,
                brBly: data.shirt.brBly,
                sloNk: data.shirt.sloNk,
              })}
            </div>
            <div>
              Note:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 rounded-sm">
                {data.shirt.note || "-"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

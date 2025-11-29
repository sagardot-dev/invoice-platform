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
  const data = getValues() || {};
  const customer = data.customer || {};
  const jacket = data.jacket || {};
  const pant = data.pant || {};
  const shirt = data.shirt || {};
  const renderSizes = (sizes: Record<string, any> = {}) =>
    Object.entries(sizes).map(([key, value]) => (
      <Badge
        key={key}
        className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1"
      >
        {" "}
        {key.toLowerCase()}: {value ?? "-"}{" "}
      </Badge>
    ));
  const renderOptions = (options: Record<string, boolean> = {}) =>
    Object.entries(options)
      .filter(([, val]) => val)
      .map(([key]) => (
        <Badge
          key={key}
          className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1"
        >
          {" "}
          {key}{" "}
        </Badge>
      ));
  return (
    <div className="space-y-6">
      {" "}
      {/* Invoice Details */}{" "}
      <Card className="w-full">
        {" "}
        <CardHeader>
          {" "}
          <CardTitle className="w-fit px-2 py-1 rounded-md">
            Invoice Details
          </CardTitle>{" "}
          <CardAction>
            {" "}
            <Badge className="py-0 bg-primary/5 border border-primary/50 text-primary">
              {" "}
              Invoice Details{" "}
            </Badge>{" "}
          </CardAction>{" "}
        </CardHeader>{" "}
        <CardContent className="grid grid-cols-2 gap-3 text-sm">
          {" "}
          <div>
            Invoice Number:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
              {data.invoiceNumber || "-"}
            </Badge>
          </div>{" "}
          <div>
            Date:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
              {data.date ? new Date(data.date).toLocaleDateString() : "-"}
            </Badge>
          </div>{" "}
          <div>
            Customer Status:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
              {data.customerStatus || "-"}
            </Badge>
          </div>{" "}
          <div>
            Payment Method:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
              {data.paymentMethod || "-"}
            </Badge>
          </div>{" "}
          <div>
            Total Amount:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
              {data.totalAmount ?? "-"}
            </Badge>
          </div>{" "}
          <div>
            Notes:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
              {data.notes || "-"}
            </Badge>
          </div>{" "}
          <div>
            Reselling:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
              {data.reselling ? "Yes" : "No"}
            </Badge>
          </div>{" "}
          <div>
            Readymade:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
              {data.isReadymade ? "Yes" : "No"}
            </Badge>
          </div>{" "}
          <div>
            Customer Name:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
              {customer.name || "-"}
            </Badge>
          </div>{" "}
          <div>
            Phone:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
              {customer.phoneNumber || "-"}
            </Badge>
          </div>{" "}
          <div>
            Email:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
              {customer.email || "-"}
            </Badge>
          </div>{" "}
          <div>
            Address:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
              {customer.address || "-"}
            </Badge>
          </div>{" "}
          <div>
            Gender:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
              {customer.gender || "-"}
            </Badge>
          </div>{" "}
          <div>
            Height:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
              {customer.height ?? "-"}
            </Badge>
          </div>{" "}
          <div>
            Weight:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
              {customer.weight ?? "-"}
            </Badge>
          </div>{" "}
          <div>
            Stay Days:{" "}
            <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
              {customer.stayDays ?? "-"}
            </Badge>
          </div>{" "}
        </CardContent>{" "}
      </Card>{" "}
      {/* Jacket / Pant / Shirt */}{" "}
      <div className="grid grid-cols-3 gap-4">
        {" "}
        {/* Jacket */}{" "}
        <Card>
          {" "}
          <CardHeader>
            {" "}
            <CardTitle className="px-3 py-1 rounded-md">Jacket</CardTitle>{" "}
            <CardAction>
              {" "}
              <Badge className="py-0 bg-primary/5 border border-primary/50 text-primary">
                {" "}
                Jacket Details{" "}
              </Badge>{" "}
            </CardAction>{" "}
          </CardHeader>{" "}
          <CardContent className="space-y-2 text-sm">
            {" "}
            <div>
              Quantity:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
                {jacket.quantity ?? "-"}
              </Badge>
            </div>{" "}
            <div>
              Tailor:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
                {jacket.tailorName || "-"}
              </Badge>
            </div>{" "}
            <div>
              Fitting Date:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
                {jacket.fittingDate
                  ? new Date(jacket.fittingDate).toLocaleDateString()
                  : "-"}
              </Badge>
            </div>{" "}
            <div className="flex flex-wrap">
              {" "}
              Sizes:{" "}
              {renderSizes({
                CH: jacket.ch,
                WA: jacket.wa,
                HIP: jacket.hip,
                NK: jacket.nk,
                SH: jacket.sh,
                Sleeve: jacket.sleeve,
                Arm: jacket.arm,
                FR: jacket.fr,
                BA: jacket.ba,
                LG: jacket.lg,
              })}{" "}
            </div>{" "}
            <div className="flex flex-wrap">
              {" "}
              {renderOptions({
                Vest: jacket.addVest,
                Monogram: jacket.addMonogram,
                nSho: jacket.nSho,
                sqSho: jacket.sqSho,
                rdSho: jacket.rdSho,
                sloSho: jacket.sloSho,
                hBk: jacket.hBk,
                curveBk: jacket.curveBk,
                shoNk: jacket.shoNk,
                bigM: jacket.bigM,
                holBk: jacket.holBk,
                holCh: jacket.holCh,
                brBly: jacket.brBly,
                lLo: jacket.lLo,
                rLo: jacket.rLo,
                erect: jacket.erect,
                flatB: jacket.flatB,
              })}{" "}
            </div>{" "}
            <div>
              Note:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
                {jacket.note || "-"}
              </Badge>
            </div>{" "}
          </CardContent>{" "}
        </Card>{" "}
        {/* Pant */}{" "}
        <Card>
          {" "}
          <CardHeader>
            {" "}
            <CardTitle className="px-3 py-1 rounded-md">Pant</CardTitle>{" "}
            <CardAction>
              {" "}
              <Badge className="py-0 bg-primary/5 border border-primary/50 text-primary">
                {" "}
                Pant Details{" "}
              </Badge>{" "}
            </CardAction>{" "}
          </CardHeader>{" "}
          <CardContent className="space-y-2 text-sm">
            {" "}
            <div>
              Quantity:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
                {pant.quantity ?? "-"}
              </Badge>
            </div>{" "}
            <div>
              Tailor:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
                {pant.tailorName || "-"}
              </Badge>
            </div>{" "}
            <div>
              Fitting Date:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
                {pant.fittingDate
                  ? new Date(pant.fittingDate).toLocaleDateString()
                  : "-"}
              </Badge>
            </div>{" "}
            <div className="flex flex-wrap">
              {" "}
              Sizes:{" "}
              {renderSizes({
                WA: pant.wa,
                HIP: pant.hip,
                CR: pant.cr,
                TH: pant.th,
                KN: pant.kn,
                BO: pant.bo,
                LG: pant.lg,
              })}{" "}
            </div>{" "}
            <div className="flex flex-wrap">
              {" "}
              {renderOptions({
                Slanting: pant.slantingPkt,
                Straight: pant.straightPkt,
                American: pant.americanPkt,
                backRhtPkt: pant.backRhtPkt,
                backLhtPkt: pant.backLhtPkt,
                cuffs: pant.cuffs,
                wpIn: pant.wpIn,
                wpOut: pant.wpOut,
                flatB: pant.flatB,
                lowFront: pant.lowFront,
                underBelly: pant.underBelly,
              })}{" "}
            </div>{" "}
            <div>
              Note:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
                {pant.note || "-"}
              </Badge>
            </div>{" "}
          </CardContent>{" "}
        </Card>{" "}
        {/* Shirt */}{" "}
        <Card>
          {" "}
          <CardHeader>
            {" "}
            <CardTitle className="px-3 py-1 rounded-md">Shirt</CardTitle>{" "}
            <CardAction>
              {" "}
              <Badge className="py-0 bg-primary/5 border border-primary/50 text-primary">
                {" "}
                Shirt Details{" "}
              </Badge>{" "}
            </CardAction>{" "}
          </CardHeader>{" "}
          <CardContent className="space-y-2 text-sm">
            {" "}
            <div>
              Quantity:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
                {shirt.quantity ?? "-"}
              </Badge>
            </div>{" "}
            <div>
              Tailor:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
                {shirt.tailorName || "-"}
              </Badge>
            </div>{" "}
            <div>
              Fitting Date:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
                {shirt.fittingDate
                  ? new Date(shirt.fittingDate).toLocaleDateString()
                  : "-"}
              </Badge>
            </div>{" "}
            <div className="flex flex-wrap">
              {" "}
              Sizes:{" "}
              {renderSizes({
                CH: shirt.ch,
                WA: shirt.wa,
                HIP: shirt.hip,
                NK: shirt.nk,
                SH: shirt.sh,
                Sleeve: shirt.sleeve,
                Arm: shirt.arm,
                FR: shirt.fr,
                BA: shirt.ba,
                LG: shirt.lg,
                STB: shirt.stb,
                STW: shirt.stw,
                AH: shirt.ah,
                DressLg: shirt.dressLg,
                SkirtLg: shirt.skirtLg,
                nLow: shirt.nLow,
              })}{" "}
            </div>{" "}
            <div className="flex flex-wrap">
              {" "}
              {renderOptions({
                Monogram: shirt.addMonogram,
                Tie: shirt.addTie,
                sqSho: shirt.sqSho,
                rdSho: shirt.rdSho,
                sloSho: shirt.sloSho,
                brBly: shirt.brBly,
                sloNk: shirt.sloNk,
              })}{" "}
            </div>{" "}
            <div>
              Note:{" "}
              <Badge className="bg-linear-0 from-primary via-chart-5 to-primary py-0 px-1 rounded-sm text-xs mr-1 mb-1">
                {shirt.note || "-"}
              </Badge>
            </div>{" "}
          </CardContent>{" "}
        </Card>{" "}
      </div>{" "}
    </div>
  );
};

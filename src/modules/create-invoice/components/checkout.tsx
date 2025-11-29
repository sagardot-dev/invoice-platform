"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { s3URL } from "@/const";
import Image from "next/image";
import { useIsClient } from "@/hooks/use-client";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import { useGetComapnyData } from "@/modules/dashboard/server/get-companydat";

const jacketFieldLabels = {
  ch: { en: "Chest", th: "อก" },
  tm: { en: "Waist", th: "พุง" },
  wa: { en: "Waist", th: "เอว" },
  hip: { en: "Hip", th: "สะโพก" },
  sh: { en: "Shoulder", th: "ไหล่" },
  sleeve: { en: "Sleeve", th: "แขน" },
  fr: { en: "Front", th: "บ่าหน้า" },
  ba: { en: "Back", th: "บ่าหลัง" },
  nk: { en: "Neck", th: "คอ" },
  stb: { en: "Shoulder-Bust", th: "ไหล่-อก" },
  stw: { en: "Shoulder-Waist", th: "ไหล่-เอว" },
  ah: { en: "Armhole", th: "รักแร้" },
  lg: { en: "JK-Lg", th: "ยาว" },
  vLg: { en: "V-Lg", th: "เสื้อกั๊กยาว" },
  ocLg: { en: "C-Lg", th: "เสื้อโค้ทยาว" },
  arm: { en: "Arm", th: "รอบแขน" },
  nSho: { en: "Normal Shoulder", th: "ไหล่ธรรมดา" },
  sqSho: { en: "Square Shoulder", th: "ไหล่ตั้ง" },
  rdSho: { en: "Round Shoulder", th: "ไหล่มน" },
  sloSho: { en: "Sloping Shoulder", th: "ไหล่เท" },
  hBk: { en: "Hunched Back", th: "หลังค่อม" },
  curveBk: { en: "Curved Back", th: "หลังแอ่น" },
  shoNk: { en: "Short Neck", th: "คอสั้น" },
  bigM: { en: "Big Muscle", th: "กล้ามใหญ่" },
  holBk: { en: "Hollow Back", th: "ไหล่ห่อ" },
  holCh: { en: "Hollow Chest", th: "อกห่อ" },
  brBly: { en: "Big Belly", th: "พุงใหญ่" },
  lLo: { en: "Left Low", th: "ซ้ายต่ำ" },
  rLo: { en: "Right Low", th: "ขวาต่ำ" },
  erect: { en: "Erect", th: "ยกอก" },
  flatB: { en: "Flat Back", th: "กันแน่น" },
};

const pantFieldLabels = {
  wa: { en: "Waist", th: "เอว" },
  hip: { en: "Hip", th: "สะโพก" },
  cr: { en: "Crotch", th: "เป้า" },
  th: { en: "Thigh", th: "โคนขา" },
  kn: { en: "Knee", th: "เข่า" },
  bo: { en: "Bottom", th: "ปลายขา" },
  lg: { en: "Length", th: "ยาว" },
  slantingPkt: { en: "Slanting Pocket", th: "กระเป๋าเฉียง" },
  straightPkt: { en: "Straight Pocket", th: "กระเป๋าตรง" },
  americanPkt: { en: "American Pocket", th: "กระเป๋าแบบอเมริกัน" },
  backRhtPkt: { en: "Back Right Pocket", th: "กระเป๋าหลังขวา" },
  backLhtPkt: { en: "Back Left Pocket", th: "กระเป๋าหลังซ้าย" },
  cuffs: { en: "Cuffs", th: "ขาเฉลียง" },
  wpIn: { en: "Waist Pocket In", th: "กระเป๋าใน" },
  wpOut: { en: "Waist Pocket Out", th: "กระเป๋านอก" },
  flatB: { en: "Flat Back", th: "กันแน่น" },
  lowFront: { en: "Low Front", th: "หน้าต่ำ" },
  underBelly: { en: "Under Belly", th: "ใต้พุง" },
};

const shirtFieldLabels = {
  ch: { en: "Chest", th: "อก" },
  wa: { en: "Waist", th: "เอว" },
  hip: { en: "Hip", th: "สะโพก" },
  sh: { en: "Shoulder", th: "ไหล่" },
  sleeve: { en: "Sleeve", th: "แขน" },
  nk: { en: "Neck", th: "คอ" },
  fr: { en: "Front", th: "บ่าหน้า" },
  ba: { en: "Back", th: "บ่าหลัง" },
  stb: { en: "STB", th: "ไหล่ถึงอก" },
  stw: { en: "STW", th: "ไหล่ถึงเอว" },
  ah: { en: "Armhole", th: "รักแร้" },
  lg: { en: "Length", th: "ยาว" },
  dressLg: { en: "Dr-Lg", th: "เดรสยาว" },
  skirtLg: { en: "Sk-Lg", th: "กระโปรงยาว" },
  arm: { en: "Arm", th: "รอบแขน" },
  nLow: { en: "Nk Low", th: "คอต่ำ" },
  sqSho: { en: "Square Shoulder", th: "ไหล่ตั้ง" },
  rdSho: { en: "Round Shoulder", th: "ไหล่มน" },
  sloSho: { en: "Sloping Shoulder", th: "ไหล่เท" },
  sloNk: { en: "Short Neck", th: "คอสั้น" },
  brBly: { en: "Big Belly", th: "พุงใหญ่" },
};

const formatDate = (dateString?: string | null) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

interface GarmentProps {
  garment: any;
  type: "Jacket" | "Pant" | "Shirt";
  labels: Record<string, any>;
  invoiceNumber: string;
}

const GarmentCard = ({
  garment,
  type,
  labels,
  invoiceNumber,
}: GarmentProps) => {
  if (!garment) return null;
  return (
    <div className=" px-5 flex flex-col h-full w-1/2 min-w-1/2 gap-y-4 border-b border-primary/30 border-dashed  py-8 justify-between">
      <div className="h-full flex flex-col gap-y-4 flex-1 ">
        <div className=" flex justify-between pb-3 mb-1 border-b border-border/30">
          <div className=" flex flex-col gap-x-6 justify-start items-baseline">
            <p className="text-xs text-gray-800">ORDER NO:</p>
            <p className="text-base font-bold text-primary flex justify-between ">
              #{invoiceNumber}
            </p>
          </div>

          <p className="text-sm font-semibold text-gray-800 ">
            {type} : {garment[`${type.toLowerCase()}Type`]}
          </p>
        </div>

        <div className="flex justify-between text-sm mb-1">
          <div className=" flex gap-1">
            <span className="text-gray-800 bg-primary/30 border border-primary/60 px-2 rounded-md text-xs ">
              TAILOR:
            </span>
            <span className=" text-gray-900">{garment.tailorName}</span>
          </div>
          <div>
            <span className="text-gray-600 bg-primary/30 border border-primary/60 px-2 ml-1 rounded-md text-xs ">
              FITTING:
            </span>
            <span className="ml-1 text-gray-900/60">
              {new Date(garment.fittingDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div>
            <span className="text-gray-600 bg-primary/30 border border-primary/60 px-2 rounded-md text-xs ">
              QTY:
            </span>
            <span className="ml-1 text-gray-900">{garment.quantity}</span>
          </div>
        </div>
        <MeasurementSection measurements={garment} labels={labels} />
        {!garment.note && (
          <div className="border-l-4 rounded-xl border-primary border p-4 py-6">
            <div className="text-xs font-semibold text-foreground mb-3">
              NOTES
            </div>
            <div className="text-sm text-foreground max-h-2">
              {garment.note}
            </div>
          </div>
        )}
      </div>

      <div className="mt-1 flex justify-between gap-y-4 border border-gray-400 w-full rounded-xl shadow-lg bg-gray-50 min-h-80 max-h-70">
        {garment[`${type.toLowerCase()}StyleDrawing`] && (
          <div className="flex justify-center items-center mt-1">
            <div className=" flex justify-center items-center overflow-hidden">
              <Image
                width={900}
                height={900}
                src={`${s3URL}/${garment[`${type.toLowerCase()}StyleDrawing`]}`}
                alt={`${type} style drawing`}
                className="object-contain min-h-80 max-h-70"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const MeasurementSection = ({ measurements, labels }: any) => {
  if (!measurements) return null;
  const numericMeasurements = Object.entries(measurements).filter(
    ([key, value]) => typeof value === "number" && value > 0 && labels[key]
  );
  const activeBooleans = Object.entries(measurements).filter(
    ([key, value]) => value === true && labels[key]
  );

  // Group measurements into rows of 4
  const measurementRows: any[] = [];
  for (let i = 0; i < numericMeasurements.length; i += 4) {
    measurementRows.push(numericMeasurements.slice(i, i + 4));
  }

  return (
    <div className=" flex h-full flex-col gap-y-4">
      <div className="space-y-4 mb-2">
        {measurementRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-2 gap-3">
            {row.map(([key, value]: [string, any]) => (
              <div
                key={key}
                className="flex justify-between items-center border px-2 py-1.5 border-gray-400 rounded-md text-shadow-xs"
              >
                <span className="text-xs text-gray-950">
                  {labels[key].th} / {labels[key].en}
                </span>
                <span className="font-semibold text-sm text-gray-900">
                  {value}"
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      {activeBooleans.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeBooleans.map(([key]) => (
            <button
              key={key}
              className="px-2 py-1 rounded-lg bg-primary text-gray-50 text-shadow-xl text-xs font-medium"
            >
              {labels[key].th} / {labels[key].en}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const InvoiceWebForm = () => {
  const isClient = useIsClient();
  const { getValues } = useFormContext();
  const companyQuery = useGetComapnyData();

  const formData = getValues();

  const {
    jacket,
    pant,
    shirt,
    invoiceNumber,
    customer,
    saleMen,
    paymentMethod,
    customerStatus,
    totalAmount,
  } = formData;
  const companyData = companyQuery.data;

  if (!isClient) return null;

  const handleClick = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210;
    const pages = ["page1", "page2"];

    for (let i = 0; i < pages.length; i++) {
      const element = document.getElementById(pages[i]);
      if (!element) continue;

      const canvas = await html2canvas(element, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    }

    const pdfURL = pdf.output("bloburl");
    const newWindow = window.open(pdfURL);
    if (newWindow)
      newWindow.onload = () => {
        newWindow.focus();
        newWindow.print();
      };
  };

  return (
    <div className="w-full h-full flex flex-wrap xl:flex-nowrap flex-1 gap-2 max-h-210 overflow-y-auto bar p-2 rounded-xl justify-center mx-auto  ">
      {/* PAGE 1 */}
      <div
        id="page1"
        className="mx-auto bg-gray-50 flex divide-x w-[794px] h-[1123px] rounded-xl"
      >
        <GarmentCard
          invoiceNumber={invoiceNumber}
          garment={jacket}
          type="Jacket"
          labels={jacketFieldLabels}
        />
        <GarmentCard
          invoiceNumber={invoiceNumber}
          garment={pant}
          type="Pant"
          labels={pantFieldLabels}
        />
      </div>

      {/* PAGE 2 */}
      <div
        id="page2"
        className="mx-auto bg-gray-50 flex divide-x w-[794px] h-[1123px] items-stretch rounded-xl"
      >
        <GarmentCard
          invoiceNumber={invoiceNumber}
          garment={shirt}
          type="Shirt"
          labels={shirtFieldLabels}
        />

        <div className="flex flex-col py-11 w-full px-4 gap-y-10">
          <div className="border-border/30 border-b rounded-lg flex flex-col gap-y-6 justify-between pb-9">
            <div className="flex flex-col gap-y-2">
              <h2 className="text-lg font-bold text-primary">
                {companyData?.name}
              </h2>
              <p className="text-sm text-accent">{companyData?.address}</p>
              <p className="text-sm text-accent">
                Tel: {companyData?.phoneNumber}
              </p>
              {companyData?.email && (
                <p className="text-sm text-accent">
                  Email: {companyData.email}
                </p>
              )}
              {companyData?.websiteUrl && (
                <p className="text-sm text-accent">
                  Website: {companyData.websiteUrl}
                </p>
              )}
              {companyData?.whatsappNumber && (
                <p className="text-sm text-accent">
                  WhatsApp: {companyData.whatsappNumber}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <h3 className="text-sm font-semibold text-foreground">
                Bill To:
              </h3>
              <p className="text-sm text-accent">{customer?.name || "-"}</p>
              <p className="text-sm text-accent">
                {customer?.phoneNumber || "-"}
              </p>
              <p className="text-sm text-accent">{customer?.email || "-"}</p>
              <p className="text-sm text-accent">{customer?.address || "-"}</p>
              <p className="text-sm mt-2 text-muted">
                Invoice #: {invoiceNumber}
              </p>
              <p className="text-sm text-muted">
                Issue Date: {formatDate(formData.date)}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 w-full flex flex-col justify-between items-stretch px-8">
            <div className="flex justify-between mb-2">
              <span className="text-muted text-sm">Payment Method</span>
              <span className="font-semibold text-accent">
                {paymentMethod || "Cash"}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted text-sm">Status</span>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  customerStatus === "PAID"
                    ? "bg-primary/30 text-accent"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {customerStatus || "Pending"}
              </span>
            </div>
            {saleMen?.length > 0 && (
              <div className="flex justify-between mb-2">
                <span className="text-muted text-sm">Salesman</span>
                <span className="font-semibold text-accent">
                  {saleMen.map((s: any) => s.name).join(", ")}
                </span>
              </div>
            )}
            <div className="flex justify-between mt-4 pt-4 border-t border-border/30 font-bold text-lg">
              <span className="text-foreground">Total Amount</span>
              <span className="text-primary">
                {totalAmount?.toLocaleString() || 0} THB
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

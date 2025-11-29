"use client";
import React, { useState } from "react";

const JacketOrderForm = () => {
  const [orderData, setOrderData] = useState({
    orderNo: "#K-MD-HP-85533653",
    item: "Jacket — LEATHER",
    tailor: "colnrdee",
    fitting: "June 19, 2025",
    qty: "4",
    measurements: {
      ch: '13"',
      nk: '11"',
      hip: '20"',
      tm: '18"',
      sh: '17"',
      sleeve: '14"',
      arm: '13"',
      fr: '15"',
      ba: '15"',
      lg: '17"',
      vLg: '16"',
      ocLg: '23"',
    },
    notes: "",
  });

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

  const measurementRows = [
    [
      { key: "ch", label: jacketFieldLabels.ch.th },
      { key: "nk", label: jacketFieldLabels.nk.th },
      { key: "hip", label: jacketFieldLabels.hip.th },
      { key: "tm", label: jacketFieldLabels.tm.th },
    ],
    [
      { key: "sh", label: jacketFieldLabels.sh.th },
      { key: "sleeve", label: jacketFieldLabels.sleeve.th },
      { key: "arm", label: jacketFieldLabels.arm.th },
      { key: "fr", label: jacketFieldLabels.fr.th },
    ],
    [
      { key: "ba", label: jacketFieldLabels.ba.th },
      { key: "lg", label: jacketFieldLabels.lg.th },
      { key: "vLg", label: jacketFieldLabels.vLg.th },
      { key: "ocLg", label: jacketFieldLabels.ocLg.th },
    ],
  ];

  const buttons = [
    { label: "NSHO ไหล่ธรรมดา", bg: "bg-blue-100", text: "text-blue-700" },
    { label: "SDSHO ตะเข็บ", bg: "bg-blue-100", text: "text-blue-700" },
    { label: "HOLES โพรข", bg: "bg-blue-100", text: "text-blue-700" },
    { label: "ERECT ยกอก", bg: "bg-blue-100", text: "text-blue-700" },
    { label: "FLATB กันแน่น", bg: "bg-blue-100", text: "text-blue-700" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-12 bg-accent-foreground h-full pt-11 pb-12 flex flex-col gap-y-4">
      {/* Header */}
      <div className="mb-3">
        <div className="text-xs text-muted/60 mb-1">ORDER NO:</div>
        <div className="text-2xl font-bold text-primary mb-4">
          {orderData.orderNo}
        </div>
        <div className="text-lg font-semibold mb-4 text-accent/60">
          {orderData.item}
        </div>

        {/* Info Row */}
        <div className="flex justify-between text-sm mb-4">
          <div>
            <span className="text-muted">TAILOR:</span>
            <span className="ml-2 text-accent">{orderData.tailor}</span>
          </div>
          <div>
            <span className="text-muted">FITTING:</span>
            <span className="ml-2 text-accent/60">{orderData.fitting}</span>
          </div>
          <div>
            <span className="text-muted">QTY:</span>
            <span className="ml-2 text-accent">{orderData.qty}</span>
          </div>
        </div>
      </div>

      {/* Measurements Grid - 4 columns */}
      <div className="space-y-4 mb-2">
        {measurementRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-3">
            {row.map((field) => (
              <div
                key={field.key}
                className="flex justify-between items-center border px-2 py-2 border-border/30 rounded-md"
              >
                {/* Labels */}
                <span className="text-sm text-muted">
                  {jacketFieldLabels[field.key].th} /{" "}
                  {jacketFieldLabels[field.key].en}
                </span>

                {/* Measurement value */}
                <span className="font-semibold text-accent/70">
                  {orderData.measurements[field.key]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="px-4 py-2 rounded-md bg-primary/30 text-accent text-xs font-medium transition-colors"
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* Notes Section */}
      <div className="border-l-4 rounded-xl border-primary border p-4 mb-2">
        <div className="text-xs font-semibold text-foreground mb-2">NOTES</div>
        <textarea
          className="w-full bg-transparent border-none outline-none resize-none text-sm text-foreground placeholder:text-muted-foreground"
          rows="4"
          placeholder="Add notes here..."
          value={orderData.notes}
          onChange={(e) =>
            setOrderData({ ...orderData, notes: e.target.value })
          }
        />
      </div>

      {/* Image Section */}
      <div className="flex justify-center items-center min-h-85">
        <div className="flex justify-center items-center border border-border/30  w-full h-full min-h-85 rounded-xl shadow-lg">
          <span className="text-muted-foreground">jacket image</span>
        </div>
      </div>
    </div>
  );
};

export default JacketOrderForm;

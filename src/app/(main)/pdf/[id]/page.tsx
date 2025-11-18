import { PdfTemplate } from "@/lib/pdf/invoice-template";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <PdfTemplate invoiceId={id} />;
};

export default page;

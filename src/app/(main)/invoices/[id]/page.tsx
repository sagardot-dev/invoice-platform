import { InvoiceFormWrapper } from "@/modules/create-invoice/components/invoice-page";
import { InvoiceData } from "@/modules/invoices/components/invoice-data";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <InvoiceFormWrapper invoiceId={id} />;
};

export default page;

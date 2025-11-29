
import PdfWrapper from "@/lib/pdf/pdf-warpper";
import { InvoiceWeb } from "@/lib/pdf/real-pdf";
import React, { Suspense } from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <Suspense fallback={<div>Loading PDF…</div>}>
      <PdfWrapper invoiceId={id} />
    </Suspense>
  );
};

export default Page;

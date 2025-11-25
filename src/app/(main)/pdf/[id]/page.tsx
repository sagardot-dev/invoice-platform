import React, { Suspense } from "react";
import { PdfTemplate } from "@/lib/pdf/invoice-template";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <Suspense fallback={<div>Loading PDF…</div>}>
      <PdfTemplate invoiceId={id} />
    </Suspense>
  );
};

export default Page;

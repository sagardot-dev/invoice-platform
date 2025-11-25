import React, { Suspense } from "react";
import { InvoiceFormWrapper } from "@/modules/create-invoice/components/invoice-page";


const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <Suspense fallback={<div>Loading…</div>}>
      <InvoiceFormWrapper invoiceId={id} />
    </Suspense>
  );
};

export default Page;

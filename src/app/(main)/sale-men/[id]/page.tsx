import { PdfTemplate } from "@/lib/pdf/invoice-template";
import { SaleManEdit } from "@/modules/saleman/ui/components/saleman";
import React, { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <Suspense>
      <SaleManEdit salemanId={id} />
    </Suspense>
  );
};

export default page;

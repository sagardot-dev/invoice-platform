"use client";
import { InvoiceWeb } from "./real-pdf";
interface InvoiceWebProps {
  invoiceId: string;
}

const PdfWrapper = ({ invoiceId }: InvoiceWebProps) => {  
  return (
    <>
      <InvoiceWeb invoiceId={invoiceId} />
    </>
  );
};

export default PdfWrapper;

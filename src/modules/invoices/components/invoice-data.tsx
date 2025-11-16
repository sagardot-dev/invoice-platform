'use client'

import { useGetInvoice } from "../server/use-get-invoice";

export const InvoiceData = ({ invoiceId }: { invoiceId: string }) => {
  const { data: invoice, isLoading, error } = useGetInvoice(invoiceId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <h1>Invoice #{invoice.invoiceNumber}</h1>
      <p>Customer: {invoice.customer.name}</p>
      <p>Total Amount: {invoice.totalAmount}</p>
    </div>
  );
};

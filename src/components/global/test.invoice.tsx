"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

const InvoiceList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      const res = await axios.get("/api/get-invoices");
      return res.data.invoice;
    },
  });

  if (isLoading) return <p>Loading invoices...</p>;
  if (isError) return <p>Failed to fetch invoices.</p>;

  return (
    <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
      {data?.length ? (
        data.map((inv: any) => (
          <div
            key={inv.id}
            className="border p-3 rounded-lg shadow-sm flex flex-col items-center text-center"
          >
            {inv.fileName ? (
              <Image
                width={40}
                height={40}
                src={`https://sagardotdev-invoice.s3.us-east-1.amazonaws.com/${inv.fileName}`}
                alt={inv.name}
                className="w-32 h-32 object-cover rounded-md mb-2"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-100 flex items-center justify-center text-sm text-gray-50 rounded-md mb-2">
                No Image
              </div>
            )}
            <p className="font-medium line-clamp-2">{inv.name}</p>
            <p className="text-sm text-gray-50 break-all">{inv.fileName}</p>
          </div>
        ))
      ) : (
        <p>No invoices found.</p>
      )}
    </div>
  );
};

export default InvoiceList;

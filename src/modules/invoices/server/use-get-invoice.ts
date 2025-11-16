import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetInvoice = (id: string) => {
  const query = useQuery({
    queryKey: ["getInvoice", id],
    queryFn: async () => {
      if (!id) throw new Error("Invoice ID is required");

      const res = await axios.get(`/api/get-invoices/${id}`);
      if (!res.data || !res.data.data) {
        throw new Error("Failed to fetch invoice data");
      }
      return res.data.data.invoice;
    },
    enabled: !!id,
  });

  return query;
};

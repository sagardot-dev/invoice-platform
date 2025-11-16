// hooks/use-update-invoice.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

interface UpdateInvoiceParams {
  id: string;
  data: any;
}

export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateInvoiceParams) => {
      const res = await axios.put(`/api/update-invoice/${id}`, { data });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Invoice updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["getInvoices"],
        refetchType: 'active'
      });
      queryClient.invalidateQueries({ queryKey: ["getInvoice", data.data.id] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update invoice");
    },
  });
};

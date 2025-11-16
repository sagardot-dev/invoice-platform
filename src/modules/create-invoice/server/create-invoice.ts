import { InvoiceFormValues } from "@/schema";
import { ApiResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useCreateInvoice = () => {
  const mutation = useMutation({
    mutationFn: async (data: { data: InvoiceFormValues }) => {
      const res = await axios.post<ApiResponse>("/api/create-invoice", data);
      if (!res.data.success) {
        throw new Error("Failed to craete company profle");
      }
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.title, {
        description: data.description,
      });
    },
    onError: (error) => {
        console.log(error)
      toast.error(error.message || "error when creating invoice", {
        description: "Please contact to the team support",
      });
    },
  });
  return mutation;
};

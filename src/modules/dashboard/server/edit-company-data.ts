import { useCustomToast } from "@/components/global/custom-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useEditCompanyData = () => {
  const toaster = useCustomToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: {
      name?: string;
      email?: string;
      image?: string;
      address?: string;
      phoneNumber?: string;
      taxId?: string;
      websiteUrl?: string;
    }) => {
      const res = await axios.put("/api/onboarding", data);
      if (!res.data.success) {
        throw new Error("Error while editing data");
      }
      return res.data;
    },
    onSuccess: (data) => {
      toaster({
        title: data?.title || "successfully update",
        data: data?.description || "succefully update the company data",
      });
      queryClient.invalidateQueries({ queryKey: ["getCompanydata"] });
    },
    onError: () => {},
  });
  return mutation;
};

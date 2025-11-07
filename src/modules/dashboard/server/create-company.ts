import { useCustomToast } from "@/components/global/custom-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCreateCompany = () => {
  const toaster = useCustomToast();
  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      image?: string;
      address: string;
      phoneNumber: string;
      taxId?: string;
      websiteUrl?: string;
    }) => {
      const res = await axios.post("/api/onboarding", data);
      if (!res.data.success) {
        throw new Error("Failed to craete company profle");
      }
      return res.data;
    },
    onSuccess: (data) => {
      toaster({
        title: data.message || "success creating onboarding data",
        description: "company profile was created",
      });
    },
    onError: (error) => {
      console.log(error);
      toaster({
        title: error?.message || "Something went wrong!",
        description: "Failed to craeted company profile",
      });
    },
  });
  return mutation;
};

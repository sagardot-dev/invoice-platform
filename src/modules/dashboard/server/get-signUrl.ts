import { useCustomToast } from "@/components/global/custom-toast";
import { GetSignApiRes } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetSignUrlMutation = () => {
  const toaster = useCustomToast();
  const mutation = useMutation({
    mutationFn: async (data: {
      fileName: string;
      ext: string;
      type: string;
    }) => {
      const res = await axios.post<GetSignApiRes>(
        "/api/get-presign-url",
        data,
        {
          headers: { "Content-Type": data?.type },
        }
      );
      if (!res.data.success) {
        throw new Error("Failed to get the sign url");
      }
      return res.data;
    },
    onSuccess: (data) => {
      toaster({
        title: data.message || "success creating signUrl",
        description: "signurl create successfully",
      });
    },
    onError: (error) => {
      toaster({
        title: error.message || "Something went wrong",
        description: "error while getting signUrl",
      });
    },
  });
  return mutation;
};

import { useCustomToast } from "@/components/global/custom-toast";
import { ApiResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useCreateHelper = () => {
  const queryClinet = useQueryClient();
  const toaster = useCustomToast();
  const mutation = useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      const res = await axios.post<ApiResponse>("/api/helper", data);
      if (!res) {
        throw new Error("Something went wrong");
      }
      console.log(res);

      return res.data;
    },
    onError: (error: ApiResponse) => {
      console.log(error);
      toaster({
        title: error.description || "Something went wrong",
        data: { data: error.code },
      });
    },
    onSuccess: (data) => {
      toaster({
        title: data.title,
        data: { data: data.code },
      });
      queryClinet.invalidateQueries({ queryKey: ["get-helpers-data"] });
    },
  });
  return mutation;
};

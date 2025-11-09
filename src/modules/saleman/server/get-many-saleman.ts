import { ApiResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetSalemenData = () => {
  const query = useQuery({
    queryKey: ["get-salemen-data"],
    queryFn: async () => {
      const res = await axios.get<ApiResponse>("/api/sale-man");

      if (!res.data.success) {
        throw new Error(res.data.code);
      }
      console.log(res.data.data);
      return res.data.data;
    },
  });
  return query;
};

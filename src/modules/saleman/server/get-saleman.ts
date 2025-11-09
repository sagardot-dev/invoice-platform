import { ApiResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetSalemanData = (id: string | null) => {
  const query = useQuery({
    queryKey: ["get-saleman-data"],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get<ApiResponse>(`/api/sale-man/${id}`);

      if (!res.data.success) {
        throw new Error(res.data.code);
      }
      return res.data.data;
    },
  });
  return query;
};

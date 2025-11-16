import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/const";
import { ApiResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface InvoicesFilters {
  serach?: string;
  page?: number;
  pageSize?: number;
}

export const useGetInvoices = (filters: InvoicesFilters) => {
  const {
    serach = "",
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
  } = filters;
  const query = useQuery({
    queryKey: ["getInvoices", serach, page, pageSize],
    queryFn: async () => {
      const res = await axios.get<ApiResponse>("/api/get-invoices", {
        params: {
          defaultPage: page,
          defaultPageSize: pageSize,
          search: serach,
        },
      });
      return res.data;
    },
  });
  return query;
};

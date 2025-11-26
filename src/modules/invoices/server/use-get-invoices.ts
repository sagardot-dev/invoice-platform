import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/const";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface InvoicesFilters {
  search?: string;  // Fixed typo: serach -> search
  page?: number;
  pageSize?: number;
}

export const useGetInvoices = (filters: InvoicesFilters) => {
  const {
    search = "", 
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
  } = filters;
  
  const query = useQuery({
    queryKey: ["getInvoices", search, page, pageSize],  
    queryFn: async () => {
      const res = await axios.get("/api/get-invoices", {
        params: {
          page: page,           
          pageSize: pageSize, 
          search: search,      
        },
      });
      return res.data;
    },
  });
  return query;
};
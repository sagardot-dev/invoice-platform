import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetComapnyData = () => {
  const query = useQuery({
    queryKey: ["getCompanydata"],
    queryFn: async () => {
      const res = await axios.get("/api/onboarding");
      if (!res.data) {
        throw new Error("Some went wrong");
      }
      return res.data.data;
    },
  });
  return query;
};

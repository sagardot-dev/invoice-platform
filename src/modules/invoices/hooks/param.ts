import { DEFAULT_PAGE } from "@/const";
import { useQueryStates, parseAsInteger, parseAsString } from "nuqs";

export const useInvoiceFilter = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
  });
};

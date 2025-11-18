import { ApiResponse } from "@/types";

export function createResponse<T, P>(
  success: boolean,
  title: string,
  description: string,
  code: string,
  data?: T,
  pdf?: P,
): ApiResponse<T> {
  return {
    success,
    title,
    description,
    code,
    status: success ? "success" : "error",
    data,
    pdf
  };
}

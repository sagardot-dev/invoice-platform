import { ApiResponse } from "@/types";

export function createResponse<T>(
  success: boolean,
  title: string,
  description: string,
  code: string,
  data?: T
): ApiResponse<T> {
  return {
    success,
    title,
    description,
    code,
    status: success ? "success" : "error",
    data,
  };
}

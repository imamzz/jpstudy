import { AxiosError } from "axios";

interface ApiErrorResponse {
  success?: boolean;
  message?: string;
}

export const handleApiError = (
  error: unknown,
  defaultMessage = "An unexpected error occurred"
): string => {
  const axiosError = error as AxiosError<ApiErrorResponse>;

  if (axiosError.response?.data?.message) {
    return axiosError.response.data.message;
  }

  switch (axiosError.response?.status) {
    case 400:
      return "Bad request";
    case 401:
      return "Unauthorized, please login again";
    case 403:
      return "You don’t have permission to perform this action";
    case 404:
      return "Resource not found";
    case 500:
      return "Internal server error";
    default:
      return defaultMessage;
  }
};

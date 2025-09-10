import { AxiosError } from "axios";

interface ApiErrorResponse {
  success?: boolean;
  message?: string;
}

export const handleApiError = (error: unknown, defaultMessage = "An unexpected error occurred") => {
  const axiosError = error as AxiosError<ApiErrorResponse>;

  if (axiosError.response?.data?.message) {
    return axiosError.response.data.message;
  }

  if (axiosError.response?.status === 404) {
    return "Resource not found";
  }

  if (axiosError.response?.status === 400) {
    return "Bad request";
  }

  return defaultMessage;
};

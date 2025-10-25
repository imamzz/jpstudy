import { useContext } from "react";
import { ToastContext } from "@/components/molecules/ToastProvider";

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};

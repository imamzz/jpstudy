import { createContext, useContext, useState, useCallback } from "react";
import { Toast } from "@/components/molecules/Toast";

interface ToastState {
  type: "success" | "error";
  message: string;
}

interface ToastContextProps {
  showToast: (type: ToastState["type"], message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const showToast = useCallback((type: ToastState["type"], message: string) => {
    setIsClosing(false);
    setToast({ type, message });

    setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => setToast(null), 500);
    }, 2000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
        {toast && (
          <div
            className={`fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out transform ${
              isClosing
                ? "opacity-0 translate-y-[-10px]"
                : "opacity-100 translate-y-0"
            }`}
          >
            <Toast
              type={toast.type}
              message={toast.message}
              onClose={() => {
                setIsClosing(true);
                setTimeout(() => setToast(null), 500);
              }}
            />
          </div>
        )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
};

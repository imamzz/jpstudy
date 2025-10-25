import { forwardRef } from "react";
import clsx from "clsx";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  variant?: "default" | "error";
  errorMessage?: string;
};

const variants: Record<NonNullable<TextAreaProps["variant"]>, string> = {
  default:
    "border-gray-300 focus:ring-blue-500 focus:border-blue-500 " +
    "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " +
    "dark:focus:ring-blue-500 dark:focus:border-blue-500",

  error:
    "border-red-500 focus:ring-red-500 focus:border-red-500 " +
    "dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white " +
    "dark:focus:ring-red-500 dark:focus:border-red-500",
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
      ({ label, variant = "default", errorMessage, className, id, ...props }, ref) => {
        // Jika ada errorMessage, pakai style error walau variant bukan error
        const finalVariant = errorMessage ? "error" : variant;
        const inputId = id || props.name;
    
        return (
          <div className="space-y-1 mb-2">
            {label && (
              <label
                htmlFor={inputId}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {label}
              </label>
            )}
            <textarea
              id={inputId}
              ref={ref}
              className={clsx(
                "w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition",
                variants[finalVariant],
                className
              )}
              {...props}
            />
            {errorMessage && (
              <p className="text-red-600 text-xs">{errorMessage}</p>
            )}
          </div>
        );
      }
    );
    
    TextArea.displayName = "TextArea";
    
    export default TextArea;
    
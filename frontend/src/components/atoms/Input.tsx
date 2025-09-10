import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  variant?: "default" | "error" | "success";
  errorMessage?: string;
};

const variants: Record<string, string> = {
  default:
    "border-gray-300 focus:ring-blue-500 focus:border-blue-500 " +
    "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " +
    "dark:focus:ring-blue-500 dark:focus:border-blue-500",

  error:
    "border-red-500 focus:ring-red-500 focus:border-red-500 " +
    "dark:bg-gray-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-white " +
    "dark:focus:ring-red-500 dark:focus:border-red-500",

  success:
    "border-green-500 focus:ring-green-500 focus:border-green-500 " +
    "dark:bg-gray-700 dark:border-green-600 dark:placeholder-gray-400 dark:text-white " +
    "dark:focus:ring-green-500 dark:focus:border-green-500",
};

const Input: React.FC<InputProps> = ({
  variant = "default",
  errorMessage,
  className = "",
  ...props
}) => {
  return (
    <div className="space-y-1">
      <input
        className={`w-full p-2.5 text-sm rounded-lg border transition ${variants[variant]} ${className}`}
        {...props}
      />
      {errorMessage && (
        <p className="text-red-600 text-xs">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;

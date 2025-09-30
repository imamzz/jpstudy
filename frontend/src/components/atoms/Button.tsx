import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "success" | "warning" | "info";
  size?: "xs" | "sm" | "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const baseStyle =
    "transition font-medium rounded-lg text-sm px-2 py-1 text-center focus:outline-none cursor-pointer";

  const variants: Record<string, string> = {
    primary: "text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    secondary: "text-gray-900 bg-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800",
    danger: "text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700",
    outline: "text-gray-900 bg-transparent border border-gray-200 hover:bg-gray-300 focus:ring-2 focus:ring-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800",
    success: "text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700",
    warning: "text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-300 dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700",
    info: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700",
  };

  const sizeStyles: Record<string, string> = {
    xs: "text-xs px-1 py-0.5",
    sm: "text-sm px-2 py-1",
    md: "text-md px-3 py-1.5",
    lg: "text-lg px-4 py-2",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${sizeStyles[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;

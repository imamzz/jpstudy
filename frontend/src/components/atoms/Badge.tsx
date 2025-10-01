import React from "react";

export type BadgeVariant =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "N5"
  | "N4"
  | "N3"
  | "N2"
  | "N1";

export type BadgeSize = "sm" | "md" | "lg" | "xl";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-2 py-1",
  lg: "text-md px-3.5 py-2.5",
  xl: "text-lg px-4 py-2",
};

const baseStyle = "rounded-md inline-flex items-center text-sm justify-center font-medium transition-colors";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-800",
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  warning: "bg-yellow-100 text-yellow-800",
  info: "bg-blue-100 text-blue-800",
  N5: "bg-green-100 text-green-800",
  N4: "bg-lime-100 text-lime-800",
  N3: "bg-yellow-100 text-yellow-800",
  N2: "bg-orange-100 text-orange-800",
  N1: "bg-red-100 text-red-800",
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
}) => {
  const vs = variantStyles[variant] ?? variantStyles.default;
  const ss = sizeStyles[size];
  return (
    <span className={`${baseStyle} ${ss} ${vs}`}>
    {children}
</span>
  );
};

export default Badge;

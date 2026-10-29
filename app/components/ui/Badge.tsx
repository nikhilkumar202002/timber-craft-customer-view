import React from "react";
import { FiX } from "react-icons/fi";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "outline"
  | "amber"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark-translucent"
  | "discount";

export type BadgeSize = "xs" | "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: "full" | "md" | "lg" | "none";
  uppercase?: boolean;
  dot?: boolean;
  pulse?: boolean;
  dotColor?: string;
  icon?: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-neutral-950 text-white border-transparent",
  secondary: "bg-neutral-100 text-neutral-800 border-neutral-200/80",
  outline: "bg-transparent text-neutral-800 border-neutral-300",
  amber: "bg-amber-100/90 text-amber-900 border-amber-200/80",
  success: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
  danger: "bg-red-50 text-red-700 border-red-200/80",
  warning: "bg-amber-50 text-amber-800 border-amber-200/80",
  info: "bg-blue-50 text-blue-800 border-blue-200/80",
  "dark-translucent":
    "bg-neutral-950/80 backdrop-blur-xs text-white border-white/10 shadow-xs",
  discount: "bg-emerald-600 text-white border-transparent shadow-xs",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-white",
  secondary: "bg-neutral-500",
  outline: "bg-neutral-600",
  amber: "bg-amber-600",
  success: "bg-emerald-500",
  danger: "bg-red-500",
  warning: "bg-amber-500",
  info: "bg-blue-500",
  "dark-translucent": "bg-emerald-400",
  discount: "bg-white",
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: "text-[9px] px-1.5 py-0.5 gap-1",
  sm: "text-[10px] sm:text-[11px] px-2.5 py-0.5 gap-1.5",
  md: "text-xs px-3 py-1 gap-1.5",
  lg: "text-sm px-3.5 py-1.5 gap-2",
};

const roundedStyles = {
  full: "rounded-full",
  lg: "rounded-xl",
  md: "rounded-lg",
  none: "rounded-none",
};

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  rounded = "full",
  uppercase = false,
  dot = false,
  pulse = false,
  dotColor,
  icon,
  onRemove,
  className = "",
  ...props
}: BadgeProps) {
  const resolvedDotColor = dotColor || dotColors[variant];

  return (
    <span
      className={`inline-flex items-center justify-center font-semibold border transition-colors select-none ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${roundedStyles[rounded]} ${
        uppercase ? "uppercase tracking-wider" : ""
      } ${className}`}
      {...props}
    >
      {/* Optional Leading Status Dot */}
      {dot && (
        <span
          className={`size-1.5 rounded-full shrink-0 ${resolvedDotColor} ${
            pulse ? "animate-pulse" : ""
          }`}
        />
      )}

      {/* Optional Leading Icon */}
      {icon && <span className="shrink-0">{icon}</span>}

      {/* Badge Content */}
      <span className="leading-tight">{children}</span>

      {/* Optional Trailing Remove Button */}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 -mr-1 inline-flex size-3.5 items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/20 transition-colors focus:outline-hidden"
          aria-label="Remove badge"
        >
          <FiX className="size-2.5" />
        </button>
      )}
    </span>
  );
}

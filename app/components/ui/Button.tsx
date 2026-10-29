"use client";

import React from "react";
import Link from "next/link";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "amber"
  | "danger"
  | "white"
  | "slider"
  | "success";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "icon" | "slider";
export type ButtonRounded = "full" | "xl" | "lg" | "md" | "none";

interface CommonButtonProps {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export type ButtonProps = CommonButtonProps &
  (
    | ({ href: string; external?: boolean } & Omit<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        "href"
      >)
    | ({ href?: undefined; external?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-neutral-950 text-white border border-neutral-950 hover:bg-neutral-800 hover:border-neutral-800 shadow-sm active:scale-98",
  secondary:
    "bg-white text-neutral-800 border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-950 shadow-2xs active:scale-98",
  outline:
    "bg-transparent text-neutral-900 border border-neutral-900 hover:bg-neutral-950 hover:text-white active:scale-98",
  ghost:
    "bg-transparent text-neutral-700 border border-transparent hover:bg-neutral-100 hover:text-neutral-950 active:scale-98",
  amber:
    "bg-amber-800 text-white border border-amber-800 hover:bg-amber-900 shadow-sm active:scale-98",
  danger:
    "bg-red-600 text-white border border-red-600 hover:bg-red-700 active:scale-98",
  white:
    "bg-white text-neutral-950 border border-transparent hover:bg-neutral-100 shadow-md active:scale-98",
  slider:
    "bg-white/95 text-neutral-800 border border-neutral-200 shadow-md backdrop-blur-xs hover:bg-neutral-950 hover:border-neutral-950 hover:text-white hover:scale-105 active:scale-95",
  success:
    "bg-emerald-50 text-emerald-700 border border-emerald-600 shadow-2xs active:scale-98",
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: "text-xs px-2.5 py-1.5 gap-1 font-medium",
  sm: "text-xs px-3.5 py-2.5 gap-1.5 font-semibold",
  md: "text-xs sm:text-sm px-5 py-2.5 gap-2 font-semibold",
  lg: "text-sm sm:text-base px-7 py-3.5 gap-2.5 font-bold",
  icon: "size-9 sm:size-10 p-0",
  slider: "size-10 sm:size-12 p-0",
};

const roundedStyles: Record<ButtonRounded, string> = {
  full: "rounded-full",
  xl: "rounded-xl",
  lg: "rounded-lg",
  md: "rounded-md",
  none: "rounded-none",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  rounded = "xl",
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}: ButtonProps) {
  // If size is slider, default rounded to full
  const effectiveRounded = size === "slider" ? "full" : rounded;

  const baseClasses = `inline-flex items-center justify-center transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:shadow-none ${
    variantStyles[variant]
  } ${sizeStyles[size]} ${roundedStyles[effectiveRounded]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  const content = (
    <>
      {isLoading ? (
        <svg
          className="size-4 animate-spin shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}

      {children && <span className="leading-tight">{children}</span>}

      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </>
  );

  // When href is provided, render as Next.js Link or external anchor
  if ("href" in props && props.href) {
    const { href, external, ...anchorProps } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          {...(anchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={baseClasses}
        {...(anchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  // Otherwise, render as native HTML button
  const { type = "button", disabled, ...buttonProps } = props as React.ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={baseClasses}
      {...buttonProps}
    >
      {content}
    </button>
  );
}

"use client";

import React from "react";
import { FiInbox } from "react-icons/fi";
import Button, { ButtonVariant } from "./Button";

export type EmptyStateVariant = "card" | "simple" | "compact";

export interface EmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
}

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: EmptyStateAction | React.ReactNode;
  secondaryAction?: EmptyStateAction | React.ReactNode;
  variant?: EmptyStateVariant;
  className?: string;
  children?: React.ReactNode;
}

function isActionObject(
  action: EmptyStateAction | React.ReactNode
): action is EmptyStateAction {
  return (
    typeof action === "object" &&
    action !== null &&
    "label" in action &&
    typeof (action as EmptyStateAction).label === "string"
  );
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  variant = "simple",
  className = "",
  children,
}: EmptyStateProps) {
  const isCard = variant === "card";
  const isCompact = variant === "compact";

  const containerClasses = isCard
    ? `rounded-3xl border border-neutral-200/90 bg-white p-8 sm:p-12 shadow-xs text-center max-w-2xl mx-auto ${className}`
    : isCompact
      ? `py-6 px-4 text-center max-w-sm mx-auto ${className}`
      : `py-16 sm:py-24 px-4 text-center max-w-md mx-auto ${className}`;

  const iconClasses = isCompact
    ? "size-12 rounded-xl text-amber-800 bg-amber-50 border border-amber-200/60 mb-3"
    : "size-16 sm:size-20 rounded-2xl sm:rounded-3xl text-amber-800 bg-amber-50 border border-amber-200/60 mb-5";

  return (
    <div className={containerClasses}>
      {/* Icon Badge */}
      <div
        className={`mx-auto flex items-center justify-center shadow-2xs ${iconClasses}`}
      >
        {icon || <FiInbox className={isCompact ? "size-6" : "size-8 sm:size-9"} />}
      </div>

      {/* Title */}
      <h3
        className={`font-bold text-neutral-900 tracking-tight ${
          isCompact ? "text-sm sm:text-base" : "text-xl sm:text-2xl"
        }`}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p
          className={`mt-2 text-neutral-500 leading-relaxed ${
            isCompact ? "text-xs" : "text-xs sm:text-sm"
          }`}
        >
          {description}
        </p>
      )}

      {/* Custom Children */}
      {children && <div className="mt-4">{children}</div>}

      {/* Action Buttons */}
      {(action || secondaryAction) && (
        <div
          className={`mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 ${
            isCompact ? "scale-90" : ""
          }`}
        >
          {action &&
            (isActionObject(action) ? (
              <Button
                href={action.href}
                onClick={action.onClick}
                variant={action.variant || "primary"}
                size={isCompact ? "sm" : "md"}
                rounded="full"
                leftIcon={action.icon}
                className="w-full sm:w-auto"
              >
                {action.label}
              </Button>
            ) : (
              action
            ))}

          {secondaryAction &&
            (isActionObject(secondaryAction) ? (
              <Button
                href={secondaryAction.href}
                onClick={secondaryAction.onClick}
                variant={secondaryAction.variant || "secondary"}
                size={isCompact ? "sm" : "md"}
                rounded="full"
                leftIcon={secondaryAction.icon}
                className="w-full sm:w-auto"
              >
                {secondaryAction.label}
              </Button>
            ) : (
              secondaryAction
            ))}
        </div>
      )}
    </div>
  );
}

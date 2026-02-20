"use client";

import * as React from "react";

type ButtonVariant = "primary" | "outline" | "selected";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-[222px] font-semibold font-sans capitalize transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-coral-400 text-white hover:bg-coral-500 outline-none",
  outline:
    "bg-white text-grey-900 outline outline-[0.70px] outline-offset-[-0.70px] outline-grey-900 hover:bg-grey-100",
  selected:
    "bg-white text-coral-400 outline outline-[1.6px] outline-offset-[-1.6px] outline-coral-400 hover:bg-coral-100",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm leading-5",
  md: "h-10 px-4 text-base leading-5",
  lg: "h-12 px-5 text-base leading-5",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={[base, variants[variant], sizes[size], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

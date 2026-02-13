"use client";

import * as React from "react";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "sm" | "mid";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const base =
  "inline-flex items-center justify-center rounded-[222px] transition-colors disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-primary text-white",
  outline:
    "bg-white text-text-default outline outline-[0.7px] outline-offset-[-0.7px] outline-text-default",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 p-4 text-base font-semibold leading-5",
  mid: "h-14 p-4 text-lg font-semibold leading-6",
};

export function Button({
  variant = "primary",
  size = "mid",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[base, variants[variant], sizes[size], className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}


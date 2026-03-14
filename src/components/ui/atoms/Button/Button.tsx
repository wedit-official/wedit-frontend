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
  primary: "bg-coral-400 text-white",
  outline:
    "bg-[var(--gray-white)] text-[var(--black-default)] outline outline-[0.7px] outline-offset-[-0.7px] outline-[color:var(--black-default)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 p-4 text-body-2",
  mid: "h-14 p-4 text-body-2",
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


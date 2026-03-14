"use client";

import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`flex-1 p-2 rounded outline outline-[0.50px] outline-offset-[-0.50px] outline-black-tertiary flex justify-start items-center gap-2.5 text-black-disabled text-base font-normal font-['Pretendard'] capitalize leading-5 ${className}`}
      {...props}
    />
  );
}


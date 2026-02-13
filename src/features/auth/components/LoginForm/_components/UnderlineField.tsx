"use client";

import * as React from "react";

export type UnderlineFieldProps = {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete?: string;
  error?: string;
};

export function UnderlineField({
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
}: UnderlineFieldProps) {
  const id = React.useId();

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="sr-only">
        {name}
      </label>

      <div
        className={[
          "flex w-full items-center gap-2.5 border-b py-5",
          error ? "border-b-brand-primary" : "border-b-text-disabled",
          "focus-within:border-b-2 focus-within:border-b-text-secondary",
        ].join(" ")}
      >
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-lg font-semibold leading-6 tracking-[-2.5px] text-text-default placeholder:text-text-disabled focus:outline-none"
        />
      </div>

      {error ? (
        <p className="text-sm font-normal leading-5 tracking-[-2.5px] text-brand-primary">
          {error}
        </p>
      ) : null}
    </div>
  );
}


"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";

const DEFAULT_PLACEHOLDER =
  "업체명만 입력하세요, 가격은 저희가 찾아올게요";

export type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  focused?: boolean;
  className?: string;
  inputClassName?: string;
  id?: string;
  "aria-label"?: string;
};

const outlineBase =
  "outline outline-[1.40px] outline-offset-[-1.40px] transition-[outline-color]";

export function SearchBar({
  placeholder = DEFAULT_PLACEHOLDER,
  value: valueProp,
  onChange,
  onSubmit,
  focused = false,
  className = "",
  inputClassName = "",
  id: idProp,
  "aria-label": ariaLabel = "검색",
}: SearchBarProps) {
  const id = React.useId();
  const inputId = idProp ?? id;

  const [internalValue, setInternalValue] = useState("");
  const isControlled = onChange !== undefined;
  const value = isControlled ? (valueProp ?? "") : internalValue;
  const handleChange = onChange ?? ((v: string) => setInternalValue(v));

  const wrapperClassName = [
    "w-full min-w-[280px] max-w-[922px] px-6 py-4 bg-white rounded-[222px] flex justify-between items-center gap-3 overflow-hidden",
    outlineBase,
    focused ? "outline-coral-400" : "outline-grey-900",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inputEl = (
    <input
      id={inputId}
      type="search"
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={placeholder}
      readOnly={false}
      aria-label={ariaLabel}
      className={[
        "flex-1 min-w-0 bg-transparent text-left text-grey-700 text-lg font-regular font-['Pretendard'] uppercase leading-6 placeholder:text-grey-700 focus:outline-none",
        inputClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );

  const arrow = (
    <span className="shrink-0 w-6 h-6 flex items-center justify-center" aria-hidden>
      <Image src="/icons/right.svg" width={24} height={24} alt="" />
    </span>
  );

  if (onSubmit) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
        className={wrapperClassName}
      >
        {inputEl}
        <button
          type="submit"
          className="shrink-0 p-0 border-0 bg-transparent cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 focus-visible:ring-offset-2 rounded"
          aria-label="검색 실행"
        >
          <Image src="/icons/right.svg" width={24} height={24} alt="" />
        </button>
      </form>
    );
  }

  return (
    <div className={wrapperClassName}>
      {inputEl}
      {arrow}
    </div>
  );
}

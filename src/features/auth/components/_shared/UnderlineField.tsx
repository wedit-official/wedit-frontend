"use client";

import * as React from "react";

export type UnderlineFieldProps = {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete?: string;
  onBlur?: () => void;
  error?: string;
  errorId?: string;
  renderError?: boolean;
  paddingYClassName?: string;
  endAddon?: React.ReactNode;
  reserveErrorSpace?: boolean;
  wrapperClassName?: string;
};

export function UnderlineField({
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  onBlur,
  error,
  errorId: errorIdProp,
  renderError = true,
  paddingYClassName = "py-5",
  endAddon,
  reserveErrorSpace = true,
  wrapperClassName = "flex w-full flex-col gap-2",
}: UnderlineFieldProps) {
  const id = React.useId();

  const errorId = errorIdProp ?? `${id}-error`;
  const hasError = Boolean(error);

  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className="sr-only">
        {name}
      </label>

      <div
        className={[
          // 레이아웃 시프트 방지:
          // - 기본 border-b(1px)는 고정
          // - focus 시 두꺼운 underline(2px)은 after로 "겹쳐" 그림(높이 변화 없음)
          "relative flex w-full items-center gap-2.5 border-b",
          paddingYClassName,
          hasError ? "border-coral-400" : "border-text-disabled",
          "after:pointer-events-none after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:content-['']",
          hasError
            ? "after:bg-coral-400 after:opacity-0 focus-within:after:opacity-100"
            : "after:bg-text-secondary after:opacity-0 focus-within:after:opacity-100",
        ].join(" ")}
      >
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className="w-full bg-transparent text-lg font-semibold leading-6 text-text-default placeholder:text-text-disabled focus:outline-none"
        />
        {endAddon ? <div className="shrink-0">{endAddon}</div> : null}
      </div>

      {!renderError ? null : reserveErrorSpace ? (
        // 레이아웃 시프트 방지: 에러 영역은 항상 공간 확보
        <p
          id={errorId}
          aria-live="polite"
          className={[
            "min-h-5 text-sm font-normal leading-5 text-coral-400",
            hasError ? "visible" : "invisible",
          ].join(" ")}
        >
          {error ?? " "}
        </p>
      ) : hasError ? (
        <p id={errorId} aria-live="polite" className="text-sm font-normal leading-5 text-coral-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}


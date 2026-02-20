"use client";

import * as React from "react";

export type RadioOption = {
  value: string;
  label: string;
};

export type RadioGroupProps = {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export function RadioGroup({
  options,
  value,
  onChange,
  className = "",
}: RadioGroupProps) {
  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
  };

  return (
    <div className={`inline-flex flex-col justify-start items-start gap-2 ${className}`}>
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <div
            key={option.value}
            data-radio={isSelected ? "on" : "off"}
            className="p-1.5 inline-flex justify-start items-center gap-2.5 cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => handleSelect(option.value)}
          >
            <div
              className={`w-3.5 h-3 rounded-full border-[0.50px] flex items-center justify-center ${
                isSelected
                  ? "bg-white border-black-default"
                  : "bg-white border-black-disabled"
              }`}
            >
              {isSelected && (
                <div className="w-1.5 h-1.5 rounded-full bg-black-default" />
              )}
            </div>
            <div className="w-full justify-start text-black text-lg font-normal font-['Pretendard'] capitalize leading-6">
              {option.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}


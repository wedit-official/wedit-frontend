"use client";

import * as React from "react";

export type MenuOption = {
  value: string;
  label: string;
};

export type MenuProps = {
  options: MenuOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export function Menu({
  options,
  value,
  onChange,
  className = "",
}: MenuProps) {
  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
  };

  return (
    <div className={`w-80 h-48 relative rounded-[5px] border border-purple-500 overflow-hidden ${className}`}>
      <div className="h-6 left-[20px] top-[20px] absolute inline-flex justify-start items-center gap-10 flex-wrap content-center">
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <div
              key={option.value}
              className="inline-flex flex-col justify-start items-start cursor-pointer hover:opacity-70 transition-opacity"
              onClick={() => handleSelect(option.value)}
            >
              <div
                className={`self-stretch justify-start text-grey-800 text-lg font-semibold font-['Pretendard'] uppercase leading-6 ${
                  isSelected ? "text-black-default" : ""
                }`}
              >
                {option.label}
              </div>
              {isSelected && (
                <div className="self-stretch h-[0.60px] bg-black-default" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


"use client";

import * as React from "react";
import Image from "next/image";

export type DropdownOption = {
  value: string;
  label: string;
};

export type DropdownProps = {
  header: string;
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export function Dropdown({
  header,
  options,
  value,
  onChange,
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(
    value
  );

  React.useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div className={`w-32 relative ${className}`}>
      <div className={`w-32 ${isOpen ? "h-[529px]" : "h-32"} relative transition-all duration-200`}>
        {isOpen && (
          <div className="w-28 left-[22px] top-[42px] absolute inline-flex flex-col justify-start items-start gap-2">
            {options.map((option) => {
              const isSelected = option.value === selectedValue;
              return (
                <div
                  key={option.value}
                  data-radio={isSelected ? "on" : "off"}
                  className="self-stretch p-1.5 inline-flex justify-start items-center gap-2.5 cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={() => handleSelect(option.value)}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-[0.50px] ${
                      isSelected
                        ? "bg-black-default border-black-default"
                        : "bg-white border-black-disabled"
                    }`}
                  />
                  <div className="justify-start text-black text-lg font-normal font-['Pretendard'] capitalize leading-6">
                    {option.label}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div
          className="p-1.5 left-0 top-0 absolute inline-flex justify-start items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
          onClick={handleToggle}
        >
          <div
            className={`w-4 h-4 relative transition-transform duration-200 ${
              isOpen ? "-rotate-180" : "rotate-0"
            }`}
          >
            <Image
              src="/icons/arrow.svg"
              alt="화살표"
              width={16}
              height={16}
              className="w-full h-full"
            />
          </div>
          <div className="justify-start text-black text-xl font-normal font-['Pretendard'] capitalize leading-7">
            {selectedOption?.label || header}
          </div>
        </div>
      </div>
    </div>
  );
}


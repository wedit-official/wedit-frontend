"use client";

import * as React from "react";
import { RadioGroup, type RadioOption } from "@/components/atoms/RadioGroup/RadioGroup";
import { Dropdown, type DropdownOption } from "@/components/atoms/Dropdown/Dropdown";

export type FilterProps = {
  categoryOptions?: RadioOption[];
  budgetOptions?: RadioOption[];
  seoulRegionOptions?: DropdownOption[];
  nonSeoulRegionOptions?: DropdownOption[];
  selectedCategory?: string;
  selectedBudget?: string;
  selectedSeoulRegion?: string;
  selectedNonSeoulRegion?: string;
  customBudgetMin?: string;
  customBudgetMax?: string;
  onCategoryChange?: (value: string) => void;
  onBudgetChange?: (value: string) => void;
  onSeoulRegionChange?: (value: string) => void;
  onNonSeoulRegionChange?: (value: string) => void;
  onCustomBudgetChange?: (min: string, max: string) => void;
  onClearAll?: () => void;
  className?: string;
};

const defaultCategoryOptions: RadioOption[] = [
  { value: "wedding-hall", label: "웨딩홀" },
  { value: "studio", label: "스튜디오" },
  { value: "dress", label: "드레스" },
  { value: "makeup", label: "메이크업" },
];

const defaultBudgetOptions: RadioOption[] = [
  { value: "all", label: "전체" },
  { value: "100k-500k", label: "10만원~50만원" },
  { value: "500k-1m", label: "50만원~100만원" },
  { value: "1m-1.5m", label: "100만원~150만원" },
  { value: "1.5m-plus", label: "150만원 이상" },
  { value: "custom", label: "직접입력" },
];

const defaultSeoulRegionOptions: DropdownOption[] = [
  { value: "seoul", label: "서울" },
  { value: "gyeonggi", label: "경기" },
  { value: "incheon", label: "인천" },
];

const defaultNonSeoulRegionOptions: DropdownOption[] = [
  { value: "busan", label: "부산" },
  { value: "daegu", label: "대구" },
  { value: "gwangju", label: "광주" },
  { value: "daejeon", label: "대전" },
  { value: "ulsan", label: "울산" },
  { value: "sejong", label: "세종" },
  { value: "gangwon", label: "강원" },
  { value: "chungcheong", label: "충청" },
  { value: "gyeongsang", label: "경상" },
  { value: "jeolla", label: "전라" },
  { value: "jeju", label: "제주" },
];

export function Filter({
  categoryOptions = defaultCategoryOptions,
  budgetOptions = defaultBudgetOptions,
  seoulRegionOptions = defaultSeoulRegionOptions,
  nonSeoulRegionOptions = defaultNonSeoulRegionOptions,
  selectedCategory,
  selectedBudget,
  selectedSeoulRegion,
  selectedNonSeoulRegion,
  customBudgetMin = "",
  customBudgetMax = "",
  onCategoryChange,
  onBudgetChange,
  onSeoulRegionChange,
  onNonSeoulRegionChange,
  onCustomBudgetChange,
  onClearAll,
  className = "",
}: FilterProps) {
  const [localCustomMin, setLocalCustomMin] = React.useState(customBudgetMin);
  const [localCustomMax, setLocalCustomMax] = React.useState(customBudgetMax);
  const [localSelectedBudget, setLocalSelectedBudget] = React.useState(selectedBudget);

  React.useEffect(() => {
    setLocalSelectedBudget(selectedBudget);
  }, [selectedBudget]);

  const handleBudgetChange = (value: string) => {
    setLocalSelectedBudget(value);
    onBudgetChange?.(value);
  };

  const handleApplyCustomBudget = () => {
    onCustomBudgetChange?.(localCustomMin, localCustomMax);
  };

  const showCustomInput = localSelectedBudget === "custom";

  return (
    <div className={`w-80 bg-white flex flex-col items-start gap-6 ${className}`}>
      <div className="w-full flex justify-between items-center">
        <span className="text-grey-900 text-xl font-normal font-['Pretendard'] capitalize leading-7">
          filter
        </span>
        <button
          onClick={onClearAll}
          className="text-grey-900 text-lg font-normal font-['Pretendard'] underline capitalize leading-6 cursor-pointer hover:opacity-70 transition-opacity"
        >
          clear all
        </button>
      </div>

      <div className="w-80 inline-flex flex-col justify-start items-start gap-9">
        <div className="w-24 h-56 relative">
          <div className="left-[6px] top-0 absolute justify-start text-black text-xl font-normal font-['Pretendard'] capitalize leading-7">
            분류
          </div>
          <div className="w-24 h-44 left-0 top-[43px] absolute">
            <RadioGroup
              options={categoryOptions}
              value={selectedCategory}
              onChange={onCategoryChange}
            />
          </div>
        </div>

        <div className="self-stretch h-96 relative">
          <div className="w-80 left-0 top-0 absolute justify-start text-black text-xl font-normal font-['Pretendard'] capitalize leading-7">
            예산
          </div>
          <div className="w-44 left-0 top-[43px] absolute">
            <RadioGroup
              options={budgetOptions}
              value={localSelectedBudget}
              onChange={handleBudgetChange}
            />
          </div>
          {showCustomInput && (
            <div className="w-80 left-0 top-[329px] absolute inline-flex justify-start items-center gap-2">
              <div className="flex-1 min-w-0 p-2 rounded outline-[0.50px] outline-offset-[-0.50px] outline-text-tertiary flex justify-start items-center gap-2.5">
                <input
                  type="text"
                  value={localCustomMin}
                  onChange={(e) => setLocalCustomMin(e.target.value)}
                  placeholder="10,000"
                  className="flex-1 min-w-0 bg-transparent text-text-disabled text-base font-normal font-['Pretendard'] capitalize leading-5 placeholder:text-text-disabled focus:outline-none"
                />
              </div>
              <span className="text-text-default text-base font-normal font-['Pretendard'] capitalize leading-5">
                ~
              </span>
              <div className="flex-1 min-w-0 p-2 rounded outline-[0.50px] outline-offset-[-0.50px] outline-text-tertiary flex justify-start items-center gap-2.5">
                <input
                  type="text"
                  value={localCustomMax}
                  onChange={(e) => setLocalCustomMax(e.target.value)}
                  placeholder="1,000,000,000"
                  className="flex-1 min-w-0 bg-transparent text-text-disabled text-base font-normal font-['Pretendard'] capitalize leading-5 placeholder:text-text-disabled focus:outline-none"
                />
              </div>
              <button
                onClick={handleApplyCustomBudget}
                className="p-2 rounded outline-[0.50px] outline-offset-[-0.50px] outline-text-tertiary flex justify-start items-center gap-2.5 cursor-pointer hover:opacity-70 transition-opacity"
              >
                <span className="text-text-disabled text-base font-normal font-['Pretendard'] capitalize leading-5">
                  적용
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="w-28 h-32 relative">
          <div className="left-[6px] top-0 absolute justify-start text-black text-xl font-normal font-['Pretendard'] capitalize leading-7">
            지역
          </div>
          <div className="left-0 top-[43px] absolute inline-flex flex-col justify-start items-start gap-2">
            <Dropdown
              header="수도권"
              options={seoulRegionOptions}
              value={selectedSeoulRegion}
              onChange={onSeoulRegionChange}
            />
            <Dropdown
              header="비수도권"
              options={nonSeoulRegionOptions}
              value={selectedNonSeoulRegion}
              onChange={onNonSeoulRegionChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


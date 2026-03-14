"use client";

import { useState } from "react";
import { SearchBar } from "@/components/atoms/SearchBar/SearchBar";
import { Filter } from "@/components/molecules/Filter/Filter";
import { Card } from "@/components/atoms/Card/Card";
import { PublicHeader } from "@/components/shared/layouts/PublicHeader";

const SAMPLE_CARD = {
  title: "아펠가모 선릉",
  address: "서울특별시 강남구 테헤란로 322 24빌딩 4층",
  price: "7,700,000원~",
  imageUrl:
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
  imageAlt: "웨딩홀 내부",
};

const SAMPLE_RESULTS = Array(5).fill(SAMPLE_CARD);

export function SearchPage() {
  const [category, setCategory] = useState<string | undefined>();
  const [budget, setBudget] = useState<string | undefined>();
  const [seoulRegion, setSeoulRegion] = useState<string | undefined>();
  const [nonSeoulRegion, setNonSeoulRegion] = useState<string | undefined>();

  const handleClearAll = () => {
    setCategory(undefined);
    setBudget(undefined);
    setSeoulRegion(undefined);
    setNonSeoulRegion(undefined);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="w-full flex-1 min-h-0 flex flex-col gap-20">
        {/* 헤더 + 검색 영역 */}
        <div className="flex flex-col items-center gap-14">
          <PublicHeader />

          <div className="w-full max-w-[1000px] min-w-96 px-10 flex flex-col items-center gap-12">
            <h1 className="self-stretch text-center text-text-default text-5xl font-semibold font-['Pretendard'] uppercase leading-[67.2px]">
              궁금했던 그 업체, 실시간 견적은?
            </h1>
            <div className="self-stretch min-w-96 flex flex-col items-center">
              <div className="w-full max-w-[922px]">
                <SearchBar
                  placeholder="관심있는 웨딩업체의 최저가를 빠르게 찾아보세요"
                  focused={false}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex-1 min-h-0 px-12 flex justify-start items-start gap-24 overflow-hidden">
          <aside className="w-80 shrink-0">
            <Filter
              selectedCategory={category}
              selectedBudget={budget}
              selectedSeoulRegion={seoulRegion}
              selectedNonSeoulRegion={nonSeoulRegion}
              onCategoryChange={setCategory}
              onBudgetChange={setBudget}
              onSeoulRegionChange={setSeoulRegion}
              onNonSeoulRegionChange={setNonSeoulRegion}
              onClearAll={handleClearAll}
              className="h-auto!"
            />
          </aside>

          <div className="flex-1 min-w-0 min-h-0 flex flex-col overflow-y-auto gap-3 ml-[90px]">
            {SAMPLE_RESULTS.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                address={item.address}
                price={item.price}
                imageUrl={item.imageUrl}
                imageAlt={item.imageAlt}
                onLike={() => {}}
                onShare={() => {}}
                className="min-w-0! w-full h-56!"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

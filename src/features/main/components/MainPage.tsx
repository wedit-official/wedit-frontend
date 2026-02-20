"use client";

import Image from "next/image";
import { SearchBar } from "@/components/atoms/SearchBar/SearchBar";
import { PriceBarChart, createMonthlyData } from "@/components/molecules/PriceBarChart/PriceBarChart";
import { Button } from "@/components/ui/atoms/Button/Button";
import { PublicHeader } from "@/components/shared/layouts/PublicHeader";

const CHART_SAMPLE_VALUES = [
  280, 320, 310, 290, 300, 330, 315, 305, 340, 298, 285, 310,
];

export function MainPage() {
  const chartData = createMonthlyData(CHART_SAMPLE_VALUES);

  return (
    <div className="min-h-screen flex flex-col bg-grey-300">
      <section className="relative min-h-[900px] w-full flex flex-col">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/mainBackground.png"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-20 flex-1">
          <PublicHeader />

          <div className="w-full max-w-[1000px] min-w-96 px-10 flex flex-col items-center gap-12">
            <h1 className="text-center text-text-default text-5xl font-semibold font-['Pretendard'] uppercase leading-[67.2px]">
              가장 빛날 순간을 위한 가장 명쾌한 기록,
              <br />
              웨딧에서 시작해요
            </h1>

            <div className="w-full min-w-96 flex flex-col items-center gap-6">
              <div className="w-full max-w-[922px]">
                <SearchBar
                  placeholder="관심있는 웨딩업체의 최저가를 빠르게 찾아보세요"
                  focused={false}
                />
              </div>
              <div className="inline-flex items-center justify-center gap-6">
                <Button variant="primary" size="sm">
                  지역 설정
                </Button>
                <Button variant="primary" size="sm">
                  예산 설정
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 가격 추이 섹션 */}
      <section className="w-full bg-white px-10 py-20 md:px-40">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-14">
            <div className="max-w-[400px] flex flex-col gap-5">
              <h2 className="text-text-default text-2xl font-semibold font-['Pretendard'] uppercase leading-9">
                2025년 가격 추이
              </h2>
              <p className="w-full text-text-default text-lg font-normal font-['Pretendard'] capitalize leading-6">
                성수기는 비수기 대비 10~20% 가격이 상승해요
                <br />
                8~12개월 전에 예약은 선택이 아닌 필수
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-[1114px]">
              <PriceBarChart data={chartData} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

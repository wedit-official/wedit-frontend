"use client";

import { Fragment, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceDot,
  ReferenceLine,
} from "recharts";

const MONTH_LABELS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export type PriceBarChartDataPoint = {
  month: number;
  monthLabel: string;
  value: number;
};

export type PriceBarChartProps = {
  data: PriceBarChartDataPoint[];
  /** Controlled: 강조할 월(1–12). 미전달 시 막대 클릭으로 내부 state 갱신 */
  highlightedMonth?: number;
  /** Controlled 모드에서 강조 월 변경 시 호출 */
  onHighlightChange?: (month: number | null) => void;
  className?: string;
  maxValue?: number;
};

const CORAL_400 = "#FF676A";
/** 흰색 세로선 (stone-100 계열 연한색도 가능: #f5f5f4) */
const CENTER_LINE_STROKE = "#ffffff";
const GREY_500 = "#919191";
const GREY_700 = "#616161";
const GREY_900 = "#333333";
const WHITE = "#FFFFFF";

function formatPrice(value: number): string {
  if (value >= 10000) return `${value / 10000}억원`;
  return `${value}만원`;
}

/** 강조 시에만 표시하는 툴팁 박스 (hover 시에는 노출 안 함) */
function HighlightTooltipContent({ entry }: { entry: PriceBarChartDataPoint }) {
  const { monthLabel, value } = entry;
  return (
    <div className="px-4 py-2 bg-white rounded-lg shadow-[3px_6px_12px_2px_rgba(0,0,0,0.15)] flex flex-col justify-center items-center min-w-[128px]">
      <div className="text-center text-grey-900 text-xl font-normal font-['Pretendard'] capitalize leading-7">
        {monthLabel} 평균
      </div>
      <div className="text-coral-400 text-lg font-semibold font-['Pretendard'] uppercase leading-6">
        {formatPrice(value)}
      </div>
    </div>
  );
}

export function PriceBarChart({
  data,
  highlightedMonth: highlightedMonthProp,
  onHighlightChange,
  className = "",
  maxValue: maxValueProp,
}: PriceBarChartProps) {
  const [internalMonth, setInternalMonth] = useState<number | null>(null);
  const isControlled = highlightedMonthProp !== undefined;
  const highlightedMonth = isControlled ? highlightedMonthProp ?? null : internalMonth;
  const hasHighlight = highlightedMonth != null;

  const handleBarClick = (entry: PriceBarChartDataPoint) => {
    const next = entry.month === highlightedMonth ? null : entry.month;
    if (!isControlled) setInternalMonth(next);
    onHighlightChange?.(next);
  };

  const maxValue =
    maxValueProp ?? Math.max(...data.map((d) => d.value), 1);

  const highlightedEntry = hasHighlight
    ? data.find((d) => d.month === highlightedMonth)
    : null;

  return (
    <div
      className={`relative w-full h-96 outline-none focus:outline-none focus-visible:outline-none [&_*]:outline-none [&_*]:focus:outline-none [&_*]:focus-visible:outline-none [&_*]:ring-0 ${className}`}
    >
      {highlightedEntry && (
        <div className="absolute left-1/2 top-[18px] z-10 -translate-x-1/2">
          <HighlightTooltipContent entry={highlightedEntry} />
        </div>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 40, right: 8, left: 8, bottom: 28 }}
          barGap={11}
          barCategoryGap="10%"
        >
          <defs>
            <linearGradient
              id="barGradientCoral"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor={CORAL_400} />
              <stop offset="100%" stopColor={WHITE} stopOpacity={0} />
            </linearGradient>
            <linearGradient
              id="barGradientGrey"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" stopColor={GREY_500} stopOpacity={0.6} />
              <stop offset="100%" stopColor={WHITE} stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <YAxis hide domain={[0, maxValue]} />
          <XAxis
            dataKey="monthLabel"
            axisLine={false}
            tickLine={false}
            tickMargin={8}
            interval={0}
            tick={(props) => {
              const { x, y, payload } = props;
              const label = payload?.value ?? "";
              const monthIndex = MONTH_LABELS.indexOf(label);
              const month = monthIndex >= 0 ? monthIndex + 1 : 0;
              const isHighlighted =
                hasHighlight && month === highlightedMonth;
              return (
                <g transform={`translate(${x},${y})`}>
                  <text
                    textAnchor="middle"
                    dominantBaseline="hanging"
                    fill={isHighlighted ? GREY_900 : GREY_700}
                    style={{
                      fontSize: 20,
                      fontFamily: "Pretendard, system-ui, sans-serif",
                    }}
                  >
                    {payload?.value}
                  </text>
                </g>
              );
            }}
          />
          <Tooltip content={() => null} cursor={false} />
          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
            maxBarSize={48}
            isAnimationActive={true}
            animationDuration={300}
            onClick={(ev: { payload?: PriceBarChartDataPoint }) => {
              const entry = ev?.payload;
              if (entry && typeof entry.month === "number") handleBarClick(entry);
            }}
            style={{ cursor: "pointer" }}
          >
            {data.map((entry) => {
              const isHighlighted =
                hasHighlight && entry.month === highlightedMonth;
              const useCoral = !hasHighlight || isHighlighted;
              return (
                <Cell
                  key={entry.month}
                  fill={
                    useCoral
                      ? "url(#barGradientCoral)"
                      : "url(#barGradientGrey)"
                  }
                />
              );
            })}
          </Bar>
          {hasHighlight &&
            data
              .filter((d) => d.month === highlightedMonth)
              .map((entry) => (
                <Fragment key={entry.month}>
                  <ReferenceLine
                    x={entry.monthLabel}
                    stroke={CENTER_LINE_STROKE}
                    strokeWidth={1.5}
                  />
                  <ReferenceDot
                    x={entry.monthLabel}
                    y={entry.value}
                    r={12}
                    fill={CORAL_400}
                    stroke={WHITE}
                    strokeWidth={2}
                  />
                </Fragment>
              ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function createMonthlyData(values: number[]): PriceBarChartDataPoint[] {
  const arr = values.length >= 12 ? values.slice(0, 12) : [...values, ...Array(12 - values.length).fill(0)];
  return arr.map((value, i) => ({
    month: i + 1,
    monthLabel: MONTH_LABELS[i],
    value: Number(value),
  }));
}

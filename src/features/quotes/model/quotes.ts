export const quoteCategories = ["weddinghall", "studio", "dress", "makeup"] as const;
export type QuoteCategory = (typeof quoteCategories)[number];

export type QuoteOption = {
  id: string;
  label: string;
  priceDeltaWon?: number;
};

export type QuoteItem = {
  id: string;
  category: QuoteCategory;
  vendorName: string;
  /** 카드 썸네일(목데이터용) */
  imageSrc?: string;
  /** 카드 우상단 뱃지(예: 계약예정) */
  badgeLabel?: string;
  // 웨딩홀 전용
  hallName?: string;
  agencyName: string;
  baseOptions: QuoteOption[];
  extraOptions: QuoteOption[];
  selectedBaseOptionId: string;
  selectedExtraOptionIds: string[];
  basePriceWon: number;
};

export const categoryLabel: Record<QuoteCategory, string> = {
  weddinghall: "웨딩홀",
  studio: "스튜디오",
  dress: "드레스",
  makeup: "메이크업",
};

export function formatWon(valueWon: number) {
  return new Intl.NumberFormat("ko-KR").format(valueWon) + "원";
}

export function formatManwon(valueWon: number) {
  const manwon = Math.round(valueWon / 10_000);
  return `${manwon}만원`;
}

export function getItemPriceWon(item: QuoteItem) {
  const baseDelta =
    item.baseOptions.find((o) => o.id === item.selectedBaseOptionId)?.priceDeltaWon ?? 0;
  const extrasDelta = item.extraOptions
    .filter((o) => item.selectedExtraOptionIds.includes(o.id))
    .reduce((sum, o) => sum + (o.priceDeltaWon ?? 0), 0);
  return item.basePriceWon + baseDelta + extrasDelta;
}

export function getItemSummaryLines(item: QuoteItem): string[] {
  const baseLabel = item.baseOptions.find((o) => o.id === item.selectedBaseOptionId)?.label;
  const extras = item.extraOptions
    .filter((o) => item.selectedExtraOptionIds.includes(o.id))
    .map((o) => o.label);

  if (item.category === "weddinghall") {
    const hall = item.hallName ? `홀: ${item.hallName}` : undefined;
    const base = baseLabel ? `기본: ${baseLabel}` : undefined;
    return [hall, base].filter(Boolean) as string[];
  }

  const base = baseLabel ? `기본: ${baseLabel}` : undefined;
  const option = extras.length ? `옵션: ${extras.join(", ")}` : undefined;
  return [base, option].filter(Boolean) as string[];
}


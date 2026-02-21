"use client";

import { create } from "zustand";

import {
  type QuoteCategory,
  type QuoteItem,
  getItemPriceWon,
  quoteCategories,
} from "@/features/quotes/model/quotes";

type QuotesState = {
  activeCategory: QuoteCategory;
  items: QuoteItem[];
  selectedByCategory: Partial<Record<QuoteCategory, string>>;

  deleteMode: boolean;
  deleteSelection: Record<string, boolean>;

  optionModal: { open: boolean; itemId: string | null };

  setActiveCategory: (category: QuoteCategory) => void;
  toggleSelectForCategory: (itemId: string) => void;

  enterDeleteMode: () => void;
  cancelDeleteMode: () => void;
  toggleDeleteSelection: (itemId: string) => void;
  deleteSelected: () => void;

  openOptionModal: (itemId: string) => void;
  closeOptionModal: () => void;
  setItemOptions: (args: {
    itemId: string;
    selectedBaseOptionId: string;
    selectedExtraOptionIds: string[];
  }) => void;

  getItemsByCategory: (category: QuoteCategory) => QuoteItem[];
  getSelectedItemByCategory: (category: QuoteCategory) => QuoteItem | null;
  getTotalWon: () => number;
};

function createMockItems(): QuoteItem[] {
  // 목 이미지 — public/assets/image 아래 파일들에서 랜덤 땜빵 (Next.js 기준 경로: /assets/image/...)
  const imagePool = [
    "/assets/image/testImg1.png",
    "/assets/image/testImg2.png",
    "/assets/image/testImg3.png",
    // 필요 시 추가: "/assets/image/testImg2.png", ...
  ];
  const pickRandomImage = () =>
    imagePool[Math.floor(Math.random() * imagePool.length)]!;

  // 공통 옵션 샘플(묵데이터)
  const weddingHallBase = [
    { id: "wh-base-1", label: "본식+촬영", priceDeltaWon: 0 },
    { id: "wh-base-2", label: "본식+2부", priceDeltaWon: 800_000 },
  ];
  const weddingHallExtras = [
    { id: "wh-opt-1", label: "혼주", priceDeltaWon: 300_000 },
    { id: "wh-opt-2", label: "얼리", priceDeltaWon: 200_000 },
  ];

  const studioBase = [
    { id: "st-base-1", label: "본식+촬영", priceDeltaWon: 0 },
    { id: "st-base-2", label: "본식+촬영+야외", priceDeltaWon: 1_000_000 },
  ];
  const studioExtras = [{ id: "st-opt-1", label: "앨범 30P", priceDeltaWon: 150_000 }];

  const dressBase = [
    { id: "dr-base-1", label: "본식", priceDeltaWon: 0 },
    { id: "dr-base-2", label: "본식+리허설", priceDeltaWon: 500_000 },
  ];
  const dressExtras = [{ id: "dr-opt-1", label: "부케", priceDeltaWon: 120_000 }];

  const makeupBase = [
    { id: "mk-base-1", label: "본식+2부", priceDeltaWon: 0 },
    { id: "mk-base-2", label: "본식+2부+리허설", priceDeltaWon: 700_000 },
  ];
  const makeupExtras = [
    { id: "mk-opt-1", label: "혼주", priceDeltaWon: 200_000 },
    { id: "mk-opt-2", label: "얼리", priceDeltaWon: 150_000 },
  ];

  const make = (partial: Omit<QuoteItem, "selectedExtraOptionIds"> & { selectedExtraOptionIds?: string[] }): QuoteItem => ({
    ...partial,
    selectedExtraOptionIds: partial.selectedExtraOptionIds ?? [],
  });

  const agencies = ["제이웨딩", "베리굿", "다이렉트", "하우투웨딩"] as const;

  const baseItems: QuoteItem[] = [
    make({
      id: "wh-1",
      category: "weddinghall",
      vendorName: "아펠가모 공덕",
      imageSrc: pickRandomImage(),
      hallName: "라로브홀",
      agencyName: agencies[0],
      basePriceWon: 10_650_000,
      baseOptions: weddingHallBase,
      extraOptions: weddingHallExtras,
      selectedBaseOptionId: "wh-base-1",
    }),
    make({
      id: "wh-2",
      category: "weddinghall",
      vendorName: "아펠가모 공덕",
      imageSrc: pickRandomImage(),
      hallName: "라로브홀",
      agencyName: agencies[1],
      basePriceWon: 10_650_000,
      baseOptions: weddingHallBase,
      extraOptions: weddingHallExtras,
      selectedBaseOptionId: "wh-base-2",
      selectedExtraOptionIds: ["wh-opt-1"],
    }),
    make({
      id: "wh-4",
      category: "weddinghall",
      vendorName: "아펠가모 공덕",
      imageSrc: pickRandomImage(),
      hallName: "라로브홀",
      agencyName: agencies[2],
      basePriceWon: 10_650_000,
      baseOptions: weddingHallBase,
      extraOptions: weddingHallExtras,
      selectedBaseOptionId: "wh-base-1",
    }),
    make({
      id: "wh-5",
      category: "weddinghall",
      vendorName: "아펠가모 공덕",
      imageSrc: pickRandomImage(),
      hallName: "라로브홀",
      agencyName: agencies[3],
      basePriceWon: 10_650_000,
      baseOptions: weddingHallBase,
      extraOptions: weddingHallExtras,
      selectedBaseOptionId: "wh-base-1",
    }),
    make({
      id: "wh-6",
      category: "weddinghall",
      vendorName: "아펠가모 공덕",
      imageSrc: pickRandomImage(),
      hallName: "라로브홀",
      agencyName: agencies[0],
      basePriceWon: 10_650_000,
      baseOptions: weddingHallBase,
      extraOptions: weddingHallExtras,
      selectedBaseOptionId: "wh-base-2",
    }),
    make({
      id: "st-1",
      category: "studio",
      vendorName: "아펠가모 공덕",
      imageSrc: pickRandomImage(),
      agencyName: agencies[1],
      basePriceWon: 10_650_000,
      baseOptions: studioBase,
      extraOptions: studioExtras,
      selectedBaseOptionId: "st-base-1",
    }),
    make({
      id: "dr-1",
      category: "dress",
      vendorName: "아펠가모 공덕",
      imageSrc: pickRandomImage(),
      agencyName: agencies[2],
      basePriceWon: 10_650_000,
      baseOptions: dressBase,
      extraOptions: dressExtras,
      selectedBaseOptionId: "dr-base-1",
    }),
    make({
      id: "mk-1",
      category: "makeup",
      vendorName: "아펠가모 공덕",
      imageSrc: pickRandomImage(),
      agencyName: agencies[3],
      basePriceWon: 10_650_000,
      baseOptions: makeupBase,
      extraOptions: makeupExtras,
      selectedBaseOptionId: "mk-base-1",
      selectedExtraOptionIds: ["mk-opt-1", "mk-opt-2"],
    }),
  ];

  const extraItems: QuoteItem[] = [
    make({
      id: "st-2",
      category: "studio",
      vendorName: "아펠가모 공덕",
      imageSrc: pickRandomImage(),
      agencyName: agencies[0],
      basePriceWon: 10_650_000,
      baseOptions: studioBase,
      extraOptions: studioExtras,
      selectedBaseOptionId: "st-base-2",
    }),
    make({
      id: "dr-2",
      category: "dress",
      vendorName: "아펠가모 공덕",
      imageSrc: pickRandomImage(),
      agencyName: agencies[1],
      basePriceWon: 10_650_000,
      baseOptions: dressBase,
      extraOptions: dressExtras,
      selectedBaseOptionId: "dr-base-2",
    }),
    make({
      id: "mk-2",
      category: "makeup",
      vendorName: "아펠가모 공덕",
      imageSrc: pickRandomImage(),
      agencyName: agencies[2],
      basePriceWon: 10_650_000,
      baseOptions: makeupBase,
      extraOptions: makeupExtras,
      selectedBaseOptionId: "mk-base-2",
    }),
    make({
      id: "wh-3",
      category: "weddinghall",
      vendorName: "아펠가모 공덕",
      imageSrc: pickRandomImage(),
      hallName: "라로브홀",
      agencyName: agencies[3],
      basePriceWon: 10_650_000,
      baseOptions: weddingHallBase,
      extraOptions: weddingHallExtras,
      selectedBaseOptionId: "wh-base-1",
      selectedExtraOptionIds: ["wh-opt-2"],
    }),
  ];

  return [...baseItems, ...extraItems];
}

export const useQuotesStore = create<QuotesState>((set, get) => ({
  activeCategory: "weddinghall",
  items: createMockItems(),
  selectedByCategory: {},

  deleteMode: false,
  deleteSelection: {},

  optionModal: { open: false, itemId: null },

  setActiveCategory: (category) => set({ activeCategory: category }),

  toggleSelectForCategory: (itemId) =>
    set((state) => {
      const item = state.items.find((x) => x.id === itemId);
      if (!item) return state;
      const current = state.selectedByCategory[item.category];
      return {
        selectedByCategory: {
          ...state.selectedByCategory,
          [item.category]: current === itemId ? undefined : itemId,
        },
      };
    }),

  enterDeleteMode: () => set({ deleteMode: true, deleteSelection: {} }),
  cancelDeleteMode: () => set({ deleteMode: false, deleteSelection: {} }),

  toggleDeleteSelection: (itemId) =>
    set((state) => ({
      deleteSelection: { ...state.deleteSelection, [itemId]: !state.deleteSelection[itemId] },
    })),

  deleteSelected: () =>
    set((state) => {
      const toDelete = new Set(Object.entries(state.deleteSelection).filter(([, v]) => v).map(([k]) => k));
      if (!toDelete.size) return { deleteMode: false, deleteSelection: {} };

      const items = state.items.filter((x) => !toDelete.has(x.id));
      const selectedByCategory = { ...state.selectedByCategory };
      for (const cat of quoteCategories) {
        const selectedId = selectedByCategory[cat];
        if (selectedId && toDelete.has(selectedId)) selectedByCategory[cat] = undefined;
      }
      return { items, selectedByCategory, deleteMode: false, deleteSelection: {} };
    }),

  openOptionModal: (itemId) => set({ optionModal: { open: true, itemId } }),
  closeOptionModal: () => set({ optionModal: { open: false, itemId: null } }),

  setItemOptions: ({ itemId, selectedBaseOptionId, selectedExtraOptionIds }) =>
    set((state) => ({
      items: state.items.map((x) =>
        x.id === itemId ? { ...x, selectedBaseOptionId, selectedExtraOptionIds } : x,
      ),
    })),

  getItemsByCategory: (category) => get().items.filter((x) => x.category === category),

  getSelectedItemByCategory: (category) => {
    const id = get().selectedByCategory[category];
    if (!id) return null;
    return get().items.find((x) => x.id === id) ?? null;
  },

  getTotalWon: () =>
    quoteCategories.reduce((sum, cat) => {
      const item = get().getSelectedItemByCategory(cat);
      return sum + (item ? getItemPriceWon(item) : 0);
    }, 0),
}));


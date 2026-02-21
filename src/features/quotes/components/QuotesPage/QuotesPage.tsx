"use client";
import Image from "next/image";
import * as React from "react";

import { Button } from "@/components/ui";
import {
  categoryLabel,
  formatWon,
  getItemPriceWon,
  quoteCategories,
} from "@/features/quotes/model/quotes";
import { useQuotesStore } from "@/features/quotes/store/quotesStore";

import { DeleteConfirmModal } from "./_components/DeleteConfirmModal";
import { OptionChangeModal } from "./_components/OptionChangeModal";
import { QuoteCard } from "./_components/QuoteCard";

function CategoryPill({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "flex h-10 items-center justify-center gap-2.5 rounded-[222px] bg-[var(--gray-white)] px-4 text-body-2",
        selected
          ? "text-[var(--brand-primary)] outline outline-[1.6px] outline-offset-[-1.6px] outline-[color:var(--brand-primary)]"
          : "text-[var(--black-default)] outline outline-[0.7px] outline-offset-[-0.7px] outline-[color:var(--black-default)]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export function QuotesPage() {
  const activeCategory = useQuotesStore((s) => s.activeCategory);
  const setActiveCategory = useQuotesStore((s) => s.setActiveCategory);
  const allItems = useQuotesStore((s) => s.items);
  const selectedByCategory = useQuotesStore((s) => s.selectedByCategory);
  const toggleSelectForCategory = useQuotesStore((s) => s.toggleSelectForCategory);

  const deleteMode = useQuotesStore((s) => s.deleteMode);
  const deleteSelection = useQuotesStore((s) => s.deleteSelection);
  const enterDeleteMode = useQuotesStore((s) => s.enterDeleteMode);
  const cancelDeleteMode = useQuotesStore((s) => s.cancelDeleteMode);
  const toggleDeleteSelection = useQuotesStore((s) => s.toggleDeleteSelection);
  const deleteSelected = useQuotesStore((s) => s.deleteSelected);

  const optionModal = useQuotesStore((s) => s.optionModal);
  const openOptionModal = useQuotesStore((s) => s.openOptionModal);
  const closeOptionModal = useQuotesStore((s) => s.closeOptionModal);
  const setItemOptions = useQuotesStore((s) => s.setItemOptions);

  // ⚠️ 중요: useSyncExternalStore(getServerSnapshot) 안정성 때문에,
  // selector에서 filter/map 등으로 "새 배열/객체"를 만들면 SSR에서 무한 루프가 날 수 있음.
  // 따라서 selector는 원본 상태만 가져오고, 파생 값은 컴포넌트에서 memo로 계산한다.
  const items = React.useMemo(
    () => allItems.filter((x) => x.category === activeCategory),
    [allItems, activeCategory],
  );

  const selectedWeddingHall = React.useMemo(() => {
    const id = selectedByCategory.weddinghall;
    return id ? allItems.find((x) => x.id === id) ?? null : null;
  }, [allItems, selectedByCategory.weddinghall]);

  const selectedStudio = React.useMemo(() => {
    const id = selectedByCategory.studio;
    return id ? allItems.find((x) => x.id === id) ?? null : null;
  }, [allItems, selectedByCategory.studio]);

  const selectedDress = React.useMemo(() => {
    const id = selectedByCategory.dress;
    return id ? allItems.find((x) => x.id === id) ?? null : null;
  }, [allItems, selectedByCategory.dress]);

  const selectedMakeup = React.useMemo(() => {
    const id = selectedByCategory.makeup;
    return id ? allItems.find((x) => x.id === id) ?? null : null;
  }, [allItems, selectedByCategory.makeup]);

  const totalWon = React.useMemo(() => {
    const list = [selectedWeddingHall, selectedStudio, selectedDress, selectedMakeup].filter(
      Boolean,
    ) as Array<NonNullable<typeof selectedWeddingHall>>;
    return list.reduce((sum, item) => sum + getItemPriceWon(item), 0);
  }, [selectedWeddingHall, selectedStudio, selectedDress, selectedMakeup]);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);

  const modalItem = React.useMemo(() => {
    const id = optionModal.itemId;
    return id ? allItems.find((x) => x.id === id) ?? null : null;
  }, [allItems, optionModal.itemId]);

  // 카드 리스트: 행 수 변화 시 높이 부드럽게 전환 (위아래)
  const cardsListRef = React.useRef<HTMLDivElement>(null);
  const prevCardsHeightRef = React.useRef<number | null>(null);
  const [cardsListHeight, setCardsListHeight] = React.useState<number | null>(null);

  React.useLayoutEffect(() => {
    const el = cardsListRef.current;
    if (!el) return;
    const nextH = el.scrollHeight;
    if (prevCardsHeightRef.current === null) {
      prevCardsHeightRef.current = nextH;
      setCardsListHeight(nextH);
      return;
    }
    setCardsListHeight(prevCardsHeightRef.current);
    const id = requestAnimationFrame(() => {
      setCardsListHeight(nextH);
      prevCardsHeightRef.current = nextH;
    });
    return () => cancelAnimationFrame(id);
  }, [items.length, activeCategory]);

  // 우측 총 견적: 가격 길이 변화 시 너비만 부드럽게 전환 (늘어남/줄어듦)
  const totalBlockRef = React.useRef<HTMLDivElement>(null);
  const prevWidthRef = React.useRef<number | null>(null);
  const [totalBlockWidth, setTotalBlockWidth] = React.useState<number | null>(null);

  React.useLayoutEffect(() => {
    const el = totalBlockRef.current;
    if (!el) return;
    const nextW = el.scrollWidth;
    if (prevWidthRef.current === null) {
      prevWidthRef.current = nextW;
      setTotalBlockWidth(nextW);
      return;
    }
    setTotalBlockWidth(prevWidthRef.current);
    const id = requestAnimationFrame(() => {
      setTotalBlockWidth(nextW);
      prevWidthRef.current = nextW;
    });
    return () => cancelAnimationFrame(id);
  }, [totalWon]);

  return (
    <div className="w-full bg-[var(--gray-white)]">
      <div className="w-full px-[clamp(24px,5vw,96px)] pb-20">
        {/* Title */}
        <div className="flex flex-col items-center gap-5 pt-5">
          <div className="w-full">
            <h1 className="text-center text-head-1 text-[var(--black-default)]">
              00님이 선택한 업체의 견적을 알려드려요
            </h1>
          </div>
        </div>

        {/* Tabs + actions */}
        <div className="mt-8 flex items-center justify-between">
          <div className="inline-flex items-center gap-4">
            {quoteCategories.map((cat) => (
              <CategoryPill
                key={cat}
                label={categoryLabel[cat]}
                selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>

          {!deleteMode ? (
            <button
              type="button"
              onClick={enterDeleteMode}
              className="text-body-3 text-[var(--black-tertiary)] underline"
            >
              삭제하기
            </button>
          ) : (
            <div className="inline-flex items-center gap-3">
              <Button
                size="sm"
                onClick={() => setDeleteConfirmOpen(true)}
                className="px-6"
              >
                삭제
              </Button>
              <Button size="sm" variant="outline" onClick={cancelDeleteMode} className="px-6">
                취소
              </Button>
            </div>
          )}
        </div>

        {/* Cards grid — 행 수 바뀔 때 높이 전환, 한 줄이면 하단 견적이 올라옴 */}
        <div
          className="mt-8 overflow-hidden transition-[height] duration-300 ease-out"
          style={cardsListHeight !== null ? { height: Math.min(cardsListHeight, 248) } : undefined}
        >
          <div className="max-h-[248px] overflow-y-auto overscroll-contain pr-2">
            <div
              ref={cardsListRef}
              className="grid auto-rows-[112px] gap-6 grid-cols-[repeat(auto-fill,minmax(min(100%,18.75rem),1fr))]"
            >
              {items.map((item) => (
              <QuoteCard
                key={item.id}
                item={item}
                mode="list"
                selectedForDelete={deleteMode && Boolean(deleteSelection[item.id])}
                rightTop={
                  <span className="rounded bg-[var(--brand-tertiary)] px-1.5 py-0.5 text-xs font-medium leading-5 text-[var(--brand-primary)]">
                    {item.agencyName}
                  </span>
                }
                onClick={() => {
                  if (deleteMode) {
                    toggleDeleteSelection(item.id);
                    return;
                  }
                  toggleSelectForCategory(item.id);
                }}
              />
            ))}
            </div>
          </div>
        </div>

        {/* 하단 견적 프레임 — 좌(카드 4슬롯):우(총 견적) = 6:5, QuoteCard h-28에 맞춰 높이 확보 */}
        <div className="mt-6 h-96 w-full rounded-xl bg-white outline outline-[0.6px] outline-offset-[-0.6px] outline-[color:var(--grey-700)] overflow-hidden">
          <div className="flex h-full w-full gap-6 p-6">
            {/* 좌측: 카드 영역 (6) — 2x2 고정, 행 높이 1fr로 박스 세로 크기 고정 */}
            <div className="grid h-full min-h-0 min-w-0 flex-[6] grid-cols-2 grid-rows-[1fr_1fr] gap-4">
              {[
                { key: "weddinghall" as const, label: "웨딩홀", item: selectedWeddingHall },
                { key: "studio" as const, label: "스튜디오", item: selectedStudio },
                { key: "dress" as const, label: "드레스", item: selectedDress },
                { key: "makeup" as const, label: "메이크업", item: selectedMakeup },
              ].map((slot) => (
                <div key={slot.key} className="flex min-h-0 min-w-0 flex-col gap-3 self-stretch">
                  <div className="flex h-7 shrink-0 items-center justify-between gap-2">
                    <span className="text-body-2 font-semibold capitalize text-[var(--black-default)]">
                      {slot.label}
                    </span>
                    {slot.item ? (
                      <button
                        type="button"
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded hover:opacity-80"
                        onClick={() => toggleSelectForCategory(slot.item!.id)}
                        aria-label={`${slot.label} 선택 해제`}
                      >
                        <span className="h-0 w-3.5 border-t-[2.5px] border-[color:var(--black-tertiary)]" />
                      </button>
                    ) : null}
                  </div>
                  {slot.item ? (
                    <div className="h-28 shrink-0 rounded-2xl overflow-hidden">
                      <QuoteCard
                        item={slot.item}
                        mode="selected"
                        rightTop={
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openOptionModal(slot.item!.id);
                            }}
                            className="rounded bg-white px-1.5 py-0.5 text-xs font-medium leading-5 text-[var(--black-secondary)] outline outline-[0.6px] outline-offset-[-0.6px] outline-[color:var(--black-tertiary)] opacity-80 hover:opacity-100"
                          >
                            옵션변경
                          </button>
                        }
                      />
                    </div>
                  ) : (
                    <div className="relative flex h-28 shrink-0 items-center justify-center gap-2 rounded-2xl overflow-hidden">
                      {/* Figma: outline 1px, outline-offset -1px, 점선·점 간격 넓게 (stroke-dasharray) */}
                      <svg
                        className="pointer-events-none absolute inset-0 size-full"
                        aria-hidden
                        preserveAspectRatio="none"
                        viewBox="0 0 320 96"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="319"
                          height="95"
                          rx="16"
                          ry="16"
                          fill="none"
                          stroke="var(--grey-600)"
                          strokeWidth="1"
                          strokeDasharray="7 7"
                        />
                      </svg>
                      <div className="flex flex-col items-center justify-center gap-1">
                        <Image
                          src="/assets/icons/line.svg"
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6"
                        />
                        <span className="text-body-3 text-[var(--grey-700)]">
                          업체를 선택해 보세요
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 우측: 총 견적 (5) — 가격 길이에 따라 좌우로만 부드럽게 늘어남/줄어듦 */}
            <div className="flex flex-[5] items-center justify-center">
              <div
                className="overflow-hidden transition-[width] duration-300 ease-out"
                style={totalBlockWidth !== null ? { width: totalBlockWidth } : undefined}
              >
                <div
                  ref={totalBlockRef}
                  className="flex w-min items-center gap-4"
                >
                  <div className="relative flex h-36 w-40 shrink-0 items-center justify-center">
                    <div className="absolute left-0 top-0 h-28 w-28 rounded-full bg-[var(--brand-secondary)] opacity-75" />
                    <div className="absolute right-0 top-8 h-12 w-12 rounded-full bg-[var(--brand-secondary)]" />
                    <Image
                      src="/assets/graphic/cart.svg"
                      alt=""
                      width={160}
                      height={144}
                      className="relative h-36 w-40 object-contain"
                    />
                  </div>
                  <div className="flex shrink-0 flex-col items-start gap-1">
                    <div className="text-2xl font-medium uppercase leading-9 text-[var(--black-secondary)]">
                      총 견적
                    </div>
                    <div className="whitespace-nowrap text-5xl font-semibold uppercase leading-[67.2px] text-[var(--brand-primary)]">
                      {formatWon(totalWon)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OptionChangeModal
        open={optionModal.open}
        item={modalItem}
        onClose={closeOptionModal}
        onConfirm={({ selectedBaseOptionId, selectedExtraOptionIds }) => {
          if (!optionModal.itemId) return;
          setItemOptions({ itemId: optionModal.itemId, selectedBaseOptionId, selectedExtraOptionIds });
          closeOptionModal();
        }}
      />

      <DeleteConfirmModal
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={() => {
          deleteSelected();
          setDeleteConfirmOpen(false);
        }}
      />
    </div>
  );
}


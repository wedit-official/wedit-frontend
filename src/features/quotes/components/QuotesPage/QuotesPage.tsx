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

  const modalItem = React.useMemo(() => {
    const id = optionModal.itemId;
    return id ? allItems.find((x) => x.id === id) ?? null : null;
  }, [allItems, optionModal.itemId]);

  return (
    <div className="w-full bg-[var(--gray-white)]">
      <div className="w-full px-[clamp(24px,5vw,96px)] pb-20">
        {/* Title */}
        <div className="flex flex-col items-center gap-5 pt-10">
          <div className="w-full">
            <h1 className="text-center text-head-1 text-[var(--black-default)]">
              00님이 선택한 업체의 견적을 알려드려요
            </h1>
          </div>
        </div>

        {/* Tabs + actions */}
        <div className="mt-12 flex items-center justify-between">
          <div className="inline-flex items-center gap-6">
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
              <Button size="sm" onClick={deleteSelected} className="px-6">
                삭제
              </Button>
              <Button size="sm" variant="outline" onClick={cancelDeleteMode} className="px-6">
                취소
              </Button>
            </div>
          )}
        </div>

        {/* Cards grid */}
        <div className="mt-8 h-[216px] overflow-y-auto overscroll-contain pr-2">
          <div className="grid grid-cols-4 auto-rows-[96px] gap-6">
            {items.map((item) => (
              <QuoteCard
                key={item.id}
                item={item}
                mode="list"
                showRadio={deleteMode}
                radioChecked={Boolean(deleteSelection[item.id])}
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

        {/* Summary frame — 좌측 2/3(약 67%), 우측 총 견적 1/3(약 33%) 비율 */}
        <div className="mt-12 rounded-xl bg-[var(--gray-white)] outline outline-[0.6px] outline-offset-[-0.6px] outline-[color:var(--gray-300)]">
          <div className="grid grid-cols-[6fr_4fr]">
            <div className="grid min-w-0 grid-cols-2 grid-rows-2">
              {[
                { label: "웨딩홀", item: selectedWeddingHall },
                { label: "스튜디오", item: selectedStudio },
                { label: "메이크업", item: selectedMakeup },
                { label: "드레스", item: selectedDress },
              ].map((slot, idx) => (
                <div
                  key={slot.label}
                  className={[
                    "min-h-[150px] p-6",
                    idx % 2 === 0 ? "border-r border-[color:var(--gray-300)]" : "",
                    idx < 2 ? "border-b border-[color:var(--gray-300)]" : "",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-head-5 text-[var(--black-default)] uppercase">{slot.label}</div>
                  </div>
                  {slot.item ? (
                    <div className="mt-4">
                      <QuoteCard
                        item={slot.item}
                        mode="selected"
                        rightTop={
                          <button
                            type="button"
                            onClick={() => openOptionModal(slot.item!.id)}
                            className="rounded bg-[var(--gray-white)] px-2 py-0.5 text-xs font-medium leading-5 text-[var(--black-default)] outline outline-[0.6px] outline-offset-[-0.6px] outline-[color:var(--black-tertiary)] opacity-80 hover:opacity-100"
                          >
                            옵션변경
                          </button>
                        }
                      />
                    </div>
                  ) : (
                    <div className="mt-6 h-20 w-full rounded-lg bg-[var(--gray-100)]" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center p-8">
              <div className="flex w-full items-center gap-8">
                <div className="relative h-40 w-44 shrink-0">
                  <Image
                    src="/assets/graphic/cart.svg"
                    alt=""
                    width={176}
                    height={160}
                    priority
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col items-start">
                  <div className="text-head-5 text-[var(--black-secondary)] uppercase">총 견적</div>
                  <div className="mt-2 whitespace-nowrap text-head-1 text-[var(--brand-primary)]">
                    {formatWon(totalWon)}
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
    </div>
  );
}


"use client";

import * as React from "react";

import { Button } from "@/components/ui";
import { type QuoteItem, getItemPriceWon, formatWon } from "@/features/quotes/model/quotes";

export function OptionChangeModal({
  item,
  open,
  onClose,
  onConfirm,
}: {
  item: QuoteItem | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (args: { selectedBaseOptionId: string; selectedExtraOptionIds: string[] }) => void;
}) {
  const [baseOpen, setBaseOpen] = React.useState(false);
  const [extraOpen, setExtraOpen] = React.useState(false);

  const [selectedBaseOptionId, setSelectedBaseOptionId] = React.useState<string>("");
  const [selectedExtraOptionIds, setSelectedExtraOptionIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!item) return;
    setSelectedBaseOptionId(item.selectedBaseOptionId);
    setSelectedExtraOptionIds(item.selectedExtraOptionIds);
    setBaseOpen(false);
    setExtraOpen(false);
  }, [item?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!open || !item) return null;

  const currentPriceWon = getItemPriceWon({
    ...item,
    selectedBaseOptionId,
    selectedExtraOptionIds,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="모달 닫기"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-[520px] rounded-xl bg-[var(--gray-white)] p-8 outline outline-1 -outline-offset-1 outline-[color:var(--gray-300)]">
        <div className="flex items-center justify-between">
          <h2 className="text-head-2 text-[var(--black-default)] uppercase">{item.vendorName}</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-[var(--gray-100)]"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {/* 기본 옵션 */}
          <div className="rounded-xl border border-[var(--gray-300)] p-5">
            <button
              type="button"
              className="flex w-full items-center justify-between"
              onClick={() => setBaseOpen((v) => !v)}
            >
              <div className="flex flex-col items-start gap-1">
                <div className="text-head-5 text-[var(--black-default)]">기본 옵션 선택</div>
                <div className="text-body-3 text-[var(--black-tertiary)]">
                  기본으로 진행할 옵션을 선택해 주세요.
                </div>
              </div>
              <div className="text-2xl leading-none">⌄</div>
            </button>

            {baseOpen ? (
              <div className="mt-4 flex flex-col gap-3">
                {item.baseOptions.map((opt) => (
                  <label key={opt.id} className="flex cursor-pointer items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="baseOption"
                        checked={selectedBaseOptionId === opt.id}
                        onChange={() => setSelectedBaseOptionId(opt.id)}
                      />
                      <span className="text-body-3 text-[var(--black-default)]">{opt.label}</span>
                    </span>
                    <span className="text-body-3 text-[var(--black-default)]">
                      {formatWon((opt.priceDeltaWon ?? 0) + item.basePriceWon)}
                    </span>
                  </label>
                ))}
              </div>
            ) : null}
          </div>

          {/* 선택 옵션 */}
          <div className="rounded-xl border border-[var(--gray-300)] p-5">
            <button
              type="button"
              className="flex w-full items-center justify-between"
              onClick={() => setExtraOpen((v) => !v)}
            >
              <div className="flex flex-col items-start gap-1">
                <div className="text-head-5 text-[var(--black-default)]">선택 옵션 선택</div>
                <div className="text-body-3 text-[var(--black-tertiary)]">
                  추가로 진행할 옵션을 선택해 주세요.
                </div>
              </div>
              <div className="text-2xl leading-none">⌄</div>
            </button>

            {extraOpen ? (
              <div className="mt-4 max-h-72 overflow-auto rounded-xl border border-[var(--gray-300)] p-4">
                <div className="flex flex-col gap-4">
                  {item.extraOptions.map((opt) => {
                    const checked = selectedExtraOptionIds.includes(opt.id);
                    return (
                      <label key={opt.id} className="flex cursor-pointer items-center justify-between gap-4">
                        <span className="inline-flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              setSelectedExtraOptionIds((prev) =>
                                checked ? prev.filter((x) => x !== opt.id) : [...prev, opt.id],
                              )
                            }
                          />
                          <span className="text-body-3 text-[var(--black-default)]">{opt.label}</span>
                        </span>
                        <span className="text-body-3 text-[var(--black-default)]">
                          {formatWon(opt.priceDeltaWon ?? 0)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-7 flex justify-center">
          <Button
            type="button"
            size="mid"
            className="w-full max-w-[360px]"
            onClick={() => onConfirm({ selectedBaseOptionId, selectedExtraOptionIds })}
          >
            {formatWon(currentPriceWon)} | 변경할까요?
          </Button>
        </div>
      </div>
    </div>
  );
}


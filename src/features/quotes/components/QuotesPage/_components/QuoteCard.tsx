"use client";

import * as React from "react";

import { type QuoteItem, formatManwon, getItemPriceWon, getItemSummaryLines } from "@/features/quotes/model/quotes";

export type QuoteCardMode = "list" | "selected";

export function QuoteCard({
  item,
  mode,
  rightTop,
  onClick,
  selectedForDelete,
}: {
  item: QuoteItem;
  mode: QuoteCardMode;
  rightTop: React.ReactNode;
  onClick?: () => void;
  /** 삭제 모드에서 이 카드가 삭제 대상으로 선택된 경우 테두리/채움 강조 */
  selectedForDelete?: boolean;
}) {
  const lines = getItemSummaryLines(item);
  const priceWon = getItemPriceWon(item);

  const baseClassName = [
    "relative min-w-[18.75rem] w-full rounded-lg px-1.5 py-1 text-left",
    mode === "selected" ? "cursor-default" : "",
    selectedForDelete
      ? "outline outline-[1px] outline-offset-[-1px] outline-[var(--coral-400)] bg-[var(--pink-200)]"
      : "",
  ].join(" ");

  const content = (
    <>
      <div className="flex w-full items-center gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[var(--gray-200)]">
          {item.imageSrc ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={item.imageSrc}
              alt=""
              width={96}
              height={96}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 text-body-2 text-[var(--black-default)] uppercase truncate">
              {item.vendorName}
            </div>
            {rightTop}
          </div>

          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0 text-body-3 text-[var(--black-secondary)]">
              {lines.map((l) => (
                <div key={l} className="truncate">
                  {l}
                </div>
              ))}
            </div>
            <div className="shrink-0 text-right text-body-2 text-[var(--black-default)]">
              {formatManwon(priceWon)}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return mode === "selected" ? (
    <div className={baseClassName}>{content}</div>
  ) : (
    <button type="button" onClick={onClick} className={baseClassName}>
      {content}
    </button>
  );
}


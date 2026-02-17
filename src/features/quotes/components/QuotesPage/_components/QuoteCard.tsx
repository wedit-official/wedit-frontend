"use client";

import * as React from "react";

import { type QuoteItem, formatManwon, getItemPriceWon, getItemSummaryLines } from "@/features/quotes/model/quotes";

export type QuoteCardMode = "list" | "selected";

export function QuoteCard({
  item,
  mode,
  rightTop,
  onClick,
  showRadio,
  radioChecked,
}: {
  item: QuoteItem;
  mode: QuoteCardMode;
  rightTop: React.ReactNode;
  onClick?: () => void;
  showRadio?: boolean;
  radioChecked?: boolean;
}) {
  const lines = getItemSummaryLines(item);
  const priceWon = getItemPriceWon(item);

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative h-24 w-80 rounded px-1.5 py-1 text-left",
        mode === "selected" ? "cursor-default" : "hover:bg-[var(--gray-100)]",
      ].join(" ")}
    >
      {showRadio ? (
        <span
          aria-hidden
          className={[
            "absolute left-2 top-2 inline-flex h-4 w-4 items-center justify-center rounded-full border bg-[var(--gray-white)]",
            radioChecked ? "border-[var(--brand-primary)]" : "border-[var(--gray-300)]",
          ].join(" ")}
        >
          {radioChecked ? (
            <span className="h-2 w-2 rounded-full bg-[var(--brand-primary)]" />
          ) : null}
        </span>
      ) : null}

      <div className="flex w-full items-center gap-4">
        <div className="h-20 w-20 overflow-hidden rounded-lg bg-[var(--gray-200)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {item.imageSrc ? (
            <img src={item.imageSrc} alt="" className="h-full w-full object-cover" />
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
    </button>
  );
}


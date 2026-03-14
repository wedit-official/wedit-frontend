"use client";

import { Button } from "@/components/atoms/Button/Button";
import { useCounterStore } from "@/store/counterStore";

export function Counter() {
  const count = useCounterStore((s) => s.count);
  const inc = useCounterStore((s) => s.inc);
  const dec = useCounterStore((s) => s.dec);
  const reset = useCounterStore((s) => s.reset);

  return (
    <section className="shadow-soft flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Zustand demo
          </p>
          <p className="text-3xl font-bold tabular-nums">{count}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={dec} variant="outline">
            -1
          </Button>
          <Button size="sm" onClick={inc}>
            +1
          </Button>
          <Button size="sm" onClick={reset} variant="outline">
            Reset
          </Button>
        </div>
      </div>
    </section>
  );
}

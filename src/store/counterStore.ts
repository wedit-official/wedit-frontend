import { create } from "zustand";

type CounterState = {
  count: number;
  inc: () => void;
  dec: () => void;
  reset: () => void;
};

/**
 * Zustand 스토어는 클라이언트에서 구독해서 사용하세요.
 * (스토어 훅을 사용하는 컴포넌트는 반드시 'use client')
 */
export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
  dec: () => set((s) => ({ count: Math.max(0, s.count - 1) })),
  reset: () => set({ count: 0 }),
}));

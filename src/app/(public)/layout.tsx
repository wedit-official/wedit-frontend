import type { ReactNode } from "react";

import { PublicHeader } from "@/components/shared/layouts/PublicHeader";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-[var(--background)]">
      <PublicHeader />
      <div className="flex-1">{children}</div>
    </div>
  );
}


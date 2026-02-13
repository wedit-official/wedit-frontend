import type { ReactNode } from "react";

import { PublicFooter } from "@/components/shared/layouts/PublicFooter";
import { PublicHeader } from "@/components/shared/layouts/PublicHeader";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <PublicHeader />
      <div className="flex-1">{children}</div>
      <PublicFooter />
    </div>
  );
}


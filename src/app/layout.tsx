import type { ReactNode } from "react";
import { FontLoader } from "@/components/FontLoader";
import { PublicFooter } from "@/components/shared/layouts/PublicFooter";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased flex min-h-screen flex-col">
        <FontLoader />
        <main className="flex-1 flex flex-col">{children}</main>
        <div className="shrink-0">
          <PublicFooter />
        </div>
      </body>
    </html>
  );
}

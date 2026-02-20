import type { ReactNode } from "react";
import { FontLoader } from "@/components/FontLoader";
import "./globals.css";
import { PublicFooter } from "@/components/shared/layouts/PublicFooter";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <FontLoader />
        <div className="flex flex-col min-h-screen">
          <main className="flex-1">{children}</main>
          <PublicFooter />
        </div>
      </body>
    </html>
  );
}

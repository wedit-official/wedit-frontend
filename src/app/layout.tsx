import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/organisms";
import { FontLoader } from "@/components/FontLoader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wedit",
  description: "결혼 업체 중개 서비스 플랫폼",
};

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
          <Footer />
        </div>
      </body>
    </html>
  );
}

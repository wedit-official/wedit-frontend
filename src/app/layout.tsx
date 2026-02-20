import type { ReactNode } from "react";
import { FontLoader } from "@/components/FontLoader";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <FontLoader />
        {children}
      </body>
    </html>
  );
}

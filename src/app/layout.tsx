import type { Metadata } from "next";
import { formular } from "./fonts";
import "./styles/globals.scss";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "a designer portfolio page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={formular.className}>{children}</body>
    </html>
  );
}

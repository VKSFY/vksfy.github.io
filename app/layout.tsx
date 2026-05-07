import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "hey, i'm oscar",
  description:
    "brooklyn-based, self-taught, mostly into backend. python and typescript. come look around.",
  openGraph: {
    title: "hey, i'm oscar",
    description:
      "brooklyn-based, self-taught, mostly into backend. python and typescript.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans antialiased noise relative">
        <div className="fixed inset-0 grid-bg pointer-events-none opacity-50 z-0" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}

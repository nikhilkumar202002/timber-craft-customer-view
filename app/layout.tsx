import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "./components/layout/AnnouncementBar";
import Header from "./components/layout/Header";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Timber Craft",
  description: "Handcrafted Artisanal Timber & Custom Furniture",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-neutral-900">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

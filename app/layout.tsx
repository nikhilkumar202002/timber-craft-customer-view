import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "./components/layout/AnnouncementBar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TimberCraft - Handcrafted Artisanal Woodwork & Sculptures",
  description: "Handcrafted bespoke wooden idols, trophies, wall hangings, and heirloom decor.",
  icons: {
    icon: [
      { url: "/logo/main-logo-white.png" },
      { url: "/logo/main-logo-white.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/main-logo-white.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/logo/main-logo-white.png",
    apple: "/logo/main-logo-white.png",
  },
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
        <Footer />
      </body>
    </html>
  );
}

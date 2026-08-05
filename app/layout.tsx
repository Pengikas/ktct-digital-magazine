import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SiteBackground } from "@/components/SiteBackground";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

/** Serif hỗ trợ đủ dấu tiếng Việt (Playfair italic hay thiếu glyph khi in/PDF) */
const sourceSerif = Source_Serif_4({
  subsets: ["latin", "vietnamese"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KTCT Magazine | Tiền Nhiều Để Làm Gì? — SS008.Q31 Chương 3",
  description: "Đồ án SS008.Q31 Kinh tế Chính trị Mác - Lênin: trả lời 'Tiền nhiều để làm gì?' qua tích lũy tư bản và hình thức biểu hiện giá trị thặng dư, kèm số liệu và trắc nghiệm.",
  keywords: [
    "Kinh tế Chính trị Mác - Lênin",
    "Tiền nhiều để làm gì",
    "Tích lũy tư bản",
    "Giá trị thặng dư",
    "Lợi nhuận bình quân",
    "SS008.Q31",
    "UIT 2026",
    "KTCT Magazine"
  ],
  authors: [{ name: "Nhóm Đồ án KTCT - UIT" }],
  openGraph: {
    title: "KTCT Magazine | Tiền Nhiều Để Làm Gì?",
    description: "SS008.Q31 Chương 3: tích lũy tư bản, hình thức biểu hiện GTTD và câu trả lời KTCT.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="relative bg-background text-foreground min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
        <ThemeProvider>
          <SiteBackground />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

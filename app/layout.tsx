import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KTCT Magazine | Tiền Nhiều Để Làm Gì? - Tạp Chí Số Kinh Tế Chính Trị Mác - Lênin",
  description: "Khám phá bản chất, nguồn gốc và 5 chức năng của tiền tệ qua lăng kính Kinh tế Chính trị Mác - Lênin. Đồ án Digital Magazine hiện đại đầy đủ 100% nội dung học thuật, bộ số liệu thực tiễn và 30 câu trắc nghiệm.",
  keywords: [
    "Kinh tế Chính trị Mác - Lênin",
    "Tiền nhiều để làm gì",
    "Chức năng tiền tệ",
    "Nguồn gốc tiền tệ",
    "Hình thái giá trị",
    "Giá trị thặng dư",
    "Sùng bái tiền tệ",
    "UIT 2026",
    "KTCT Magazine"
  ],
  authors: [{ name: "Nhóm Đồ án KTCT - UIT" }],
  openGraph: {
    title: "KTCT Magazine | Tiền Nhiều Để Làm Gì?",
    description: "Tạp chí số tương tác Kinh tế Chính trị Mác - Lênin đầy đủ 100% nội dung học thuật và 30 câu hỏi trắc nghiệm.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange={false}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

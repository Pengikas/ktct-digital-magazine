"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, ArrowUp, Shield, Landmark } from "lucide-react";
import { NAV_ITEMS } from "@/lib/navigation";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contentLinks = NAV_ITEMS.filter((i) => i.href !== "/quiz" && i.href !== "/qa");
  const interactiveLinks = NAV_ITEMS.filter(
    (i) => i.href === "/knowledge-map" || i.href === "/qa" || i.href === "/quiz"
  );

  return (
    <footer className="relative bg-[hsl(var(--background))] text-muted-foreground pt-16 pb-12 border-t-2 border-[hsl(var(--marx-crimson)/0.35)] overflow-hidden">
      <div className="masthead-bar absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-marx">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#9b1b1b] via-[#b45309] to-[#c4a35a] flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-serif text-foreground tracking-tight">
                KTCT Digital Magazine
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Đồ án SS008.Q31 - Kinh tế Chính trị Mác - Lênin: trả lời &quot;Tiền nhiều để làm gì?&quot; qua
              Chương 3 (Tích lũy tư bản &amp; Hình thức biểu hiện giá trị thặng dư), kết hợp
              số liệu thực tiễn và minh họa đại chúng.
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <span className="px-3 py-1 rounded-sm text-xs font-semibold bg-[hsl(var(--muted))] text-gold border border-[hsl(var(--marx-gold)/0.4)] flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5" /> UIT 2026
              </span>
              <span className="px-3 py-1 rounded-sm text-xs font-semibold bg-[hsl(var(--marx-surface-raised))] text-muted-foreground border border-marx flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-crimson" /> Academic Production
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-4 font-sans">
              Danh mục Nội dung
            </h4>
            <ul className="space-y-2 text-xs">
              {contentLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors duration-200">
                    {item.label}

                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-4 font-sans">
              Trải nghiệm Tương tác
            </h4>
            <ul className="space-y-2 text-xs">
              {interactiveLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors duration-200">
                    {item.label}
                    {item.badge ? ` (${item.badge})` : ""}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#team" className="hover:text-white transition-colors duration-200">
                  Đội ngũ (Trang chủ)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            © 2026 KTCT Magazine. Đồ án Kinh tế Chính trị Mác - Lênin — Sinh viên UIT.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-sm bg-[hsl(var(--marx-surface-raised))] hover:bg-[hsl(var(--muted))] text-foreground border border-marx hover:border-[hsl(var(--marx-gold))] transition-colors"
          >
            <span>Về đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5 text-gold" />
          </button>
        </div>
      </div>
    </footer>
  );
}
git
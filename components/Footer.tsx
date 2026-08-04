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
    <footer className="relative bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-amber-500 to-yellow-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-serif text-white tracking-tight">
                KTCT Digital Magazine
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Đồ án CQ5 môn Kinh tế Chính trị Mác - Lênin: trả lời &quot;Tiền nhiều để làm gì?&quot; qua
              Chương 3 (3.2 Tích lũy tư bản &amp; 3.3 Hình thức biểu hiện giá trị thặng dư), kết hợp
              số liệu thực tiễn và minh họa đại chúng.
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-800 flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5" /> UIT 2026
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Academic Production
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4 font-sans">
              Danh mục Nội dung
            </h4>
            <ul className="space-y-2 text-xs">
              {contentLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-amber-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4 font-sans">
              Trải nghiệm Tương tác
            </h4>
            <ul className="space-y-2 text-xs">
              {interactiveLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-amber-400 transition-colors">
                    {item.label}
                    {item.badge ? ` (${item.badge})` : ""}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#team" className="hover:text-amber-400 transition-colors">
                  Đội ngũ (Trang chủ)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            © 2026 KTCT Magazine. Đồ án Kinh tế Chính trị Mác - Lênin — Sinh viên UIT.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-amber-500 transition-colors"
          >
            <span>Về đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}

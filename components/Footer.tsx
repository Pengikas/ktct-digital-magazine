"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, Heart, ArrowUp, Sparkles, Shield, Landmark } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
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
              Dự án Đồ án môn học Kinh tế Chính trị Mác - Lênin. Khám phá bản chất, nguồn gốc và 5 chức năng cốt lõi của tiền tệ, phân tích sắc bén câu hỏi trung tâm &quot;Tiền nhiều để làm gì?&quot; kết hợp số liệu thực tiễn và nghệ thuật đại chúng.
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

          {/* Quick Links Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4 font-sans">
              Danh mục Nội dung
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  Giới thiệu & Lịch sử Tiền tệ
                </Link>
              </li>
              <li>
                <Link href="/theory" className="hover:text-amber-400 transition-colors">
                  Lý thuyết Chương 3 & 14 Khái niệm
                </Link>
              </li>
              <li>
                <Link href="/analysis" className="hover:text-amber-400 transition-colors">
                  Phân tích &quot;Tiền nhiều để làm gì?&quot;
                </Link>
              </li>
              <li>
                <Link href="/practical-examples" className="hover:text-amber-400 transition-colors">
                  Case Studies (Bill Gates, Notch, Rap)
                </Link>
              </li>
              <li>
                <Link href="/statistics" className="hover:text-amber-400 transition-colors">
                  Bộ số liệu GDP & Chỉ số Hạnh phúc
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools & Interactive Col */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-4 font-sans">
              Trải nghiệm Tương tác
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/knowledge-map" className="hover:text-amber-400 transition-colors">
                  Sơ đồ Tư duy (Knowledge Mind Map)
                </Link>
              </li>
              <li>
                <Link href="/qa" className="hover:text-amber-400 transition-colors">
                  Hệ thống Câu hỏi & Phản biện
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-amber-400 transition-colors">
                  Bộ Trắc nghiệm 30 Câu hỏi
                </Link>
              </li>
              <li>
                <Link href="/game" className="hover:text-amber-400 transition-colors">
                  Game tương tác <span className="text-[10px] text-slate-500">(Coming Soon)</span>
                </Link>
              </li>
              <li>
                <Link href="/magazine" className="hover:text-amber-400 transition-colors">
                  Tạp Chí số <span className="text-[10px] text-slate-500">(Coming Soon)</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
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

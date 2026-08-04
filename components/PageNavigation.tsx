"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_ORDER = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/nen-tang", label: "Nền tảng" },
  { href: "/theory", label: "Lý thuyết" },
  { href: "/analysis", label: "Phân tích" },
  { href: "/statistics", label: "Số liệu" },
  { href: "/practical-examples", label: "Thực tiễn" },
  { href: "/knowledge-map", label: "Sơ đồ" },
  { href: "/qa", label: "Hỏi đáp" },
  { href: "/quiz", label: "Trắc nghiệm" },
  { href: "/game", label: "Game" },
  { href: "/magazine", label: "Tạp Chí" },
];

export function PageNavigation() {
  const pathname = usePathname();
  const currentIndex = PAGE_ORDER.findIndex((p) => p.href === pathname);

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? PAGE_ORDER[currentIndex - 1] : null;
  const next = currentIndex < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentIndex + 1] : null;

  return (
    <nav className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-stretch gap-4">
        {/* Previous Page */}
        {prev ? (
          <Link
            href={prev.href}
            className="group flex-1 flex items-center gap-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/5 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors shrink-0">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500">
                Trang trước
              </span>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mt-0.5">
                {prev.label}
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {/* Next Page */}
        {next ? (
          <Link
            href={next.href}
            className="group flex-1 flex items-center justify-end gap-4 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:border-red-400 dark:hover:border-red-500 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300"
          >
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500">
                Trang tiếp theo
              </span>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors mt-0.5">
                {next.label}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
              <ChevronRight className="w-5 h-5" />
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  );
}

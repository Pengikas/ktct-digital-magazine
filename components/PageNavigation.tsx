"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PAGE_ORDER } from "@/lib/navigation";

export function PageNavigation() {
  const pathname = usePathname();
  const currentIndex = PAGE_ORDER.findIndex((p) => p.href === pathname);

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? PAGE_ORDER[currentIndex - 1] : null;
  const next = currentIndex < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentIndex + 1] : null;

  return (
    <nav className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-label="Điều hướng trang">
      <div className="flex items-stretch gap-4">
        {prev ? (
          <Link
            href={prev.href}
            className="group flex-1 flex items-center gap-4 p-6 rounded-sm border border-marx bg-marx-raised/80 backdrop-blur-sm hover:border-[hsl(var(--marx-gold))] transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-sm bg-[hsl(var(--muted))] flex items-center justify-center group-hover:bg-[hsl(var(--marx-gold))] group-hover:text-[hsl(20_30%_10%)] transition-colors shrink-0 border border-marx">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-muted-foreground">
                Trang trước
              </span>
              <p className="text-sm font-bold text-foreground group-hover:text-[hsl(var(--marx-gold))] transition-colors mt-0.5">
                {prev.label}
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {next ? (
          <Link
            href={next.href}
            className="group flex-1 flex items-center justify-end gap-4 p-6 rounded-sm border border-marx bg-marx-raised/80 backdrop-blur-sm hover:border-[hsl(var(--marx-crimson)/0.55)] transition-all duration-300"
          >
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-muted-foreground">
                Trang tiếp theo
              </span>
              <p className="text-sm font-bold text-foreground group-hover:text-[hsl(var(--marx-crimson))] dark:group-hover:text-[hsl(var(--marx-gold))] transition-colors mt-0.5">
                {next.label}
              </p>
            </div>
            <div className="w-10 h-10 rounded-sm bg-[hsl(var(--muted))] flex items-center justify-center group-hover:bg-[#9b1b1b] group-hover:text-[#f4ebe0] transition-colors shrink-0 border border-marx">
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

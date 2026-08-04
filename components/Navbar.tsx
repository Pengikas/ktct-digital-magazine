"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { SearchModal } from "./SearchModal";
import { Search, Menu, X, BookOpen } from "lucide-react";
import { NAV_ITEMS, resolveSearchRoute } from "@/lib/navigation";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleSearchSelect = (targetId: string) => {
    router.push(resolveSearchRoute(targetId));
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div
          className="h-1 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Brand row */}
        <div className="w-full px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 via-amber-500 to-yellow-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold font-serif tracking-tight text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors">
                KTCT Magazine
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                CQ5 · UIT 2026
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2.5 min-w-[11rem] sm:min-w-[14rem] md:min-w-[16rem] px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 text-sm transition-colors"
              title="Tìm kiếm"
            >
              <Search className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="truncate text-left">Tìm kiếm...</span>
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Full-width tab bar (desktop) */}
        <nav
          className="hidden lg:grid w-full border-t border-slate-200/80 dark:border-slate-800/80 px-2 sm:px-4"
          style={{ gridTemplateColumns: `repeat(${NAV_ITEMS.length}, minmax(0, 1fr))` }}
          aria-label="Điều hướng chính"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center justify-center gap-1.5 px-1 py-3 text-xs xl:text-sm font-semibold tracking-wide transition-colors border-b-2 ${
                  active
                    ? "text-red-600 dark:text-amber-400 border-amber-500 bg-red-50/60 dark:bg-amber-950/25"
                    : "text-slate-600 dark:text-slate-300 border-transparent hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-900/50"
                }`}
              >
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className="shrink-0 px-1.5 py-0.5 text-[9px] rounded-full bg-red-600 text-white font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-slate-950/95 border-t border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                      active
                        ? "bg-red-600 text-white"
                        : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 text-[9px] rounded font-bold ${
                          active ? "bg-white/20 text-white" : "bg-amber-400 text-slate-900"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSearchSelect}
      />
    </>
  );
}

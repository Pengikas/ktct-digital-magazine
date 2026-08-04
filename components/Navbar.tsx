"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { SearchModal } from "./SearchModal";
import { Search, Menu, X, BookOpen, Sparkles } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Lý thuyết", href: "/theory" },
  { label: "Phân tích", href: "/analysis" },
  { label: "Số liệu", href: "/statistics" },
  { label: "Thực tiễn", href: "/practical-examples" },
  { label: "Sơ đồ", href: "/knowledge-map" },
  { label: "Hỏi đáp", href: "/qa" },
  { label: "Trắc nghiệm", href: "/quiz", badge: "30 Câu" },
  { label: "Game", href: "/game", badge: "Mới" },
  { label: "Tạp Chí", href: "/magazine", badge: "Mới" },
];

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchSelect = (targetId: string) => {
    let targetPath = "/";
    if (targetId.startsWith("concept-")) {
      targetPath = `/theory#${targetId}`;
    } else if (targetId === "money-functions") {
      targetPath = "/theory#money-functions";
    } else if (targetId.startsWith("analysis-")) {
      targetPath = `/analysis#${targetId}`;
    } else if (targetId.startsWith("practical-")) {
      targetPath = `/practical-examples#${targetId}`;
    } else if (targetId === "qa-section") {
      targetPath = "/qa";
    } else if (targetId === "team-section") {
      targetPath = "/";
    }

    router.push(targetPath);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-amber-500 to-yellow-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold font-serif tracking-tight text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors">
                KTCT Magazine
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                UIT 2026
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "text-red-600 dark:text-amber-400 bg-red-50 dark:bg-amber-950/40"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.5 text-[9px] rounded-full bg-red-600 text-white font-bold">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Utilities (Search, Dark Mode, Mobile Menu) */}
          <div className="flex items-center space-x-2">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs transition-colors"
              title="Tìm kiếm (Ctrl + K)"
            >
              <Search className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline-block">Tìm kiếm...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-5 duration-200">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-red-600 text-white"
                        : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] rounded bg-amber-400 text-slate-900 font-bold">
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

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSearchSelect}
      />
    </>
  );
}

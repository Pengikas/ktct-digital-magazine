"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { SearchModal } from "./SearchModal";
import {
  Search,
  Menu,
  X,
  BookOpen,
  Home,
  BarChart3,
  Award,
  TrendingUp,
  Network,
  HelpCircle,
  ClipboardList,
  Info,
  Gamepad2,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import { NAV_ITEMS, resolveSearchRoute, type NavItem } from "@/lib/navigation";

const NAV_ICONS: Record<NavItem["icon"], LucideIcon> = {
  home: Home,
  info: Info,
  book: BookOpen,
  chart: BarChart3,
  award: Award,
  trending: TrendingUp,
  network: Network,
  help: HelpCircle,
  quiz: ClipboardList,
  game: Gamepad2,
  magazine: Newspaper,
};

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
    if (href === "/nen-tang") {
      return pathname === "/nen-tang" || pathname === "/theory" || pathname.startsWith("/nen-tang/");
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleSearchSelect = (targetId: string) => {
    router.push(resolveSearchRoute(targetId));
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[hsl(var(--marx-surface-raised)/0.92)] backdrop-blur-md border-b border-marx transition-colors">
        <div className="masthead-bar transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />

        <div className="w-full px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center space-x-3 group shrink-0">
            <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-[#9b1b1b] via-[#b45309] to-[#c4a35a] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-bold font-serif tracking-tight text-foreground group-hover:text-[hsl(var(--marx-crimson))] dark:group-hover:text-[hsl(var(--marx-gold))] transition-colors">
                KTCT Magazine
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm bg-[hsl(var(--muted))] text-gold border border-[hsl(var(--marx-gold)/0.45)]">
                SS008.Q31 · UIT 2026
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2.5 min-w-[11rem] sm:min-w-[14rem] md:min-w-[16rem] px-4 py-2 rounded-sm bg-[hsl(var(--muted))] text-muted-foreground hover:bg-[hsl(var(--border))] text-sm transition-colors border border-marx"
              title="Tìm kiếm"
            >
              <Search className="w-4 h-4 text-gold shrink-0" />
              <span className="truncate text-left">Tìm kiếm...</span>
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-sm text-foreground hover:bg-[hsl(var(--muted))] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <nav
          className="hidden lg:grid w-full border-t border-marx px-2 sm:px-4"
          style={{ gridTemplateColumns: `repeat(${NAV_ITEMS.length}, minmax(0, 1fr))` }}
          aria-label="Điều hướng chính"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            const Icon = NAV_ICONS[item.icon];
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center justify-center gap-1.5 px-1 py-3 text-xs xl:text-sm font-semibold tracking-wide transition-colors border-b-2 ${
                  active
                    ? "nav-tab-active"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:bg-[hsl(var(--muted)/0.5)]"
                }`}
              >
                <Icon className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 opacity-90" aria-hidden />
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className="shrink-0 px-1.5 py-0.5 text-[9px] rounded-sm bg-[#9b1b1b] text-[#f4ebe0] font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[hsl(var(--marx-surface-raised))] border-t border-marx px-4 pt-2 pb-6 space-y-2">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                const Icon = NAV_ICONS[item.icon];
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-sm text-xs font-semibold transition-colors border ${
                      active
                        ? "nav-tab-active border-[hsl(var(--marx-gold))]"
                        : "bg-[hsl(var(--muted))] text-foreground border-transparent hover:bg-[hsl(var(--border))]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden />
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 text-[9px] rounded-sm font-bold ${
                          active
                            ? "bg-[hsl(var(--marx-gold)/0.25)] text-[hsl(var(--marx-gold))]"
                            : "bg-[hsl(var(--marx-gold))] text-[hsl(20_30%_10%)]"
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

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  icon:
    | "home"
    | "info"
    | "book"
    | "chart"
    | "award"
    | "trending"
    | "network"
    | "help"
    | "quiz"
    | "game"
    | "magazine";
}

/**
 * Thứ tự chuẩn toàn site — tab bar + PageNavigation dùng chung.
 * Gộp: Lý thuyết ≡ Nền tảng (/nen-tang). /theory redirect → /nen-tang.
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "Trang chủ", href: "/", icon: "home" },
  { label: "Giới thiệu", href: "/about", icon: "info" },
  { label: "Nền tảng", href: "/nen-tang", icon: "book" },
  { label: "Phân tích", href: "/analysis", icon: "chart" },
  { label: "Thực tiễn", href: "/practical-examples", icon: "award" },
  { label: "Số liệu", href: "/statistics", icon: "trending" },
  { label: "Sơ đồ", href: "/knowledge-map", icon: "network" },
  { label: "Hỏi đáp", href: "/qa", icon: "help" },
  { label: "Trắc nghiệm", href: "/quiz", badge: "30", icon: "quiz" },
  { label: "Game", href: "/game", badge: "Soon", icon: "game" },
  { label: "Tạp chí", href: "/magazine", badge: "Soon", icon: "magazine" },
];

/** Alias cho điều hướng prev/next — cùng thứ tự tab bar */
export const PAGE_ORDER = NAV_ITEMS.map(({ href, label }) => ({ href, label }));

/** Map search / legacy section ids → app routes */
export const SEARCH_ROUTE_MAP: Record<string, string> = {
  hero: "/",
  about: "/about",
  team: "/",
  "team-section": "/",
  theory: "/nen-tang",
  "nen-tang": "/nen-tang",
  "money-functions": "/nen-tang",
  "value-forms": "/nen-tang",
  analysis: "/analysis",
  practical: "/practical-examples",
  statistics: "/statistics",
  "knowledge-map": "/knowledge-map",
  qa: "/qa",
  "qa-section": "/qa",
  quiz: "/quiz",
  game: "/game",
  magazine: "/magazine",
};

export function resolveSearchRoute(targetId: string): string {
  if (targetId.startsWith("concept-") || targetId.startsWith("func-") || targetId.startsWith("form-")) {
    return "/nen-tang";
  }
  if (targetId.startsWith("analysis-")) {
    return "/analysis";
  }
  if (targetId.startsWith("practical-")) {
    return "/practical-examples";
  }
  if (SEARCH_ROUTE_MAP[targetId]) {
    return SEARCH_ROUTE_MAP[targetId];
  }
  return "/";
}

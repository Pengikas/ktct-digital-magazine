export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

/** Primary tab bar — full-width route navigation */
export const NAV_ITEMS: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Nền tảng", href: "/nen-tang" },
  { label: "Phân tích", href: "/analysis" },
  { label: "Thực tiễn", href: "/practical-examples" },
  { label: "Số liệu", href: "/statistics" },
  { label: "Sơ đồ", href: "/knowledge-map" },
  { label: "Hỏi đáp", href: "/qa" },
  { label: "Trắc nghiệm", href: "/quiz", badge: "30" },
];

/** Map search / legacy section ids → app routes */
export const SEARCH_ROUTE_MAP: Record<string, string> = {
  hero: "/",
  about: "/",
  team: "/",
  "team-section": "/",
  theory: "/nen-tang",
  "money-functions": "/nen-tang",
  "value-forms": "/nen-tang",
  analysis: "/analysis",
  practical: "/practical-examples",
  statistics: "/statistics",
  "knowledge-map": "/knowledge-map",
  qa: "/qa",
  "qa-section": "/qa",
  quiz: "/quiz",
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

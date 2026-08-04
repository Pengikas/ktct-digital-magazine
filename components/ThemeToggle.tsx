"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-slate-200/50 dark:bg-slate-800/50 animate-pulse" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
      aria-label="Chuyển đổi giao diện sáng/tối"
      title="Chuyển đổi chế độ Sáng / Tối"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 transition-transform duration-300 rotate-0 hover:rotate-90 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-300 rotate-0 hover:-rotate-12 text-slate-700" />
      )}
    </button>
  );
}

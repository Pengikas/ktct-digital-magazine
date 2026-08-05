"use client";

import { useId } from "react";
import type { LucideIcon } from "lucide-react";

/** Dải dây leo / họa tiết giữa các ô nội dung — lấp khoảng trống */
export function ContentGapDecor({
  icon: Icon,
  label,
}: {
  icon?: LucideIcon;
  label?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const g = `gap-vine-${uid}`;

  return (
    <div
      className="flex items-center gap-1.5 py-0.5 shrink-0 select-none"
      aria-hidden
    >
      <svg
        className="flex-1 h-3 min-w-0 opacity-70"
        viewBox="0 0 120 12"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id={`${g}-l`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4a017" stopOpacity="0" />
            <stop offset="100%" stopColor="#d4a017" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <path
          d="M2 8 C20 2, 40 10, 58 5 C70 2, 85 9, 118 6"
          stroke={`url(#${g}-l)`}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <circle cx="30" cy="5" r="1.4" fill="#b8860b" opacity="0.55" />
        <circle cx="72" cy="4" r="1.2" fill="#d4a017" opacity="0.5" />
      </svg>

      <div className="shrink-0 flex items-center gap-1 px-1.5">
        {Icon && (
          <Icon className="w-3.5 h-3.5 text-[#b8860b]/80" strokeWidth={1.5} />
        )}
        {label ? (
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#b8860b]/75">
            {label}
          </span>
        ) : (
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" className="opacity-80">
            <path
              d="M2 7 C5 3, 8 11, 11 6 C13 3, 15 8, 16 7"
              stroke="#d4a017"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <ellipse cx="9" cy="6.5" rx="2.2" ry="1.1" transform="rotate(-20 9 6.5)" fill="#d4a017" opacity="0.45" />
          </svg>
        )}
      </div>

      <svg
        className="flex-1 h-3 min-w-0 opacity-70"
        viewBox="0 0 120 12"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id={`${g}-r`} x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#d4a017" stopOpacity="0" />
            <stop offset="100%" stopColor="#d4a017" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <path
          d="M2 6 C28 10, 45 2, 62 7 C80 12, 100 3, 118 8"
          stroke={`url(#${g}-r)`}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <circle cx="48" cy="6" r="1.3" fill="#9b1b1b" opacity="0.35" />
        <circle cx="90" cy="5" r="1.2" fill="#b8860b" opacity="0.5" />
      </svg>
    </div>
  );
}

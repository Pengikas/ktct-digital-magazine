"use client";

import { useId } from "react";

/** Dây leo dát vàng — bay nhẹ ở góc trang nội dung */
export function GoldVinesDecor({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const g = `vine-gold-${uid}`;

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${className}`}
      aria-hidden
    >
      {/* Góc trên-trái */}
      <svg
        className="mag-vine mag-vine--tl absolute -top-2 -left-3 w-[42%] max-w-[190px] h-auto opacity-[0.42]"
        viewBox="0 0 180 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${g}-a`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0d78c" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#d4a017" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#b8860b" stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <path
          d="M8 12 C28 18, 36 42, 48 58 C62 78, 88 86, 112 78 C128 72, 142 58, 152 42"
          stroke={`url(#${g}-a)`}
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M48 58 C38 72, 22 88, 14 108 C10 120, 12 136, 22 148"
          stroke={`url(#${g}-a)`}
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M112 78 C118 92, 128 104, 148 112"
          stroke={`url(#${g}-a)`}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Lá */}
        <ellipse cx="52" cy="54" rx="7" ry="3.5" transform="rotate(-35 52 54)" fill={`url(#${g}-a)`} opacity="0.55" />
        <ellipse cx="86" cy="82" rx="6.5" ry="3.2" transform="rotate(28 86 82)" fill={`url(#${g}-a)`} opacity="0.5" />
        <ellipse cx="24" cy="96" rx="5.5" ry="2.8" transform="rotate(-55 24 96)" fill={`url(#${g}-a)`} opacity="0.45" />
        <ellipse cx="130" cy="68" rx="5" ry="2.5" transform="rotate(12 130 68)" fill={`url(#${g}-a)`} opacity="0.4" />
        <circle cx="152" cy="42" r="2.2" fill="#d4a017" opacity="0.55" />
        <circle cx="22" cy="148" r="1.8" fill="#b8860b" opacity="0.45" />
      </svg>

      {/* Góc trên-phải */}
      <svg
        className="mag-vine mag-vine--tr absolute -top-1 -right-2 w-[38%] max-w-[170px] h-auto opacity-[0.38]"
        viewBox="0 0 160 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${g}-b`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f0d78c" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9b1b1b" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path
          d="M152 10 C132 22, 118 44, 108 62 C96 84, 74 94, 52 88 C36 84, 22 70, 14 52"
          stroke={`url(#${g}-b)`}
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M108 62 C118 78, 136 92, 148 118"
          stroke={`url(#${g}-b)`}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.75"
        />
        <ellipse cx="104" cy="58" rx="6.5" ry="3.2" transform="rotate(40 104 58)" fill={`url(#${g}-b)`} opacity="0.5" />
        <ellipse cx="70" cy="90" rx="5.5" ry="2.8" transform="rotate(-20 70 90)" fill={`url(#${g}-b)`} opacity="0.45" />
        <ellipse cx="130" cy="86" rx="5" ry="2.4" transform="rotate(55 130 86)" fill={`url(#${g}-b)`} opacity="0.4" />
        <circle cx="14" cy="52" r="2" fill="#d4a017" opacity="0.5" />
      </svg>

      {/* Góc dưới-trái — bay chậm hơn */}
      <svg
        className="mag-vine mag-vine--bl absolute -bottom-2 -left-2 w-[36%] max-w-[165px] h-auto opacity-[0.36]"
        viewBox="0 0 160 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${g}-c`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b8860b" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#f0d78c" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M10 140 C26 118, 34 92, 48 74 C64 52, 92 44, 118 52 C134 58, 146 74, 152 94"
          stroke={`url(#${g}-c)`}
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M48 74 C36 68, 18 58, 8 38"
          stroke={`url(#${g}-c)`}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.8"
        />
        <ellipse cx="54" cy="78" rx="6" ry="3" transform="rotate(50 54 78)" fill={`url(#${g}-c)`} opacity="0.5" />
        <ellipse cx="100" cy="48" rx="5.5" ry="2.6" transform="rotate(-15 100 48)" fill={`url(#${g}-c)`} opacity="0.45" />
        <ellipse cx="22" cy="52" rx="4.5" ry="2.2" transform="rotate(-70 22 52)" fill={`url(#${g}-c)`} opacity="0.4" />
        <circle cx="152" cy="94" r="2" fill="#d4a017" opacity="0.45" />
      </svg>

      {/* Góc dưới-phải */}
      <svg
        className="mag-vine mag-vine--br absolute -bottom-1 -right-3 w-[40%] max-w-[180px] h-auto opacity-[0.4]"
        viewBox="0 0 180 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${g}-d`} x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#d4a017" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9b1b1b" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path
          d="M168 138 C148 122, 138 96, 124 78 C108 54, 82 46, 58 54 C40 60, 26 76, 18 98"
          stroke={`url(#${g}-d)`}
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M124 78 C132 64, 148 48, 168 36"
          stroke={`url(#${g}-d)`}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M58 54 C48 42, 28 28, 12 22"
          stroke={`url(#${g}-d)`}
          strokeWidth="0.95"
          strokeLinecap="round"
          opacity="0.65"
        />
        <ellipse cx="118" cy="82" rx="6.5" ry="3.2" transform="rotate(-42 118 82)" fill={`url(#${g}-d)`} opacity="0.5" />
        <ellipse cx="72" cy="52" rx="5.5" ry="2.8" transform="rotate(25 72 52)" fill={`url(#${g}-d)`} opacity="0.45" />
        <ellipse cx="148" cy="52" rx="5" ry="2.4" transform="rotate(-60 148 52)" fill={`url(#${g}-d)`} opacity="0.4" />
        <circle cx="18" cy="98" r="2.1" fill="#b8860b" opacity="0.5" />
        <circle cx="12" cy="22" r="1.6" fill="#f0d78c" opacity="0.45" />
      </svg>

      {/* Mảnh dây giữa trang — rất nhẹ, bay ngang */}
      <svg
        className="mag-vine mag-vine--mid absolute top-[42%] left-[8%] w-[28%] max-w-[120px] h-auto opacity-[0.22]"
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 28 C28 8, 52 32, 76 14 C92 4, 108 18, 116 22"
          stroke="#d4a017"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />
        <ellipse cx="48" cy="22" rx="4.5" ry="2.2" transform="rotate(18 48 22)" fill="#d4a017" opacity="0.35" />
        <ellipse cx="88" cy="12" rx="3.5" ry="1.8" transform="rotate(-25 88 12)" fill="#b8860b" opacity="0.3" />
      </svg>
    </div>
  );
}

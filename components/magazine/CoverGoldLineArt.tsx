/** Nền bìa: đường nét vàng — phong cách chân dung Mác–Lênin cách điệu (line art) */
export function CoverGoldLineArt({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0d78c" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#d4a017" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#b8860b" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      {/* Khung trang trí */}
      <rect x="18" y="18" width="364" height="524" stroke="url(#goldStroke)" strokeWidth="1.2" opacity="0.5" />
      <rect x="28" y="28" width="344" height="504" stroke="url(#goldStroke)" strokeWidth="0.6" opacity="0.35" strokeDasharray="4 3" />

      {/* Tia mặt trời cách mạng */}
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2 - Math.PI / 2;
        const x2 = 200 + Math.cos(a) * 190;
        const y2 = 200 + Math.sin(a) * 190;
        return (
          <line
            key={i}
            x1="200"
            y1="200"
            x2={x2}
            y2={y2}
            stroke="url(#goldStroke)"
            strokeWidth="0.5"
            opacity="0.22"
          />
        );
      })}
      <circle cx="200" cy="200" r="72" stroke="url(#goldStroke)" strokeWidth="0.8" opacity="0.35" />
      <circle cx="200" cy="200" r="88" stroke="url(#goldStroke)" strokeWidth="0.4" opacity="0.25" strokeDasharray="2 4" />

      {/* Chân dung trái — Mác (profile nhìn phải), line art */}
      <g transform="translate(78, 118)" stroke="url(#goldStroke)" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.75">
        {/* đầu + râu dày */}
        <path d="M70 28c-18-2-34 12-36 32-1 10 2 20 8 28 4 6 6 14 4 22-8 4-16 14-14 28 2 18 22 30 44 28 16-1 30-10 36-24 2-8 0-16-4-22 8-10 10-24 6-36-6-18-22-30-44-28z" />
        <path d="M48 52c6-10 18-14 30-10" />
        <path d="M42 78c10 4 28 6 42-2" />
        <path d="M40 98c14 8 36 6 48-6" />
        <path d="M52 42c2 6 2 12-2 16" opacity="0.7" />
        {/* vai áo */}
        <path d="M28 140c20 24 70 28 100 8" />
        <path d="M34 148c18 16 58 20 86 6" opacity="0.6" />
      </g>

      {/* Chân dung phải — Lênin (profile nhìn trái), line art */}
      <g transform="translate(198, 112)" stroke="url(#goldStroke)" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.75">
        <path d="M55 30c18-4 36 8 40 28 2 12-2 22-10 30-4 6-6 14-4 22 8 6 14 18 8 32-8 16-28 24-48 20-16-3-28-14-32-28-2-8 0-16 4-22-10-12-12-28-4-42 8-16 26-26 46-20z" />
        {/* trán hói + râu nhọn */}
        <path d="M48 48c12-8 28-6 36 4" />
        <path d="M42 70c16 2 32 0 42-8" />
        <path d="M50 100c8 12 22 18 34 12" />
        <path d="M72 44c-2 8 0 14 4 18" opacity="0.7" />
        <path d="M38 138c-16 22-8 40 24 48 28 6 56-8 64-28" />
        <path d="M44 150c-8 14 4 28 28 32" opacity="0.6" />
      </g>

      {/* Quyển sách / tư bản cách điệu dưới */}
      <g transform="translate(120, 380)" stroke="url(#goldStroke)" strokeWidth="1.1" fill="none" opacity="0.55">
        <rect x="0" y="20" width="160" height="12" rx="1" />
        <path d="M8 20 L20 0 H140 L152 20" />
        <line x1="30" y1="6" x2="130" y2="6" opacity="0.5" />
        <line x1="40" y1="12" x2="120" y2="12" opacity="0.4" />
        <path d="M80 32 v48" strokeDasharray="3 2" opacity="0.4" />
      </g>

      {/* Họa tiết góc */}
      <path d="M40 40 h24 M40 40 v24" stroke="url(#goldStroke)" strokeWidth="1.2" opacity="0.55" />
      <path d="M360 40 h-24 M360 40 v24" stroke="url(#goldStroke)" strokeWidth="1.2" opacity="0.55" />
      <path d="M40 520 h24 M40 520 v-24" stroke="url(#goldStroke)" strokeWidth="1.2" opacity="0.55" />
      <path d="M360 520 h-24 M360 520 v-24" stroke="url(#goldStroke)" strokeWidth="1.2" opacity="0.55" />

      {/* Chữ nhỏ trang trí */}
      <text
        x="200"
        y="470"
        textAnchor="middle"
        fill="#d4a017"
        fillOpacity="0.45"
        fontFamily="Georgia, serif"
        fontSize="11"
        letterSpacing="4"
      >
        MARX · LENIN
      </text>
    </svg>
  );
}

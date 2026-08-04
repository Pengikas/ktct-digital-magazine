/**
 * Watermark ấn phẩm KTCT — sách mở + sao + công thức.
 * Màu: đỏ son (sáng) / vàng kim (tối). Opacity hình chìm: 0.5 / 0.6.
 */
export function SiteBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Wash đỏ–vàng dịu */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_0%,rgba(155,27,27,0.08),transparent_50%),radial-gradient(ellipse_at_85%_100%,rgba(196,163,90,0.07),transparent_45%)] dark:bg-[radial-gradient(ellipse_at_15%_0%,rgba(185,28,28,0.18),transparent_55%),radial-gradient(ellipse_at_85%_100%,rgba(196,163,90,0.1),transparent_50%)]" />

      {/* Corner stars */}
      <svg
        className="absolute left-4 top-24 h-16 w-16 opacity-50 dark:opacity-60 text-[hsl(var(--marx-crimson))] dark:text-[hsl(var(--marx-gold))]"
        viewBox="0 0 80 80"
        fill="currentColor"
      >
        <path d="M40 6 L46 28 L68 28 L50 40 L56 62 L40 50 L24 62 L30 40 L12 28 L34 28 Z" />
      </svg>
      <svg
        className="absolute right-4 bottom-28 h-16 w-16 opacity-50 dark:opacity-60 text-[hsl(var(--marx-crimson))] dark:text-[hsl(var(--marx-gold))]"
        viewBox="0 0 80 80"
        fill="currentColor"
      >
        <path d="M40 6 L46 28 L68 28 L50 40 L56 62 L40 50 L24 62 L30 40 L12 28 L34 28 Z" />
      </svg>

      {/* Center: open book watermark */}
      <svg
        className="absolute left-1/2 top-[48%] h-[min(58vh,520px)] w-[min(78vw,720px)] -translate-x-1/2 -translate-y-1/2 opacity-50 dark:opacity-60 text-[hsl(var(--marx-crimson))] dark:text-[hsl(var(--marx-gold))] transition-colors duration-300"
        viewBox="0 0 512 360"
        fill="none"
      >
        <path
          fill="currentColor"
          d="M248 48C190 28 110 22 56 40c-8 3-14 10-14 19v214c0 12 8 21 19 24 52 14 120 22 187 8V48Z"
          opacity="0.92"
        />
        <path
          fill="currentColor"
          d="M264 48C322 28 402 22 456 40c8 3 14 10 14 19v214c0 12-8 21-19 24-52 14-120 22-187 8V48Z"
          opacity="0.92"
        />
        <path
          fill="currentColor"
          d="M248 48v257c8 4 16 4 24 0V48c-8-3-16-3-24 0Z"
          opacity="0.55"
        />
        <path
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.45"
          d="M88 118h120M80 152h128M86 186h122M92 220h116"
        />
        <path
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.45"
          d="M304 118h120M304 152h128M304 186h122M304 220h116"
        />
        <ellipse cx="256" cy="318" rx="168" ry="18" fill="currentColor" opacity="0.22" />
      </svg>

      {/* Formulas */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-full w-full max-w-5xl">
          <span className="absolute left-[4%] top-[18%] rotate-[-10deg] select-none font-serif text-3xl sm:text-5xl font-bold tracking-[0.2em] text-[#9b1b1b]/50 dark:text-[#c4a35a]/60 transition-colors duration-300">
            T — H — T′
          </span>
          <span className="absolute right-[5%] top-[52%] rotate-[7deg] select-none font-serif text-2xl sm:text-4xl font-bold tracking-[0.18em] text-[#9b1b1b]/50 dark:text-[#c4a35a]/60 transition-colors duration-300">
            H — T — H
          </span>
          <span className="absolute bottom-[16%] left-[12%] rotate-[-5deg] select-none font-mono text-xl sm:text-3xl font-semibold text-[#9b1b1b]/50 dark:text-[#c4a35a]/60 transition-colors duration-300">
            m = G − (c + v)
          </span>
        </div>
      </div>
    </div>
  );
}

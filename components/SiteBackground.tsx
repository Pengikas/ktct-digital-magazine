/**
 * Fixed, low-opacity academic watermark: formulas + classical column motif
 * for Kinh tế Chính trị Mác – Lênin (non-intrusive behind / over page content).
 */
export function SiteBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[25] overflow-hidden mix-blend-soft-light dark:mix-blend-overlay"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(185,28,28,0.14),transparent_55%),radial-gradient(ellipse_at_80%_90%,rgba(180,83,9,0.1),transparent_50%)]" />

      <svg
        className="absolute left-1/2 top-[48%] h-[min(88vh,860px)] w-[min(88vw,860px)] -translate-x-1/2 -translate-y-1/2 opacity-40 dark:opacity-35"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="175" y="70" width="50" height="14" rx="2" fill="currentColor" className="text-slate-600 dark:text-amber-100" />
        <rect x="182" y="84" width="36" height="200" fill="currentColor" className="text-slate-600 dark:text-amber-100" />
        <rect x="168" y="284" width="64" height="12" rx="2" fill="currentColor" className="text-slate-600 dark:text-amber-100" />
        <rect x="158" y="296" width="84" height="16" rx="2" fill="currentColor" className="text-slate-600 dark:text-amber-100" />

        <path
          d="M120 320 C160 300, 200 300, 200 320 L200 360 C160 340, 120 340, 120 360 Z"
          fill="currentColor"
          className="text-slate-500 dark:text-amber-200"
          opacity="0.9"
        />
        <path
          d="M200 320 C240 300, 280 300, 280 320 L280 360 C240 340, 200 340, 200 360 Z"
          fill="currentColor"
          className="text-slate-500 dark:text-amber-200"
          opacity="0.9"
        />

        <path
          d="M200 95 L208 118 L232 118 L212 132 L220 155 L200 141 L180 155 L188 132 L168 118 L192 118 Z"
          fill="currentColor"
          className="text-red-700 dark:text-amber-400"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-full w-full max-w-6xl">
          <span className="absolute left-[5%] top-[16%] rotate-[-12deg] select-none font-serif text-4xl sm:text-6xl font-bold tracking-widest text-slate-800/25 dark:text-amber-50/20">
            T — H — T′
          </span>
          <span className="absolute right-[6%] top-[40%] rotate-[8deg] select-none font-serif text-3xl sm:text-5xl font-bold tracking-widest text-slate-800/25 dark:text-amber-50/20">
            H — T — H
          </span>
          <span className="absolute bottom-[24%] left-[14%] rotate-[-6deg] select-none font-mono text-2xl sm:text-4xl font-semibold tracking-wide text-red-900/20 dark:text-red-100/15">
            m = G − (c + v)
          </span>
          <span className="absolute bottom-[10%] right-[10%] rotate-[4deg] select-none font-serif text-xl sm:text-3xl italic text-slate-800/25 dark:text-amber-50/20">
            k = c + v
          </span>
        </div>
      </div>
    </div>
  );
}

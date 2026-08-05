"use client";

import {
  BookOpen,
  CheckCircle2,
  Landmark,
  Layers,
  Sparkles,
  TrendingUp,
  RotateCcw,
  Coins,
  Scale,
  BarChart3,
  Feather,
  Quote,
  ScrollText,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  CONCEPTS_LIST,
  VIETNAM_STATS,
  HAPPINESS_STATS,
  STORIES_LIST,
  MAGAZINE_INTRO_SECTIONS,
  MAGAZINE_MEMBER_NAMES,
  MAGAZINE_PAGES_DATA,
} from "@/data/magazineData";
import { CoverGoldLineArt } from "@/components/magazine/CoverGoldLineArt";
import { GoldVinesDecor } from "@/components/magazine/GoldVinesDecor";
import { ContentGapDecor } from "@/components/magazine/ContentGapDecor";

/** Họa tiết góc trang nội dung — làm trang kín hơn */
function SoftPageDecor({ icons }: { icons: LucideIcon[] }) {
  const [A, B, C, D] = icons;
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden>
      <A className="absolute top-10 left-2.5 w-5 h-5 text-[#9b1b1b]/20" strokeWidth={1.25} />
      <B className="absolute top-10 right-2.5 w-5 h-5 text-[#b8860b]/30" strokeWidth={1.25} />
      <C className="absolute bottom-9 left-2.5 w-5 h-5 text-[#b8860b]/25" strokeWidth={1.25} />
      <D className="absolute bottom-9 right-2.5 w-5 h-5 text-[#9b1b1b]/20" strokeWidth={1.25} />
      {/* Viền trang trí */}
      <div className="absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-[#b8860b]/35 to-transparent" />
      <div className="absolute right-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-[#9b1b1b]/25 to-transparent" />
      <div className="absolute top-7 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#d6c8b8] to-transparent" />
      <div className="absolute bottom-7 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#d6c8b8] to-transparent" />
      {/* Chấm trang trí */}
      <span className="absolute top-7 left-7 w-1.5 h-1.5 rounded-full bg-[#b8860b]/40" />
      <span className="absolute top-7 right-7 w-1.5 h-1.5 rounded-full bg-[#9b1b1b]/35" />
      <span className="absolute bottom-7 left-7 w-1.5 h-1.5 rounded-full bg-[#9b1b1b]/35" />
      <span className="absolute bottom-7 right-7 w-1.5 h-1.5 rounded-full bg-[#b8860b]/40" />
    </div>
  );
}

/** Trang nội dung — nền ivory Marx, chữ to hơn để dễ đọc / đầy trang */
function SoftPage({
  children,
  pageNum,
  tag,
  title,
  subtitle,
  icons = [BookOpen, Coins, Scale, Sparkles],
}: {
  children: React.ReactNode;
  pageNum: number;
  tag: string;
  title: string;
  subtitle?: string;
  icons?: LucideIcon[];
}) {
  return (
    <div className="page-item border-l border-[#d6c8b8]" data-density="soft">
      <div className="h-full w-full bg-[#f4ebe0] text-[#1c1410] px-3.5 py-3.5 sm:px-5 sm:py-4 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9b1b1b] via-[#b8860b] to-[#9b1b1b]" />
        <div className="absolute inset-0 bg-[radial-gradient(#c4b5a5_1px,transparent_1px)] [background-size:18px_18px] opacity-20 pointer-events-none" />
        <CoverGoldLineArt className="absolute inset-0 w-full h-full opacity-[0.11] pointer-events-none scale-[1.05] [filter:sepia(0.3)_saturate(1.2)]" />
        <GoldVinesDecor />
        <SoftPageDecor icons={icons} />
        <div className="relative z-10 flex flex-col flex-1 min-h-0 gap-2.5">
          <div className="border-b border-[#d6c8b8] pb-2 shrink-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[12px] font-bold text-[#9b1b1b] uppercase tracking-wider block">
                  {tag}
                </span>
                <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1c1410] leading-snug">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-[12px] sm:text-[13px] text-[#6b5e52] mt-0.5 leading-snug">{subtitle}</p>
                )}
              </div>
              <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#9b1b1b]/10 text-[#9b1b1b] text-[12px] font-mono border border-[#9b1b1b]/20">
                P.{pageNum}
              </span>
            </div>
          </div>
          <div className="flex-1 min-h-0 flex flex-col justify-between gap-2.5 overflow-hidden text-[12px] leading-relaxed">
            {children}
          </div>
          <div className="shrink-0 pt-1.5 border-t border-[#d6c8b8] flex items-center justify-between text-[12px] text-[#6b5e52]">
            <span>KTCT Digital Magazine — Số 01</span>
            <span className="font-mono font-bold text-[#b8860b]">Trang {pageNum}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MagazinePages({ onGoCover }: { onGoCover?: () => void }) {
  return (
    <>
      {/* 1 — BÌA CỨNG: nền line-art vàng Mác–Lênin */}
      <div className="page-item page-cover" data-density="hard">
        <div className="h-full w-full relative overflow-hidden text-center text-[#f4ebe0] flex flex-col justify-between p-6 sm:p-8 bg-[#3d0a0a]">
          <div className="absolute inset-0 bg-[linear-gradient(155deg,#5c0f0f_0%,#7a1515_35%,#4a0e0e_70%,#2a0808_100%)]" />
          <CoverGoldLineArt className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#3d0a0a]/25 via-transparent to-[#3d0a0a]/75 pointer-events-none" />
          <div className="absolute inset-3 border border-[#d4a017]/40 rounded-sm pointer-events-none z-[1]" />

          <div className="relative z-10 pt-1 space-y-2">
            <p className="text-[12px] tracking-[0.35em] uppercase text-[#f0d78c] font-bold drop-shadow">
              UIT · SS008.Q31 · 2026
            </p>
            <div className="mx-auto w-14 h-px bg-gradient-to-r from-transparent via-[#d4a017] to-transparent" />
          </div>

          <div className="relative z-10 space-y-3 my-auto py-3">
            <p className="text-[13px] font-semibold uppercase tracking-widest text-[#f0d78c]/95">
              Tạp chí số chuyên đề
            </p>
            <h1 className="text-3xl sm:text-[2.65rem] font-black font-serif leading-tight text-transparent bg-clip-text bg-gradient-to-b from-[#fff8e7] via-[#f0d78c] to-[#d4a017] drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
              TIỀN NHIỀU
              <br />
              ĐỂ LÀM GÌ?
            </h1>
            <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#d4a017] to-transparent" />
            <p className="text-xs text-[#f4ebe0]/90 max-w-[17rem] mx-auto font-serif italic leading-relaxed">
              Soi câu hỏi thực tiễn qua Kinh tế Chính trị Mác – Lênin
            </p>
            <div className="mx-auto mt-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#d4a017]/45 bg-[#3d0a0a]/55 backdrop-blur-[2px]">
              <Layers className="w-3.5 h-3.5 text-[#f0d78c]" />
              <span className="text-[12px] font-bold text-[#f0d78c] tracking-wide">
                H–T–H · T–H–T′
              </span>
            </div>
          </div>

          <div className="relative z-10 pb-0.5 flex flex-col items-center gap-1 text-[12px] text-[#f0d78c]/85">
            <div className="flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5" />
              <span>Trường ĐH Công nghệ Thông tin (UIT)</span>
            </div>
            <p className="tracking-widest uppercase text-[10px]">Lật trang để đọc</p>
          </div>
        </div>
      </div>

      {/* 2 — MẶT TRONG BÌA: giới thiệu đỏ–vàng */}
      <div className="page-item" data-density="soft">
        <div className="h-full w-full relative overflow-hidden p-5 sm:p-7 flex flex-col bg-gradient-to-br from-[#9b1b1b] via-[#7a1515] to-[#4a0e0e] text-[#f4ebe0]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,160,23,0.25),transparent_50%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#d4a017]/20 to-transparent" />
          <CoverGoldLineArt className="absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none" />
          <GoldVinesDecor className="opacity-80 [filter:brightness(1.15)]" />
          <ScrollText className="absolute top-5 right-5 w-8 h-8 text-[#d4a017]/25 pointer-events-none z-[1]" />
          <Feather className="absolute bottom-16 left-4 w-7 h-7 text-[#d4a017]/20 pointer-events-none z-[1]" />
          <BookOpen className="absolute top-1/3 left-3 w-6 h-6 text-[#f0d78c]/15 pointer-events-none z-[1]" />
          <div className="relative z-10 space-y-4 flex-1">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d4a017]/20 border border-[#d4a017]/50 text-[#f0d78c] text-[12px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> Giới thiệu nội dung
              </span>
              <h2 className="mt-3 text-2xl font-black font-serif text-[#f0d78c] leading-tight">
                Hành trình đọc tạp chí
              </h2>
              <p className="mt-2 text-xs text-[#f4ebe0]/85 leading-relaxed max-w-sm">
                Ấn phẩm số bám câu hỏi trung tâm CQ5, nối lý luận Chương 2–3 với số liệu Việt Nam
                và dẫn chứng thực tiễn — cùng bố cục website KTCT Digital Magazine.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {MAGAZINE_INTRO_SECTIONS.map((s) => (
                <div
                  key={s.num}
                  className="flex gap-3 p-3 rounded-xl bg-[#3d0a0a]/45 border border-[#d4a017]/35 backdrop-blur-sm"
                >
                  <span className="shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-[#d4a017] to-[#b8860b] text-[#3d0a0a] font-black text-sm flex items-center justify-center font-mono">
                    {s.num}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-[#f0d78c]">{s.title}</h3>
                    <p className="text-[13px] text-[#f4ebe0]/75 leading-snug">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="relative z-10 text-[12px] text-[#f0d78c]/70 pt-2 border-t border-[#d4a017]/25">
            Trang {MAGAZINE_PAGES_DATA.findIndex((p) => p.layoutType === "intro") + 1} · Lật tiếp để vào nội dung
          </p>
        </div>
      </div>

      {/* 3 — Concepts 1–7 (nội dung magazine cũ, layout đầy trang) */}
      <SoftPage
        pageNum={3}
        tag="Phần 1 · Khái niệm cốt lõi (1/2)"
        title="Danh mục phạm trù 1 — 7"
        subtitle="Nền tảng Chương 2–3: sản xuất hàng hóa, giá trị & tiền tệ"
        icons={[ScrollText, Coins, BookOpen, Scale]}
      >
        <div className="flex-1 flex flex-col justify-evenly gap-1.5 text-[13px]">
          {CONCEPTS_LIST.slice(0, 7).map((c, idx) => (
            <div
              key={c.term}
              className="p-2 rounded-md bg-white/80 border border-[#d6c8b8] flex gap-2"
            >
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#9b1b1b] text-[#f4ebe0] text-[12px] flex items-center justify-center font-mono font-bold">
                {idx + 1}
              </span>
              <div className="min-w-0">
                <h4 className="font-bold text-[#9b1b1b] text-[13px] leading-tight">{c.term}</h4>
                <p className="text-[12px] text-[#3d342c] leading-snug mt-0.5">{c.definition}</p>
              </div>
            </div>
          ))}
        </div>
      </SoftPage>

      {/* 4 — Concepts 8–14 */}
      <SoftPage
        pageNum={4}
        tag="Phần 1 · Khái niệm cốt lõi (2/2)"
        title="Danh mục phạm trù 8 — 14"
        subtitle="Tư bản, giá trị thặng dư, tích lũy, lợi nhuận & lợi tức"
        icons={[Coins, TrendingUp, Scale, Layers]}
      >
        <div className="flex-1 flex flex-col justify-evenly gap-1.5 text-[13px]">
          {CONCEPTS_LIST.slice(7, 14).map((c, idx) => (
            <div
              key={c.term}
              className="p-2 rounded-md bg-white/80 border border-[#d6c8b8] flex gap-2"
            >
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#9b1b1b] text-[#f4ebe0] text-[12px] flex items-center justify-center font-mono font-bold">
                {idx + 8}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-bold text-[#9b1b1b] text-[13px] leading-tight">{c.term}</h4>
                  {c.symbol && (
                    <span className="shrink-0 px-1 py-0.5 rounded text-[9px] font-mono bg-[#9b1b1b]/10 text-[#9b1b1b] border border-[#9b1b1b]/20">
                      {c.symbol}
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-[#3d342c] leading-snug mt-0.5">{c.definition}</p>
              </div>
            </div>
          ))}
        </div>
      </SoftPage>

      {/* 5 — Theory (đầy đủ như magazine cũ) */}
      <SoftPage
        pageNum={5}
        tag="Phần 2 · Lý luận chương 3"
        title="Sản xuất hàng hóa & nguồn gốc tiền tệ"
        subtitle="Hai điều kiện · Hai thuộc tính · Bốn hình thái giá trị"
        icons={[BookOpen, CheckCircle2, Feather, Sparkles]}
      >
        <div className="flex-1 flex flex-col justify-center gap-1.5 text-[13px] text-[#3d342c]">
          <div className="p-3 rounded-xl bg-[#b8860b]/12 border border-[#b8860b]/35 space-y-1.5">
            <h4 className="font-bold text-[#9b1b1b] flex items-center gap-1.5 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#b8860b]" />
              1. Điều kiện ra đời của sản xuất hàng hóa
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-[12px] leading-relaxed">
              <li>
                <strong>Phân công lao động xã hội:</strong> chuyên môn hóa sản xuất làm xuất hiện
                nhu cầu trao đổi sản phẩm giữa các ngành nghề.
              </li>
              <li>
                <strong>Sự tách biệt tương đối về sở hữu:</strong> chi phối bởi chế độ tư hữu tư liệu
                sản xuất — tiêu dùng phải qua mua bán trên thị trường.
              </li>
            </ul>
          </div>
          <ContentGapDecor icon={BookOpen} />
          <div className="p-3 rounded-xl bg-white/85 border border-[#d6c8b8] space-y-1.5">
            <h4 className="font-bold text-[#1c1410] text-xs">
              2. Hai thuộc tính của hàng hóa & mâu thuẫn nội tại
            </h4>
            <p className="text-[12px] leading-relaxed">
              <strong>Giá trị sử dụng:</strong> thuộc tính tự nhiên, công dụng thỏa mãn nhu cầu.
              <br />
              <strong>Giá trị:</strong> thuộc tính xã hội — hao phí lao động xã hội cần thiết kết
              tinh trong hàng hóa.
              <br />
              <strong>Mâu thuẫn:</strong> người sản xuất tạo ra GTSĐ nhưng mục đích là giá trị
              (tiền).
            </p>
          </div>
          <ContentGapDecor icon={Coins} />
          <div className="p-3 rounded-xl bg-[#9b1b1b]/10 border border-[#9b1b1b]/30 space-y-1.5">
            <h4 className="font-bold text-[#9b1b1b] text-xs">
              3. Bốn hình thái giá trị phát triển thành tiền tệ
            </h4>
            <p className="font-mono text-[12px] text-[#b8860b] leading-relaxed">
              (1) Đơn giản / Ngẫu nhiên → (2) Đầy đủ / Mở rộng → (3) Chung → (4) Tiền tệ
            </p>
            <p className="text-[12px] text-[#3d342c] leading-relaxed">
              Bản chất: hàng hóa đặc biệt đóng vai trò <strong>vật ngang giá chung</strong>, thể
              hiện lao động xã hội và quan hệ sản xuất — không phải do ai “đặt ra” tùy tiện.
            </p>
          </div>
        </div>
      </SoftPage>

      {/* 6 — Circulation (đầy đủ magazine cũ) */}
      <SoftPage
        pageNum={6}
        tag="Phần 2 · Vai trò & lưu thông"
        title="5 chức năng tiền tệ & hai hình thái lưu thông"
        subtitle="H–T–H · T–H–T′ (T′ = T + Δt) dưới góc nhìn Mác – Lênin"
        icons={[Coins, Layers, Scale, TrendingUp]}
      >
        <div className="flex-1 flex flex-col justify-center gap-1.5 text-[13px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-white/85 border border-[#d6c8b8] space-y-1.5">
              <h4 className="font-bold text-[#9b1b1b] text-xs">5 chức năng tiền tệ cơ bản</h4>
              <ol className="list-decimal pl-4 space-y-1 text-[12px] text-[#3d342c] leading-snug">
                <li>
                  <strong>Thước đo giá trị:</strong> biểu hiện giá trị thành giá cả.
                </li>
                <li>
                  <strong>Phương tiện lưu thông:</strong> môi giới H–T–H.
                </li>
                <li>
                  <strong>Phương tiện cất trữ:</strong> đại diện của cải rút khỏi lưu thông.
                </li>
                <li>
                  <strong>Phương tiện thanh toán:</strong> trả nợ, thuế, mua chịu.
                </li>
                <li>
                  <strong>Tiền tệ thế giới:</strong> di chuyển của cải qua biên giới.
                </li>
              </ol>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-[#b8860b]/15 border border-[#b8860b]/40">
                <span className="font-bold text-[#9b1b1b] text-xs">1. Lưu thông giản đơn (H–T–H)</span>
                <p className="text-[12px] text-[#3d342c] mt-1 leading-relaxed">
                  Mục đích là H′ (Giá trị sử dụng mới). Tiền là phương tiện phục vụ nhu cầu sinh
                  hoạt và nâng cao chất lượng sống.
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#9b1b1b]/12 border border-[#9b1b1b]/30">
                <span className="font-bold text-[#9b1b1b] text-xs">2. Vận động tư bản (T–H–T′)</span>
                <p className="text-[12px] text-[#3d342c] mt-1 leading-relaxed">
                  Với T′ = T + Δt. Tiền biến thành tư bản — “tiền nhiều” để tích lũy tư bản & tái
                  sản xuất mở rộng.
                </p>
              </div>
            </div>
          </div>
          <ContentGapDecor icon={Layers} label="tái sản xuất" />
          <div className="p-2.5 rounded-xl bg-white/85 border border-[#b8860b]/35 text-[12px] text-[#3d342c] leading-relaxed">
            <span className="font-bold text-[#9b1b1b] block mb-0.5">
              Tái sản xuất mở rộng & năng suất lao động
            </span>
            Đổi mới tư bản bất biến (c) là tiền đề nâng cao năng suất; thu giá trị thặng dư siêu
            ngạch nhờ giá trị cá biệt thấp hơn giá trị xã hội (Giáo trình tr. 92–103).
          </div>
        </div>
      </SoftPage>

      {/* 7 — Surplus */}
      <SoftPage
        pageNum={7}
        tag="Phần 2 · Bản chất của cải"
        title="Phân phối giá trị thặng dư & sùng bái tiền tệ"
        subtitle="P̄ · lợi tức · địa tô · của cải thực sự là Giá trị sử dụng"
        icons={[Scale, Coins, Sparkles, Landmark]}
      >
        <div className="flex-1 flex flex-col justify-center gap-1.5 text-[13px]">
          <div className="grid grid-cols-3 gap-1.5 text-[12px]">
            <div className="p-2 rounded-lg bg-white/85 border border-[#b8860b]/35 space-y-1">
              <span className="font-bold text-[#9b1b1b] block">Lợi nhuận bình quân (P̄)</span>
              <p className="text-[#3d342c] leading-snug">
                Tối ưu dòng vốn sinh lời; vốn tự do chuyển sang ngành có tỷ suất lợi nhuận cao.
              </p>
            </div>
            <div className="p-2 rounded-lg bg-white/85 border border-[#9b1b1b]/25 space-y-1">
              <span className="font-bold text-[#9b1b1b] block">Lợi tức (z) · T–T′</span>
              <p className="text-[#3d342c] leading-snug">
                Cho vay / tư bản giả (cổ phiếu, trái phiếu) — ảo tưởng “tiền đẻ ra tiền”.
              </p>
            </div>
            <div className="p-2 rounded-lg bg-white/85 border border-[#d6c8b8] space-y-1">
              <span className="font-bold text-[#9b1b1b] block">Địa tô (R)</span>
              <p className="text-[#3d342c] leading-snug">
                Trích một phần lợi nhuận siêu ngạch nộp cho chủ đất.
              </p>
            </div>
          </div>
          <ContentGapDecor icon={Sparkles} label="bản chất" />
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#9b1b1b]/10 to-[#b8860b]/15 border border-[#b8860b]/40 space-y-1.5">
            <h4 className="font-bold text-[#9b1b1b] text-xs flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
              Bản chất “của cải”: tiền hay Giá trị sử dụng?
            </h4>
            <p className="text-[12px] text-[#3d342c] leading-relaxed">
              <strong>Tiền tệ</strong> chỉ là phương tiện biểu hiện giá trị, đại biểu quyền sở hữu.
              <br />
              <strong>Của cải thực sự</strong> là Giá trị sử dụng (hạ tầng, công nghệ, tri thức, sức
              lao động…). Tiền không đi kèm sản xuất thực tế sẽ gây lạm phát.
              <br />
              <strong>Sùng bái tiền tệ:</strong> biến công cụ thành mục đích sống duy nhất — tha hóa
              quan hệ xã hội.
            </p>
          </div>
        </div>
      </SoftPage>

      {/* 8 — Debate */}
      <SoftPage
        pageNum={8}
        tag="Phần 3 · Phản biện lý luận"
        title="So sánh ba luồng quan điểm"
        subtitle="Tiền là quan trọng nhất · Tiền không quan trọng · Cân bằng Mác – Lênin"
        icons={[Quote, Scale, Feather, BookOpen]}
      >
        <div className="flex-1 flex flex-col justify-center gap-1.5 text-[13px]">
          <div className="p-3 rounded-xl bg-[#9b1b1b]/12 border border-[#9b1b1b]/30 space-y-1">
            <span className="font-bold text-[#9b1b1b] text-xs">
              Quan điểm 1: “Tiền là quan trọng nhất”
            </span>
            <p className="text-[12px] text-[#3d342c] leading-relaxed">
              Mác – Lênin: sa vào sùng bái tiền tệ. Tiền chỉ đo lường hao phí lao động xã hội, không
              mua được giá trị tinh thần hay hạnh phúc. Chạy theo tiền vô hạn dẫn đến bóc lột tối đa
              và tha hóa đạo đức.
            </p>
          </div>
          <ContentGapDecor icon={Scale} label="phản biện" />
          <div className="p-3 rounded-xl bg-white/85 border border-[#d6c8b8] space-y-1">
            <span className="font-bold text-[#1c1410] text-xs">
              Quan điểm 2: “Tiền không quan trọng”
            </span>
            <p className="text-[12px] text-[#3d342c] leading-relaxed">
              Mác – Lênin: duy tâm, thoát ly thực tế sản xuất. Tiền là điều kiện vật chất tối thiểu
              đáp ứng sinh hoạt và tư bản ứng trước để tái sản xuất mở rộng. Thiếu vốn làm ngưng trệ
              kinh tế.
            </p>
          </div>
          <ContentGapDecor icon={Feather} label="tổng hợp" />
          <div className="p-3 rounded-xl bg-[#b8860b]/18 border border-[#b8860b]/45 space-y-1">
            <span className="font-bold text-[#9b1b1b] text-xs">Quan điểm cân bằng Mác – Lênin</span>
            <p className="text-[12px] text-[#3d342c] leading-relaxed">
              Tiền là đòn bẩy kinh tế khách quan, không được phép trở thành mục đích tự thân. Cần
              khai thác giá trị thặng dư nhân văn (tăng năng suất, máy móc) thay vì bóc lột tuyệt đối
              — đặt tiền đúng vị trí phương tiện giải phóng sức lao động.
            </p>
          </div>
        </div>
      </SoftPage>

      {/* 9 — Stats */}
      <SoftPage
        pageNum={9}
        tag="Phần 4 · Dữ liệu thực tiễn"
        title="Bộ số liệu Việt Nam & chỉ số hạnh phúc (2022–2025)"
        subtitle="GDP · thu nhập · nghèo đa chiều · World Happiness Report"
        icons={[BarChart3, TrendingUp, Coins, Landmark]}
      >
        <div className="flex-1 flex flex-col justify-center gap-1.5">
          <div className="overflow-hidden rounded-xl border border-[#d6c8b8] bg-white/85">
            <table className="w-full text-left text-[12px]">
              <thead className="bg-[#9b1b1b]/12 text-[#9b1b1b] font-semibold">
                <tr>
                  <th className="p-2">Chỉ số thực tiễn</th>
                  <th className="p-1.5">2022</th>
                  <th className="p-1.5">2023</th>
                  <th className="p-1.5">2024</th>
                  <th className="p-1.5">2025</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebe0d2] text-[#3d342c] font-mono">
                {VIETNAM_STATS.map((r) => (
                  <tr key={r.label}>
                    <td className="p-2 font-sans font-medium text-[#1c1410] text-[12px]">
                      {r.label}
                      <span className="block text-[9px] text-[#6b5e52] font-sans font-normal">
                        {r.note}
                      </span>
                    </td>
                    <td className="p-1.5">{r.y2022}</td>
                    <td className="p-1.5">{r.y2023}</td>
                    <td className="p-1.5 text-[#b8860b] font-bold">{r.y2024}</td>
                    <td className="p-1.5 text-[#9b1b1b] font-bold">{r.y2025}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ContentGapDecor icon={TrendingUp} label="hạnh phúc" />
          <div className="p-2.5 rounded-xl bg-white/85 border border-[#d6c8b8] space-y-1.5">
            <h4 className="font-bold text-[#9b1b1b] text-xs flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#b8860b]" />
              Xếp hạng Chỉ số Hạnh phúc Thế giới
            </h4>
            <div className="grid grid-cols-4 gap-1.5 text-center text-[12px]">
              {HAPPINESS_STATS.map((h) => (
                <div key={h.year} className="p-2 rounded bg-[#f4ebe0] border border-[#d6c8b8]">
                  <span className="text-[#6b5e52] block text-[10px]">{h.year}</span>
                  <span className="font-bold text-[#9b1b1b] font-mono">{h.label}</span>
                  <span className="block text-[9px] text-[#6b5e52] mt-0.5">{h.source}</span>
                </div>
              ))}
            </div>
            <p className="text-[12px] text-[#3d342c] leading-relaxed italic">
              Nhận xét: tăng trưởng của cải vật chất giải quyết nhu cầu cơ bản, đồng pha với thăng
              hạng hạnh phúc quốc gia (UNSDSN; C.Mác, Tư bản).
            </p>
          </div>
        </div>
      </SoftPage>

      {/* 10 — Cases */}
      <SoftPage
        pageNum={10}
        tag="Phần 4 · Thực tiễn & văn hóa"
        title="Câu chuyện tỷ phú & Rap Việt"
        subtitle="Gates · Notch · GDucky, Đen Vâu, 14 Casper"
        icons={[Quote, Users, Sparkles, Feather]}
      >
        <div className="flex-1 flex flex-col justify-center gap-1 text-[13px]">
          {STORIES_LIST.map((story, i) => (
            <div key={story.title}>
              {i > 0 && (
                <ContentGapDecor
                  icon={i === 1 ? Quote : Sparkles}
                  label={i === 1 ? "case" : "văn hóa"}
                />
              )}
              <div className="p-2.5 rounded-xl bg-white/85 border border-[#d6c8b8] space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-[#1c1410] text-[13px]">{story.title}</h4>
                  <span
                    className={`shrink-0 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                      story.type === "positive"
                        ? "bg-emerald-100 text-emerald-800"
                        : story.type === "negative"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-900"
                    }`}
                  >
                    {story.subtitle}
                  </span>
                </div>
                <p className="text-[12px] text-[#3d342c] leading-relaxed">{story.content}</p>
                <p className="text-[12px] text-[#9b1b1b] leading-snug border-l-2 border-[#b8860b] pl-2 bg-[#b8860b]/8 py-1 rounded-r">
                  <strong>Góc nhìn Mác – Lênin:</strong> {story.marxistAnalysis}
                </p>
                {story.quote && (
                  <p className="text-[10px] text-[#6b5e52] italic">“{story.quote}”</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </SoftPage>

      {/* 11 — MẶT TRONG BÌA CUỐI: chỉ tên */}
      <div className="page-item" data-density="soft">
        <div className="h-full w-full relative overflow-hidden p-5 sm:p-7 flex flex-col bg-gradient-to-b from-[#f4ebe0] via-[#ebe0d2] to-[#e8d9c4] text-[#1c1410]">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#9b1b1b] via-[#d4a017] to-[#9b1b1b]" />
          <CoverGoldLineArt className="absolute inset-0 w-full h-full opacity-[0.1] pointer-events-none" />
          <GoldVinesDecor />
          <Users className="absolute top-6 right-5 w-10 h-10 text-[#9b1b1b]/10 pointer-events-none z-[1]" />
          <Feather className="absolute bottom-20 left-4 w-8 h-8 text-[#b8860b]/15 pointer-events-none z-[1]" />
          <div className="relative z-10 space-y-3 flex-1">
            <div className="text-center space-y-1 pb-2 border-b border-[#d6c8b8]">
              <h2 className="text-xl font-black font-serif text-[#1c1410]">Thành viên thực hiện</h2>
              <p className="text-[13px] text-[#6b5e52]">Nhóm đồ án KTCT Digital Magazine · UIT</p>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[13px] sm:text-xs">
              {MAGAZINE_MEMBER_NAMES.map((name) => (
                <div
                  key={name}
                  className="py-1.5 px-2 rounded-md bg-white/60 border border-[#d6c8b8]/80 font-medium text-[#1c1410] font-serif"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
          <p className="relative z-10 text-[12px] text-[#6b5e52] pt-2 border-t border-[#d6c8b8] text-center">
            Trang 11 · Cảm ơn đã đồng hành
          </p>
        </div>
      </div>

      {/* 12 — BÌA SAU: cùng khung bìa đầu, chi tiết “kết thúc số” */}
      <div className="page-item page-cover" data-density="hard">
        <div className="h-full w-full relative overflow-hidden text-center text-[#f4ebe0] flex flex-col justify-between p-6 sm:p-8 bg-[#3d0a0a]">
          <div className="absolute inset-0 bg-[linear-gradient(155deg,#5c0f0f_0%,#7a1515_35%,#4a0e0e_70%,#2a0808_100%)]" />
          <CoverGoldLineArt className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#3d0a0a]/25 via-transparent to-[#3d0a0a]/75 pointer-events-none" />
          <div className="absolute inset-3 border border-[#d4a017]/40 rounded-sm pointer-events-none z-[1]" />

          <div className="relative z-10 pt-1 space-y-2">
            <p className="text-[12px] tracking-[0.35em] uppercase text-[#f0d78c] font-bold drop-shadow">
              UIT · SS008.Q31 · 2026
            </p>
            <div className="mx-auto w-14 h-px bg-gradient-to-r from-transparent via-[#d4a017] to-transparent" />
          </div>

          <div className="relative z-10 space-y-3 my-auto py-3">
            <p className="text-[13px] font-semibold uppercase tracking-widest text-[#f0d78c]/95">
              Hết số chuyên đề
            </p>
            <h2 className="text-3xl sm:text-[2.65rem] font-black font-serif leading-tight text-transparent bg-clip-text bg-gradient-to-b from-[#fff8e7] via-[#f0d78c] to-[#d4a017] drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
              CẢM ƠN
              <br />
              ĐÃ ĐỌC
            </h2>
            <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#d4a017] to-transparent" />
            <p className="text-xs text-[#f4ebe0]/90 max-w-[17rem] mx-auto font-serif italic leading-relaxed">
              Tiền là phương tiện, không phải mục đích
            </p>
            <div className="mx-auto mt-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#d4a017]/45 bg-[#3d0a0a]/55 backdrop-blur-[2px]">
              <BookOpen className="w-3.5 h-3.5 text-[#f0d78c]" />
              <span className="text-[12px] font-bold text-[#f0d78c] tracking-wide">
                FIN · KTCT DIGITAL MAGAZINE
              </span>
            </div>
          </div>

          <div className="relative z-10 pb-0.5 flex flex-col items-center gap-2 text-[12px] text-[#f0d78c]/85">
            <div className="flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5" />
              <span>Trường ĐH Công nghệ Thông tin (UIT)</span>
            </div>
            {onGoCover ? (
              <button
                type="button"
                onClick={onGoCover}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#d4a017] text-[#3d0a0a] font-bold hover:bg-[#f0d78c] transition-colors text-xs tracking-wide"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Đọc lại từ bìa
              </button>
            ) : (
              <p className="tracking-widest uppercase text-[10px]">© 2026 · Kết thúc tạp chí</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

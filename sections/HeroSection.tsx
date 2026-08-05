"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, BookOpen, Award, ChevronRight, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-marx-surface text-foreground py-20 px-4 sm:px-6 lg:px-8 border-b border-marx"
    >
      {/* Soft wash — no tech orbs / cyber grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(155,27,27,0.12),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_50%_0%,rgba(185,28,28,0.22),transparent_55%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 masthead-bar opacity-80" />

      <div className="max-w-6xl mx-auto text-center relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] text-gold">
            Kinh tế Chính trị Mác — Lênin
          </p>
          <div className="mx-auto max-w-xs border-double-rule" />
          <div className="label-press mx-auto">
            <Star className="w-3 h-3 fill-current" />
            <span>SS008.Q31 · Chương 3 · UIT 2026</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold magazine-header tracking-tight leading-[1.1] heading-display">
            TIỀN NHIỀU ĐỂ LÀM GÌ?
          </h1>
          <p className="text-lg sm:text-2xl font-serif italic text-gradient-gold max-w-3xl mx-auto">
            Trả lời về quá trình tích lũy tư bản và các hình thức biểu hiện của giá trị thặng dư
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed font-sans"
        >
          Tạp chí số đồ án KTCT: nền tảng ngắn từ tiền đến tư bản, phân tích SS008.Q31,
          case thực tiễn, số liệu Việt Nam và trắc nghiệm.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto p-6 rounded-sm bg-marx-raised border border-marx shadow-lg relative"
        >
          <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-sm bg-[#9b1b1b] text-[#f4ebe0] text-[10px] uppercase font-bold tracking-widest">
            Thông điệp
          </div>
          <p className="text-sm sm:text-base font-serif italic text-foreground/90 leading-relaxed pt-1">
            &ldquo;Tiền nhiều để chuyển thành tư bản tích cực: tái sản xuất mở rộng, phân phối GTTD
            hợp lý, và tạo giá trị sử dụng cho xã hội — không để tiền làm chủ con người.&rdquo;
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 max-w-2xl mx-auto gap-4 py-4 border-y border-marx text-center"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gold font-serif">3.2</div>
            <div className="text-[11px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
              Tích lũy tư bản
            </div>
          </div>
          <div className="border-x border-marx">
            <div className="text-2xl sm:text-3xl font-extrabold heading-display font-serif">3.3</div>
            <div className="text-[11px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
              Hình thức GTTD
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gold font-serif">5</div>
            <div className="text-[11px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
              Câu trắc nghiệm
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <Link
            href="/analysis"
            className="px-6 py-3.5 rounded-sm bg-[#9b1b1b] text-[#f4ebe0] font-bold text-sm shadow-md hover:bg-[#7f1515] transition-all flex items-center space-x-2 border border-[hsl(var(--marx-gold)/0.5)]"
          >
            <span>Đọc phân tích SS008.Q31</span>
            <ChevronRight className="w-4 h-4" />
          </Link>

          <Link
            href="/nen-tang"
            className="px-6 py-3.5 rounded-sm bg-marx-raised hover:bg-[hsl(var(--muted))] text-foreground border border-marx hover:border-[hsl(var(--marx-gold))] font-semibold text-sm transition-all flex items-center space-x-2"
          >
            <span>Nền tảng ngắn</span>
            <BookOpen className="w-4 h-4 text-gold" />
          </Link>

          <Link
            href="/quiz"
            className="px-6 py-3.5 rounded-sm bg-marx-raised hover:bg-[hsl(var(--muted))] text-gold border border-[hsl(var(--marx-gold)/0.45)] font-semibold text-sm transition-all flex items-center space-x-2"
          >
            <span>Trắc nghiệm</span>
            <Award className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mx-auto pt-8 flex flex-col items-center justify-center cursor-pointer text-muted-foreground hover:text-gold transition-colors bg-transparent border-0"
          onClick={() => {
            const el = document.getElementById("team");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
        >
          <span className="text-xs uppercase tracking-widest font-semibold mb-2">
            Cuộn xuống đội ngũ
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-gold" />
        </motion.button>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, BookOpen, Award, ChevronRight } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-slate-950 text-slate-100 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulseGlow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulseGlow pointer-events-none delay-1000" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-950/80 via-slate-900 to-amber-950/80 border border-red-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>CQ5 · Chương 3 (3.2–3.3) · UIT 2026</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold magazine-header tracking-tight leading-[1.1]">
            TIỀN NHIỀU ĐỂ LÀM GÌ?
          </h1>
          <p className="text-lg sm:text-2xl font-serif italic text-gradient-gold max-w-3xl mx-auto">
            Trả lời qua tích lũy tư bản và các hình thức biểu hiện giá trị thặng dư
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans"
        >
          Tạp chí số đồ án KTCT: nền tảng ngắn từ tiền đến tư bản, phân tích CQ5 (3.2–3.3),
          case thực tiễn, số liệu Việt Nam và trắc nghiệm.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-slate-800/80 shadow-2xl relative"
        >
          <div className="absolute -top-3 left-6 px-3 py-0.5 rounded bg-red-600 text-white text-[10px] uppercase font-bold tracking-widest">
            Thông điệp
          </div>
          <p className="text-sm sm:text-base font-serif italic text-slate-200 leading-relaxed pt-1">
            &ldquo;Tiền nhiều để chuyển thành tư bản tích cực: tái sản xuất mở rộng, phân phối GTTD
            hợp lý, và tạo giá trị sử dụng cho xã hội — không để tiền làm chủ con người.&rdquo;
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 max-w-2xl mx-auto gap-4 py-4 border-y border-slate-800/80 text-center"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">3.2</div>
            <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">
              Tích lũy tư bản
            </div>
          </div>
          <div className="border-x border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-red-500 font-serif">3.3</div>
            <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">
              Hình thức GTTD
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-yellow-400 font-serif">30</div>
            <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">
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
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 text-slate-950 font-bold text-sm shadow-xl shadow-red-600/20 hover:scale-105 transition-all flex items-center space-x-2"
          >
            <span>Đọc phân tích CQ5</span>
            <ChevronRight className="w-4 h-4" />
          </Link>

          <Link
            href="/nen-tang"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 hover:border-amber-500 font-semibold text-sm transition-all flex items-center space-x-2"
          >
            <span>Nền tảng ngắn</span>
            <BookOpen className="w-4 h-4 text-amber-400" />
          </Link>

          <Link
            href="/quiz"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-semibold text-sm transition-all flex items-center space-x-2"
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
          className="mx-auto pt-8 flex flex-col items-center justify-center cursor-pointer text-slate-500 hover:text-amber-400 transition-colors bg-transparent border-0"
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
          <ArrowDown className="w-4 h-4 animate-bounce text-amber-400" />
        </motion.button>
      </div>
    </section>
  );
}

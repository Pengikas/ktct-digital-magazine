"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles, BookOpen, Layers, Award, ChevronRight, Coins } from "lucide-react";

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950 text-slate-100 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80"
    >
      {/* Background Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulseGlow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulseGlow pointer-events-none delay-1000" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10 space-y-8">
        {/* Magazine Category Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-950/80 via-slate-900 to-amber-950/80 border border-red-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase shadow-xl"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "6s" }} />
          <span>Đồ án môn học Kinh tế Chính trị Mác - Lênin • UIT 2026</span>
        </motion.div>

        {/* Hero Title (Large Magazine Typography) */}
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
            Khám phá bản chất, nguồn gốc và 5 chức năng quan trọng của tiền tệ qua lăng kính Kinh tế Chính trị Mác - Lênin
          </p>
        </motion.div>

        {/* Hero Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans"
        >
          Trình bày theo phong cách Digital Magazine hiện đại. Kết hợp đầy đủ 100% nội dung lý luận học thuật, bộ 14 khái niệm cốt lõi, sơ đồ tư duy tương tác, dẫn chứng thực tiễn sinh động (Bill Gates, Rap Việt, Đen Vâu) và bộ trắc nghiệm 30 câu hỏi chuẩn xác.
        </motion.p>

        {/* Marx Quote Highlight Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-slate-800/80 shadow-2xl relative"
        >
          <div className="absolute -top-3 left-6 px-3 py-0.5 rounded bg-red-600 text-white text-[10px] uppercase font-bold tracking-widest">
            Trích dẫn Căn bản
          </div>
          <p className="text-sm sm:text-base font-serif italic text-slate-200 leading-relaxed pt-1">
            &ldquo;Tiền tệ không phải là vật chất, mà là một quan hệ xã hội được biểu hiện qua vật.&rdquo;
          </p>
          <span className="block mt-2 text-xs font-semibold text-amber-400 font-sans">
            — C. Mác • Tư bản luận, Quyển I
          </span>
        </motion.div>

        {/* Hero Quick Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 max-w-2xl mx-auto gap-4 py-4 border-y border-slate-800/80 text-center"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">5</div>
            <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">Chức năng Tiền tệ</div>
          </div>
          <div className="border-x border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-red-500 font-serif">4,000+</div>
            <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">Năm Lịch sử Tiền tệ</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-yellow-400 font-serif">180+</div>
            <div className="text-[11px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">Đồng tiền Thế giới</div>
          </div>
        </motion.div>

        {/* CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <button
            onClick={() => scrollToSection("theory")}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 text-slate-950 font-bold text-sm shadow-xl shadow-red-600/20 hover:scale-105 transition-all flex items-center space-x-2"
          >
            <span>Khám phá Lý thuyết</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection("analysis")}
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 hover:border-amber-500 font-semibold text-sm transition-all flex items-center space-x-2"
          >
            <span>Đọc Bài phân tích</span>
            <BookOpen className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={() => scrollToSection("quiz")}
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-semibold text-sm transition-all flex items-center space-x-2"
          >
            <span>Làm Trắc nghiệm (30 Câu)</span>
            <Award className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="pt-8 flex flex-col items-center justify-center cursor-pointer text-slate-500 hover:text-amber-400 transition-colors"
          onClick={() => scrollToSection("about")}
        >
          <span className="text-xs uppercase tracking-widest font-semibold mb-2">Cuộn xuống để khám phá</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-amber-400" />
        </motion.div>
      </div>
    </section>
  );
}

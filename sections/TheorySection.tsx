"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Scale,
  ArrowLeftRight,
  Vault,
  CreditCard,
  Globe,
  Coins,
  Sparkles,
  Layers,
  ArrowRight,
  Info,
  TrendingUp
} from "lucide-react";
import { CORE_CONCEPTS, MONEY_FUNCTIONS, VALUE_FORMS, CIRCULATION_COMPARISON, Concept, MoneyFunction, ValueForm } from "@/data/theoryData";

export function TheorySection() {
  // Concept Category Filter State
  const [activeCategory, setActiveCategory] = React.useState<"tất-cả" | "cơ-bản" | "nâng-cao" | "phân-phối">("tất-cả");
  const [expandedConceptId, setExpandedConceptId] = React.useState<string | null>(null);

  // Origin of Money Active Step
  const [activeFormStep, setActiveFormStep] = React.useState<number>(1);

  // Circulation Diagram Hover State
  const [hoveredCirculation, setHoveredCirculation] = React.useState<"simple" | "capital" | null>(null);

  const filteredConcepts = CORE_CONCEPTS.filter((c) => {
    if (activeCategory === "tất-cả") return true;
    return c.category === activeCategory;
  });

  const activeValueForm = VALUE_FORMS.find((f) => f.step === activeFormStep) || VALUE_FORMS[0];

  return (
    <section id="theory" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section Main Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Chương 3 Mác - Lênin • Lý thuyết Cốt lõi</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-white">
            DANH MỤC KHÁI NIỆM & LÝ THUYẾT TIỀN TỆ
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Nắm vững 14 khái niệm kinh tế chính trị căn bản, 5 chức năng của tiền tệ, 4 hình thái giá trị và hai công thức lưu thông H-T-H và T-H-T&apos;.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* PART 1: 14 CORE CONCEPTS EXPANDABLE CARDS */}
        {/* ========================================================================= */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
                Phần 1 • Hệ thống 14 Khái niệm
              </span>
              <h3 className="text-2xl font-bold font-serif text-white">
                Các Khái niệm Cốt lõi
              </h3>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Tất cả (14)", value: "tất-cả" },
                { label: "Cơ bản", value: "cơ-bản" },
                { label: "Nâng cao", value: "nâng-cao" },
                { label: "Phân phối", value: "phân-phối" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveCategory(tab.value as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeCategory === tab.value
                      ? "bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md"
                      : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Concepts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConcepts.map((item) => {
              const isExpanded = expandedConceptId === item.id;
              return (
                <motion.div
                  key={item.id}
                  layout
                  id={`concept-${item.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 rounded-2xl border transition-all ${
                    isExpanded
                      ? "bg-slate-900 border-amber-500/80 shadow-2xl ring-1 ring-amber-500/30"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold text-xs flex items-center justify-center border border-amber-500/20">
                      #{item.number}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        item.category === "cơ-bản"
                          ? "bg-blue-950 text-blue-300 border border-blue-800"
                          : item.category === "nâng-cao"
                          ? "bg-red-950 text-red-300 border border-red-800"
                          : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs font-mono text-amber-400/90 mb-3">
                    {item.originalTerm}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {item.definition}
                  </p>

                  {/* Extended Explanation Accordion */}
                  {item.extendedExplanation && (
                    <div className="mt-4 pt-3 border-t border-slate-800">
                      <button
                        onClick={() => setExpandedConceptId(isExpanded ? null : item.id)}
                        className="flex items-center space-x-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        <span>{isExpanded ? "Thu gọn phân tích" : "Xem phân tích mở rộng"}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-slate-400 mt-2 leading-relaxed bg-slate-950/80 p-3 rounded-lg border border-slate-800"
                          >
                            {item.extendedExplanation}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PART 2: 5 MONEY FUNCTIONS */}
        {/* ========================================================================= */}
        <div id="money-functions" className="space-y-8 pt-8">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              Lý thuyết Nền tảng
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
              5 Chức năng Cốt lõi của Tiền tệ
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Theo C.Mác, tiền tệ có 5 chức năng cơ bản. Mỗi chức năng phản ánh một khía cạnh của quan hệ sản xuất và trao đổi hàng hóa trong nền kinh tế.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MONEY_FUNCTIONS.map((func) => (
              <motion.div
                key={func.id}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-amber-500/60 transition-all shadow-xl space-y-4 relative overflow-hidden group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-black font-serif text-amber-500/40 group-hover:text-amber-500 transition-colors">
                    {func.number}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-950/80 text-red-300 border border-red-800">
                    {func.keyBadge}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {func.title}
                </h4>

                <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <p><strong className="text-amber-300">Định nghĩa:</strong> {func.definition}</p>
                  <p><strong className="text-red-400">Ví dụ thực tế:</strong> {func.example}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-400 leading-relaxed">
                  <strong className="text-slate-200">Phân tích học thuật:</strong> {func.detailedAnalysis}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PART 3: ORIGIN OF MONEY (4 VALUE FORMS TIMELINE) */}
        {/* ========================================================================= */}
        <div id="money-origin" className="space-y-8 pt-8">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              Lịch sử Phát triển
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
              Nguồn gốc Tiền tệ & 4 Hình thái Giá trị
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Tiền tệ không do ai quy định mà là kết quả phát triển tất yếu lâu dài của sản xuất và trao đổi hàng hóa qua 4 hình thái giá trị.
            </p>
          </div>

          {/* Timeline Step Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {VALUE_FORMS.map((form) => (
              <button
                key={form.step}
                onClick={() => setActiveFormStep(form.step)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  activeFormStep === form.step
                    ? "bg-gradient-to-r from-red-950/80 to-amber-950/80 border-amber-500 text-white shadow-lg"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="text-xs font-mono font-bold text-amber-400 mb-1">
                  BƯỚC 0{form.step}
                </div>
                <div className="text-sm font-bold truncate">{form.title}</div>
              </button>
            ))}
          </div>

          {/* Active Value Form Detail Display */}
          <motion.div
            key={activeValueForm.step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="p-8 rounded-3xl bg-slate-900 border border-amber-500/40 shadow-2xl space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                  Hình thái 0{activeValueForm.step} / 04
                </span>
                <h4 className="text-2xl font-bold font-serif text-white mt-1">
                  {activeValueForm.title}
                </h4>
                <span className="text-xs font-mono text-slate-400">{activeValueForm.subtitle}</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-950 border border-amber-500/30 text-amber-300 font-mono font-bold text-sm sm:text-base">
                {activeValueForm.formula}
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {activeValueForm.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <h5 className="text-xs font-bold uppercase text-amber-400 tracking-wider">
                  Đặc điểm cốt lõi:
                </h5>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                  {activeValueForm.characteristics.map((char, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h5 className="text-xs font-bold uppercase text-red-400 tracking-wider">
                  Bối cảnh lịch sử:
                </h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {activeValueForm.historicalContext}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* PART 4: COMMODITY CIRCULATION (H-T-H vs T-H-T') */}
        {/* ========================================================================= */}
        <div id="circulation-diagram" className="space-y-8 pt-8">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              Sơ đồ Tương tác
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
              Lưu thông Hàng hóa: H - T - H vs T - H - T&apos;
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              So sánh quy luật lưu thông hàng hóa giản đơn (H-T-H) và sự vận động của Tư bản (T-H-T&apos;). Click hoặc rê chuột vào các ô để khám phá ý nghĩa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Simple Circulation H-T-H */}
            <motion.div
              onMouseEnter={() => setHoveredCirculation("simple")}
              onMouseLeave={() => setHoveredCirculation(null)}
              className={`p-6 sm:p-8 rounded-3xl border transition-all cursor-pointer ${
                hoveredCirculation === "simple"
                  ? "bg-slate-900 border-amber-500 shadow-2xl scale-[1.02]"
                  : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-950 text-blue-300 border border-blue-800">
                  Lưu thông Giản đơn
                </span>
                <span className="text-xs font-mono text-slate-400">Mục đích: Giá trị sử dụng</span>
              </div>

              <div className="py-6 text-center bg-slate-950 rounded-2xl border border-slate-800 my-4">
                <div className="text-2xl sm:text-4xl font-extrabold font-mono text-amber-400 tracking-wider">
                  H — T — H&apos;
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Hàng hóa (Bán) ➔ Tiền tệ ➔ Hàng hóa mới (Mua)
                </p>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                <p>• <strong>Điểm khởi đầu & Kết thúc:</strong> Đều là Hàng hóa (H)</p>
                <p>• <strong>Môi giới trung gian:</strong> Tiền tệ (T)</p>
                <p>• <strong>Mục đích:</strong> Thỏa mãn nhu cầu sinh hoạt tiêu dùng cá nhân (Giá trị sử dụng)</p>
                <p>• <strong>Giới hạn:</strong> Kết thúc khi con người đạt được hàng hóa cần dùng</p>
              </div>
            </motion.div>

            {/* Capitalist Circulation T-H-T' */}
            <motion.div
              onMouseEnter={() => setHoveredCirculation("capital")}
              onMouseLeave={() => setHoveredCirculation(null)}
              className={`p-6 sm:p-8 rounded-3xl border transition-all cursor-pointer ${
                hoveredCirculation === "capital"
                  ? "bg-slate-900 border-red-500 shadow-2xl scale-[1.02]"
                  : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-red-950 text-red-300 border border-red-800">
                  Lưu thông Tư bản
                </span>
                <span className="text-xs font-mono text-slate-400">Mục đích: Giá trị thặng dư Δt</span>
              </div>

              <div className="py-6 text-center bg-slate-950 rounded-2xl border border-slate-800 my-4">
                <div className="text-2xl sm:text-4xl font-extrabold font-mono text-red-500 tracking-wider">
                  T — H — T&apos;
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Tiền (Đầu tư) ➔ Hàng (Sản xuất) ➔ Tiền lớn hơn (T&apos; = T + Δt)
                </p>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                <p>• <strong>Điểm khởi đầu & Kết thúc:</strong> Đều là Tiền tệ (T)</p>
                <p>• <strong>Môi giới trung gian:</strong> Hàng hóa đặc biệt (Sức lao động & Tư liệu sản xuất)</p>
                <p>• <strong>Mục đích:</strong> Giá trị thặng dư (Δt) — Sự lớn lên không ngừng của giá trị</p>
                <p>• <strong>Giới hạn:</strong> Vô hạn — Vòng quay liên tục để tích lũy tư bản</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

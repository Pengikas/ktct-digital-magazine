"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import {
  PRIMARY_CONCEPTS,
  SECONDARY_CONCEPTS,
  MONEY_FUNCTIONS,
  VALUE_FORMS,
} from "@/data/theoryData";

export function TheorySection() {
  const [expandedConceptId, setExpandedConceptId] = React.useState<string | null>(null);
  const [showAppendix, setShowAppendix] = React.useState(false);
  const [showSecondary, setShowSecondary] = React.useState(false);
  const [activeFormStep, setActiveFormStep] = React.useState<number>(1);
  const [hoveredCirculation, setHoveredCirculation] = React.useState<"simple" | "capital" | null>(null);

  const activeValueForm = VALUE_FORMS.find((f) => f.step === activeFormStep) || VALUE_FORMS[0];

  return (
    <section id="theory" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Nền tảng ngắn · Cầu nối Chương 2 → Chương 3</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-white">
            TỪ TIỀN ĐẾN TƯ BẢN
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Nắm nhanh H–T–H và T–H–T′, rồi các khái niệm cần cho CQ5 (3.2 Tích lũy tư bản &amp; 3.3
            Hình thức biểu hiện GTTD). Chi tiết Chương 2 (hình thái giá trị, 5 chức năng) nằm ở phụ lục.
          </p>
          <Link
            href="/analysis"
            className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 text-white text-sm font-semibold hover:opacity-95 transition-opacity"
          >
            Sang phần Phân tích CQ5
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* PART 1: Circulation first */}
        <div id="circulation-diagram" className="space-y-8">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              Cầu nối then chốt
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
              H – T – H so với T – H – T&apos;
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Tiền tiêu dùng (phương tiện) khác tiền tư bản (mục đích sinh giá trị thặng dư).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              onMouseEnter={() => setHoveredCirculation("simple")}
              onMouseLeave={() => setHoveredCirculation(null)}
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                hoveredCirculation === "simple"
                  ? "bg-slate-900 border-amber-500 shadow-2xl scale-[1.02]"
                  : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-950 text-blue-300 border border-blue-800">
                  Lưu thông giản đơn
                </span>
                <span className="text-xs font-mono text-slate-400">GTSD</span>
              </div>
              <div className="py-6 text-center bg-slate-950 rounded-2xl border border-slate-800 my-4">
                <div className="text-2xl sm:text-4xl font-extrabold font-mono text-amber-400 tracking-wider">
                  H — T — H&apos;
                </div>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                <p>• Mục đích: thỏa mãn nhu cầu sinh hoạt (giá trị sử dụng)</p>
                <p>• Tiền chỉ là môi giới trung gian</p>
                <p>• Kết thúc khi có hàng hóa cần dùng</p>
              </div>
            </motion.div>

            <motion.div
              onMouseEnter={() => setHoveredCirculation("capital")}
              onMouseLeave={() => setHoveredCirculation(null)}
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                hoveredCirculation === "capital"
                  ? "bg-slate-900 border-red-500 shadow-2xl scale-[1.02]"
                  : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-red-950 text-red-300 border border-red-800">
                  Lưu thông tư bản · Ch.3
                </span>
                <span className="text-xs font-mono text-slate-400">GTTD m</span>
              </div>
              <div className="py-6 text-center bg-slate-950 rounded-2xl border border-slate-800 my-4">
                <div className="text-2xl sm:text-4xl font-extrabold font-mono text-red-500 tracking-wider">
                  T — H — T&apos;
                </div>
                <p className="text-xs text-slate-400 mt-2">T&apos; = T + Δt (Δt gắn với m)</p>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                <p>• Mục đích: giá trị thặng dư m</p>
                <p>• Môi giới: sức lao động + tư liệu sản xuất</p>
                <p>• Vận động vô hạn → tích lũy tư bản (3.2)</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* PART 2: Primary concepts for CQ5 */}
        <div className="space-y-8">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              Khái niệm cần cho CQ5
            </span>
            <h3 className="text-2xl font-bold font-serif text-white mt-1">
              Tư bản · GTTD · Tích lũy · Phân phối (3.2–3.3)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRIMARY_CONCEPTS.map((item) => {
              const isExpanded = expandedConceptId === item.id;
              return (
                <motion.div
                  key={item.id}
                  layout
                  id={`concept-${item.id}`}
                  className={`p-6 rounded-2xl border transition-all ${
                    isExpanded
                      ? "bg-slate-900 border-amber-500/80 shadow-2xl"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold text-xs flex items-center justify-center border border-amber-500/20">
                      #{item.number}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
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
                  <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs font-mono text-amber-400/90 mb-3">{item.originalTerm}</p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.definition}</p>
                  {item.extendedExplanation && (
                    <div className="mt-4 pt-3 border-t border-slate-800">
                      <button
                        onClick={() => setExpandedConceptId(isExpanded ? null : item.id)}
                        className="flex items-center space-x-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
                      >
                        <span>{isExpanded ? "Thu gọn" : "Xem thêm"}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
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

          <div className="pt-2">
            <button
              onClick={() => setShowSecondary(!showSecondary)}
              className="text-xs font-semibold text-slate-400 hover:text-amber-400 flex items-center gap-1.5"
            >
              {showSecondary ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              {showSecondary ? "Ẩn khái niệm nền Chương 2" : "Hiện thêm khái niệm nền Chương 2 (HH, GTSD…)"}
            </button>
            <AnimatePresence>
              {showSecondary && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
                >
                  {SECONDARY_CONCEPTS.map((item) => (
                    <div
                      key={item.id}
                      id={`concept-${item.id}`}
                      className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80"
                    >
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.definition}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Appendix: C2 detail */}
        <div className="border border-slate-800 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowAppendix(!showAppendix)}
            className="w-full flex items-center justify-between px-5 py-4 bg-slate-900/80 text-left hover:bg-slate-900 transition-colors"
          >
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                Phụ lục Chương 2
              </span>
              <p className="text-sm font-semibold text-slate-200">
                5 chức năng tiền tệ &amp; 4 hình thái giá trị
              </p>
            </div>
            {showAppendix ? (
              <ChevronUp className="w-5 h-5 text-amber-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-500" />
            )}
          </button>

          <AnimatePresence>
            {showAppendix && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-5 pb-8 space-y-10 border-t border-slate-800"
              >
                <div id="money-functions" className="space-y-4 pt-6">
                  <h4 className="text-lg font-bold font-serif text-white">5 chức năng tiền tệ</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MONEY_FUNCTIONS.map((func) => (
                      <div
                        key={func.id}
                        className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2"
                      >
                        <div className="flex justify-between">
                          <span className="text-amber-500/50 font-black font-serif text-xl">
                            {func.number}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800">
                            {func.keyBadge}
                          </span>
                        </div>
                        <h5 className="font-bold text-white text-sm">{func.title}</h5>
                        <p className="text-xs text-slate-400 leading-relaxed">{func.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div id="money-origin" className="space-y-4">
                  <h4 className="text-lg font-bold font-serif text-white">4 hình thái giá trị</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {VALUE_FORMS.map((form) => (
                      <button
                        key={form.step}
                        onClick={() => setActiveFormStep(form.step)}
                        className={`p-3 rounded-xl border text-left text-xs ${
                          activeFormStep === form.step
                            ? "border-amber-500 bg-amber-950/40 text-white"
                            : "border-slate-800 text-slate-400"
                        }`}
                      >
                        <div className="font-mono text-amber-400 mb-1">0{form.step}</div>
                        <div className="font-bold line-clamp-2">{form.title}</div>
                      </button>
                    ))}
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="font-mono text-amber-300 text-sm">{activeValueForm.formula}</div>
                    <p className="text-sm text-slate-300">{activeValueForm.description}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

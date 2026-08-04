"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Quote,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  BarChart,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Layers,
  Calculator
} from "lucide-react";
import { CENTRAL_QUESTION_ANALYSIS, COUNTER_ARGUMENTS } from "@/data/analysisData";

export function AnalysisSection() {
  const [activeAnalysisId, setActiveAnalysisId] = React.useState<string>(
    CENTRAL_QUESTION_ANALYSIS[0].id
  );

  return (
    <section id="analysis" className="py-20 px-4 sm:px-6 lg:px-8 bg-page text-foreground relative">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="label-press mx-auto">
            <BarChart className="w-3.5 h-3.5" />
            <span>CQ5 · Chương 3 mục 3.2–3.3</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight heading-display leading-tight">
            TRẢ LỜI: TIỀN NHIỀU ĐỂ LÀM GÌ?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Trọng tâm đồ án: tích lũy tư bản (3.2) và các hình thức biểu hiện giá trị thặng dư (3.3),
            kết nối H–T–H → T–H–T′ và kết luận về của cải thực sự.
          </p>
        </div>

        {/* Storytelling Screen Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 border-b border-marx pb-4">
          {CENTRAL_QUESTION_ANALYSIS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveAnalysisId(sec.id)}
              className={`p-3 rounded-xl text-left border-2 transition-all ${
                activeAnalysisId === sec.id
                  ? "bg-marx-raised border-[hsl(var(--marx-gold))] text-foreground shadow-sm"
                  : "bg-[hsl(var(--background))]/60 border-marx text-muted-foreground hover:bg-[hsl(var(--muted))] hover:text-foreground"
              }`}
            >
              <div
                className={`text-[10px] font-mono font-bold ${
                  activeAnalysisId === sec.id ? "text-gold" : "text-muted-foreground"
                }`}
              >
                PHẦN {sec.sectionNumber}
              </div>
              <div className="text-xs font-bold truncate mt-0.5">{sec.title}</div>
            </button>
          ))}
        </div>

        {/* Long-form Storytelling Content Display */}
        {CENTRAL_QUESTION_ANALYSIS.map((sec) => {
          if (sec.id !== activeAnalysisId) return null;

          return (
            <motion.div
              key={sec.id}
              id={`analysis-${sec.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 p-6 sm:p-10 rounded-3xl bg-[hsl(var(--background))] border border-marx shadow-2xl"
            >
              {/* Screen Top Title & Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-marx pb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
                    Góc nhìn {sec.sectionNumber} / 05
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-bold font-serif text-foreground mt-1">
                    {sec.title}
                  </h3>
                  <p className="text-sm text-gold font-serif italic mt-1">
                    {sec.subtitle}
                  </p>
                </div>

                {sec.formulaBadge && (
                  <span className="px-4 py-2 rounded-xl bg-marx-raised border border-amber-500/40 text-gold font-mono font-bold text-xs sm:text-sm">
                    {sec.formulaBadge}
                  </span>
                )}
              </div>

              {/* Summary Lead Paragraph */}
              <div className="p-4 rounded-xl bg-marx-raised border-l-4 border-amber-500 text-sm sm:text-base text-foreground/90 font-serif leading-relaxed italic">
                {sec.summary}
              </div>

              {/* Body Content Paragraphs */}
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                {sec.contentParagraphs.map((para, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Magazine Pull Quote */}
              {sec.pullQuote && (
                <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-amber-950/40 border border-red-500/30 relative overflow-hidden">
                  <Quote className="absolute top-3 right-4 w-16 h-16 text-amber-500/10 pointer-events-none" />
                  <p className="text-base sm:text-xl font-serif italic text-amber-200 leading-relaxed relative z-10">
                    &ldquo;{sec.pullQuote.text}&rdquo;
                  </p>
                  <span className="block mt-3 text-xs font-bold uppercase tracking-wider text-red-400 font-sans">
                    — {sec.pullQuote.author}
                  </span>
                </div>
              )}

              {/* Callouts */}
              {sec.callouts && sec.callouts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sec.callouts.map((callout, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1.5 ${
                        callout.type === "warning"
                          ? "bg-red-950/40 border-red-800/80 text-red-200"
                          : callout.type === "info"
                          ? "bg-blue-950/40 border-blue-800/80 text-blue-200"
                          : "bg-amber-950/40 border-amber-800/80 text-amber-200"
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{callout.title}</span>
                      </div>
                      <p className="leading-relaxed opacity-90">{callout.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Key Takeaways */}
              <div className="pt-4 border-t border-marx space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Điểm cốt lõi rút ra:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {sec.keyTakeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-marx-raised border border-marx text-xs text-muted-foreground flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* ========================================================================= */}
        {/* COUNTER ARGUMENTS SECTION */}
        {/* ========================================================================= */}
        <div className="space-y-8 pt-10 border-t border-marx">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-gold uppercase tracking-widest">
              Phản Biện & Mở Rộng
            </span>
            <h3 className="text-2xl sm:text-4xl font-bold font-serif text-foreground">
              ĐỔI CHIẾU CÁC QUAN ĐIỂM XÃ HỘI
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
              So sánh 3 luồng quan điểm: &quot;Tiền là quan trọng nhất&quot;, &quot;Tiền không quan trọng&quot; và Quan điểm Cân bằng của Mác - Lênin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COUNTER_ARGUMENTS.map((arg) => (
              <motion.div
                key={arg.id}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-[hsl(var(--background))] border border-marx hover:border-amber-500/50 transition-all shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-foreground font-serif">{arg.title}</h4>
                    <p className="text-xs text-gold italic">{arg.subtitle}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-marx-raised text-xs text-muted-foreground border border-marx">
                    <strong className="text-red-400 block mb-1">Phê phán Mác - Lênin:</strong>
                    {arg.marxistCritique}
                  </div>

                  <div className="space-y-2 pt-2">
                    <h5 className="text-xs font-bold uppercase text-muted-foreground">Luận điểm phản biện:</h5>
                    {arg.arguments.map((item, idx) => (
                      <div key={idx} className="p-2.5 rounded bg-marx-raised text-xs space-y-1">
                        <span className="font-semibold text-gold block">• {item.point}</span>
                        <p className="text-muted-foreground leading-relaxed text-[11px]">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-gradient-to-r from-red-950/60 to-amber-950/60 border border-red-800/50 text-xs text-foreground/90 font-serif italic">
                  <strong>Kết luận:</strong> {arg.conclusion}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

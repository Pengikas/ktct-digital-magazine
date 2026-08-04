"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, CheckCircle2, BookOpen } from "lucide-react";
import { QA_ITEMS, QAItem } from "@/data/qaData";

export function QASection() {
  const [expandedQaId, setExpandedQaId] = React.useState<string | null>("qa-1");

  const toggleQa = (id: string) => {
    setExpandedQaId(expandedQaId === id ? null : id);
  };

  return (
    <section id="qa" className="py-20 px-4 sm:px-6 lg:px-8 bg-page text-foreground relative">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="label-press mx-auto">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Hỏi Đáp Phản Biện • Q&A System</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight heading-display">
            HỆ THỐNG CÂU HỎI & GIẢI ĐÁP PHẢN BIỆN
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Giải đáp sâu sắc các mâu thuẫn triết học xung quanh giá trị tiền bạc, hiện tượng sùng bái tiền tệ, sự hạnh phúc của người giàu & nghèo và câu trả lời chuẩn xác của Kinh tế Chính trị.
          </p>
        </div>

        {/* Accordion List */}
        <div id="qa-section" className="space-y-4">
          {QA_ITEMS.map((item) => {
            const isOpen = expandedQaId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-[hsl(var(--background))] border-amber-500/80 shadow-2xl"
                    : "bg-marx-raised border-marx hover:border-marx"
                }`}
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => toggleQa(item.id)}
                  className="w-full p-6 text-left flex justify-between items-center space-x-4 focus:outline-none"
                >
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-950 text-gold border border-amber-800">
                      {item.questionNumber} • {item.category}
                    </span>
                    <h3 className="text-base sm:text-xl font-bold font-serif text-foreground pt-1">
                      {item.question}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-sm bg-marx-raised flex items-center justify-center text-gold shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Accordion Expandable Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 pt-2 border-t border-marx space-y-4"
                    >
                      {/* Short Answer Lead */}
                      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/50 text-sm font-semibold text-gold">
                        {item.shortAnswer}
                      </div>

                      {/* Full Detailed Answer Paragraphs */}
                      <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans whitespace-pre-line bg-marx-raised p-4 rounded-xl border border-marx">
                        {item.fullAnswer}
                      </div>

                      {/* Key Points Checklist */}
                      <div className="space-y-2 pt-2">
                        <h4 className="text-xs font-bold uppercase text-muted-foreground">Tóm tắt các ý trọng tâm:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.keyPoints.map((pt, idx) => (
                            <div key={idx} className="p-2.5 rounded-lg bg-marx-raised text-xs text-muted-foreground flex items-center space-x-2 border border-marx">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

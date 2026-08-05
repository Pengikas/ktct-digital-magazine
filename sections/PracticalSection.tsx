"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Award, Music, HeartHandshake, AlertCircle, Quote, Sparkles, CheckCircle2 } from "lucide-react";
import { PRACTICAL_EXAMPLES, PracticalExample } from "@/data/practicalExamplesData";

export function PracticalSection() {
  const [activeCategory, setActiveCategory] = React.useState<"tất-cả" | "tài-chính-xã-hội" | "tha-hóa-tâm-lý" | "nghệ-thuật-đại-chúng">("tất-cả");

  const filteredExamples = PRACTICAL_EXAMPLES.filter((ex) => {
    if (activeCategory === "tất-cả") return true;
    return ex.category === activeCategory;
  });

  return (
    <section id="practical" className="py-20 px-4 sm:px-6 lg:px-8 bg-marx-surface text-foreground relative border-b border-marx">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="label-press mx-auto">
            <Award className="w-3.5 h-3.5" />
            <span>Thực Tiễn & Dẫn Chứng Real-World</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight heading-display">
            CÂU CHUYỆN THỰC TẾ & PHÂN TÍCH Ý NGHĨA
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Dẫn chứng từ các tỷ phú hàng đầu thế giới (Bill Gates, Warren Buffett), bi kịch sùng bái tiền tệ (Markus Persson) đến góc nhìn nghệ thuật đại chúng (Rap Việt, Đen Vâu, 14 Casper).
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: "Tất cả (6 Case Studies)", value: "tất-cả" },
            { label: "Tài chính & Xã hội", value: "tài-chính-xã-hội" },
            { label: "Tha hóa & Tâm lý", value: "tha-hóa-tâm-lý" },
            { label: "Nghệ thuật & Rap", value: "nghệ-thuật-đại-chúng" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveCategory(tab.value as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === tab.value
                  ? "bg-[#9b1b1b] text-[#f4ebe0] shadow-md"
                  : "bg-marx-raised text-muted-foreground hover:bg-[hsl(var(--muted))] hover:text-foreground border border-marx"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category color legend */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-muted-foreground border border-marx rounded-xl bg-marx-raised/60 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" aria-hidden />
            <span>
              <strong className="text-foreground">Xanh:</strong> Tài chính &amp; Xã hội
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-600 shrink-0" aria-hidden />
            <span>
              <strong className="text-foreground">Đỏ:</strong> Tha hóa &amp; Tâm lý
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-600 shrink-0" aria-hidden />
            <span>
              <strong className="text-foreground">Vàng:</strong> Nghệ thuật &amp; Rap
            </span>
          </div>
        </div>

        {/* Practical Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExamples.map((ex) => (
            <motion.div
              key={ex.id}
              id={`practical-${ex.id}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-sm bg-marx-raised border border-marx hover:border-[hsl(var(--marx-gold)/0.55)] transition-all shadow-xl flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
              
                
                
                {/* Visual Header / Ảnh nền phủ toàn bộ khung */}
                <div 
                  className="h-40 rounded-sm bg-[hsl(var(--background))] border border-marx p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-[hsl(var(--marx-gold)/0.4)] transition-colors bg-cover bg-center"
                  style={
                    ex.imageUrl 
                      ? { backgroundImage: `url('${ex.imageUrl}')` } 
                      : undefined
                  }
                >
                  {/* Lớp phủ tối (Overlay) giúp làm mờ ảnh nền để chữ hiển thị rõ ràng */}
                  {ex.imageUrl && (
                    <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />
                  )}

                  {/* Dòng trên: Badge & Chấm màu */}
                  <div className="flex justify-between items-start relative z-10">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-sm text-emerald-400 border border-marx">
                      {ex.badge}
                    </span>
                    <span
                      title={
                        ex.category === "tài-chính-xã-hội"
                          ? "Tài chính & Xã hội"
                          : ex.category === "tha-hóa-tâm-lý"
                            ? "Tha hóa & Tâm lý"
                            : "Nghệ thuật & Rap"
                      }
                      className={`w-3 h-3 rounded-full shrink-0 ${
                        ex.category === "tài-chính-xã-hội"
                          ? "bg-emerald-600"
                          : ex.category === "tha-hóa-tâm-lý"
                          ? "bg-red-600"
                          : "bg-amber-600"
                      }`}
                    />
                  </div>

                  {/* Dòng dưới: Tên & Mô tả ngắn */}
                  <div className="relative z-10">
                    <span className="text-[11px] font-mono text-stone-300 block drop-shadow-sm">{ex.subject}</span>
                    <p className="text-xs font-serif italic text-white line-clamp-2 leading-tight mt-0.5 drop-shadow">
                      {ex.imagePlaceholderText}
                    </p>
                  </div>
                </div>
              
                {/* Case Title */}
                <div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-500 transition-colors font-serif">
                    {ex.title}
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-500 font-serif italic mt-0.5">{ex.subtitle}</p>
                </div>

                {/* Reality Fact */}
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase text-muted-foreground">Thực tế diễn ra:</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans bg-marx-raised p-3 rounded-xl border border-marx">
                    {ex.fact}
                  </p>
                </div>

                {/* Marxist Analysis */}
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase text-gold">Phân tích góc nhìn Mác - Lênin:</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans bg-[hsl(var(--background))] p-3 rounded-xl border border-amber-900/30">
                    {ex.marxistAnalysis}
                  </p>
                </div>
              </div>

              {/* Takeaway Footer */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-800/50 text-xs text-emerald-200 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-medium">{ex.takeaway}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

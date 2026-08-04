"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";
import { TrendingUp, Award, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { STATS_TIMELINE, STATS_METADATA } from "@/data/statisticsData";

export function StatisticsSection() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="statistics" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-slate-100 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Bộ Số Liệu Thực Tiễn (2022 – 2025)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-white">
            TĂNG TRƯỞNG KINH TẾ & CHỈ SỐ HẠNH PHÚC
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Nền tảng vật chất của lực lượng sản xuất xã hội thể hiện qua số liệu GDP bình quân đầu người, Thu nhập, Tỷ lệ hộ nghèo đa chiều và Chỉ số Hạnh phúc Việt Nam.
          </p>
        </div>

        {/* Top Highlight Metric Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 shadow-xl"
          >
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">GDP Bình quân 2025</span>
            <div className="text-3xl sm:text-4xl font-extrabold font-serif text-white">$5,026</div>
            <p className="text-xs text-slate-400">USD/người/năm (Tăng từ 4.110 USD năm 2022)</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 shadow-xl"
          >
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Thu nhập hàng tháng</span>
            <div className="text-3xl sm:text-4xl font-extrabold font-serif text-white">~6.0 Tr</div>
            <p className="text-xs text-slate-400">VNĐ/tháng năm 2025 (Tăng từ 4,67 Tr VNĐ)</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 shadow-xl"
          >
            <span className="text-xs font-mono font-bold text-red-500 uppercase">Hộ nghèo Đa chiều</span>
            <div className="text-3xl sm:text-4xl font-extrabold font-serif text-white">&lt;1.5%</div>
            <p className="text-xs text-slate-400">Giảm mạnh từ 4,30% năm 2022</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 shadow-xl"
          >
            <span className="text-xs font-mono font-bold text-yellow-400 uppercase">Chỉ số Hạnh phúc</span>
            <div className="text-3xl sm:text-4xl font-extrabold font-serif text-white">Hạng 46</div>
            <p className="text-xs text-slate-400">Tăng 19 bậc (Từ vị trí 65 năm 2022)</p>
          </motion.div>
        </div>

        {/* Charts Grid */}
        {mounted && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Chart 1: GDP per Capita & Monthly Income */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold font-serif text-white">
                  Tăng trưởng GDP & Thu nhập (2022–2025)
                </h3>
                <span className="text-[10px] font-mono uppercase bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                  GSO VietNam
                </span>
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={STATS_TIMELINE}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                    />
                    <Legend />
                    <Bar dataKey="gdpPerCapitaUSD" name="GDP (USD/người)" fill="#d97706" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Multidimensional Poverty & World Happiness Rank */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold font-serif text-white">
                  Tỷ lệ Nghèo & Thăng hạng Hạnh phúc
                </h3>
                <span className="text-[10px] font-mono uppercase bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-800">
                  UN SDSN & Bộ LĐTBXH
                </span>
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={STATS_TIMELINE}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", color: "#fff" }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="povertyRatePercent" name="Tỷ lệ Nghèo (%)" stroke="#ef4444" strokeWidth={3} dot={{ r: 6 }} />
                    <Line type="monotone" dataKey="happinessRank" name="Thứ hạng Hạnh phúc" stroke="#eab308" strokeWidth={3} dot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Academic Commentary Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-4 shadow-2xl">
          <h3 className="text-xl font-bold font-serif text-amber-400">
            Nhận xét Lý luận & Đúc kết Từ Số liệu:
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans italic">
            &quot;{STATS_METADATA.analyticalSummary}&quot;
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {STATS_METADATA.keyTakeaways.map((point, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-500 space-y-1">
            <span className="font-semibold text-slate-400 block">Nguồn trích dẫn uy tín:</span>
            {STATS_METADATA.sources.map((src, i) => (
              <p key={i}>• {src}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

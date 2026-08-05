"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, Layers, Download, ExternalLink, Monitor, LayoutGrid, FileText } from "lucide-react";
import { PageNavigation } from "@/components/PageNavigation";
import { PageTransition } from "@/components/PageTransition";
import { Flipbook } from "@/components/magazine/Flipbook";

export default function MagazinePage() {
  const [viewMode, setViewMode] = React.useState<"native" | "pdf">("native");

  return (
    <PageTransition>
      <div className="min-h-screen bg-[hsl(var(--background))] text-foreground py-10 px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Banner */}
        <section className="max-w-5xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>ẤN PHẨM TẠP CHÍ SỐ CHUYÊN ĐỀ (FLIPBOOK &amp; PDF)</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl sm:text-5xl font-black font-serif tracking-tight"
          >
            <span className="text-gradient-marx">TẠP CHÍ KINH TẾ CHÍNH TRỊ MÁC - LÊNIN</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Nội dung bài làm chuyên đề <strong>&ldquo;TIỀN NHIỀU ĐỂ LÀM GÌ?&rdquo;</strong> — Đầy đủ 6 phần: Khái niệm cốt lõi, 2 hình thái lưu thông (H—T—H &amp; T—H—T'), Giá trị thặng dư &amp; Của cải thực sự, Phản biện 2 luồng quan điểm, Bộ số liệu Việt Nam (2022–2025), Case studies Bill Gates, Markus Persson, Rap Việt và Bài học sinh viên.
          </motion.p>

          {/* Action Buttons & Mode Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="pt-2 flex flex-wrap justify-center items-center gap-3"
          >
            {/* Download PDF Button */}
            <a
              href="/documents/KTCT_Digital_Magazine_Chuyen_De_Tien_Nhieu_De_Lam_Gi.pdf"
              download="KTCT_Digital_Magazine_Chuyen_De_Tien_Nhieu_De_Lam_Gi.pdf"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all flex items-center space-x-2 border border-amber-400/30"
            >
              <Download className="w-4 h-4" />
              <span>Tải file PDF Tạp chí chính thức (1.6 MB)</span>
            </a>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-900/80 border border-amber-500/30 text-xs font-semibold">
              <button
                onClick={() => setViewMode("native")}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === "native"
                    ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Bản 3D Interactive Flipbook</span>
              </button>
              <button
                onClick={() => setViewMode("pdf")}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === "pdf"
                    ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Bản Đọc PDF Gốc (6 Trang)</span>
              </button>
            </div>
          </motion.div>
        </section>

        {/* Magazine Viewer Stage */}
        <section className="max-w-5xl mx-auto">
          {viewMode === "native" ? (
            <Flipbook />
          ) : (
            <div className="space-y-4">
              {/* PDF Viewer Container */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-slate-950">
                <iframe
                  src="/documents/KTCT_Digital_Magazine_Chuyen_De_Tien_Nhieu_De_Lam_Gi.pdf#toolbar=1&navpanes=1&view=FitH"
                  title="PDF Reader - Chuyên đề KTCT Tiền Nhiều Để Làm Gì"
                  className="w-full h-[650px] sm:h-[820px] border-0"
                />
              </div>

              <div className="flex flex-wrap justify-between items-center text-xs text-muted-foreground px-2 gap-2">
                <span>Hiển thị đầy đủ 6 trang bản thảo chính thức chuyên đề &ldquo;Tiền Nhiều Để Làm Gì?&rdquo;</span>
                <a
                  href="/documents/KTCT_Digital_Magazine_Chuyen_De_Tien_Nhieu_De_Lam_Gi.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-gold hover:underline font-semibold"
                >
                  <span>Mở PDF toàn màn hình</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </section>

        <PageNavigation />
      </div>
    </PageTransition>
  );
}

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { PageNavigation } from "@/components/PageNavigation";
import { PageTransition } from "@/components/PageTransition";
import { Flipbook } from "@/components/magazine/Flipbook";

export default function MagazinePage() {
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
            <span>ẤN PHẨM TẠP CHÍ SỐ CHUYÊN ĐỀ 3D INTERACTIVE FLIPBOOK</span>
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
        </section>

        {/* Magazine Viewer Stage */}
        <section className="max-w-5xl mx-auto">
          <Flipbook />
        </section>

        <PageNavigation />
      </div>
    </PageTransition>
  );
}

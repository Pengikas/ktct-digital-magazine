"use client";

import { motion } from "framer-motion";
import { BookOpen, Sparkles, Layers, Download } from "lucide-react";
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
            <span>ẤN PHẨM TẠP CHÍ SỐ TƯƠNG TÁC (FLIPBOOK 3D)</span>
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
            Lật xem ấn phẩm sách điện tử với đầy đủ nội dung lý luận <strong>Chương 3</strong>, phân tích 2 hình thái lưu thông <strong>(H—T—H &amp; T—H—T')</strong>, dẫn chứng số liệu thực tiễn Việt Nam (2022–2025) và các câu chuyện từ Tỷ phú đến Rap Việt.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="pt-2 flex flex-wrap justify-center gap-4"
          >
            <a
              href="/documents/KTCT_Digital_Magazine_Chuyen_De_Tien_Nhieu_De_Lam_Gi.pdf"
              download="KTCT_Digital_Magazine_Chuyen_De_Tien_Nhieu_De_Lam_Gi.pdf"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold text-sm shadow-xl hover:scale-105 transition-all flex items-center space-x-2 border border-amber-400/30"
            >
              <Download className="w-4 h-4" />
              <span>Tải file PDF Tạp chí chính thức (1.7 MB)</span>
            </a>
          </motion.div>
        </section>

        {/* 3D Interactive Flipbook Magazine */}
        <section className="max-w-5xl mx-auto">
          <Flipbook />
        </section>

        <PageNavigation />
      </div>
    </PageTransition>
  );
}

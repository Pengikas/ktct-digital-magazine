"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";
import { PageNavigation } from "@/components/PageNavigation";
import { PageTransition } from "@/components/PageTransition";

function FlipbookSkeleton() {
  return (
    <div
      className="relative w-full flex flex-col items-center justify-center min-h-[820px] p-6 rounded-2xl border border-marx bg-marx-raised text-foreground overflow-hidden"
      aria-busy="true"
      aria-label="Đang tải tạp chí số"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--marx-gold)/0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--marx-crimson))] via-[hsl(var(--marx-gold))] to-[hsl(var(--marx-crimson))]" />
      <div className="w-full max-w-md space-y-5 text-center z-10">
        <div className="mx-auto w-14 h-14 rounded-xl bg-gradient-to-br from-[hsl(var(--marx-crimson))] to-[hsl(var(--marx-gold))] flex items-center justify-center shadow-lg animate-pulse border border-[hsl(var(--marx-gold)/0.4)]">
          <BookOpen className="w-7 h-7 text-[hsl(var(--primary-foreground))]" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-bold text-gold font-serif tracking-wide">
            Đang dựng Flipbook 3D…
          </p>
          <p className="text-xs text-muted-foreground">
            Tải engine lật trang và nội dung tạp chí
          </p>
        </div>
        <div className="h-1.5 w-full rounded-full bg-marx-surface border border-marx overflow-hidden">
          <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-[hsl(var(--marx-crimson))] to-[hsl(var(--marx-gold))] animate-[pulse_1.2s_ease-in-out_infinite]" />
        </div>
        <div className="mx-auto w-[min(100%,280px)] aspect-[3/4] rounded-xl border border-marx bg-marx-surface animate-pulse" />
      </div>
    </div>
  );
}

const Flipbook = dynamic(
  () =>
    import("@/components/magazine/Flipbook").then((m) => ({
      default: m.Flipbook,
    })),
  {
    ssr: false,
    loading: () => <FlipbookSkeleton />,
  }
);

export default function MagazinePage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[hsl(var(--background))] text-foreground py-10 px-4 sm:px-6 lg:px-8 space-y-10">
        <section className="max-w-5xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[hsl(var(--marx-crimson)/0.1)] border border-[hsl(var(--marx-crimson)/0.3)] text-[hsl(var(--marx-crimson))] text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4 text-gold" />
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

        <section className="max-w-5xl mx-auto">
          <Flipbook />
        </section>

        <PageNavigation />
      </div>
    </PageTransition>
  );
}

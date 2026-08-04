"use client";

import { motion } from "framer-motion";
import { BookOpen, Sparkles, Construction } from "lucide-react";
import { PageNavigation } from "@/components/PageNavigation";
import { PageTransition } from "@/components/PageTransition";

export default function MagazinePage() {
  return (
    <PageTransition>
      <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 15, delay: 0.1 }}
            className="inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-gradient-to-br from-red-600 via-amber-500 to-yellow-500 text-white shadow-2xl shadow-red-500/30 mx-auto"
          >
            <BookOpen className="w-14 h-14" />
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-3"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <Construction className="w-3.5 h-3.5" />
              <span>Đang phát triển</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-tight">
              <span className="text-gradient-gold">TẠP CHÍ</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-600 dark:text-slate-300 font-serif">
              Coming Soon
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto"
          >
            Phiên bản tạp chí số đầy đủ đang được biên soạn với nội dung học thuật chuyên sâu,
            hình ảnh minh họa chất lượng cao và trải nghiệm đọc tương tác hiện đại. Hãy chờ đón nhé!
          </motion.p>

          {/* Decorative animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex items-center justify-center gap-2 pt-4"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-amber-500"
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </motion.div>
        </div>
      </section>
      <PageNavigation />
    </PageTransition>
  );
}

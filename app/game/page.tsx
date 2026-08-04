"use client";

import { motion } from "framer-motion";
import { Gamepad2, Sparkles, Construction } from "lucide-react";
import { PageNavigation } from "@/components/PageNavigation";
import { PageTransition } from "@/components/PageTransition";

export default function GamePage() {
  return (
    <PageTransition>
      <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8 max-w-2xl mx-auto">
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 15, delay: 0.1 }}
            className="inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-500 text-white shadow-2xl shadow-purple-500/30 mx-auto"
          >
            <Gamepad2 className="w-14 h-14" />
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-3"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider">
              <Construction className="w-3.5 h-3.5" />
              <span>Đang phát triển</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold font-serif tracking-tight">
              <span className="text-gradient-marx">GAME</span>
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
            Chúng mình đang xây dựng một trải nghiệm game tương tác thú vị liên quan đến kiến thức
            Kinh tế Chính trị Mác - Lênin. Hãy quay lại sau nhé!
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
                className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"
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

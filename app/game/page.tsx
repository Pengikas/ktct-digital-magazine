"use client";

import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import { PageNavigation } from "@/components/PageNavigation";
import { PageTransition } from "@/components/PageTransition";
import { ReignsGame } from "@/components/game/ReignsGame";

export default function GamePage() {
  return (
    <PageTransition>
      <section className="px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 15, delay: 0.1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#9b1b1b] via-[#cda86f] to-[#225180] text-white shadow-2xl shadow-black/30 mx-auto border border-[#cda86f]/40"
          >
            <Gamepad2 className="w-10 h-10" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight">
              <span className="text-gradient-marx">CÁN CÂN QUYỀN LỰC</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Nhập vai CEO điều hành tập đoàn qua 12 tháng. Vuốt thẻ để đưa ra quyết định và cân
              bằng giữa Tài chính, Sản phẩm, Nhân lực và Uy tín — bài học thực tiễn về Kinh tế
              Chính trị Mác - Lênin.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <ReignsGame />
        </motion.div>
      </section>
      <PageNavigation />
    </PageTransition>
  );
}

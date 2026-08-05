"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Target, Compass, Lightbulb, History, ArrowRight } from "lucide-react";
import Link from "next/link";

const MONEY_EVOLUTION_TIMELINE = [
  {
    step: "01",
    title: "Hàng đổi hàng (Barter Era)",
    badge: "Thời kỳ sơ khai",
    description: "Con người trao đổi trực tiếp vật phẩm lấy vật phẩm (H - H'). Không có thước đo chung, hoàn toàn phụ thuộc vào nhu cầu ngẫu nhiên kép.",
    icon: "🌾"
  },
  {
    step: "02",
    title: "Tiền kim loại (Metal Money)",
    badge: "Vàng & Bạc",
    description: "Sự xuất hiện của vàng và bạc làm vật ngang giá chung cố định. Đánh dấu bước ngoặt lớn trong đo lường và cất trữ giá trị.",
    icon: "🪙"
  },
  {
    step: "03",
    title: "Tiền giấy (Paper Money)",
    badge: "Pháp định (Fiat)",
    description: "Đại diện cho tiền kim loại trong lưu thông giúp vận chuyển dễ dàng. Dấu ấn của sự tín nhiệm và quyền lực nhà nước phát hành.",
    icon: "💵"
  },
  {
    step: "04",
    title: "Tiền tín dụng (Credit Money)",
    badge: "Ngân hàng & Thẻ",
    description: "Giao dịch dựa trên niềm tin vào hệ thống ngân hàng. Thẻ tín dụng, séc làm mờ đi ranh giới của tiền vật lý.",
    icon: "💳"
  },
  {
    step: "05",
    title: "Tiền điện tử (E-Money)",
    badge: "Ví điện tử & QR",
    description: "Kỷ nguyên số hóa, ví điện tử, thanh toán ứng dụng di động và giao dịch không chạm. Tốc độ lưu thông đạt mức tối đa.",
    icon: "📱"
  },
  {
    step: "06",
    title: "Tiền mã hóa (Cryptocurrency)",
    badge: "Blockchain",
    description: "Phi tập trung, công nghệ chuỗi khối. Một khái niệm mới thách thức các lý thuyết tiền tệ truyền thống và chủ quyền tiền tệ.",
    icon: "⚡"
  }
];

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-28 py-20 px-4 sm:px-6 lg:px-8 bg-marx-surface text-foreground relative border-b border-marx">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="label-press mx-auto">
            <History className="w-3.5 h-3.5" />
            <span>Tổng quan Dự án & Lịch sử</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight heading-display">
            GIỚI THIỆU ĐỒ ÁN
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            SS008.Q31: &quot;Tiền nhiều để làm gì?&quot; — trình bày dưới góc Chương 3 (Tích lũy tư bản &amp;
            Hình thức biểu hiện giá trị thặng dư).
          </p>
        </div>

        {/* Project Goals Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-marx-raised border border-marx shadow-xl space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-gold flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-serif text-foreground">Tầm nhìn & Mục tiêu</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Số hóa kiến thức Kinh tế Chính trị, biến những lý luận trừu tượng của C.Mác thành giao diện báo chí kỹ thuật số dễ tiếp cận cho sinh viên UIT và cộng đồng người học.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-marx-raised border border-marx shadow-xl space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-serif text-foreground">Phạm vi Nghiên cứu</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Trọng tâm SS008.Q31 Chương 3: tích lũy tư bản và các hình thức biểu hiện giá trị thặng dư
              (lợi nhuận, lợi tức, địa tô). Nền Chương 2 chỉ làm cầu nối ngắn (H–T–H → T–H–T′).
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-marx-raised border border-marx shadow-xl space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-serif text-foreground">Phương pháp & Ý nghĩa</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Kết hợp lý luận Mác - Lênin với dẫn chứng thực tiễn kinh tế Việt Nam (GDP, nghèo đa chiều, chỉ số hạnh phúc) và nghệ thuật đại chúng, tránh sùng bái tiền tệ.
            </p>
          </motion.div>
        </div>

        {/* Compact money history + link to appendix */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-marx pb-4 gap-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                Bối cảnh phụ
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-foreground">
                Tiến trình tiền tệ (rút gọn)
              </h3>
            </div>
            <Link
              href="/nen-tang"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-gold"
            >
              Xem phụ lục Chương 2 ở Nền tảng
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {MONEY_EVOLUTION_TIMELINE.map((item) => (
              <div
                key={item.step}
                className="p-4 rounded-xl bg-[hsl(var(--background))] border border-marx text-center space-y-1.5"
              >
                <div className="text-2xl sm:text-3xl leading-none">{item.icon}</div>
                <div className="text-xs font-mono text-red-400">{item.step}</div>
                <div className="text-xs sm:text-sm font-semibold text-foreground leading-snug">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

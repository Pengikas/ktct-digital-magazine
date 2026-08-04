"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Target, Compass, BookCheck, Lightbulb, CheckCircle2, History, ArrowRight } from "lucide-react";
import { PROJECT_INFO } from "@/data/teamData";

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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-slate-100 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-red-400 text-xs font-semibold uppercase tracking-wider">
            <History className="w-3.5 h-3.5" />
            <span>Tổng quan Dự án & Lịch sử</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight">
            GIỚI THIỆU ĐỒ ÁN & TIẾN TRÌNH TIỀN TỆ
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Hành trình chuyển hóa kiến thức Kinh tế Chính trị Mác - Lênin từ những lý luận học thuật thuần túy thành trải nghiệm số đa phương tiện trực quan.
          </p>
        </div>

        {/* Project Goals Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 shadow-xl space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-serif text-white">Tầm nhìn & Mục tiêu</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Số hóa kiến thức Kinh tế Chính trị, biến những lý luận trừu tượng của C.Mác thành giao diện báo chí kỹ thuật số dễ tiếp cận cho sinh viên UIT và cộng đồng người học.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 shadow-xl space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-serif text-white">Phạm vi Nghiên cứu</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tập trung phân tích sâu sắc nguồn gốc, bản chất và 5 chức năng của tiền tệ theo học thuyết giá trị và học thuyết giá trị thặng dư của C.Mác trong Chương 3.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 shadow-xl space-y-3"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold font-serif text-white">Phương pháp & Ý nghĩa</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Kết hợp lý luận Mác - Lênin với dẫn chứng thực tiễn kinh tế Việt Nam (GDP, nghèo đa chiều, chỉ số hạnh phúc) và nghệ thuật đại chúng, tránh sùng bái tiền tệ.
            </p>
          </motion.div>
        </div>

        {/* Money History Timeline */}
        <div className="space-y-8 pt-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Lịch sử Phát triển
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Tiến trình Lịch sử của Tiền tệ
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-md mt-2 md:mt-0">
              Tiền tệ trải qua các nấc thang tiến hóa từ hàng đổi hàng thô sơ đến kỷ nguyên số hóa và tiền mã hóa phi tập trung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MONEY_EVOLUTION_TIMELINE.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 transition-all space-y-3 relative group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-amber-400 border border-amber-900/50">
                    {item.badge}
                  </span>
                </div>
                <div className="text-xs font-mono font-bold text-red-500">GIAI ĐOẠN {item.step}</div>
                <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

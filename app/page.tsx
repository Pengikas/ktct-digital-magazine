"use client";

import { HeroSection } from "@/sections/HeroSection";
import { TeamSection } from "@/sections/TeamSection";
import { PageTransition } from "@/components/PageTransition";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  History,
  Layers,
  FileText,
  BarChart3,
  Globe,
  Network,
  HelpCircle,
  CheckSquare,
  Gamepad2,
  BookOpen,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface TopicCard {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<any>;
  gradient: string;
  badge?: string;
  tag: string;
  comingSoon?: boolean;
}

const TOPICS: TopicCard[] = [
  {
    title: "Giới thiệu & Lịch sử",
    description: "Khám phá tổng quan đồ án tạp chí số và tiến trình 6 giai đoạn phát triển tiền tệ trong lịch sử loài người.",
    href: "/about",
    icon: History,
    gradient: "from-red-600 to-amber-500",
    tag: "Lịch sử",
  },
  {
    title: "Hệ thống Lý luận",
    description: "Hệ thống hóa 14 khái niệm học thuật cốt lõi, 5 chức năng tiền tệ và 4 hình thái giá trị kinh điển.",
    href: "/theory",
    icon: Layers,
    gradient: "from-amber-500 to-yellow-400",
    tag: "Chương 3 Mác - Lênin",
    badge: "Trọng tâm",
  },
  {
    title: "Bài phân tích chuyên sâu",
    description: "Mổ xẻ câu hỏi thời đại 'Tiền nhiều để làm gì?' qua lăng kính giá trị thặng dư và sự sùng bái tiền tệ.",
    href: "/analysis",
    icon: FileText,
    gradient: "from-rose-500 to-red-600",
    tag: "Phân tích",
  },
  {
    title: "Số liệu & Thống kê",
    description: "Biểu đồ trực quan hóa dữ liệu GDP thực tế và chỉ số hạnh phúc quốc gia một cách khoa học.",
    href: "/statistics",
    icon: BarChart3,
    gradient: "from-blue-600 to-indigo-500",
    tag: "Dữ liệu lớn",
  },
  {
    title: "Case Studies Thực tiễn",
    description: "Dẫn chứng sinh động từ cuộc đời Bill Gates, Warren Buffett, Notch đến âm nhạc Rap Việt và Đen Vâu.",
    href: "/practical-examples",
    icon: Globe,
    gradient: "from-emerald-500 to-teal-600",
    tag: "Thực tiễn",
  },
  {
    title: "Sơ đồ Tư duy Tương tác",
    description: "Bản đồ tri thức số hóa giúp liên kết trực quan các mạng lưới lý thuyết và bài học kinh tế chính trị.",
    href: "/knowledge-map",
    icon: Network,
    gradient: "from-purple-600 to-fuchsia-500",
    tag: "Mindmap",
    badge: "Tương tác",
  },
  {
    title: "Hỏi đáp & Phản biện",
    description: "Góc thảo luận giải đáp các câu hỏi học thuật hóc búa và lật ngược vấn đề một cách đa chiều.",
    href: "/qa",
    icon: HelpCircle,
    gradient: "from-sky-500 to-blue-600",
    tag: "Thảo luận",
  },
  {
    title: "Trắc nghiệm 30 câu",
    description: "Thử thách trí nhớ và củng cố tri thức qua bộ câu hỏi trắc nghiệm tự động có tính điểm và xếp hạng.",
    href: "/quiz",
    icon: CheckSquare,
    gradient: "from-orange-500 to-amber-500",
    tag: "Luyện tập",
    badge: "30 Câu",
  },
  {
    title: "Game",
    description: "Trải nghiệm game tương tác vui nhộn giúp ghi nhớ kiến thức Kinh tế Chính trị Mác - Lênin một cách tự nhiên.",
    href: "/game",
    icon: Gamepad2,
    gradient: "from-purple-600 to-pink-500",
    tag: "Giải trí",
    badge: "Coming Soon",
    comingSoon: true,
  },
  {
    title: "Tạp Chí",
    description: "Phiên bản tạp chí số đầy đủ với nội dung học thuật chuyên sâu, hình ảnh minh họa và trải nghiệm đọc hiện đại.",
    href: "/magazine",
    icon: BookOpen,
    gradient: "from-red-600 to-amber-500",
    tag: "Xuất bản",
    badge: "Coming Soon",
    comingSoon: true,
  },
];

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  } as const;

  return (
    <PageTransition>
      <div className="space-y-0 min-h-screen">
        <HeroSection />

        {/* Dashboard Section */}
        <section id="dashboard" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
          {/* Title */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mục lục tạp chí</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight leading-tight text-slate-900 dark:text-white">
              NỘI DUNG CHUYÊN ĐỀ
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base font-serif italic">
              Chọn một chủ đề bất kỳ dưới đây để bắt đầu hành trình khám phá kiến thức Kinh tế Chính trị Mác - Lênin
            </p>
          </div>

          {/* Card Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {TOPICS.map((topic) => {
              const Icon = topic.icon;
              return (
                <motion.div
                  key={topic.href}
                  variants={itemVariants}
                  className={`group relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-8 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm ${topic.comingSoon ? "opacity-75" : ""}`}
                >
                  {/* Decorative background glow on hover */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${topic.gradient} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 rounded-bl-full transition-opacity duration-300 pointer-events-none`} />

                  <div className="space-y-6">
                    {/* Top Bar inside card */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center text-white shadow-lg`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                          {topic.tag}
                        </span>
                        {topic.badge && (
                          <span className={`text-[9px] font-bold text-white px-2 py-0.5 rounded-full uppercase tracking-wider ${topic.comingSoon ? "bg-slate-500 animate-pulse" : "bg-red-600 animate-pulse"}`}>
                            {topic.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-amber-400 transition-colors font-serif">
                        {topic.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-sans">
                        {topic.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Link Action */}
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60 mt-6 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors">
                      {topic.comingSoon ? "Sắp ra mắt" : "Khám phá ngay"}
                    </span>
                    <Link
                      href={topic.href}
                      className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center group-hover:bg-amber-500 dark:group-hover:bg-amber-400 group-hover:text-slate-950 dark:group-hover:text-slate-950 transition-all transform group-hover:translate-x-1 shadow-inner"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Team Section embedded in homepage */}
        <TeamSection />
      </div>
    </PageTransition>
  );
}

"use client";

import { HeroSection } from "@/sections/HeroSection";
import { TeamSection } from "@/sections/TeamSection";
import { PageTransition } from "@/components/PageTransition";
import { PageNavigation } from "@/components/PageNavigation";
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
  Sparkles,
} from "lucide-react";

interface TopicCard {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  badge?: string;
  tag: string;
  comingSoon?: boolean;
}

const TOPICS: TopicCard[] = [
  {
    title: "Giới thiệu & Lịch sử",
    description:
      "Khám phá tổng quan đồ án tạp chí số và tiến trình 6 giai đoạn phát triển tiền tệ trong lịch sử loài người.",
    href: "/about",
    icon: History,
    gradient: "from-red-600 to-amber-500",
    tag: "Lịch sử",
  },
  {
    title: "Nền tảng lý luận",
    description:
      "Cầu nối Chương 2→3: H–T–H / T–H–T′, tư bản, giá trị thặng dư và các khái niệm cần cho SS008.Q31.",
    href: "/nen-tang",
    icon: Layers,
    gradient: "from-amber-500 to-yellow-400",
    tag: "Chương 2→3",
    badge: "Trọng tâm",
  },
  {
    title: "Bài phân tích chuyên sâu",
    description:
      "Mổ xẻ câu hỏi thời đại 'Tiền nhiều để làm gì?' qua lăng kính giá trị thặng dư và sự sùng bái tiền tệ.",
    href: "/analysis",
    icon: FileText,
    gradient: "from-rose-500 to-red-600",
    tag: "Phân tích",
  },
  {
    title: "Case Studies Thực tiễn",
    description:
      "Dẫn chứng sinh động từ cuộc đời Bill Gates, Warren Buffett, Notch đến âm nhạc Rap Việt và Đen Vâu.",
    href: "/practical-examples",
    icon: Globe,
    gradient: "from-emerald-500 to-teal-600",
    tag: "Thực tiễn",
  },
  {
    title: "Số liệu & Thống kê",
    description:
      "Biểu đồ trực quan hóa dữ liệu GDP thực tế và chỉ số hạnh phúc quốc gia một cách khoa học.",
    href: "/statistics",
    icon: BarChart3,
    gradient: "from-blue-600 to-indigo-500",
    tag: "Dữ liệu lớn",
  },
  {
    title: "Sơ đồ Tư duy Tương tác",
    description:
      "Bản đồ tri thức số hóa giúp liên kết trực quan các mạng lưới lý thuyết và bài học kinh tế chính trị.",
    href: "/knowledge-map",
    icon: Network,
    gradient: "from-purple-600 to-fuchsia-500",
    tag: "Mindmap",
    badge: "Tương tác",
  },
  {
    title: "Hỏi đáp & Phản biện",
    description:
      "Góc thảo luận giải đáp các câu hỏi học thuật hóc búa và lật ngược vấn đề một cách đa chiều.",
    href: "/qa",
    icon: HelpCircle,
    gradient: "from-sky-500 to-blue-600",
    tag: "Thảo luận",
  },
  {
    title: "Trắc nghiệm 5 câu",
    description:
      "Thử thách trí nhớ và củng cố tri thức qua bộ 5 câu hỏi trắc nghiệm tự động có tính điểm và giải thích chi tiết.",
    href: "/quiz",
    icon: CheckSquare,
    gradient: "from-orange-500 to-amber-500",
    tag: "Luyện tập",
    badge: "5 Câu",
  },
  {
    title: "Tạp Chí",
    description:
      "Ấn phẩm tạp chí số 3D Flipbook lật trang với đầy đủ nội dung lý luận, biểu đồ và dẫn chứng thực tiễn.",
    href: "/magazine",
    icon: BookOpen,
    gradient: "from-red-600 to-amber-500",
    tag: "Ấn phẩm 3D",
    badge: "Flipbook",
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
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  } as const;

  return (
    <PageTransition>
      <div className="space-y-0 min-h-screen">
        <HeroSection />

        <section
          id="dashboard"
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 bg-page"
        >
          <div className="text-center space-y-4">
            <div className="label-press mx-auto">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mục lục tạp chí</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight leading-tight heading-display">
              NỘI DUNG CHUYÊN ĐỀ
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base font-serif italic">
              Chọn một chủ đề bất kỳ dưới đây để bắt đầu hành trình khám phá kiến thức Kinh tế Chính
              trị Mác - Lênin
            </p>
          </div>

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
                  className={`group relative rounded-sm bg-marx-raised border border-marx p-8 hover:border-[hsl(var(--marx-gold)/0.55)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                    topic.comingSoon ? "opacity-75" : ""
                  }`}
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${topic.gradient} opacity-0 group-hover:opacity-15 rounded-bl-full transition-opacity duration-300 pointer-events-none`}
                  />

                  <div className="space-y-6 relative z-[1]">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-sm bg-gradient-to-br ${topic.gradient} flex items-center justify-center text-white shadow-md`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-[hsl(var(--muted))] px-2 py-0.5 rounded-sm border border-marx">
                          {topic.tag}
                        </span>
                        {topic.badge && (
                          <span
                            className={`text-[9px] font-bold text-[#f4ebe0] px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                              topic.comingSoon ? "bg-[hsl(var(--muted-foreground))]" : "bg-[#9b1b1b]"
                            }`}
                          >
                            {topic.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-[hsl(var(--marx-crimson))] dark:group-hover:text-[hsl(var(--marx-gold))] transition-colors font-serif">
                        {topic.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed font-sans">
                        {topic.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-marx mt-6 flex items-center justify-between text-xs font-bold uppercase tracking-wider relative z-[1]">
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {topic.comingSoon ? "Sắp ra mắt" : "Khám phá ngay"}
                    </span>
                    <Link
                      href={topic.href}
                      className="w-8 h-8 rounded-sm bg-[hsl(var(--muted))] text-foreground flex items-center justify-center group-hover:bg-[hsl(var(--marx-gold))] group-hover:text-[hsl(20_30%_10%)] transition-all border border-marx"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        <TeamSection />
        <PageNavigation />
      </div>
    </PageTransition>
  );
}

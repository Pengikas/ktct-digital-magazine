import { QuizSection } from "@/sections/QuizSection";

export const metadata = {
  title: "Trắc Nghiệm 30 Câu | KTCT Magazine",
  description: "Bộ 30 câu hỏi trắc nghiệm tự động xây dựng từ 100% nội dung lý luận Kinh tế Chính trị Mác - Lênin.",
};

export default function QuizPage() {
  return (
    <div className="pt-6">
      <QuizSection />
    </div>
  );
}

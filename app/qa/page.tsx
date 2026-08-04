import { QASection } from "@/sections/QASection";

export const metadata = {
  title: "Hỏi đáp & Phản biện | KTCT Magazine",
  description:
    "Giải đáp các câu hỏi phản biện quanh sùng bái tiền tệ và câu trả lời KTCT cho 'Tiền nhiều để làm gì?'.",
};

export default function QAPage() {
  return (
    <div className="pt-2">
      <QASection />
    </div>
  );
}

import { AboutSection } from "@/sections/AboutSection";

export const metadata = {
  title: "Giới thiệu & Lịch sử Tiền tệ | KTCT Magazine",
  description: "Tổng quan dự án đồ án KTCT và tiến trình lịch sử 6 giai đoạn phát triển của tiền tệ.",
};

export default function AboutPage() {
  return (
    <div className="pt-6">
      <AboutSection />
    </div>
  );
}

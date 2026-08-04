import { StatisticsSection } from "@/sections/StatisticsSection";

export const metadata = {
  title: "Số liệu thực tiễn Việt Nam | KTCT Magazine",
  description:
    "GDP bình quân, thu nhập, nghèo đa chiều và Chỉ số Hạnh phúc Việt Nam 2022–2025.",
};

export default function StatisticsPage() {
  return (
    <div className="pt-2">
      <StatisticsSection />
    </div>
  );
}

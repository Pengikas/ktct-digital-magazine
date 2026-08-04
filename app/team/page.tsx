import { TeamSection } from "@/sections/TeamSection";

export const metadata = {
  title: "Đội Ngũ 20 Thành Viên | KTCT Magazine",
  description: "Danh sách 20 sinh viên UIT tham gia nghiên cứu, biên tập và phát triển dự án đồ án KTCT.",
};

export default function TeamPage() {
  return (
    <div className="pt-6">
      <TeamSection />
    </div>
  );
}

import { KnowledgeMapSection } from "@/sections/KnowledgeMapSection";

export const metadata = {
  title: "Bản Đồ Tri Thức Tương Tác | KTCT Magazine",
  description: "Sơ đồ tư duy tương tác kết nối mạng lưới lý thuyết và thực tiễn Kinh tế Chính trị Mác - Lênin.",
};

export default function KnowledgeMapPage() {
  return (
    <div className="pt-6">
      <KnowledgeMapSection />
    </div>
  );
}

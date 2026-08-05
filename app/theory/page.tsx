import { ClientRedirect } from "@/components/ClientRedirect";

export const metadata = {
  title: "Chuyển hướng | KTCT Magazine",
  description: "Nội dung lý thuyết đã gộp vào trang Nền tảng.",
};

/** /theory ≡ /nen-tang — tránh hai tab trùng nội dung */
export default function TheoryRedirectPage() {
  return <ClientRedirect to="/nen-tang" />;
}

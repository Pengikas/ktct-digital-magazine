import { ClientRedirect } from "@/components/ClientRedirect";

export const metadata = {
  title: "Chuyển hướng | KTCT Magazine",
  description: "Lý thuyết đã chuyển thành trang Nền tảng.",
};

export default function TheoryRedirectPage() {
  return <ClientRedirect to="/nen-tang" />;
}

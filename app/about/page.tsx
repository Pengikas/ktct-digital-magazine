import { ClientRedirect } from "@/components/ClientRedirect";

export const metadata = {
  title: "Chuyển hướng | KTCT Magazine",
  description: "Trang giới thiệu đã được gộp vào Trang chủ.",
};

export default function AboutRedirectPage() {
  return <ClientRedirect to="/" />;
}

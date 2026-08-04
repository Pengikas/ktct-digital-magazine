import { ClientRedirect } from "@/components/ClientRedirect";

export const metadata = {
  title: "Chuyển hướng | KTCT Magazine",
  description: "Trang đội ngũ đã được gộp vào Trang chủ.",
};

export default function TeamRedirectPage() {
  return <ClientRedirect to="/" />;
}

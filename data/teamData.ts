export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "Lãnh đạo" | "Thiết kế & UI/UX" | "Phát triển Phần mềm" | "Nội dung & Nghiên cứu" | "Thuyết trình & Game";
  avatarInitials: string;
  bio: string;
  skills: string[];
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "giang",
    name: "Lữ Lê Hương Giang",
    role: "Nhóm trưởng (Project Leader)",
    department: "Lãnh đạo",
    avatarInitials: "HG",
    bio: "Điều phối toàn bộ dự án đồ án KTCT, phân công nhiệm vụ và đảm bảo tiến độ chất lượng đề tài.",
    skills: ["Quản lý dự án", "Lập kế hoạch", "Tư duy hệ thống"]
  },
  {
    id: "chi",
    name: "Hoàng Ngọc Uyên Chi",
    role: "UI/UX & Biên tập Tạp chí",
    department: "Thiết kế & UI/UX",
    avatarInitials: "UC",
    bio: "Thiết kế giao diện Digital Magazine, xây dựng hệ thống màu sắc và layout tạp chí triết học hiện đại.",
    skills: ["UI/UX Design", "Figma", "Magazine Layout"]
  },
  {
    id: "khoi",
    name: "Ngô Đình Khôi",
    role: "UI/UX & Biên tập Tạp chí",
    department: "Thiết kế & UI/UX",
    avatarInitials: "DK",
    bio: "Sáng tạo visual infographic, phối hợp thiết kế trải nghiệm người dùng tương tác.",
    skills: ["Design System", "Visual Design", "Prototyping"]
  },
  {
    id: "nguyen",
    name: "Nguyễn Khôi Nguyên",
    role: "UI/UX & Biên tập Tạp chí",
    department: "Thiết kế & UI/UX",
    avatarInitials: "KN",
    bio: "Tối ưu hóa hành trình trải nghiệm đọc tạp chí trực quan cho sinh viên UIT.",
    skills: ["User Journey", "Wireframing", "Interaction Design"]
  },
  {
    id: "khue",
    name: "Trịnh Minh Khuê",
    role: "UI/UX & Biên tập Tạp chí",
    department: "Thiết kế & UI/UX",
    avatarInitials: "MK",
    bio: "Xây dựng minh họa và các thẻ khái niệm tương tác đẹp mắt.",
    skills: ["Graphic Design", "Typography", "Branding"]
  },
  {
    id: "huy",
    name: "Lê Gia Huy",
    role: "Frontend Developer",
    department: "Phát triển Phần mềm",
    avatarInitials: "GH",
    bio: "Dựng khung giao diện tạp chí số với Next.js và TailwindCSS.",
    skills: ["React", "Next.js", "TailwindCSS"]
  },
  {
    id: "bach",
    name: "Vũ Xuân Bách",
    role: "Frontend Developer",
    department: "Phát triển Phần mềm",
    avatarInitials: "VB",
    bio: "Làm các hiệu ứng tương tác, chuyển cảnh và trải nghiệm động trên web.",
    skills: ["Framer Motion", "TypeScript", "CSS Animation"]
  },
  {
    id: "minh",
    name: "Lương Vũ Ngọc Minh",
    role: "Backend Developer",
    department: "Phát triển Phần mềm",
    avatarInitials: "NM",
    bio: "Xây dựng cấu trúc dữ liệu và xử lý logic ứng dụng web trắc nghiệm.",
    skills: ["Data Architecture", "API Integration", "Node.js"]
  },
  {
    id: "hanh",
    name: "Nguyễn Vũ Đức Hạnh",
    role: "Backend Developer",
    department: "Phát triển Phần mềm",
    avatarInitials: "DH",
    bio: "Quản lý dữ liệu biểu đồ kinh tế xã hội và hệ thống chấm điểm trắc nghiệm.",
    skills: ["State Management", "Data Processing", "TypeScript"]
  },
  {
    id: "chinh",
    name: "Nguyễn Bảo Chinh",
    role: "Fullstack Developer",
    department: "Phát triển Phần mềm",
    avatarInitials: "BC",
    bio: "Kết nối toàn bộ frontend, backend, hiệu ứng tương tác và tối ưu SEO cho website.",
    skills: ["Next.js App Router", "Fullstack Engineering", "Performance"]
  },
  {
    id: "vy",
    name: "Trần Minh Vy",
    role: "AI Developer",
    department: "Phát triển Phần mềm",
    avatarInitials: "MV",
    bio: "Tích hợp công nghệ phân tích dữ liệu và thuật toán trắc nghiệm tự động.",
    skills: ["AI Integration", "Algorithm Design", "Data Mining"]
  },
  {
    id: "an",
    name: "Nguyễn Thiện An",
    role: "Game & Interactive Developer",
    department: "Thuyết trình & Game",
    avatarInitials: "TA",
    bio: "Thiết kế các mini-game và câu hỏi tương tác thú vị cho sinh viên.",
    skills: ["Gamification", "Logic Design", "Interactive Flow"]
  },
  {
    id: "khoa",
    name: "Phạm Minh Khoa",
    role: "Game & Interactive Developer",
    department: "Thuyết trình & Game",
    avatarInitials: "MK",
    bio: "Phát triển trải nghiệm gamified học tập Kinh tế Chính trị sinh động.",
    skills: ["Interactive Elements", "User Engagement", "UX Testing"]
  },
  {
    id: "tram",
    name: "Lê Thị Bích Trâm",
    role: "Nghiên cứu Nội dung",
    department: "Nội dung & Nghiên cứu",
    avatarInitials: "BT",
    bio: "Tổng hợp lý luận Chương 3 (3.2–3.3) và cầu nối từ tiền đến tư bản.",
    skills: ["Kinh tế chính trị", "Nghiên cứu học thuật", "Biên tập"]
  },
  {
    id: "khang",
    name: "Nguyễn Bảo Gia Khang",
    role: "Nghiên cứu Nội dung",
    department: "Nội dung & Nghiên cứu",
    avatarInitials: "GK",
    bio: "Thu thập số liệu kinh tế Việt Nam (GDP, thu nhập, nghèo đa chiều) từ GSO và UN.",
    skills: ["Data Analysis", "Research", "Academic Writing"]
  },
  {
    id: "linh",
    name: "Nguyễn Hà Linh",
    role: "Nghiên cứu Nội dung",
    department: "Nội dung & Nghiên cứu",
    avatarInitials: "HL",
    bio: "Phân tích các case study thực tế (Bill Gates, Warren Buffett, Markus Persson).",
    skills: ["Case Study Analysis", "Sociology", "Marxist Critique"]
  },
  {
    id: "xuyen",
    name: "Tống Thị Kim Xuyến",
    role: "Nghiên cứu Nội dung",
    department: "Nội dung & Nghiên cứu",
    avatarInitials: "KX",
    bio: "Phân tích mảng Văn hóa & Nghệ thuật đại chúng (Rap Việt, Đen Vâu, 14 Casper).",
    skills: ["Cultural Analysis", "Media Research", "Content Synthesis"]
  },
  {
    id: "tam",
    name: "Hồ Đắc Tâm",
    role: "Thuyết trình viên",
    department: "Thuyết trình & Game",
    avatarInitials: "DT",
    bio: "Xây dựng kịch bản thuyết trình và truyền tải thông điệp báo cáo đồ án sinh động.",
    skills: ["Public Speaking", "Storytelling", "Presentation"]
  },
  {
    id: "quang",
    name: "Nguyễn Bá Quang",
    role: "Thuyết trình viên",
    department: "Thuyết trình & Game",
    avatarInitials: "BQ",
    bio: "Trình bày luận điểm phản biện và bảo vệ kết quả nghiên cứu trước hội đồng.",
    skills: ["Debate", "Academic Defense", "Communication"]
  },
  {
    id: "nguyen-cao",
    name: "Nguyễn Cao Nguyên",
    role: "Thuyết trình viên",
    department: "Thuyết trình & Game",
    avatarInitials: "CN",
    bio: "Phụ trách phần phản biện câu hỏi trung tâm và đúc kết thông điệp sinh viên.",
    skills: ["Critical Thinking", "Synthesizing", "Presentation"]
  }
];

export const PROJECT_INFO = {
  course: "Kinh tế Chính trị Mác - Lênin",
  university: "Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM (UIT)",
  academicYear: "2026",
  title: "Đồ án Digital Magazine: Tiền Nhiều Để Làm Gì?",
  subtitle: "Khám phá bản chất, nguồn gốc và chức năng của tiền tệ qua lăng kính Kinh tế Chính trị Mác - Lênin",
  faculty: "Khoa Lý luận Chính trị & Khoa học Máy tính"
};

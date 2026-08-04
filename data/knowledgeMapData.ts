export interface MapNode {
  id: string;
  label: string;
  category: "trung-tâm" | "lý-thuyết" | "chức-năng" | "tư-bản" | "phân-tích" | "thực-tiễn";
  x: number; // percentage
  y: number; // percentage
  description: string;
  connectedTo: string[];
}

export const KNOWLEDGE_MAP_NODES: MapNode[] = [
  {
    id: "center",
    label: "TIỀN NHIỀU ĐỂ LÀM GÌ?",
    category: "trung-tâm",
    x: 50,
    y: 50,
    description: "Câu hỏi trung tâm được soi chiếu dưới lăng kính Kinh tế Chính trị Mác - Lênin. Tiền vừa là phương tiện sinh hoạt (H-T-H), vừa là tư bản sinh lời (T-H-T'), và giá trị thực sự thuộc về Giá trị sử dụng.",
    connectedTo: ["theory", "money-funcs", "capital-accum", "practical-cases", "real-wealth"]
  },
  {
    id: "theory",
    label: "Lý thuyết Hàng hóa & Giá trị",
    category: "lý-thuyết",
    x: 25,
    y: 25,
    description: "Chương 3 Mác-Lênin: Hàng hóa có 2 thuộc tính (Giá trị sử dụng & Giá trị). Lao động xã hội kết tinh tạo ra giá trị.",
    connectedTo: ["center", "money-origin"]
  },
  {
    id: "money-origin",
    label: "Nguồn gốc Tiền tệ (4 Hình thái)",
    category: "lý-thuyết",
    x: 10,
    y: 25,
    description: "Trải qua 4 hình thái giá trị: Đơn giản -> Đầy đủ -> Chung -> Tiền tệ (cố định ở Vàng).",
    connectedTo: ["theory", "money-funcs"]
  },
  {
    id: "money-funcs",
    label: "5 Chức năng Tiền tệ",
    category: "chức-năng",
    x: 25,
    y: 75,
    description: "Thước đo giá trị, Phương tiện lưu thông, Phương tiện cất trữ, Phương tiện thanh toán, Tiền tệ thế giới.",
    connectedTo: ["center", "h-t-h"]
  },
  {
    id: "h-t-h",
    label: "Lưu thông Giản đơn (H-T-H)",
    category: "chức-năng",
    x: 10,
    y: 75,
    description: "Mục đích là H' (Giá trị sử dụng). Tiền là phương tiện nâng cao chất lượng sống và an toàn tài chính.",
    connectedTo: ["money-funcs", "center"]
  },
  {
    id: "capital-accum",
    label: "Vận động Tư bản (T-H-T')",
    category: "tư-bản",
    x: 75,
    y: 25,
    description: "Tiền biến thành Tư bản thu Giá trị thặng dư (Δt). Tích lũy tư bản, Tái sản xuất mở rộng, tăng cấu tạo hữu cơ (c/v).",
    connectedTo: ["center", "surplus-dist"]
  },
  {
    id: "surplus-dist",
    label: "Phân phối Giá trị thặng dư",
    category: "tư-bản",
    x: 90,
    y: 25,
    description: "Lợi nhuận bình quân (P̅), Lợi tức (z) & Tư bản cho vay (T-T'), Địa tô (R).",
    connectedTo: ["capital-accum"]
  },
  {
    id: "real-wealth",
    label: "CỦA CẢI THỰC SỰ",
    category: "phân-tích",
    x: 75,
    y: 75,
    description: "Tiền chỉ là đại biểu chứng nhận. Của cải thực sự là Giá trị sử dụng (hạ tầng, tri thức, sức khỏe & sự phát triển con người).",
    connectedTo: ["center", "fetishism"]
  },
  {
    id: "fetishism",
    label: "Sùng bái Tiền tệ & Tha hóa",
    category: "phân-tích",
    x: 90,
    y: 75,
    description: "Mặt trái của thị trường khi tiền bị coi là mục đích duy nhất, làm hàng hóa hóa các quan hệ xã hội tốt đẹp.",
    connectedTo: ["real-wealth"]
  },
  {
    id: "practical-cases",
    label: "Dẫn chứng Thực tiễn",
    category: "thực-tiễn",
    x: 50,
    y: 85,
    description: "Case studies: Bill Gates (Tư bản tích cực), Warren Buffett (Cho đi), Notch (Bi kịch sùng bái), Rap Việt GDucky, Đen Vâu, 14 Casper.",
    connectedTo: ["center"]
  }
];

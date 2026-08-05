export interface MapNode {
  id: string;
  label: string;
  category: "trung-tâm" | "lý-thuyết" | "chức-năng" | "tư-bản" | "phân-tích" | "thực-tiễn";
  x: number; // percentage
  y: number; // percentage
  /** Tóm tắt hiện trong ô; node trung tâm để mảng rỗng */
  summary: string[];
  description: string;
}

/** main = liền (tâm–phụ); side = đứt (phụ–phụ). Không mũi tên. */
export type MapEdgeType = "main" | "side";

export interface MapEdge {
  a: string;
  b: string;
  type: MapEdgeType;
}

export const KNOWLEDGE_MAP_NODES: MapNode[] = [
  {
    id: "center",
    label: "TIỀN NHIỀU ĐỂ LÀM GÌ?",
    category: "trung-tâm",
    x: 52,
    y: 48,
    summary: [],
    description:
      "Câu hỏi trung tâm được soi chiếu dưới lăng kính Kinh tế Chính trị Mác - Lênin. Tiền vừa là phương tiện sinh hoạt (H-T-H), vừa là tư bản sinh lời (T-H-T'), và giá trị thực sự thuộc về Giá trị sử dụng.",
  },
  {
    id: "theory",
    label: "Lý thuyết Hàng hóa & Giá trị",
    category: "lý-thuyết",
    x: 28,
    y: 16,
    summary: [
      "Chương 2 (rút gọn)",
      "Hai thuộc tính: GTSĐ & Giá trị",
      "Lao động XH kết tinh → giá trị",
    ],
    description:
      "Nền Chương 2 (rút gọn): Hàng hóa có 2 thuộc tính (Giá trị sử dụng & Giá trị). Lao động xã hội kết tinh tạo ra giá trị.",
  },
  {
    id: "money-origin",
    label: "Nguồn gốc của tiền tệ",
    category: "lý-thuyết",
    x: 10,
    y: 40,
    summary: [
      "4 hình thái giá trị",
      "Đơn giản → Đầy đủ → Chung",
      "→ Tiền tệ (vàng)",
    ],
    description:
      "Tiền tệ là sản phẩm lịch sử của sản xuất và lưu thông hàng hóa. Trải qua 4 hình thái giá trị: Đơn giản → Đầy đủ → Chung → Tiền tệ (cố định ở vàng).",
  },
  {
    id: "money-funcs",
    label: "5 chức năng tiền tệ",
    category: "chức-năng",
    x: 28,
    y: 48,
    summary: [
      "Thước đo giá trị",
      "Lưu thông · Cất trữ",
      "Thanh toán · Tiền thế giới",
    ],
    description:
      "Năm chức năng của tiền tệ: thước đo giá trị, phương tiện lưu thông, phương tiện cất trữ, phương tiện thanh toán, tiền tệ thế giới.",
  },
  {
    id: "h-t-h",
    label: "Lưu thông giản đơn",
    category: "chức-năng",
    x: 28,
    y: 78,
    summary: [
      "Công thức H – T – H",
      "Mục đích: H′ (GTSĐ)",
      "Tiền là phương tiện sống",
    ],
    description:
      "Lưu thông hàng hóa giản đơn theo công thức H–T–H. Mục đích là H' (Giá trị sử dụng). Tiền là phương tiện nâng cao chất lượng sống và an toàn tài chính.",
  },
  {
    id: "capital-accum",
    label: "Vận động tư bản",
    category: "tư-bản",
    x: 72,
    y: 16,
    summary: [
      "Công thức T – H – T′",
      "Thu thặng dư m (Δt)",
      "Tích lũy · tái SX mở rộng",
    ],
    description:
      "Tiền biến thành tư bản theo công thức T–H–T′, thu giá trị thặng dư m (T′ = T + Δt). Gắn với tích lũy tư bản (3.2), tái sản xuất mở rộng và tăng cấu tạo hữu cơ (c/v).",
  },
  {
    id: "surplus-dist",
    label: "Phân phối giá trị thặng dư",
    category: "tư-bản",
    x: 90,
    y: 16,
    summary: [
      "Lợi nhuận bình quân (P̅)",
      "Lợi tức (z) · Tư bản cho vay",
      "Địa tô (R)",
    ],
    description:
      "Giá trị thặng dư được phân phối thành các hình thái: lợi nhuận bình quân (P̅), lợi tức (z) gắn tư bản cho vay (T–T'), và địa tô (R).",
  },
  {
    id: "real-wealth",
    label: "Của cải thực sự",
    category: "phân-tích",
    x: 76,
    y: 48,
    summary: [
      "Tiền = đại biểu chứng nhận",
      "GTSĐ: hạ tầng, tri thức",
      "Sức khỏe & phát triển con người",
    ],
    description:
      "Tiền chỉ là đại biểu chứng nhận quyền sở hữu. Của cải thực sự là Giá trị sử dụng — hạ tầng, tri thức, sức khỏe và sự phát triển con người.",
  },
  {
    id: "fetishism",
    label: "Sùng bái tiền tệ & tha hóa",
    category: "phân-tích",
    x: 76,
    y: 78,
    summary: [
      "Tiền thành mục đích duy nhất",
      "Hàng hóa hóa quan hệ XH",
      "Mặt trái của thị trường",
    ],
    description:
      "Mặt trái của thị trường khi tiền bị coi là mục đích duy nhất, dẫn tới sùng bái tiền tệ và tha hóa — hàng hóa hóa các quan hệ xã hội tốt đẹp.",
  },
  {
    id: "practical-cases",
    label: "Dẫn chứng thực tiễn",
    category: "thực-tiễn",
    x: 52,
    y: 78,
    summary: [
      "Gates · Buffett · Notch",
      "Rap: GDucky, Đen Vâu",
      "14 Casper…",
    ],
    description:
      "Case studies: Bill Gates (tư bản tích cực), Warren Buffett (cho đi), Notch (bi kịch sùng bái), Rap Việt GDucky, Đen Vâu, 14 Casper — minh họa các chiều trả lời câu hỏi trung tâm.",
  },
];

/** Theo blueprint: liền = tâm–phụ; đứt = phụ–phụ */
export const KNOWLEDGE_MAP_EDGES: MapEdge[] = [
  { a: "center", b: "theory", type: "main" },
  { a: "center", b: "money-funcs", type: "main" },
  { a: "center", b: "h-t-h", type: "main" },
  { a: "center", b: "practical-cases", type: "main" },
  { a: "center", b: "capital-accum", type: "main" },
  { a: "center", b: "surplus-dist", type: "main" },
  { a: "center", b: "real-wealth", type: "main" },
  { a: "center", b: "fetishism", type: "main" },

  { a: "theory", b: "money-origin", type: "side" },
  { a: "money-funcs", b: "money-origin", type: "side" },
  { a: "money-funcs", b: "h-t-h", type: "side" },
  { a: "capital-accum", b: "surplus-dist", type: "side" },
  { a: "real-wealth", b: "fetishism", type: "side" },
];

export function getMapNeighbors(nodeId: string): string[] {
  const ids = new Set<string>();
  for (const e of KNOWLEDGE_MAP_EDGES) {
    if (e.a === nodeId) ids.add(e.b);
    if (e.b === nodeId) ids.add(e.a);
  }
  return [...ids];
}

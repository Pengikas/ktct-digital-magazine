export interface ConceptItem {
  term: string;
  definition: string;
  symbol?: string;
  citation?: string;
}

export interface StatItem {
  label: string;
  y2022: string;
  y2023: string;
  y2024: string;
  y2025: string;
  val2022: number;
  val2023: number;
  val2024: number;
  val2025: number;
  unit: string;
  note: string;
}

export interface StoryCase {
  title: string;
  subtitle: string;
  type: "positive" | "negative" | "culture";
  content: string;
  marxistAnalysis: string;
  image?: string;
  quote?: string;
  citation?: string;
}

export type MagazineLayoutType =
  | "cover"
  | "intro"
  | "concepts"
  | "theory"
  | "circulation"
  | "surplus"
  | "debate"
  | "stats"
  | "cases_music"
  | "credits"
  | "backcover";

export interface MagazinePageData {
  id: number;
  title: string;
  subtitle?: string;
  sectionTag: string;
  layoutType: MagazineLayoutType;
}

/** Thứ tự trang flipbook — bìa cứng ≠ nội dung; mặt trong bìa = intro; mặt trong cuối = tên thành viên */
export const MAGAZINE_PAGES_DATA: MagazinePageData[] = [
  {
    id: 1,
    title: "TIỀN NHIỀU ĐỂ LÀM GÌ?",
    subtitle: "Số đặc biệt · KTCT Mác – Lênin · UIT SS008.Q31",
    sectionTag: "BÌA",
    layoutType: "cover",
  },
  {
    id: 2,
    title: "Giới thiệu nội dung",
    subtitle: "Lộ trình đọc tạp chí số — từ lý luận đến thực tiễn",
    sectionTag: "GIỚI THIỆU",
    layoutType: "intro",
  },
  {
    id: 3,
    title: "Khái niệm cốt lõi (1–7)",
    subtitle: "Hàng hóa, giá trị, tiền tệ & thị trường",
    sectionTag: "PHẦN 1",
    layoutType: "concepts",
  },
  {
    id: 4,
    title: "Khái niệm cốt lõi (8–14)",
    subtitle: "Tư bản, thặng dư, lợi nhuận & lợi tức",
    sectionTag: "PHẦN 1",
    layoutType: "concepts",
  },
  {
    id: 5,
    title: "Hàng hóa & nguồn gốc tiền tệ",
    subtitle: "Hai điều kiện · Hai thuộc tính · Bốn hình thái",
    sectionTag: "PHẦN 2 · NỀN TẢNG",
    layoutType: "theory",
  },
  {
    id: 6,
    title: "5 chức năng & hai hình thái lưu thông",
    subtitle: "H–T–H và T–H–T′ dưới góc nhìn Mác – Lênin",
    sectionTag: "PHẦN 2 · LƯU THÔNG",
    layoutType: "circulation",
  },
  {
    id: 7,
    title: "Phân phối GTTD & của cải thực sự",
    subtitle: "P̅ · lợi tức · địa tô · sùng bái tiền tệ",
    sectionTag: "PHẦN 2 · PHÂN TÍCH",
    layoutType: "surplus",
  },
  {
    id: 8,
    title: "Ba luồng quan điểm",
    subtitle: "Phản biện & góc nhìn cân bằng Mác – Lênin",
    sectionTag: "PHẦN 3",
    layoutType: "debate",
  },
  {
    id: 9,
    title: "Số liệu Việt Nam 2022–2025",
    subtitle: "GDP · thu nhập · nghèo đa chiều · hạnh phúc",
    sectionTag: "PHẦN 4 · DỮ LIỆU",
    layoutType: "stats",
  },
  {
    id: 10,
    title: "Dẫn chứng thực tiễn & văn hóa",
    subtitle: "Gates · Notch · Rap Việt",
    sectionTag: "PHẦN 4 · CASE",
    layoutType: "cases_music",
  },
  {
    id: 11,
    title: "Thành viên thực hiện",
    subtitle: "Nhóm đồ án Digital Magazine",
    sectionTag: "THÀNH VIÊN",
    layoutType: "credits",
  },
  {
    id: 12,
    title: "Cảm ơn đã đọc",
    subtitle: "Hết số · FIN · KTCT Digital Magazine",
    sectionTag: "BÌA SAU",
    layoutType: "backcover",
  },
];

export const MAGAZINE_INTRO_SECTIONS = [
  { num: "01", title: "Khái niệm cốt lõi", desc: "Phạm trù Chương 2–3: hàng hóa, giá trị, tiền, tư bản." },
  { num: "02", title: "Nền tảng lý luận", desc: "Nguồn gốc tiền tệ, 5 chức năng, H–T–H & T–H–T′." },
  { num: "03", title: "Phân tích CQ5", desc: "Của cải thực sự, sùng bái tiền tệ, ba luồng quan điểm." },
  { num: "04", title: "Thực tiễn Việt Nam", desc: "Số liệu 2022–2025, case study & văn hóa đại chúng." },
];

export const CONCEPTS_LIST: ConceptItem[] = [
  {
    term: "Sản xuất hàng hóa",
    definition: "Kiểu tổ chức kinh tế mà sản phẩm làm ra để bán, trao đổi trên thị trường.",
  },
  {
    term: "Hàng hóa",
    definition: "Sản phẩm của lao động, thỏa mãn nhu cầu con người thông qua trao đổi, mua bán.",
  },
  {
    term: "Giá trị sử dụng",
    definition: "Công dụng của vật thể thỏa mãn nhu cầu con người (vật chất/tinh thần).",
  },
  {
    term: "Giá trị của hàng hóa",
    definition: "Lao động xã hội của người sản xuất kết tinh bên trong hàng hóa.",
  },
  {
    term: "Tiền tệ",
    definition: "Hàng hóa đặc biệt làm vật ngang giá chung, thể hiện giá trị xã hội và quan hệ sản xuất.",
  },
  {
    term: "Kinh tế thị trường",
    definition: "Nền kinh tế vận hành theo quy luật thị trường; tiền là thước đo và phương tiện thanh toán trung tâm.",
  },
  {
    term: "Giá cả hàng hóa",
    definition: "Biểu hiện bằng tiền của giá trị hàng hóa.",
  },
  {
    term: "Tư bản",
    definition: "Giá trị mang lại giá trị thặng dư bằng cách tự lớn lên qua bóc lột lao động làm thuê.",
  },
  {
    term: "Giá trị thặng dư",
    symbol: "Δt / m",
    definition: "Bộ phận giá trị mới ngoài giá trị sức lao động do công nhân tạo ra nhưng bị nhà tư bản chiếm đoạt.",
  },
  {
    term: "Tích lũy tư bản",
    definition: "Chuyển hóa một phần giá trị thặng dư thành tư bản phụ thêm để tái sản xuất mở rộng.",
  },
  {
    term: "Chi phí sản xuất",
    symbol: "k = c + v",
    definition: "Phần giá trị hàng hóa bù lại tư liệu sản xuất (c) và sức lao động (v) đã tiêu dùng.",
  },
  {
    term: "Lợi nhuận",
    symbol: "p = G - k",
    definition: "Hình thái biểu hiện của giá trị thặng dư trên bề mặt thị trường.",
  },
  {
    term: "Lợi nhuận bình quân",
    symbol: "P̄",
    definition: "Lợi nhuận bằng nhau của những tư bản bằng nhau ở các ngành khác nhau do cạnh tranh liên ngành.",
  },
  {
    term: "Lợi tức & Tư bản cho vay",
    symbol: "z · T–T′",
    definition: "Một phần lợi nhuận bình quân người đi vay trả cho người cho vay để sử dụng tiền nhàn rỗi.",
  },
];

export const VIETNAM_STATS: StatItem[] = [
  {
    label: "GDP bình quân đầu người",
    y2022: "4.110 USD",
    y2023: "4.284 USD",
    y2024: "4.700 USD",
    y2025: "5.026 USD",
    val2022: 4110,
    val2023: 4284,
    val2024: 4700,
    val2025: 5026,
    unit: "USD",
    note: "[GSO, 12/2022 → 1/2026]",
  },
  {
    label: "Thu nhập bình quân / tháng",
    y2022: "4,67 triệu",
    y2023: "4,96 triệu",
    y2024: "5,40 triệu",
    y2025: "5,9–6,0 triệu",
    val2022: 4.67,
    val2023: 4.96,
    val2024: 5.4,
    val2025: 5.95,
    unit: "triệu VNĐ",
    note: "[GSO, 1/2024 → 2025]",
  },
  {
    label: "Tỷ lệ hộ nghèo đa chiều",
    y2022: "4,30%",
    y2023: "2,93%",
    y2024: "1,93%",
    y2025: "< 1,50%",
    val2022: 4.3,
    val2023: 2.93,
    val2024: 1.93,
    val2025: 1.45,
    unit: "%",
    note: "[Bộ LĐ-TB&XH, 2023 → 2025]",
  },
];

export const HAPPINESS_STATS = [
  { year: "2022", rank: 65, total: 146, label: "Hạng 65/146", source: "UNSDSN, WHR2022" },
  { year: "2023", rank: 65, total: 137, label: "Hạng 65/137", source: "UNSDSN, WHR2023" },
  { year: "2024", rank: 54, total: 143, label: "Hạng 54/143", source: "UNSDSN, WHR2024" },
  { year: "2025", rank: 46, total: 143, label: "Hạng 46/143", source: "UNSDSN, WHR2025" },
];

export const STORIES_LIST: StoryCase[] = [
  {
    title: "Bill Gates & Quỹ Gates Foundation",
    subtitle: "Tư bản tích cực",
    type: "positive",
    content:
      "Chuyển hơn 100 tỷ USD vào quỹ từ thiện tài trợ y tế, vắc-xin và giáo dục. Warren Buffett cam kết cho đi hơn 99% tài sản.",
    marxistAnalysis:
      "Đưa tiền trở lại lưu thông xã hội — từ đại biểu sở hữu thành Giá trị sử dụng và của cải thực sự.",
    quote: "Tiền phát huy vai trò khi chuyển hóa thành của cải xã hội.",
  },
  {
    title: "Markus Persson (Minecraft)",
    subtitle: "Sùng bái tiền tệ",
    type: "negative",
    content:
      "Sau khi bán Mojang lấy 2,5 tỷ USD, rơi vào khủng hoảng tinh thần, cô lập và mất phương hướng.",
    marxistAnalysis:
      "Tiền không đo được giá trị tinh thần. Sùng bái tiền tệ khiến tiền từ công cụ thành mục đích sống — tha hóa con người.",
    quote: "Tiền vô hạn không mua được kết nối và hạnh phúc thực sự.",
  },
  {
    title: "Rap Việt & câu hỏi CQ5",
    subtitle: "Văn hóa đại chúng",
    type: "culture",
    content:
      "GDucky, Đen Vâu, 14 Casper — tranh luận làm giàu vs bị tiền thao túng, áp lực cơm áo và ‘bao tiền một mớ bình yên’.",
    marxistAnalysis:
      "Phản ánh mâu thuẫn giữa nền tảng vật chất tối thiểu và giá trị sử dụng tinh thần trong tái sản xuất sức lao động.",
    quote: "Bao tiền một mớ bình yên — mâu thuẫn giá trị và GTSĐ.",
  },
];

/** Chỉ tên — dùng mặt trong bìa cuối (đồng bộ teamData) */
export const MAGAZINE_MEMBER_NAMES = [
  "Lữ Lê Hương Giang",
  "Hoàng Ngọc Uyên Chi",
  "Ngô Đình Khôi",
  "Nguyễn Khôi Nguyên",
  "Trịnh Minh Khuê",
  "Lê Gia Huy",
  "Vũ Xuân Bách",
  "Lương Vũ Ngọc Minh",
  "Nguyễn Vũ Đức Hạnh",
  "Nguyễn Bảo Chinh",
  "Trần Minh Vy",
  "Nguyễn Thiện An",
  "Phạm Minh Khoa",
  "Lê Thị Bích Trâm",
  "Nguyễn Bảo Gia Khang",
  "Nguyễn Hà Linh",
  "Tống Thị Kim Xuyến",
  "Hồ Đắc Tâm",
  "Nguyễn Bá Quang",
  "Nguyễn Cao Nguyên",
] as const;

/** @deprecated dùng MAGAZINE_MEMBER_NAMES */
export const EDITORIAL_TEAM = MAGAZINE_MEMBER_NAMES.map((name) => ({
  name,
  role: "",
  id: "UIT",
}));

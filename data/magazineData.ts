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

export interface MagazinePageData {
  id: number;
  title: string;
  subtitle?: string;
  sectionTag: string;
  layoutType: "cover" | "concepts" | "theory" | "circulation" | "surplus" | "debate" | "stats" | "cases_music" | "conclusion" | "backcover";
}

export const MAGAZINE_PAGES_DATA: MagazinePageData[] = [
  {
    id: 1,
    title: "TIỀN NHIỀU ĐỂ LÀM GÌ?",
    subtitle: "Số Đặc Biệt Tạp Chí Số Kinh Tế Chính Trị Mác - Lênin | SS008.Q31",
    sectionTag: "BÌA CHÍNH TẠP CHÍ",
    layoutType: "cover",
  },
  {
    id: 2,
    title: "DANH MỤC KHÁI NIỆM CỐT LÕI (PHẦN 1)",
    subtitle: "Nền tảng phạm trù Chương 3: Sản xuất hàng hóa & Tiền tệ (Khái niệm 1 - 7)",
    sectionTag: "PHẦN 1: KHÁI NIỆM CỐT LÕI",
    layoutType: "concepts",
  },
  {
    id: 3,
    title: "DANH MỤC KHÁI NIỆM CỐT LÕI (PHẦN 2)",
    subtitle: "Tư bản, Giá trị thặng dư, Tích lũy, Lợi nhuận & Lợi tức (Khái niệm 8 - 14)",
    sectionTag: "PHẦN 1: KHÁI NIỆM CỐT LÕI",
    layoutType: "concepts",
  },
  {
    id: 4,
    title: "SẢN XUẤT HÀNG HÓA & NGUỒN GỐC TIỀN TỆ",
    subtitle: "2 Điều kiện ra đời, Hai thuộc tính của hàng hóa & 4 Hình thái giá trị",
    sectionTag: "PHẦN 2: LÝ LUẬN CHƯƠNG 3",
    layoutType: "theory",
  },
  {
    id: 5,
    title: "5 CHỨC NĂNG TIỀN TỆ & 2 HÌNH THÁI LƯU THÔNG",
    subtitle: "Phân tích H—T—H và T—H—T' (với T' = T + Δt) dưới góc nhìn Mác - Lênin",
    sectionTag: "PHẦN 2: CHUYÊN SÂU LƯU THÔNG",
    layoutType: "circulation",
  },
  {
    id: 6,
    title: "PHÂN PHỐI GIÁ TRỊ THẶNG DƯ & BẢN CHẤT CỦA CẢI",
    subtitle: "Lợi nhuận bình quân (P̄), Lợi tức (z), Địa tô (R) & Hiện tượng Sùng bái tiền tệ",
    sectionTag: "PHẦN 2: CỦA CẢI & SÙNG BÁI TIỀN TỆ",
    layoutType: "surplus",
  },
  {
    id: 7,
    title: "PHẢN BIỆN LÝ LUẬN 3 LUỒNG QUAN ĐIỂM",
    subtitle: "So sánh Tiền là quan trọng nhất vs Tiền không quan trọng vs Góc nhìn Cân bằng Mác - Lênin",
    sectionTag: "PHẦN 3: PHẢN BIỆN LÝ LUẬN",
    layoutType: "debate",
  },
  {
    id: 8,
    title: "BỘ SỐ LIỆU VIỆT NAM (2022–2025) & CHỈ SỐ HẠNH PHÚC",
    subtitle: "Tăng trưởng GDP, Thu nhập, Tỷ lệ hộ nghèo đa chiều & Xếp hạng World Happiness Report",
    sectionTag: "PHẦN 4: DỮ LIỆU THỰC TIỄN",
    layoutType: "stats",
  },
  {
    id: 9,
    title: "CÂU CHUYỆN THỰC TẾ & ÂM NHẠC ĐẠI CHÚNG",
    subtitle: "Từ Bill Gates, Markus Persson (Minecraft) đến Rap Việt (GDucky, Đen Vâu, 14 Casper)",
    sectionTag: "PHẦN 4: CÂU CHUYỆN & VĂN HÓA",
    layoutType: "cases_music",
  },
  {
    id: 10,
    title: "LIÊN HỆ THỰC TIỄN & BÀI HỌC SINH VIÊN UIT",
    subtitle: "Kết luận, Sơ đồ Tư duy & Thông tin Biên tập Tạp chí (9 Thành viên)",
    sectionTag: "PHẦN KẾT & BÌA SAU",
    layoutType: "conclusion",
  },
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
    definition: "Nền kinh tế vận hành theo các quy luật thị trường; tiền tệ là phương tiện thanh toán và thước đo giá trị trung tâm.",
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
    definition: "Sự chuyển hóa một phần giá trị thặng dư trở lại thành tư bản phụ thêm để tái sản xuất mở rộng.",
  },
  {
    term: "Chi phí sản xuất",
    symbol: "k = c + v",
    definition: "Phần giá trị hàng hóa bù lại giá cả tư liệu sản xuất (c) và sức lao động (v) đã tiêu dùng.",
  },
  {
    term: "Lợi nhuận",
    symbol: "p = G - k",
    definition: "Hình thái biểu hiện của giá trị thặng dư trên bề mặt thị trường, coi là con đẻ của toàn bộ tư bản ứng trước.",
  },
  {
    term: "Lợi nhuận bình quân",
    symbol: "P̄",
    definition: "Số lợi nhuận bằng nhau của những tư bản bằng nhau đầu tư vào các ngành khác nhau, hình thành do cạnh tranh giữa các ngành.",
  },
  {
    term: "Lợi tức & Tư bản cho vay",
    symbol: "z",
    definition: "Lợi tức là một phần lợi nhuận bình quân người đi vay trả cho người cho vay để sử dụng tiền nhàn rỗi.",
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
    y2022: "4,67 triệu VNĐ",
    y2023: "4,96 triệu VNĐ",
    y2024: "5,40 triệu VNĐ",
    y2025: "5,9–6,0 triệu VNĐ",
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
    subtitle: "Chuyển tiền thành 'Tư bản tích cực' & Của cải thực sự",
    type: "positive",
    image: "/watermarks/images/tu-thien.jpeg",
    content: "Bill Gates đã chuyển hơn 100 tỷ USD vào các quỹ từ thiện tài trợ y tế, vắc-xin và giáo dục toàn cầu. Warren Buffett cam kết cho đi hơn 99% tài sản cá nhân.",
    marxistAnalysis: "Góc nhìn Mác - Lênin: Đưa tiền trở lại lưu thông, chuyển hóa từ đại biểu sở hữu thành Giá trị sử dụng và Của cải thực sự giúp phát triển hạ tầng và giải phóng sức lao động.",
    quote: "Tiền chỉ phát huy vai trò tích cực khi được chuyển hóa thành Của cải xã hội.",
    citation: "[GatesFoundationReport, 2024; Forbes, 2025; C.Mác, Tư bản, Tập 1]",
  },
  {
    title: "Markus Persson (Minecraft)",
    subtitle: "Bi kịch của sự Sùng bái Tiền tệ & Khủng hoảng tinh thần",
    type: "negative",
    image: "/watermarks/images/khung-hoang.webp",
    content: "Sau khi bán Mojang (Minecraft) cho Microsoft lấy 2,5 tỷ USD cash, Markus Persson rơi vào khủng hoảng tinh thần, cảm giác cô lập và mất phương hướng cuộc sống.",
    marxistAnalysis: "Góc nhìn Mác - Lênin: Tiền không đo lường được giá trị tinh thần. Sùng bái tiền tệ khiến tiền từ công cụ trở thành mục đích sống duy nhất gây tha hóa con người.",
    quote: "Tiền tài vô hạn không mua được sự kết nối tinh thần và hạnh phúc thực sự.",
    citation: "[BBC, 2015; BusinessInsider, 2023; C.Mác, Bản thảo KT-TH 1844]",
  },
  {
    title: "Văn hóa & Rap Việt",
    subtitle: "'Tiền Nhiều Để Làm Gì?' — GDucky, Đen Vâu, 14 Casper",
    type: "culture",
    image: "/watermarks/images/com.webp",
    content: "Ca khúc 'Tiền Nhiều Để Làm Gì?' (GDucky) khắc họa đấu tranh làm giàu vs bị tiền thao túng. 'Bài này chill phết' (Đen Vâu) phản ánh áp lực cơm áo gạo tiền. 'Bao tiền một mớ bình yên' (14 Casper) thể hiện mâu thuẫn giữa tiền và bình yên.",
    marxistAnalysis: "Minh họa quy luật tái sản xuất sức lao động: Cần nền tảng vật chất tối thiểu, nhưng tiền cũng bộc lộ mâu thuẫn giữa Giá trị vật ngang giá và Giá trị sử dụng tinh thần.",
    quote: "Bao tiền một mớ bình yên — Mâu thuẫn giữa Giá trị và Giá trị sử dụng.",
    citation: "[GDucky, Đen Vâu, 14 Casper; C.Mác, Tư bản, Tập 1]",
  },
];

export const EDITORIAL_TEAM = [
  { name: "Nguyễn Bảo Chinh", role: "Trưởng nhóm / Biên tập chính", id: "UIT" },
  { name: "Lê Gia Huy", role: "Nội dung Lý luận", id: "UIT" },
  { name: "Vi Xuân Bách", role: "Phân tích Số liệu", id: "UIT" },
  { name: "Lương Vi Ngọc Minh", role: "Thiết kế & Layout", id: "UIT" },
  { name: "Nguyễn Vi Đức Hạnh", role: "Case Studies Thực tiễn", id: "UIT" },
  { name: "Trần Minh Vy", role: "Nội dung Văn hóa & Rap", id: "UIT" },
  { name: "Nguyễn Thiền An", role: "Phản biện & Tổng hợp", id: "UIT" },
  { name: "Phạm Minh Khoa", role: "Kiểm tra Dữ liệu", id: "UIT" },
  { name: "Hoàng Ngọc Uyên Chi", role: "Biên tập & Kiểm duyệt", id: "UIT" },
];

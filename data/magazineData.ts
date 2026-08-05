export interface ConceptItem {
  term: string;
  definition: string;
  symbol?: string;
}

export interface StatItem {
  label: string;
  y2022: string;
  y2023: string;
  y2024: string;
  y2025: string;
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
}

export interface MagazinePageData {
  id: number;
  title: string;
  subtitle?: string;
  sectionTag?: string;
  layoutType: "cover" | "concepts" | "theory" | "debate_stats" | "cases_music" | "conclusion" | "backcover";
}

export const MAGAZINE_PAGES_DATA = [
  {
    id: 1,
    title: "TIỀN NHIỀU ĐỂ LÀM GÌ?",
    subtitle: "Chuyên đề đặc biệt Kinh tế Chính trị Mác - Lênin | Số 01 - 2026",
    sectionTag: "BÌA TẠP CHÍ",
    layoutType: "cover",
  },
  {
    id: 2,
    title: "DANH MỤC KHÁI NIỆM CỐT LÕI",
    subtitle: "Nền tảng lý luận Chương 3: Sản xuất hàng hóa & Tiền tệ",
    sectionTag: "PHẦN 1: KHÁI NIỆM",
    layoutType: "concepts",
  },
  {
    id: 3,
    title: "HAI HÌNH THÁI LƯU THÔNG & BẢN CHẤT TIỀN TỆ",
    subtitle: "Giải mã vận động của Tiền từ H-T-H đến T-H-T'",
    sectionTag: "PHẦN 2: NỘI DUNG CHI TIẾT",
    layoutType: "theory",
  },
  {
    id: 4,
    title: "PHÂN PHỐI GIÁ TRỊ THẶNG DƯ & CỦA CẢI THỰC SỰ",
    subtitle: "Lợi nhuận bình quân, Lợi tức, Địa tô và Bản chất của Của cải",
    sectionTag: "PHẦN 2: CHUYÊN SÂU",
    layoutType: "theory",
  },
  {
    id: 5,
    title: "PHẢN BIỆN LÝ LUẬN & SỐ LIỆU THỰC TIỄN VIỆT NAM",
    subtitle: "So sánh 2 luồng quan điểm & Bộ dữ liệu Tăng trưởng 2022 - 2025",
    sectionTag: "PHẦN 3 & 4: PHẢN BIỆN & SỐ LIỆU",
    layoutType: "debate_stats",
  },
  {
    id: 6,
    title: "CÂU CHUYỆN THỰC TẾ & ÂM NHẠC ĐẠI CHÚNG",
    subtitle: "Từ Tỷ phú thế giới đến Rap Việt: Tiền tệ dưới góc nhìn Mác - Lênin",
    sectionTag: "PHẦN 4: THỰC TIỄN & VĂN HÓA",
    layoutType: "cases_music",
  },
  {
    id: 7,
    title: "LIÊN HỆ THỰC TIỄN & BÀI HỌC SINH VIÊN",
    subtitle: "Làm chủ đồng tiền — Biến tiền thành phương tiện phục vụ hạnh phúc",
    sectionTag: "PHẦN KẾT: KẾT LUẬN",
    layoutType: "conclusion",
  },
  {
    id: 8,
    title: "KTCT DIGITAL MAGAZINE",
    subtitle: "Đồ án Môn học SS008.Q31 — Trường Đại học CNTT (UIT)",
    sectionTag: "BÌA SAU",
    layoutType: "backcover",
  },
];

export const CONCEPTS_LIST: ConceptItem[] = [
  {
    term: "Sản xuất hàng hóa",
    definition: "Kiểu tổ chức kinh tế mà sản phẩm làm ra không phải để tiêu dùng cá nhân mà để bán, trao đổi trên thị trường.",
  },
  {
    term: "Hàng hóa",
    definition: "Sản phẩm của lao động, có thể thỏa mãn nhu cầu nào đó của con người thông qua trao đổi, mua bán.",
  },
  {
    term: "Giá trị sử dụng",
    definition: "Công dụng của vật thể thỏa mãn nhu cầu vật chất hoặc tinh thần của con người (thuộc tính tự nhiên).",
  },
  {
    term: "Giá trị hàng hóa",
    definition: "Lao động xã hội của người sản xuất kết tinh bên trong hàng hóa (thuộc tính xã hội).",
  },
  {
    term: "Tiền tệ",
    definition: "Hàng hóa đặc biệt đóng vai trò vật ngang giá chung cho tất cả các hàng hóa khác, thể hiện lao động xã hội.",
  },
  {
    term: "Kinh tế thị trường",
    definition: "Nền kinh tế vận hành theo các quy luật thị trường; tiền tệ là phương tiện thanh toán và thước đo giá trị trung tâm.",
  },
  {
    term: "Tư bản",
    definition: "Giá trị mang lại giá trị thặng dư bằng cách tự lớn lên thông qua việc bóc lột lao động làm thuê.",
  },
  {
    term: "Giá trị thặng dư",
    symbol: "Δt / m",
    definition: "Bộ phận giá trị mới phát sinh ngoài giá trị sức lao động do công nhân tạo ra nhưng bị nhà tư bản chiếm đoạt.",
  },
  {
    term: "Tích lũy tư bản",
    definition: "Sự chuyển hóa một phần giá trị thặng dư trở lại thành tư bản phụ thêm nhằm tái sản xuất mở rộng.",
  },
  {
    term: "Chi phí sản xuất",
    symbol: "k = c + v",
    definition: "Phần giá trị hàng hóa bù lại giá cả tư liệu sản xuất đã tiêu dùng (c) và giá cả sức lao động (v).",
  },
  {
    term: "Lợi nhuận",
    symbol: "p = G - k",
    definition: "Hình thái biểu hiện của giá trị thặng dư trên bề mặt thị trường, coi là con đẻ của toàn bộ tư bản ứng trước.",
  },
  {
    term: "Lợi nhuận bình quân",
    symbol: "P̄",
    definition: "Số lợi nhuận bằng nhau của những tư bản bằng nhau đầu tư vào các ngành khác nhau do cạnh tranh tự do.",
  },
  {
    term: "Lợi tức & Tư bản cho vay",
    symbol: "z",
    definition: "Lợi tức là một phần lợi nhuận bình quân mà người đi vay phải trả cho người cho vay để sử dụng tiền nhàn rỗi.",
  },
];

export const VIETNAM_STATS: StatItem[] = [
  {
    label: "GDP bình quân đầu người",
    y2022: "4.110 USD",
    y2023: "4.284 USD",
    y2024: "4.700 USD",
    y2025: "5.026 USD",
    note: "Nguồn: Tổng cục Thống kê (GSO 2022-2026)",
  },
  {
    label: "Thu nhập bình quân / tháng",
    y2022: "4,67 triệu VNĐ",
    y2023: "4,96 triệu VNĐ",
    y2024: "5,40 triệu VNĐ",
    y2025: "5,9–6,0 triệu VNĐ",
    note: "Nguồn: GSO & Báo cáo Kinh tế Xã hội",
  },
  {
    label: "Tỷ lệ hộ nghèo đa chiều",
    y2022: "4,30%",
    y2023: "2,93%",
    y2024: "1,93%",
    y2025: "< 1,50%",
    note: "Nguồn: Bộ LĐ-TB&XH (2022-2025)",
  },
  {
    label: "Chỉ số Hạnh phúc Thế giới",
    y2022: "Hạng 65/146",
    y2023: "Hạng 65/137",
    y2024: "Hạng 54/143",
    y2025: "Hạng 46/143",
    note: "Nguồn: World Happiness Report (UNSDSN)",
  },
];

export const STORIES_LIST: StoryCase[] = [
  {
    title: "Bill Gates & Quỹ Gates Foundation",
    subtitle: "Chuyển tiền thành Của cải xã hội thực sự",
    type: "positive",
    image: "/watermarks/images/tu-thien.jpeg",
    content: "Bill Gates đã chuyển hơn 100 tỷ USD tài sản cá nhân vào các quỹ từ thiện tài trợ y tế, vắc-xin và giáo dục toàn cầu. Warren Buffett cam kết cho đi hơn 99% tài sản.",
    marxistAnalysis: "Góc nhìn Mác - Lênin: Đưa tiền trở lại lưu thông, chuyển hóa từ đại biểu sở hữu thành Giá trị sử dụng và Của cải thực sự giúp phát triển hạ tầng và giải phóng sức lao động.",
    quote: "Tiền chỉ phát huy vai trò tích cực khi được chuyển hóa thành Của cải xã hội.",
  },
  {
    title: "Markus Persson (Minecraft)",
    subtitle: "Bi kịch của sự Sùng bái Tiền tệ",
    type: "negative",
    image: "/watermarks/images/khung-hoang.webp",
    content: "Sau khi bán Mojang (Minecraft) cho Microsoft lấy 2,5 tỷ USD cash, Markus Persson rơi vào khủng hoảng tinh thần, cảm giác cô lập và mất phương hướng sống.",
    marxistAnalysis: "Góc nhìn Mác - Lênin: Tiền không đo lường được giá trị tinh thần. Sùng bái tiền tệ biến tiền từ phương tiện thành mục đích sống duy nhất gây tha hóa con người.",
    quote: "Tiền tài vô hạn không mua được sự kết nối tinh thần và bình yên nội tại.",
  },
  {
    title: "Văn hóa & Rap Việt",
    subtitle: "\"Tiền Nhiều Để Làm Gì?\" — GDucky & Đen Vâu",
    type: "culture",
    image: "/watermarks/images/com.webp",
    content: "Ca khúc 'Tiền Nhiều Để Làm Gì?' (GDucky) và 'Bài này chill phết' (Đen Vâu ft. MIN), 'Bao tiền một mớ bình yên' (14 Casper) phản ánh tâm lý giới trẻ.",
    marxistAnalysis: "Minh họa quy luật tái sản xuất sức lao động: Áp lực 'cơm áo gạo tiền' đòi hỏi nền tảng vật chất tối thiểu, nhưng tiền cũng gây mâu thuẫn giữa Giá trị và Giá trị sử dụng tinh thần.",
    quote: "Bao tiền một mớ bình yên — Mâu thuẫn giữa Giá trị vật ngang giá và Ý thức tinh thần.",
  },
];

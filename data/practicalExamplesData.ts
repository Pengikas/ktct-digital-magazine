export interface PracticalExample {
  id: string;
  category: "tài-chính-xã-hội" | "tha-hóa-tâm-lý" | "nghệ-thuật-đại-chúng";
  direction: "thuận" | "nghịch" | "văn-hóa";
  title: string;
  subtitle: string;
  subject: string;
  imagePlaceholderText: string;
  fact: string;
  imageUrl?: string;
  marxistAnalysis: string;
  takeaway: string;
  quote?: string;
  badge: string;
  sourceUrl?: string;
  sourceLinkLabel?: string;
}

export const PRACTICAL_EXAMPLES: PracticalExample[] = [
  {
    id: "bill-gates",
    category: "tài-chính-xã-hội",
    direction: "thuận",
    title: "Bill Gates & Quỹ từ thiện Gates Foundation",
    subtitle: "Chuyển hóa tài sản cá nhân thành Của cải xã hội thực sự",
    subject: "Bill Gates",
    imageUrl: "/watermarks/images/tu-thien.jpeg",
    imagePlaceholderText: "Bill Gates - Chuyển giao >100 tỷ USD vào Quỹ từ thiện",
    fact: "Tỷ phú Bill Gates đã cam kết chuyển giao gần như toàn bộ tài sản cá nhân (hơn 100 tỷ USD) vào Quỹ từ thiện Gates Foundation. Tính đến giai đoạn 2024–2025, Quỹ đã giải ngân hàng chục tỷ USD cho các chiến dịch thanh toán bệnh sốt xuất huyết, sốt rét, xóa sổ bệnh truyền nhiễm và nghiên cứu vắc-xin cho các nước thu nhập thấp.",
    marxistAnalysis: "Bill Gates đã tách tiền khỏi hình thái 'thước đo sức mạnh cá nhân' để đưa tiền trở lại vòng lưu thông xã hội. Tiền lúc này đại diện cho 'của cải xã hội thực sự' (vắc-xin, công trình y tế, tri thức khoa học), trực tiếp giải phóng sức lao động ở các nước đang phát triển khỏi bệnh tật [C.Mác, Tư bản, Tập 1].",
    takeaway: "Tiền biến thành 'Tư bản tích cực' khi vận động trong lưu thông dưới dạng tài trợ xã hội, chuyển hóa thành giá trị sử dụng cho cộng đồng.",
    quote: "Tiền chỉ thực sự biến thành của cải khi nó tạo ra giá trị sử dụng mới cho xã hội.",
    badge: "Tư bản tích cực",
    sourceUrl: "https://www.gatesfoundation.org/about/financials/annual-reports/annual-report-2024",
    sourceLinkLabel: "Báo cáo thường niên Gates Foundation 2024"
  },
  {
    id: "warren-buffett",
    category: "tài-chính-xã-hội",
    direction: "thuận",
    title: "Warren Buffett & Cam kết Cho đi (The Giving Pledge)",
    subtitle: "Giới hạn tiêu dùng cá nhân & Điều tiết bất bình đẳng",
    subject: "Warren Buffett",
    imageUrl: "/watermarks/images/luu-thong-tien-te.jpg",
    imagePlaceholderText: "Warren Buffett - Cam kết cho đi 99% tài sản",
    fact: "Huyền thoại đầu tư Warren Buffett cam kết cho đi hơn 99% tài sản cá nhân của mình cho các quỹ từ thiện xã hội và cam kết không để lại gia sản kếch xù cho con cháu làm tiêu hao động lực lao động.",
    marxistAnalysis: "Giá trị sử dụng của hàng chục tỷ USD đối với cá nhân một con người là cực kỳ hạn chế (H - T - H). Tiền chỉ thực sự phát huy vai trò của cải khi biến thành công cụ điều tiết, giảm bớt bất bình đẳng và phát triển hạ tầng xã hội [C.Mác & F.Engels, Toàn tập, Tập 25].",
    takeaway: "Tiền nhiều vượt quá nhu cầu cá nhân phải được trả lại cho lưu thông xã hội để thúc đẩy tái sản xuất xã hội.",
    quote: "Nhu cầu tiêu dùng cá nhân luôn có giới hạn; tiền phát huy giá trị khi phục vụ tiến bộ chung.",
    badge: "Điều tiết lưu thông",
    sourceUrl: "https://www.givingpledge.org/pledger/warren-buffett/",
    sourceLinkLabel: "The Giving Pledge — Warren Buffett"
  },
  {
    id: "markus-persson",
    category: "tha-hóa-tâm-lý",
    direction: "nghịch",
    title: "Markus Persson (Notch - Cha đẻ Minecraft)",
    subtitle: "Khủng hoảng tinh thần & Bi kịch của sự Sùng bái Tiền tệ",
    subject: "Markus Persson (Notch)",
    imageUrl: "/watermarks/images/khung-hoang.webp",
    imagePlaceholderText: "Markus Persson - Tỷ phú 2.5 tỷ USD rơi vào cô lập",
    fact: "Sau khi bán trò chơi Minecraft cho Microsoft lấy 2,5 tỷ USD, Markus Persson trở thành tỷ phú nhưng liên tục rơi vào khủng hoảng tâm lý, cô lập và chia sẻ trên mạng xã hội về nỗi cô đơn tột cùng vì cảm giác bị tiền bạc chia cắt khỏi các mối quan hệ bạn bè chân thành.",
    marxistAnalysis: "Tiền tệ là vật ngang giá chung, đại diện cho lao động xã hội kết tinh nhưng không phải là thước đo của hạnh phúc tinh thần. Việc thần tượng hóa tiền bạc khiến con người rơi vào hiện tượng tha hóa, biến mình thành nô lệ của của cải vật chất [C.Mác, Bản thảo Kinh tế - Triết học năm 1844].",
    takeaway: "Sùng bái tiền tệ tước đi các mối quan hệ xã hội chân thật, dẫn đến khủng hoảng tha hóa tinh thần.",
    quote: "Tiền bạc không mua được tình cảm chân thành - những giá trị thuộc về ý thức xã hội phi hàng hóa.",
    badge: "Tha hóa tiền tệ",
    sourceUrl: "https://www.bbc.com/news/technology-29205368",
    sourceLinkLabel: "BBC News — Câu chuyện bi kịch của Notch"
  },
  {
    id: "gducky",
    category: "nghệ-thuật-đại-chúng",
    direction: "văn-hóa",
    title: "Rap Việt: 'Tiền Nhiều Để Làm Gì?' — GDucky",
    subtitle: "Đấu tranh tâm lý giữa Khát vọng vật chất và Nguy cơ thao túng",
    subject: "GDucky (Rap Việt)",
    imageUrl: "/watermarks/images/nhung.jpg",
    imagePlaceholderText: "GDucky - Tác phẩm 'Tiền Nhiều Để Làm Gì?'",
    fact: "Bài rap nổi tiếng tại Rap Việt khắc họa sự đấu tranh nội tâm dữ dội của người trẻ trước sức hút của đồng tiền: khao khát làm giàu vật chất song song với nỗi sợ bị tiền bạc thao túng, đánh mất tình anh em và bản ngã chân thật.",
    marxistAnalysis: "Phản ánh chân thực hiện tượng 'sùng bái tiền tệ' trong kinh tế thị trường khi tiền chuyển từ phương tiện môi giới (H - T - H) thành mục đích tự thân chi phối suy nghĩ (T - H - T') [C.Mác, Tư bản, Tập 1].",
    takeaway: "Phản ánh mâu thuẫn nội tâm khi đồng tiền chuyển từ công cụ sinh hoạt thành thước đo quyền lực.",
    quote: "Tiền nhiều để làm gì? Nỗi trăn trở khi tiền chuyển thành mục đích thao túng bản ngã.",
    badge: "Rap & Triết học",
    sourceUrl: "https://www.youtube.com/watch?v=DqXNRXd5Wmk&list=RDDqXNRXd5Wmk&start_radio=1",
    sourceLinkLabel: "Nghe 'Tiền Nhiều Để Làm Gì?' — GDucky (YouTube)"
  },
  {
    id: "den-vau",
    category: "nghệ-thuật-đại-chúng",
    direction: "văn-hóa",
    title: "'Bài này chill phết' — Đen Vâu ft. MIN",
    subtitle: "Quy luật Tái sản xuất Sức lao động & Áp lực cơm áo gạo tiền",
    subject: "Đen Vâu ft. MIN",
    imageUrl: "/watermarks/images/com.webp",
    imagePlaceholderText: "Đen Vâu - 'Tiền công làm cho mình có sức mạnh...'",
    fact: "Tác phẩm phản ánh áp lực 'cơm áo gạo tiền' của thế hệ trẻ thành thị ('Tiền công làm cho mình có sức mạnh...'), khẳng định tiền bạc là điều kiện tối thiểu để trang trải cuộc sống và giải tỏa áp lực sinh tồn.",
    marxistAnalysis: "Minh họa sắc bén cho quy luật Tái sản xuất sức lao động. Con người cần tiền để duy trì các nhu cầu sinh hoạt tối thiểu (ăn, ở, nghỉ ngơi); không thể 'chill' hay phát triển đời sống tinh thần nếu thiếu nền tảng vật chất [C.Mác & F.Engels, Sức lao động và Tư bản].",
    takeaway: "Thu nhập là điều kiện vật chất bắt buộc để tái sản xuất sức lao động thể chất và tinh thần.",
    quote: "Không thể chill nếu thiếu tiền trang trải các nhu cầu sinh tồn cơ bản.",
    badge: "Tái sản xuất sức lao động",
    sourceUrl: "https://www.youtube.com/watch?v=ddaEtFOsFeM&list=RDddaEtFOsFeM&start_radio=1",
    sourceLinkLabel: "Nghe 'Bài này chill phết' — Đen Vâu ft. MIN (YouTube)"
  },
  {
    id: "casper-14",
    category: "nghệ-thuật-đại-chúng",
    direction: "văn-hóa",
    title: "'Bao tiền một mớ bình yên' — 14 Casper ft. Bon",
    subtitle: "Mâu thuẫn giữa Giá trị và Giá trị sử dụng",
    subject: "14 Casper ft. Bon",
    imageUrl: "/watermarks/images/binhyen.webp",
    imagePlaceholderText: "14 Casper - 'Bao tiền một mớ bình yên?'",
    fact: "Bài hát đặt câu hỏi ẩn dụ giàu chất thơ về mối quan hệ giữa tiền bạc và sự an yên tâm hồn: thừa nhận tiền giúp tạo 'lá chắn' bảo vệ gia đình trước sóng gió nhưng không thể mua trực tiếp sự thanh thản tâm hồn.",
    marxistAnalysis: "Thể hiện mâu thuẫn giữa Giá trị (tiền tệ là vật ngang giá chung) và Giá trị sử dụng (sự bình yên thuộc về ý thức xã hội). Tiền là phương tiện vật chất, còn 'bình yên' thuộc về ý thức — chỉ đạt được khi con người làm chủ đồng tiền chứ không để tiền làm chủ [C.Mác, Bản thảo 1844].",
    takeaway: "Bình yên là trạng thái ý thức xã hội, chỉ đạt được khi con người làm chủ đồng tiền.",
    quote: "Tiền mua được lá chắn rủi ro, nhưng sự bình yên đòi hỏi khả năng làm chủ bản thân.",
    badge: "Giá trị & An yên",
    sourceUrl: "https://www.youtube.com/watch?v=Oh19aOhA3eU&list=RDOh19aOhA3eU&start_radio=1",
    sourceLinkLabel: "Nghe 'Bao tiền một mớ bình yên' — 14 Casper ft. Bon (YouTube)"
  }
];

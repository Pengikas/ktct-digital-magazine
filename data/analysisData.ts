export interface AnalysisSection {
  id: string;
  sectionNumber: string;
  title: string;
  subtitle: string;
  formulaBadge?: string;
  summary: string;
  contentParagraphs: string[];
  pullQuote?: {
    text: string;
    author: string;
  };
  callouts?: {
    type: "info" | "warning" | "success" | "note";
    title: string;
    text: string;
  }[];
  keyTakeaways: string[];
}

export const CENTRAL_QUESTION_ANALYSIS: AnalysisSection[] = [
  {
    id: "simple-circulation",
    sectionNumber: "01",
    title: "Cầu nối: Lưu thông hàng hóa giản đơn",
    subtitle: "Tiền nhiều để phục vụ nhu cầu sinh hoạt (nền H–T–H trước khi sang tư bản)",
    formulaBadge: "H - T - H",
    summary: "Trong công thức lưu thông H - T - H, mục đích đầu tiên và cuối cùng là Hàng hóa có Giá trị sử dụng mới (H'). Tiền tệ đóng vai trò môi giới trung gian.",
    contentParagraphs: [
      "Trong công thức lưu thông hàng hóa giản đơn H - T - H, con người bắt đầu bằng việc bán hàng hóa mình sản xuất ra (H) để lấy tiền (T), sau đó dùng tiền đó để mua một hàng hóa khác (H') mà mình có nhu cầu sử dụng.",
      "Mục đích đầu tiên và cuối cùng của quá trình này là H (Hàng hóa có Giá trị sử dụng mới). Ở góc độ này, con người cần nhiều tiền (T) chỉ để quy đổi ra nhiều giá trị sử dụng hơn: nhà cửa, thức ăn, chăm sóc y tế, giáo dục, giải trí, nghệ thuật...",
      "'Tiền nhiều' ở đây đóng vai trò là phương tiện nâng cao chất lượng cuộc sống vật chất và tinh thần của con người, đảm bảo sự an toàn về tài chính cá nhân và gia đình trước các biến cố đời sống."
    ],
    pullQuote: {
      text: "Trong lưu thông hàng hóa giản đơn, mục đích duy nhất của tiền là quy đổi ra nhiều giá trị sử dụng hơn để phục vụ cuộc sống con người.",
      author: "Kinh tế Chính trị Mác - Lênin"
    },
    callouts: [
      {
        type: "info",
        title: "Bản chất của H - T - H",
        text: "Tiền ở đây chỉ là phương tiện trao đổi trung gian. Vòng quay kết thúc khi con người nhận được Giá trị sử dụng mong muốn."
      }
    ],
    keyTakeaways: [
      "Mục đích cuối cùng là Giá trị sử dụng (H')",
      "Tiền là công cụ nâng cao chất lượng sống vật chất & tinh thần",
      "Đảm bảo an toàn tài chính trước biến cố xã hội"
    ]
  },
  {
    id: "capitalist-production",
    sectionNumber: "02",
    title: "3.2 Tích lũy tư bản",
    subtitle: "Tiền biến thành tư bản — tái sản xuất mở rộng, c/v, tích tụ & tập trung",
    formulaBadge: "T - H - T' (T' = T + Δt · m)",
    summary: "Khi tiền chuyển sang công thức vận động của tư bản, mục đích là giá trị thặng dư m; tích lũy tư bản (Chương 3 · 3.2) trả lời trực tiếp 'tiền nhiều để làm gì' trong sản xuất.",
    contentParagraphs: [
      "Khi nền kinh tế phát triển đến một trình độ nhất định, tiền không dừng lại ở công thức H – T – H mà chuyển sang công thức vận động của Tư bản: T - H - T' (trong đó T' = T + Δt). Δt là số gia tiền gắn với giá trị thặng dư m từ việc sử dụng hàng hóa đặc biệt: Sức lao động.",
      "Lúc này, bản chất của tiền đã có bước nhảy vọt chất lượng — đúng trọng tâm mục 3.2 Giáo trình:",
      "- Tiền nhiều để Tái sản xuất mở rộng: Nhà tư bản không dùng hết giá trị thặng dư cho tiêu dùng cá nhân mà chuyển hóa thành tư bản phụ thêm (mua thêm tư liệu sản xuất c, sức lao động v, mở rộng nhà xưởng, đổi mới máy móc) để chuyển từ tái sản xuất giản đơn sang tái sản xuất mở rộng.",
      "- Tiền nhiều làm tăng Cấu tạo hữu cơ tư bản (c/v): Giúp doanh nghiệp đổi mới công nghệ, nâng cao năng suất lao động xã hội và tăng khả năng cạnh tranh trên thị trường.",
      "- Tiền nhiều thúc đẩy Tích tụ và Tập trung tư bản: Làm tăng quy mô tư bản cá biệt (tích tụ) và tạo tiền đề sáp nhập các tư bản nhỏ thành các tập đoàn tư bản lớn (tập trung), giúp chủ sở hữu nắm giữ quyền chi phối nguồn lực lao động của xã hội."
    ],
    pullQuote: {
      text: "Tiền không tự sinh ra tiền. Sức lao động mới là hàng hóa đặc biệt tạo ra giá trị thặng dư m.",
      author: "C. Mác — Tư bản luận, Quyển I"
    },
    callouts: [
      {
        type: "warning",
        title: "Tái sản xuất mở rộng & Cấu tạo hữu cơ (c/v)",
        text: "Tích lũy tư bản là việc biến một phần giá trị thặng dư thành tư bản phụ thêm. Tăng c/v chứng tỏ sự phát triển của công nghệ và lực lượng sản xuất."
      }
    ],
    keyTakeaways: [
      "Tiền biến đổi thành Tư bản sinh lời (T - H - T')",
      "Tái sản xuất mở rộng & Nâng cao cấu tạo hữu cơ tư bản (c/v)",
      "Tích tụ và Tập trung tư bản gia tăng quyền chi phối nguồn lực"
    ]
  },
  {
    id: "surplus-value-distribution",
    sectionNumber: "03",
    title: "3.3 Hình thức biểu hiện của giá trị thặng dư",
    subtitle: "Lợi nhuận bình quân · Lợi tức · Tư bản giả · Địa tô",
    formulaBadge: "P̅ | z | R · mục 3.3",
    summary: "Trong nền kinh tế thị trường, giá trị thặng dư vận động và phân chia thành lợi nhuận bình quân, lợi tức và địa tô (Chương 3 · 3.3).",
    contentParagraphs: [
      "Trong nền kinh tế thị trường, 'tiền nhiều' (dưới dạng giá trị thặng dư) vận động và phân chia thành các hình thái lợi ích khác nhau — đúng nội dung mục 3.3:",
      "- Lợi nhuận bình quân (P̅): Tiền nhiều tạo sự 'tự do di chuyển vốn' giữa các ngành sản xuất kinh doanh. Nhà đầu tư di chuyển dòng tiền từ các ngành có tỷ suất lợi nhuận thấp sang ngành có tỷ suất lợi nhuận cao, hình thành Tỷ suất lợi nhuận bình quân và Lợi nhuận bình quân.",
      "- Lợi tức (z) & Tư bản cho vay (T - T'): Tình trạng chủ thể có tiền nhàn rỗi và chủ thể thiếu vốn kinh doanh thúc đẩy quan hệ cho vay. Tiền nhàn rỗi được đưa vào lưu thông tài chính hoặc đầu tư vào Tư bản giả (cổ phiếu, trái phiếu, chứng quyền trên thị trường chứng khoán) để thu lợi tức (z), tạo ra hiện tượng 'tiền đẻ ra tiền'.",
      "- Địa tô (R): Trong kinh doanh nông nghiệp hoặc bất động sản, phần giá trị thặng dư còn lại sau lợi nhuận bình quân được trả cho địa chủ dưới dạng địa tô."
    ],
    pullQuote: {
      text: "Lợi tức và tư bản giả biến tiền thành hình thái T - T', tạo ra ảo tưởng tiền tự sinh ra tiền mà không thông qua sản xuất.",
      author: "C. Mác & F. Engels — Toàn tập, Tập 25"
    },
    callouts: [
      {
        type: "note",
        title: "Tư bản giả & Thị trường tài chính",
        text: "Cổ phiếu, trái phiếu là chứng quyền nhận cổ tức/lợi tức. Khi tài chính phái sinh tách rời sản xuất thực tế, nguy cơ bong bóng tài chính nảy sinh."
      }
    ],
    keyTakeaways: [
      "Hình thành Lợi nhuận bình quân (P̅) qua tự do di chuyển vốn",
      "Lợi tức (z) & Tư bản cho vay thúc đẩy hình thành Tư bản giả",
      "Địa tô (R) trích từ phần còn lại sau lợi nhuận bình quân"
    ]
  },
  {
    id: "nature-of-wealth",
    sectionNumber: "04",
    title: "Bản chất thực sự của 'Của cải' xã hội",
    subtitle: "Tiền tệ hay Giá trị sử dụng? — kết luận cho câu hỏi CQ5",
    summary: "C.Mác đã vạch rõ sự khác biệt giữa Tiền tệ (đại biểu chứng nhận) và Của cải thực sự (Giá trị sử dụng của xã hội).",
    contentParagraphs: [
      "C.Mác đã vạch rõ sự khác biệt bản chất giữa Tiền và Của cải thực sự của xã hội:",
      "1. Tiền chỉ là phương tiện biểu hiện giá trị, là đại biểu chứng nhận quyền sở hữu của cải trong xã hội.",
      "2. Của cải thực sự của xã hội phải là Giá trị sử dụng — bao gồm: hệ thống hạ tầng, nhà máy, công nghệ, hàng hóa hữu hình, tri thức khoa học, tài nguyên và quan trọng nhất là sự phát triển toàn diện sức lao động / con người.",
      "Nếu một xã hội có rất nhiều tiền nhưng không tạo ra thêm hàng hóa, dịch vụ hay tri thức thực tế thì tiền chỉ gây ra lạm phát. Tiền chỉ thực sự biến thành của cải khi nó được đưa vào lưu thông và sản xuất để thúc đẩy xã hội tạo ra giá trị mới."
    ],
    pullQuote: {
      text: "Của cải thực sự của xã hội không phải là những tờ giấy bạc, mà là toàn bộ giá trị sử dụng và năng lực phát triển con người.",
      author: "C. Mác — Bản thảo Kinh tế - Triết học năm 1844"
    },
    callouts: [
      {
        type: "warning",
        title: "Nguy cơ Lạm phát",
        text: "In thêm tiền mà không tăng năng lực sản xuất thực tế chỉ làm giảm sức mua của đồng tiền, không làm xã hội giàu có hơn."
      }
    ],
    keyTakeaways: [
      "Tiền = Đại biểu đại diện quyền sở hữu của cải",
      "Của cải thực sự = Hệ thống hạ tầng, công nghệ, tri thức & con người",
      "Tiền chỉ có giá trị khi thúc đẩy tạo ra Giá trị sử dụng mới"
    ]
  },
  {
    id: "fetishism-dark-side",
    sectionNumber: "05",
    title: "Mặt trái của việc 'Sùng bái Tiền tệ'",
    subtitle: "Sự tha hóa quan hệ xã hội & Biến tiền thành mục đích duy nhất",
    summary: "Kinh tế Chính trị Mác - Lênin chỉ ra hiện tượng 'Sùng bái tiền tệ' khiến mối quan hệ giữa người với người bị tha hóa.",
    contentParagraphs: [
      "Kinh tế Chính trị Mác – Lênin chỉ ra hiện tượng 'Sùng bái hàng hóa' và 'Sùng bái tiền tệ':",
      "Khi tiền tệ trở thành sức mạnh chi phối toàn bộ đời sống, con người dễ rơi vào trạng thái biến tiền từ công cụ phục vụ con người thành mục đích sống duy nhất.",
      "Mối quan hệ giữa người với người có nguy cơ bị 'hàng hóa hóa' và 'tiền tệ hóa', biến thành mối quan hệ 'tiền trao cháo múc', làm gia tăng khoảng cách giàu nghèo và phân hóa xã hội nếu không có sự điều tiết của Nhà nước."
    ],
    pullQuote: {
      text: "Tiền tệ biến mọi tính chất tự nhiên và con người thành cái đối lập với chúng... Nó là cái bùa thần kỳ hóa thân thành mọi thứ.",
      author: "C. Mác — Bản thảo Kinh tế - Triết học"
    },
    callouts: [
      {
        type: "warning",
        title: "Hiện tượng Tha hóa (Alienation)",
        text: "Khi con người bị đồng tiền chi phối, đạo đức, tình thân và nhân phẩm nguy cơ bị đem ra làm vật trao đổi."
      }
    ],
    keyTakeaways: [
      "Hiện tượng sùng bái tiền tệ biến công cụ thành mục đích",
      "Mối quan hệ con người bị hàng hóa hóa & tiền tệ hóa",
      "Đòi hỏi vai trò điều tiết xã hội của Nhà nước"
    ]
  }
];

export const COUNTER_ARGUMENTS = [
  {
    id: "view-1",
    title: "Quan điểm 1: Tiền là quan trọng nhất",
    subtitle: "Tiền bạc là giá trị tối cao, quyết định mọi thứ",
    stance: "Tiền bạc quyết định mọi khía cạnh cuộc sống, sự thành bại và giá trị bản thân con người.",
    marxistCritique: "Sa vào hiện tượng sùng bái tiền tệ. Tiền về bản chất chỉ là vật ngang giá chung, đại diện cho lao động xã hội chứ không tạo ra giá trị tinh thần hay quyết định mọi mặt ý thức xã hội.",
    arguments: [
      {
        point: "Tiền không thể mua được mọi giá trị tinh thần",
        detail: "Tiền bạc có thể mua được tiện nghi nhưng không mua được hạnh phúc chân thật, sự thanh thản trong tâm hồn, hay tình cảm chân thành từ người khác. Đây là các thái trù thuộc ý thức xã hội."
      },
      {
        point: "Tiền bất lực trước quy luật tự nhiên (Sức khỏe & Thời gian)",
        detail: "Tiền có thể chi trả cho dịch vụ y tế đắt đỏ, nhưng không thể đảo ngược lão hóa hay chữa lành mọi bệnh nan y. Khi mất sức khỏe và thời gian, tiền mất đi giá trị sử dụng."
      },
      {
        point: "Giới hạn trước đạo đức và nhân cách",
        detail: "Tiền chỉ là công cụ vật chất, không phải gốc rễ tạo nên giá trị một con người. Tiền không thể thay thế sự tử tế, lòng tự trọng hay nhân phẩm."
      }
    ],
    conclusion: "Tiền bạc chỉ thực sự có ý nghĩa khi trở thành phương tiện chứ không phải mục đích. Nó có thể cứu sống bệnh nhân, tài trợ học bổng, nhưng sẽ trở thành thảm họa nếu bị thần tượng hóa."
  },
  {
    id: "view-2",
    title: "Quan điểm 2: Tiền không quan trọng",
    subtitle: "Coi nhẹ đồng tiền, coi tiền là nguồn gốc tội lỗi",
    stance: "Cho rằng tiền bạc không quan trọng, duy tâm thoát rời đời sống vật chất.",
    marxistCritique: "Sa vào chủ nghĩa duy tâm, thoát rời thực tế của nền sản xuất hàng hóa. Không thể có 'đời sống tinh thần' nếu không có nền tảng vật chất để duy trì sự tồn tại.",
    arguments: [
      {
        point: "Tiền là điều kiện để đáp ứng nhu cầu cơ bản",
        detail: "Trong kinh tế thị trường, tiền là phương tiện bắt buộc để duy trì nhu cầu sinh học tối thiểu (ăn, ở, mặc, y tế, giáo dục). Thiếu tiền đồng nghĩa với việc không thể tái sản xuất sức lao động."
      },
      {
        point: "Tải trọng tâm lý của sự nghèo khó (Cognitive Load of Poverty)",
        detail: "Thiếu tiền buộc bộ não con người luôn ở trạng thái 'sinh tồn'. Khi bận lo bữa ăn tiếp theo, con người bị tước đi không gian tâm lý để tư duy dài hạn, học tập hay phát triển bản thân."
      },
      {
        point: "Tiền là 'tấm lá chắn' trước rủi ro",
        detail: "Biến cố (bệnh tật, thất nghiệp, thiên tai) có thể xảy ra bất cứ lúc nào. Tiền mang lại quyền được lựa chọn và sự bảo vệ trước biến cố xã hội."
      }
    ],
    conclusion: "Tiền không phải là mục đích tối cao của cuộc sống, nhưng là điều kiện bắt buộc để tái sản xuất sức lao động và đem lại sự tự do, chủ động cho con người trước rủi ro xã hội."
  },
  {
    id: "view-3",
    title: "Quan điểm Cân bằng",
    subtitle: "Tiền là phương tiện quan trọng nhưng không phải mục đích cuối cùng",
    stance: "Thống nhất giữa Nền tảng vật chất và Giá trị tinh thần nhân văn.",
    marxistCritique: "Hoàn toàn phù hợp với góc nhìn Kinh tế Chính trị Mác - Lênin: Làm chủ đồng tiền, xem tiền là phương tiện giải phóng sức lao động.",
    arguments: [
      {
        point: "Vai trò nền tảng",
        detail: "Tiền duy trì sự tồn tại và phát triển của cá nhân lẫn lực lượng sản xuất xã hội (đảm bảo ăn, ở, học tập, y tế, sản xuất...)."
      },
      {
        point: "Giá trị thực sự phụ thuộc vào mục đích sử dụng",
        detail: "Nâng cao chất lượng cuộc sống (sức khỏe, sự an yên); Phát triển con người toàn diện (tri thức, kỹ năng, tâm hồn); Đóng góp cho cộng đồng và xã hội."
      },
      {
        point: "Chìa khóa làm chủ đồng tiền",
        detail: "Con người làm chủ tiền bạc, biến nó thành công cụ phục vụ cuộc sống chứ không để tiền bạc làm chủ tư duy và hành vi của mình."
      }
    ],
    conclusion: "Cân bằng đạt được khi con người nỗ lực kiếm tiền chân chính để bảo vệ bản thân và gia đình, đồng thời biến tiền thành phương tiện phát triển con người và lan tỏa giá trị cộng đồng."
  }
];

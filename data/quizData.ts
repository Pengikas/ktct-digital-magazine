export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  category: "Khái niệm" | "Chức năng & Nguồn gốc" | "Tư bản & Giá trị thặng dư" | "Phân tích & Thực tiễn";
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Sản xuất hàng hóa (Commodity Production) là kiểu tổ chức kinh tế như thế nào?",
    options: [
      "Sản phẩm sản xuất ra để người sản xuất tự tiêu dùng",
      "Sản phẩm sản xuất ra không phải để tự tiêu dùng mà để bán, trao đổi trên thị trường",
      "Sản phẩm sản xuất ra theo mệnh lệnh của nhà nước phong kiến",
      "Sản phẩm được chia đều cho mọi thành viên trong cộng đồng"
    ],
    correctAnswer: 1,
    explanation: "Theo định nghĩa KTCT Mác - Lênin, sản xuất hàng hóa là kiểu tổ chức kinh tế mà sản phẩm được sản xuất ra để bán, để trao đổi trên thị trường.",
    category: "Khái niệm"
  },
  {
    id: 2,
    question: "Yếu tố nào sau đây là công dụng của vật thể có thể thỏa mãn một nhu cầu nào đó của con người?",
    options: [
      "Giá trị trao đổi",
      "Giá trị của hàng hóa",
      "Giá trị sử dụng (Use-value)",
      "Giá trị thặng dư"
    ],
    correctAnswer: 2,
    explanation: "Giá trị sử dụng là công dụng của vật thể có thể thỏa mãn nhu cầu vật chất hoặc tinh thần của con người.",
    category: "Khái niệm"
  },
  {
    id: 3,
    question: "Giá trị của hàng hóa (Value) về bản chất là gì?",
    options: [
      "Số tiền mua hàng hóa đó trên thị trường",
      "Lao động xã hội của người sản xuất hàng hóa kết tinh bên trong hàng hóa đó",
      "Độ hiếm có của tài nguyên trên thiên nhiên",
      "Sự đánh giá cảm tính của người tiêu dùng"
    ],
    correctAnswer: 1,
    explanation: "Giá trị hàng hóa là lao động xã hội của người sản xuất hàng hóa kết tinh bên trong hàng hóa đó.",
    category: "Khái niệm"
  },
  {
    id: 4,
    question: "Tiền tệ xuất hiện là kết quả phát triển lâu dài của lịch sử sản xuất và lưu thông hàng hóa qua mấy hình thái giá trị?",
    options: [
      "2 hình thái",
      "3 hình thái",
      "4 hình thái",
      "5 hình thái"
    ],
    correctAnswer: 2,
    explanation: "Tiền tệ trải qua 4 hình thái: Đơn giản -> Đầy đủ -> Chung -> Tiền tệ.",
    category: "Chức năng & Nguồn gốc"
  },
  {
    id: 5,
    question: "Hình thái giá trị đầu tiên và sơ khai nhất trong lịch sử phát triển của tiền tệ là gì?",
    options: [
      "Hình thái giá trị chung",
      "Hình thái tiền tệ",
      "Hình thái giá trị đơn giản hay ngẫu nhiên",
      "Hình thái giá trị mở rộng"
    ],
    correctAnswer: 2,
    explanation: "Hình thái đầu tiên là Hình thái giá trị đơn giản hay ngẫu nhiên (VD: 1 con cừu = 2 thúng thóc).",
    category: "Chức năng & Nguồn gốc"
  },
  {
    id: 6,
    question: "Khi tiền đóng vai trò trung gian trong trao đổi hàng hóa theo công thức H - T - H, tiền thực hiện chức năng gì?",
    options: [
      "Thước đo giá trị",
      "Phương tiện lưu thông",
      "Phương tiện cất trữ",
      "Tiền tệ thế giới"
    ],
    correctAnswer: 1,
    explanation: "Tiền làm môi giới trung gian cho quá trình mua bán H - T - H chính là chức năng Phương tiện lưu thông.",
    category: "Chức năng & Nguồn gốc"
  },
  {
    id: 7,
    question: "Chức năng nào của tiền đòi hỏi tiền phải có giá trị thực (vàng, bạc) hoặc rút hoàn toàn khỏi lưu thông?",
    options: [
      "Phương tiện lưu thông",
      "Phương tiện thanh toán",
      "Phương tiện cất trữ",
      "Thước đo giá trị"
    ],
    correctAnswer: 2,
    explanation: "Khi rút khỏi lưu thông và được giữ lại để đại diện cho của cải dưới dạng giá trị thuần túy, tiền thực hiện chức năng Cất trữ.",
    category: "Chức năng & Nguồn gốc"
  },
  {
    id: 8,
    question: "Chức năng Thước đo giá trị của tiền đòi hỏi điều gì?",
    options: [
      "Bắt buộc phải sử dụng tiền vàng thật",
      "Không nhất thiết cần tiền mặt thực tế, chỉ cần tiền tưởng tượng trong tư duy",
      "Phải có sự chứng nhận của Ngân hàng Thế giới",
      "Bắt buộc phải trả bằng ngoại tệ mạnh"
    ],
    correctAnswer: 1,
    explanation: "Để đo lường giá trị hàng hóa (VD nói chiếc áo giá 200k), chỉ cần dùng tiền trong tư duy (tưởng tượng) chứ không cần tiền mặt thực tế.",
    category: "Chức năng & Nguồn gốc"
  },
  {
    id: 9,
    question: "Công thức lưu thông tư bản là gì?",
    options: [
      "H - T - H",
      "T - H - T' (T' = T + Δt)",
      "H - H'",
      "T - T"
    ],
    correctAnswer: 1,
    explanation: "Công thức lưu thông tư bản là T - H - T', trong đó T' = T + Δt (Δt là giá trị thặng dư).",
    category: "Tư bản & Giá trị thặng dư"
  },
  {
    id: 10,
    question: "Hàng hóa đặc biệt nào có khả năng tạo ra giá trị mới lớn hơn giá trị của bản thân nó?",
    options: [
      "Máy móc hiện đại",
      "Nguyên nhiên vật liệu",
      "Sức lao động",
      "Nhà xưởng đất đai"
    ],
    correctAnswer: 2,
    explanation: "Sức lao động là hàng hóa đặc biệt duy nhất khi sử dụng tạo ra một lượng giá trị mới lớn hơn giá trị của chính nó (nguồn gốc Δt).",
    category: "Tư bản & Giá trị thặng dư"
  },
  {
    id: 11,
    question: "Công thức tính Chi phí sản xuất tư bản chủ nghĩa (k) là gì?",
    options: [
      "k = c + v",
      "k = c + v + m",
      "k = p + z",
      "k = G - p"
    ],
    correctAnswer: 0,
    explanation: "Chi phí sản xuất k = c + v (bù lại tư liệu sản xuất c và giá cả sức lao động v đã tiêu dùng).",
    category: "Tư bản & Giá trị thặng dư"
  },
  {
    id: 12,
    question: "Lợi nhuận (p) được quan niệm trong kinh tế thị trường là gì?",
    options: [
      "Là con đẻ của riêng tư bản cố định",
      "Là hình thái biểu hiện của giá trị thặng dư, được coi là con đẻ của toàn bộ tư bản ứng trước (p = G - k)",
      "Là khoản tiền do nhà nước trợ cấp",
      "Là phần chênh lệch giữa giá bán và chi phí vận chuyển"
    ],
    correctAnswer: 1,
    explanation: "Lợi nhuận p là hình thái biểu hiện của giá trị thặng dư trên bề mặt nền kinh tế thị trường, tính bằng p = G - k.",
    category: "Tư bản & Giá trị thặng dư"
  },
  {
    id: 13,
    question: "Sự tự do di chuyển vốn giữa các ngành sản xuất kinh doanh nhằm tìm kiếm tỷ suất lợi nhuận cao hơn dẫn đến hình thành yếu tố nào?",
    options: [
      "Lợi nhuận độc quyền",
      "Tỷ suất lợi nhuận bình quân và Lợi nhuận bình quân (P̅)",
      "Giá cả hàng hóa cố định",
      "Tỷ lệ lạm phát bằng 0"
    ],
    correctAnswer: 1,
    explanation: "Cạnh tranh giữa các ngành dẫn đến việc di chuyển vốn từ ngành lợi nhuận thấp sang cao, hình thành Tỷ suất lợi nhuận bình quân.",
    category: "Tư bản & Giá trị thặng dư"
  },
  {
    id: 14,
    question: "Lợi tức (z) là gì?",
    options: [
      "Toàn bộ giá trị thặng dư do công nhân tạo ra",
      "Một phần của lợi nhuận bình quân mà người đi vay phải trả cho người cho vay vì đã sử dụng tiền nhàn rỗi",
      "Số tiền nhà nước thu từ thuế thu nhập",
      "Khoản tiền thưởng cuối năm của doanh nghiệp"
    ],
    correctAnswer: 1,
    explanation: "Lợi tức z là một phần của lợi nhuận bình quân mà người đi vay trả cho người cho vay tư bản.",
    category: "Tư bản & Giá trị thặng dư"
  },
  {
    id: 15,
    question: "Thế nào là Tư bản giả (Fictitious Capital)?",
    options: [
      "Tiền giả do tội phạm in ấn",
      "Cổ phiếu, trái phiếu, chứng quyền trên thị trường chứng khoán đem lại lợi tức",
      "Máy móc hư hỏng không sử dụng được",
      "Tiền giấy đã hết hạn lưu hành"
    ],
    correctAnswer: 1,
    explanation: "Tư bản giả là các chứng khoán có giá (cổ phiếu, trái phiếu) không có giá trị tự thân nhưng mang lại quyền thu nhập (lợi tức, cổ tức).",
    category: "Tư bản & Giá trị thặng dư"
  },
  {
    id: 16,
    question: "Theo C.Mác, Của cải thực sự của xã hội là gì?",
    options: [
      "Số lượng tiền giấy và vàng cất giữ trong kho",
      "Giá trị sử dụng (hạ tầng, nhà máy, công nghệ, hàng hóa, tri thức và sự phát triển con người)",
      "Tổng số cổ phiếu niêm yết trên sàn chứng khoán",
      "Tổng số nợ công của quốc gia"
    ],
    correctAnswer: 1,
    explanation: "Tiền chỉ là đại biểu chứng nhận sở hữu của cải, còn của cải thực sự của xã hội phải là Giá trị sử dụng và năng lực con người.",
    category: "Phân tích & Thực tiễn"
  },
  {
    id: 17,
    question: "Điều gì xảy ra nếu xã hội tăng lượng tiền in ra nhưng không tạo thêm hàng hóa, dịch vụ hay tri thức thực tế?",
    options: [
      "Xã hội sẽ giàu có gấp đôi ngay lập tức",
      "Gây ra lạm phát và làm giảm sức mua của đồng tiền",
      "Tăng năng suất lao động xã hội",
      "Xóa bỏ hoàn toàn nghèo đói"
    ],
    correctAnswer: 1,
    explanation: "Nếu tiền tăng mà giá trị sử dụng không tăng thì tiền chỉ gây ra lạm phát.",
    category: "Phân tích & Thực tiễn"
  },
  {
    id: 18,
    question: "Hiện tượng Sùng bái tiền tệ (Money Fetishism) dẫn đến hậu quả xã hội nào?",
    options: [
      "Giúp con người đạt đến hạnh phúc tuyệt đối",
      "Biến tiền từ phương tiện thành mục đích duy nhất, làm tha hóa các quan hệ xã hội tốt đẹp",
      "Thúc đẩy đạo đức xã hội phát triển rực rỡ",
      "Tiêu diệt hoàn toàn tội phạm kinh tế"
    ],
    correctAnswer: 1,
    explanation: "Sùng bái tiền tệ làm tha hóa con người, biến mối quan hệ giữa người với người thành quan hệ hàng hóa hóa, tiền tệ hóa.",
    category: "Phân tích & Thực tiễn"
  },
  {
    id: 19,
    question: "Theo số liệu trong CONTENT.pdf, GDP bình quân đầu người của Việt Nam năm 2025 ước đạt bao nhiêu?",
    options: [
      "4.110 USD",
      "4.284 USD",
      "4.700 USD",
      "5.026 USD"
    ],
    correctAnswer: 3,
    explanation: "Năm 2025 GDP bình quân đầu người Việt Nam ước đạt khoảng 5.026 USD/người/năm (Tổng cục Thống kê).",
    category: "Phân tích & Thực tiễn"
  },
  {
    id: 20,
    question: "Tỷ lệ hộ nghèo đa chiều tại Việt Nam giảm từ 4,3% (năm 2022) xuống mức nào vào năm 2025?",
    options: [
      "Dưới 1,5%",
      "2,93%",
      "3,5%",
      "0%"
    ],
    correctAnswer: 0,
    explanation: "Tỷ lệ nghèo đa chiều giảm liên tục: 4,3% (2022) -> 2,93% (2023) -> 1,93% (2024) -> dưới 1,5% (2025).",
    category: "Phân tích & Thực tiễn"
  },
  {
    id: 21,
    question: "Thứ hạng Chỉ số Hạnh phúc Thế giới (World Happiness Report) của Việt Nam đã tăng từ vị trí 65 (năm 2022) lên vị trí nào vào năm 2025?",
    options: [
      "Thứ 60",
      "Thứ 54",
      "Thứ 46",
      "Thứ 30"
    ],
    correctAnswer: 2,
    explanation: "Xếp hạng Hạnh phúc của Việt Nam cải thiện vượt bậc lên thứ 46/143 quốc gia vào năm 2025.",
    category: "Phân tích & Thực tiễn"
  },
  {
    id: 22,
    question: "Hành động cam kết chuyển giao hơn 100 tỷ USD tài sản cá nhân vào Quỹ từ thiện của Bill Gates thể hiện góc nhìn Mác-Lênin nào?",
    options: [
      "Sùng bái tiền tệ để khẳng định quyền lực",
      "Tách tiền khỏi thước đo cá nhân, đưa tiền trở lại lưu thông xã hội tạo Của cải xã hội thực sự (vắc-xin, y tế)",
      "Đầu cơ chứng khoán tìm kiếm lợi tức z",
      "Tích trữ tiền vàng trong két sắt"
    ],
    correctAnswer: 1,
    explanation: "Bill Gates đưa tiền trở lại vòng lưu thông xã hội dưới dạng vắc-xin, y tế, giúp giải phóng sức lao động ở các nước phát triển.",
    category: "Phân tích & Thực tiễn"
  },
  {
    id: 23,
    question: "Trường hợp Markus Persson (Notch - Creator Minecraft) bán công ty lấy 2,5 tỷ USD rồi rơi vào cô độc phản ánh điều gì?",
    options: [
      "Tiền bạc là thước đo duy nhất của hạnh phúc",
      "Sự tha hóa do sùng bái tiền tệ: tiền không phải thước đo hạnh phúc tinh thần và không mua được tình bạn chân thành",
      "Minecraft không có giá trị sử dụng",
      "Quy luật cạnh tranh trong ngành game"
    ],
    correctAnswer: 1,
    explanation: "Bi kịch của Markus Persson chứng minh tiền không mua được giá trị tinh thần chân thật, việc thần tượng hóa tiền gây ra tha hóa.",
    category: "Phân tích & Thực tiễn"
  },
  {
    id: 24,
    question: "Tác phẩm Rap 'Tiền Nhiều Để Làm Gì?' của GDucky phản ánh hiện tượng lý luận nào?",
    options: [
      "Lưu thông hàng hóa giản đơn H - T - H",
      "Hiện tượng 'Sùng bái tiền tệ' khi tiền chuyển từ phương tiện thành mục đích thao túng bản ngã",
      "Tỷ suất lợi nhuận bình quân",
      "Tư bản giả trên sàn giao dịch"
    ],
    correctAnswer: 1,
    explanation: "GDucky diễn tả cuộc đấu tranh tâm lý trước nguy cơ bị tiền bạc thao túng, đánh mất bản ngã.",
    category: "Phân tích & Thực tiễn"
  },
  {
    id: 25,
    question: "Ca khúc 'Bài này chill phết' (Đen Vâu ft. MIN) minh họa cho quy luật kinh tế nào?",
    options: [
      "Tái sản xuất sức lao động (cần tiền trang trải nhu cầu sinh hoạt tối thiểu để tiếp tục lao động)",
      "Địa tô chênh lệch",
      "Tập trung tư bản",
      "Tiền tệ thế giới"
    ],
    correctAnswer: 0,
    explanation: "Tác phẩm thể hiện nhu cầu vật chất tối thiểu để tái sản xuất sức lao động; thiếu nền tảng vật chất thì không thể 'chill'.",
    category: "Phân tích & Thực tiễn"
  },
  {
    id: 26,
    question: "Khái niệm 'Tải trọng tâm lý của sự nghèo khó' (Cognitive Load of Poverty) nghĩa là gì?",
    options: [
      "Nghèo đói làm cho bộ não thông minh hơn",
      "Thiếu tiền buộc bộ não luôn ở trạng thái sinh tồn, tước đi không gian tâm lý để tư duy dài hạn và phát triển bản thân",
      "Người nghèo không cần dùng đến tiền",
      "Nghèo đói là do ý muốn cá nhân"
    ],
    correctAnswer: 1,
    explanation: "Khi luôn phải lo bữa ăn tiếp theo, bộ não bị quá tải bởi nỗi lo sinh tồn, hạn chế khả năng phát triển tri thức dài hạn.",
    category: "Phân tích & Thực tiễn"
  },
  {
    id: 27,
    question: "Theo quan điểm cân bằng trong CONTENT.pdf, tiền bạc đóng vai trò gì trong cuộc sống?",
    options: [
      "Mục đích sống tối cao duy nhất",
      "Điều kiện cần (phương tiện) nhưng giá trị sống nằm ở mục đích sử dụng để nâng cao chất lượng sống và phát triển con người",
      "Không có bất kỳ giá trị nào",
      "Thước đo đánh giá đạo đức của một con người"
    ],
    correctAnswer: 1,
    explanation: "Tiền là điều kiện cần để đảm bảo cuộc sống, nhưng giá trị phụ thuộc vào việc con người làm chủ đồng tiền để phục vụ hạnh phúc.",
    category: "Phân tích & Thực tiễn"
  },
  {
    id: 28,
    question: "Trong câu hỏi phản biện: 'Tại sao người nghèo vẫn có thể sống hạnh phúc?', câu trả lời từ CONTENT.pdf là gì?",
    options: [
      "Vì họ không biết đến sự tồn tại của tiền",
      "Vì họ cảm thấy đủ với cuộc sống của mình và tìm thấy hạnh phúc ở bữa cơm đầm ấm, giấc ngủ ngon và tình bạn",
      "Vì họ sở hữu nhiều tư bản giả",
      "Vì họ nhận được trợ cấp lớn từ nhà nước"
    ],
    correctAnswer: 1,
    explanation: "Người nghèo hạnh phúc nhờ biết đủ (tri túc) và trân trọng các giá trị tinh thần chân thật phi tiền bạc.",
    category: "Phân tích & Thực tiễn"
  },
  {
    id: 29,
    question: "Dưới góc nhìn KTCT Mác - Lênin, câu trả lời chuẩn xác nhất cho 'Tiền nhiều để làm gì?' bao gồm 2 mục đích lớn nào?",
    options: [
      "Tích trữ vàng trong kho & Phô trương địa vị xã hội",
      "Giải phóng sức lao động & Mở rộng tái sản xuất xã hội tạo giá trị lan tỏa cho cộng đồng",
      "Mua sắm xa xỉ phẩm & Thống trị người khác",
      "In thêm tiền giấy & Tăng nợ công quốc gia"
    ],
    correctAnswer: 1,
    explanation: "1. Giải phóng sức lao động khỏi gánh nặng sinh tồn. 2. Mở rộng tái sản xuất xã hội, tạo việc làm và đóng góp cho y tế, giáo dục.",
    category: "Phân tích & Thực tiễn"
  },
  {
    id: 30,
    question: "Kết luận thông điệp dành cho sinh viên từ đề tài nghiên cứu KTCT này là gì?",
    options: [
      "Từ bỏ việc kiếm tiền để sống ẩn dật",
      "Nỗ lực kiếm tiền bằng mọi giá bất chấp đạo đức",
      "Nỗ lực kiếm tiền chân chính để đảm bảo cuộc sống, luôn giữ tâm thế làm chủ tiền bạc, biến tiền thành phương tiện phục vụ hạnh phúc",
      "Coi tiền là mục đích duy nhất của tuổi trẻ"
    ],
    correctAnswer: 2,
    explanation: "Kiếm tiền chân chính để tự chủ tài chính, nhưng luôn làm chủ đồng tiền để phục vụ hạnh phúc cá nhân và sự tiến bộ xã hội.",
    category: "Phân tích & Thực tiễn"
  }
];

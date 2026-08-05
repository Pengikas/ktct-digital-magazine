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
    question: "Sự khác biệt căn bản nhất giữa công thức lưu thông hàng hóa giản đơn (H - T - H) và công thức chung của tư bản (T - H - T') nằm ở mục đích cuối cùng. Sự khác biệt đó là gì?",
    options: [
      "H-T-H phục vụ nhu cầu tích lũy tài sản, T-H-T' phục vụ nhu cầu tiêu dùng cá nhân.",
      "H-T-H có mục đích cuối cùng là giá trị sử dụng (hàng hóa mới), còn T-H-T' có mục đích là sự lớn lên của giá trị (thu giá trị thặng dư).",
      "H-T-H chỉ sinh ra lợi nhuận bình quân, còn T-H-T' sinh ra địa tô và lợi tức.",
      "Cả hai công thức đều có chung một mục đích là biến tiền thành thước đo giá trị."
    ],
    correctAnswer: 1,
    explanation: "Đáp án đúng: B. Công thức H-T-H có mục đích cuối cùng là Giá trị sử dụng (hàng hóa mới phục vụ nhu cầu sinh hoạt), còn T-H-T' có mục đích tối thượng là Sự lớn lên của giá trị (thu giá trị thặng dư Δt).",
    category: "Tư bản & Giá trị thặng dư"
  },
  {
    id: 2,
    question: "Theo quan điểm của C.Mác, nhận định nào sau đây diễn tả chính xác nhất về \"Của cải thực sự\" của xã hội?",
    options: [
      "Là tổng khối lượng tiền tệ và vàng bạc mà một quốc gia dự trữ được.",
      "Là các tài sản tài chính sinh lời như cổ phiếu, trái phiếu trên thị trường chứng khoán.",
      "Là Giá trị sử dụng, bao gồm: hệ thống hạ tầng, nhà máy, hàng hóa hữu hình, tri thức và sự phát triển toàn diện của con người.",
      "Là tổng số tiền được phân phối dưới dạng lợi nhuận, lợi tức và địa tô."
    ],
    correctAnswer: 2,
    explanation: "Đáp án đúng: C. Tiền chỉ là đại biểu chứng nhận quyền sở hữu. Nếu xã hội có rất nhiều tiền nhưng không tạo ra thêm hàng hóa, dịch vụ hay tri thức thực tế thì lượng tiền đó chỉ gây ra lạm phát.",
    category: "Khái niệm"
  },
  {
    id: 3,
    question: "Dưới góc nhìn KTCT Mác - Lênin, việc con người biến tiền từ phương tiện lưu thông thành \"mục đích sống duy nhất\" sẽ dẫn đến hệ quả triết học nào?",
    options: [
      "Dẫn đến hiện tượng \"sùng bái tiền tệ\", khiến con người bị tha hóa và các quan hệ xã hội tốt đẹp bị \"hàng hóa hóa\".",
      "Giúp con người hoàn toàn thoát khỏi \"tải trọng tâm lý\" của sự nghèo đói.",
      "Thúc đẩy mạnh mẽ quy luật cạnh tranh và phân công lao động xã hội.",
      "Làm sụp đổ ngay lập tức nền kinh tế thị trường."
    ],
    correctAnswer: 0,
    explanation: "Đáp án đúng: A. Hiện tượng sùng bái tiền tệ khiến tiền từ phương tiện trung gian biến thành mục đích duy nhất, làm tha hóa con người và biến các quan hệ xã hội thành quan hệ hàng hóa hóa.",
    category: "Phân tích & Thực tiễn"
  },
  {
    id: 4,
    question: "Tác phẩm nhạc Rap \"Bài này chill phết\" (Đen Vâu) được nhóm sử dụng làm minh chứng thực tiễn để khẳng định quy luật kinh tế nào?",
    options: [
      "Quy luật giá cả độc quyền.",
      "Quy luật Tái sản xuất sức lao động (con người cần tiền để duy trì nhu cầu sinh hoạt tối thiểu mới có thể giải tỏa áp lực và phát triển tinh thần).",
      "Quy luật mâu thuẫn giữa Giá trị và Giá trị sử dụng.",
      "Quy luật hình thành lợi nhuận bình quân trong nền kinh tế."
    ],
    correctAnswer: 1,
    explanation: "Đáp án đúng: B. Tác phẩm minh họa cho Quy luật Tái sản xuất sức lao động: con người cần đảm bảo nền tảng nhu cầu sinh hoạt vật chất tối thiểu mới có thể giải tỏa áp lực công việc và phát triển tinh thần.",
    category: "Phân tích & Thực tiễn"
  },
  {
    id: 5,
    question: "Qua việc đối chiếu hành động quyên góp hàng chục tỷ USD của Bill Gates với sự khủng hoảng tâm lý của tỷ phú Markus Persson, nhóm rút ra bài học cốt lõi nào?",
    options: [
      "Bán tài sản trí tuệ để lấy tiền mặt luôn dẫn đến bi kịch tâm lý.",
      "Người giàu có luôn luôn bất hạnh do đánh mất các mối quan hệ chân thành.",
      "Đầu tư vào y tế và vắc-xin luôn mang lại lợi nhuận cao hơn ngành công nghệ.",
      "Tiền chỉ phát huy giá trị khi được đưa trở lại lưu thông xã hội (làm chủ đồng tiền); ngược lại, tích trữ tự thân và sùng bái tiền bạc sẽ dẫn đến tha hóa (làm nô lệ cho tiền)."
    ],
    correctAnswer: 3,
    explanation: "Đáp án đúng: D. Tiền chỉ phát huy giá trị khi được đưa trở lại lưu thông xã hội phục vụ mục đích phát triển con người và hạ tầng (làm chủ đồng tiền); ngược lại tích trữ tự thân và sùng bái tiền bạc sẽ dẫn đến tha hóa.",
    category: "Phân tích & Thực tiễn"
  }
];

export interface QAItem {
  id: string;
  questionNumber: string;
  question: string;
  category: "Lý luận Mác-Lênin" | "Thực tiễn & Hạnh phúc" | "Kết luận KTCT";
  shortAnswer: string;
  fullAnswer: string;
  keyPoints: string[];
}

export const QA_ITEMS: QAItem[] = [
  {
    id: "qa-1",
    questionNumber: "Câu 01",
    question: "Dưới góc độ Kinh tế chính trị Mác - Lênin, tại sao việc coi 'Tiền là mục đích sống' lại dẫn đến sự tha hóa con người?",
    category: "Lý luận Mác-Lênin",
    shortAnswer: "Khi tiền từ phương tiện lưu thông (H-T-H) thành mục đích tự thân (T-H-T'), hiện tượng sùng bái tiền tệ xuất hiện, biến quan hệ xã hội thành hàng hóa hóa.",
    fullAnswer: "Khi tiền chuyển từ vai trò phương tiện lưu thông (H - T - H) thành mục đích tự thân (T - H - T'), hiện tượng 'sùng bái tiền tệ' xuất hiện. Con người bị phụ thuộc vào tiền, các quan hệ xã hội tốt đẹp (tình thân, đạo đức, tri thức) bị 'hàng hóa hóa' và 'tiền tệ hóa', dẫn đến suy thoái đạo đức và làm mất đi bản chất nhân văn của con người.",
    keyPoints: [
      "Chuyển từ H-T-H (phương tiện) sang T-H-T' (mục đích tự thân)",
      "Hiện tượng Sùng bái tiền tệ (Fetishism of Money)",
      "Hàng hóa hóa & tiền tệ hóa các giá trị đạo đức, tri thức, tình thân",
      "Tha hóa bản chất nhân văn của con người"
    ]
  },
  {
    id: "qa-2a",
    questionNumber: "Câu 02a",
    question: "Tại sao nhiều người giàu có vẫn cảm thấy không hạnh phúc? Liệu có phải họ đã đặt quá nhiều kỳ vọng vào tiền bạc?",
    category: "Thực tiễn & Hạnh phúc",
    shortAnswer: "Vì mải mê chạy theo đồng tiền mà bỏ quên việc nuôi dưỡng sức khỏe, tình cảm gia đình, bạn bè và các mối quan hệ phi hàng hóa.",
    fullAnswer: "Nếu chúng ta quá mải mê chạy theo đồng tiền mà quên mất đi còn những thứ tình cảm, quan hệ cần phải nuôi dưỡng, vun vén, bồi đắp thì tiền nhiều chả để làm gì. Ở câu hỏi này, những người giàu không cảm thấy hạnh phúc có lẽ họ đã mất đi những thứ tình cảm tốt đẹp trong cuộc sống như tình cảm gia đình, bạn bè, sức khỏe vì họ đã dành quá nhiều thời gian cho đồng tiền.",
    keyPoints: [
      "Quá mải mê chạy theo đồng tiền mà quên mất các giá trị phi hàng hóa",
      "Đánh đổi sức khỏe, thời gian và mối quan hệ tình thân",
      "Kỳ vọng tiền bạc mua được hạnh phúc tinh thần"
    ]
  },
  {
    id: "qa-2b",
    questionNumber: "Câu 02b",
    question: "Ngược lại, tại sao nhiều người nghèo vẫn có thể sống hạnh phúc? Họ đã tìm thấy hạnh phúc ở đâu?",
    category: "Thực tiễn & Hạnh phúc",
    shortAnswer: "Họ cảm thấy đủ với chính cuộc sống của mình, tìm thấy niềm vui ở bữa cơm gia đình đầm ấm, tình bạn và giấc ngủ ngon.",
    fullAnswer: "Người nghèo cảm thấy hạnh phúc chỉ đơn giản là họ cảm thấy đủ, họ cảm thấy đủ với chính cuộc sống của mình, cảm thấy đủ với chính đồng tiền mình làm ra để không phải chạy vạy bôn ba ngoài xã hội kia để vật vã với đồng tiền. Hạnh phúc của người nghèo có thể chỉ đơn giản là một bữa cơm gia đình đầm ấm, một buổi chiều trò chuyện cùng bạn bè, một giấc ngủ ngon.",
    keyPoints: [
      "Tâm thế biết đủ (Tri túc)",
      "Tìm thấy hạnh phúc ở giá trị tinh thần chân thật",
      "Bữa cơm gia đình đầm ấm, giấc ngủ ngon, sự thanh thản nội tâm"
    ]
  },
  {
    id: "qa-3",
    questionNumber: "Câu 03",
    question: "Dưới góc độ Kinh tế chính trị Mác - Lênin, câu trả lời chuẩn xác nhất cho câu hỏi 'Tiền nhiều để làm gì?' là gì?",
    category: "Kết luận KTCT",
    shortAnswer: "Tiền nhiều không phải để tích trữ vô thời hạn hay thể hiện quyền lực, mà để Giải phóng sức lao động & Mở rộng tái sản xuất xã hội.",
    fullAnswer: "Tiền nhiều không phải để tích trữ vô thời hạn hay để thể hiện quyền lực thống trị. Dưới góc nhìn KTCT Mác - Lênin, tiền nhiều là để:\n\n1. Giải phóng sức lao động: Giúp con người thoát khỏi gánh nặng sinh tồn thuần túy, có tự do lựa chọn lối sống và phát triển bản thân toàn diện.\n2. Mở rộng tái sản xuất xã hội & Tạo giá trị lan tỏa: Chuyển hóa tiền thành nguồn vốn (tư bản tích cực) để đầu tư vào sản xuất, tạo công ăn việc làm, tài trợ giáo dục, y tế và đóng góp cho sự phát triển chung của lực lượng sản xuất xã hội.\n\nKết luận: Tiền nhiều chỉ thực sự có giá trị khi nó biến thành phương tiện nâng cao chất lượng sống của cá nhân và thúc đẩy sự tiến bộ của xã hội.",
    keyPoints: [
      "1. Giải phóng sức lao động khỏi gánh nặng sinh tồn",
      "2. Mở rộng tái sản xuất xã hội & Tạo công ăn việc làm",
      "3. Tài trợ giáo dục, y tế, nâng cao năng lực con người",
      "Kết luận: Biến tiền thành phương tiện phục vụ hạnh phúc & tiến bộ xã hội"
    ]
  }
];

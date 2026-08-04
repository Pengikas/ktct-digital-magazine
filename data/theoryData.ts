export interface Concept {
  id: string;
  number: number;
  title: string;
  originalTerm: string;
  definition: string;
  extendedExplanation?: string;
  category: "cơ-bản" | "nâng-cao" | "phân-phối";
  iconName: string;
  /** Highlight on Nền tảng page (CQ5 bridge); others stay searchable / phụ lục */
  primary?: boolean;
}

export interface MoneyFunction {
  id: string;
  number: string;
  title: string;
  definition: string;
  example: string;
  detailedAnalysis: string;
  keyBadge: string;
  iconName: string;
}

export interface ValueForm {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  formula: string;
  description: string;
  characteristics: string[];
  historicalContext: string;
}

export const CORE_CONCEPTS: Concept[] = [
  {
    id: "commodity-production",
    number: 1,
    title: "Sản xuất hàng hóa",
    originalTerm: "Commodity Production",
    definition: "Là kiểu tổ chức kinh tế mà ở đó sản phẩm được sản xuất ra không phải để người sản xuất tiêu dùng, mà là để bán, để trao đổi trên thị trường.",
    extendedExplanation: "Sản xuất hàng hóa ra đời khi có phân công lao động xã hội và sự tách biệt tương đối về mặt kinh tế giữa những người sản xuất. Nó thay thế cho kinh tế tự nhiên tự cung tự cấp.",
    category: "cơ-bản",
    iconName: "Factory",
    primary: false
  },
  {
    id: "commodity",
    number: 2,
    title: "Hàng hóa",
    originalTerm: "Commodity",
    definition: "Là sản phẩm của lao động, có thể thỏa mãn một nhu cầu nào đó của con người thông qua trao đổi hoặc mua bán.",
    extendedExplanation: "Một vật phẩm muốn trở thành hàng hóa phải đáp ứng đủ 3 yếu tố: là sản phẩm của lao động, thỏa mãn nhu cầu con người, và được đưa vào tiêu dùng thông qua trao đổi, mua bán.",
    category: "cơ-bản",
    iconName: "Package",
    primary: false
  },
  {
    id: "use-value",
    number: 3,
    title: "Giá trị sử dụng",
    originalTerm: "Use-value",
    definition: "Là công dụng của vật thể có thể thỏa mãn một nhu cầu nào đó của con người (nhu cầu vật chất hoặc nhu cầu tinh thần).",
    extendedExplanation: "Giá trị sử dụng là thuộc tính tự nhiên của hàng hóa, do thuộc tính tự nhiên của vật thể đó quy định. Nó là phạm trù vĩnh viễn và là vật mang giá trị trao đổi.",
    category: "cơ-bản",
    iconName: "Sparkles",
    primary: false
  },
  {
    id: "value",
    number: 4,
    title: "Giá trị của hàng hóa",
    originalTerm: "Value",
    definition: "Là lao động xã hội của người sản xuất hàng hóa kết tinh bên trong hàng hóa đó.",
    extendedExplanation: "Giá trị thể hiện mối quan hệ sản xuất xã hội giữa những người sản xuất hàng hóa. Giá trị trao đổi chỉ là hình thái biểu hiện ra bên ngoài của giá trị.",
    category: "cơ-bản",
    iconName: "Scale",
    primary: false
  },
  {
    id: "money",
    number: 5,
    title: "Tiền tệ",
    originalTerm: "Money",
    definition: "Là một loại hàng hóa đặc biệt được tách ra làm vật ngang giá chung cho tất cả các hàng hóa khác; là sự thể hiện giá trị xã hội và phản ánh quan hệ sản xuất giữa những người sản xuất hàng hóa.",
    extendedExplanation: "Tiền tệ không phải do ai tự nghĩ ra mà là sản phẩm tất yếu của lịch sử phát triển sản xuất và lưu thông hàng hóa qua 4 hình thái giá trị (Chương 2).",
    category: "cơ-bản",
    iconName: "Coins",
    primary: true
  },
  {
    id: "market-economy",
    number: 6,
    title: "Kinh tế thị trường",
    originalTerm: "Market Economy",
    definition: "Là nền kinh tế vận hành theo các quy luật của thị trường (quy luật giá trị, quy luật cung - cầu, quy luật cạnh tranh...), trong đó tiền tệ đóng vai trò là phương tiện thanh toán và thước đo giá trị trung tâm.",
    extendedExplanation: "Kinh tế thị trường là giai đoạn phát triển cao của kinh tế hàng hóa, nơi mọi quan hệ sản xuất và trao đổi đều được tiền tệ hóa.",
    category: "cơ-bản",
    iconName: "TrendingUp",
    primary: false
  },
  {
    id: "price",
    number: 7,
    title: "Giá cả hàng hóa",
    originalTerm: "Price",
    definition: "Là biểu hiện bằng tiền của giá trị hàng hóa.",
    extendedExplanation: "Giá cả xoay quanh trục giá trị hàng hóa do tác động của quan hệ cung - cầu, cạnh tranh và sức mua của đồng tiền trên thị trường.",
    category: "cơ-bản",
    iconName: "Tag",
    primary: false
  },
  {
    id: "capital",
    number: 8,
    title: "Tư bản",
    originalTerm: "Capital",
    definition: "Là giá trị mang lại giá trị thặng dư.",
    extendedExplanation: "Tư bản không phải là một vật, mà là một quan hệ sản xuất xã hội nhất định gắn liền với một hình thái lịch sử nhất định của xã hội. Công thức chung: T – H – T′.",
    category: "nâng-cao",
    iconName: "Briefcase",
    primary: true
  },
  {
    id: "surplus-value",
    number: 9,
    title: "Giá trị thặng dư (m)",
    originalTerm: "Surplus Value",
    definition: "Là bộ phận giá trị mới dôi ra ngoài giá trị sức lao động do công nhân tạo ra, bị nhà tư bản chiếm đoạt. Ký hiệu giáo trình: m. Trong công thức T′ = T + Δt, Δt là số gia tiền gắn với m.",
    extendedExplanation: "Sức lao động là hàng hóa đặc biệt có khả năng tạo ra giá trị mới lớn hơn giá trị bản thân nó. Phần chênh lệch đó chính là giá trị thặng dư m.",
    category: "nâng-cao",
    iconName: "TrendingUp",
    primary: true
  },
  {
    id: "capital-accumulation",
    number: 10,
    title: "Tích lũy tư bản",
    originalTerm: "Capital Accumulation",
    definition: "Là sự chuyển hóa một phần giá trị thặng dư trở lại thành tư bản phụ thêm nhằm tái sản xuất mở rộng. (Chương 3 · mục 3.2)",
    extendedExplanation: "Tích lũy tư bản thúc đẩy tăng cấu tạo hữu cơ của tư bản (c/v), tích tụ và tập trung tư bản, mở rộng quy mô sản xuất xã hội.",
    category: "nâng-cao",
    iconName: "Layers",
    primary: true
  },
  {
    id: "production-cost",
    number: 11,
    title: "Chi phí sản xuất (k)",
    originalTerm: "Production Cost",
    definition: "Là phần giá trị hàng hóa bù lại giá cả của những tư liệu sản xuất đã tiêu dùng (c) và giá cả của sức lao động đã sử dụng (v). Công thức: k = c + v. (Chương 3 · mục 3.3)",
    extendedExplanation: "Chi phí sản xuất tư bản chủ nghĩa che đậy nguồn gốc của giá trị thặng dư, khiến giá trị thặng dư có vẻ như được sinh ra từ toàn bộ tư bản ứng trước.",
    category: "phân-phối",
    iconName: "Calculator",
    primary: true
  },
  {
    id: "profit",
    number: 12,
    title: "Lợi nhuận (p)",
    originalTerm: "Profit",
    definition: "Là hình thái biểu hiện của giá trị thặng dư trên bề mặt nền kinh tế thị trường, được quan niệm là con đẻ của toàn bộ tư bản ứng trước. Công thức: p = G - k. (Chương 3 · mục 3.3)",
    extendedExplanation: "Về bản chất lợi nhuận chính là giá trị thặng dư, nhưng về mặt số lượng và hình thái biểu hiện nó lại che giấu quan hệ bóc lột tư bản chủ nghĩa.",
    category: "phân-phối",
    iconName: "DollarSign",
    primary: true
  },
  {
    id: "average-profit",
    number: 13,
    title: "Lợi nhuận bình quân (P̅)",
    originalTerm: "Average Profit",
    definition: "Là số lợi nhuận bằng nhau của những tư bản như nhau đầu tư vào các ngành khác nhau, hình thành do sự cạnh tranh giữa các ngành và sự tự do di chuyển vốn. (Chương 3 · mục 3.3)",
    extendedExplanation: "Sự cạnh tranh giữa các ngành dẫn đến việc hình thành tỷ suất lợi nhuận bình quân, khiến giá trị hàng hóa chuyển hóa thành giá cả sản xuất.",
    category: "phân-phối",
    iconName: "BarChart3",
    primary: true
  },
  {
    id: "interest-loan-capital",
    number: 14,
    title: "Lợi tức (z) & Tư bản cho vay",
    originalTerm: "Interest & Loan Capital",
    definition: "Lợi tức là một phần của lợi nhuận bình quân mà người đi vay phải trả cho người cho vay vì đã sử dụng lượng tiền nhàn rỗi (T - T'). Gắn tư bản giả (cổ phiếu, trái phiếu). (Chương 3 · mục 3.3)",
    extendedExplanation: "Tư bản cho vay sinh ra lợi tức z, thúc đẩy sự ra đời của tư bản giả (cổ phiếu, trái phiếu, chứng quyền) và các hệ thống tài chính tín dụng hiện đại.",
    category: "phân-phối",
    iconName: "Landmark",
    primary: true
  }
];

export const MONEY_FUNCTIONS: MoneyFunction[] = [
  {
    id: "func-1",
    number: "01",
    title: "Thước đo giá trị",
    definition: "Tiền tệ dùng để đo lường và biểu hiện giá trị của tất cả hàng hóa khác. Giá trị hàng hóa được biểu hiện bằng tiền gọi là giá cả hàng hóa.",
    example: "Khi nói 'chiếc áo này có giá 200.000 VNĐ', ta đang dùng tiền làm thước đo giá trị cho chiếc áo.",
    detailedAnalysis: "Để làm thước đo giá trị, bản thân tiền phải có giá trị (như vàng) hoặc được xã hội công nhận đại diện giá trị. Thực hiện chức năng này chỉ cần tiền tưởng tượng trong tư duy, không nhất thiết cần tiền mặt thực tế.",
    keyBadge: "Tư duy / Tưởng tượng",
    iconName: "Scale"
  },
  {
    id: "func-2",
    number: "02",
    title: "Phương tiện lưu thông",
    definition: "Tiền đóng vai trò trung gian môi giới trong quá trình trao đổi hàng hóa theo công thức H - T - H (Hàng - Tiền - Hàng).",
    example: "Người nông dân bán lúa lấy 10 triệu đồng (H - T), sau đó dùng 10 triệu đồng đó mua máy bơm nước (T - H).",
    detailedAnalysis: "Thực hiện chức năng này đòi hỏi phải có tiền thực tế (tiền mặt, tiền giấy, tiền điện tử). Sự xuất hiện của tiền làm tách rời hành vi bán và mua về cả không gian lẫn thời gian.",
    keyBadge: "Trung gian / Thực tế",
    iconName: "ArrowLeftRight"
  },
  {
    id: "func-3",
    number: "03",
    title: "Phương tiện cất trữ",
    definition: "Khi tiền rút khỏi lưu thông và được giữ lại, nó thực hiện chức năng cất trữ, đại diện cho của cải xã hội dưới dạng giá trị thuần túy.",
    example: "Tích trữ vàng thỏi, tiền gửi tiết kiệm dài hạn trong két sắt hoặc ngân hàng để dự phòng tương lai.",
    detailedAnalysis: "Chức năng này đòi hỏi tiền phải có giá trị thực (vàng, bạc, kim loại quý) hoặc đồng tiền có sức mua ổn định để không bị mất giá theo thời gian.",
    keyBadge: "Dự trữ / Tích lũy",
    iconName: "Vault"
  },
  {
    id: "func-4",
    number: "04",
    title: "Phương tiện thanh toán",
    definition: "Tiền được dùng để trả nợ, nộp thuế, trả tiền mua chịu hàng hóa, trả lương, chi trả dịch vụ...",
    example: "Thanh toán hóa đơn điện nước cuối tháng, trả góp mua nhà, thanh toán nợ ngân hàng.",
    detailedAnalysis: "Chức năng này nảy sinh khi mua bán nợ (mua chịu) phát triển. Đây là cơ sở cho sự ra đời của tín dụng, thương phiếu, ngân hàng và các hình thức thanh toán trực tuyến hiện đại.",
    keyBadge: "Tín dụng / Giao dịch nợ",
    iconName: "CreditCard"
  },
  {
    id: "func-5",
    number: "05",
    title: "Tiền tệ thế giới",
    definition: "Khi thương mại vượt khỏi biên giới quốc gia, tiền thực hiện chức năng thanh toán, di chuyển của cải giữa các quốc gia và đo lường giá trị quốc tế.",
    example: "Sử dụng đồng USD, EUR, hoặc Vàng trong thanh toán xuất nhập khẩu dầu mỏ, nông sản giữa các nước.",
    detailedAnalysis: "Thực hiện chức năng này ban đầu cần tiền vàng (tiền đúc nguyên chất). Ngày nay, các đồng tiền tự do chuyển đổi hoặc quyền rút vốn đặc biệt (SDR) đảm nhận vai trò này.",
    keyBadge: "Quốc tế / Toàn cầu",
    iconName: "Globe"
  }
];

export const VALUE_FORMS: ValueForm[] = [
  {
    id: "form-1",
    step: 1,
    title: "Hình thái giá trị đơn giản hay ngẫu nhiên",
    subtitle: "Simple or Accidental Value Form",
    formula: "1 con cừu = 2 thúng thóc",
    description: "Xuất hiện ở thời kỳ mầm mống của trao đổi hàng hóa khi công xã nguyên thủy tan rã. Việc trao đổi mang tính ngẫu nhiên, trực tiếp vật đổi vật.",
    characteristics: [
      "Giá trị của 1 con cừu được biểu hiện ở 2 thúng thóc",
      "Con cừu ở hình thái tương đối, 2 thúng thóc đóng vai trò hình thái vật ngang giá",
      "Trao đổi trực tiếp, chưa có vật ngang giá chung cố định"
    ],
    historicalContext: "Thời kỳ sơ khai của nền sản xuất, sản phẩm dư thừa còn rất ít."
  },
  {
    id: "form-2",
    step: 2,
    title: "Hình thái giá trị đầy đủ hay mở rộng",
    subtitle: "Total or Expanded Value Form",
    formula: "1 con cừu = 2 thúng thóc OR 10 kg muối OR 1 rìu đồng...",
    description: "Xuất hiện khi phân công lao động xã hội lần thứ nhất diễn ra (chăn nuôi tách khỏi trồng trọt). Trao đổi trở nên thường xuyên hơn.",
    characteristics: [
      "Giá trị của một hàng hóa được biểu hiện ở nhiều hàng hóa khác nhau",
      "Tỷ lệ trao đổi không còn hoàn toàn ngẫu nhiên mà dần do hao phí lao động quyết định",
      "Tuy nhiên vẫn là trao đổi trực tiếp, chưa thống nhất vật ngang giá"
    ],
    historicalContext: "Sản xuất phát triển hơn, trao đổi mở rộng giữa các bộ tộc."
  },
  {
    id: "form-3",
    step: 3,
    title: "Hình thái giá trị chung",
    subtitle: "General Value Form",
    formula: "(2 thúng thóc / 10kg muối / 1 rìu đồng) = 1 con cừu (Vật ngang giá chung)",
    description: "Xuất hiện khi phân công lao động xã hội lần thứ hai diễn ra (thủ công nghiệp tách khỏi nông nghiệp). Hàng hóa sản xuất ra để bán tăng lên đáng kể.",
    characteristics: [
      "Tất cả hàng hóa đều biểu hiện giá trị của mình thông qua một hàng hóa làm vật ngang giá chung",
      "Ở từng vùng địa lý khác nhau lại có vật ngang giá chung khác nhau (vỏ sò, gia súc, muối, vải...)",
      "Bất tiện do chưa thống nhất vật ngang giá chung trên quy mô lớn"
    ],
    historicalContext: "Thị trường địa phương mở rộng, đòi hỏi một thước đo chung."
  },
  {
    id: "form-4",
    step: 4,
    title: "Hình thái tiền tệ",
    subtitle: "Money Form",
    formula: "(2 thúng thóc / 1 con cừu / 10kg muối) = 1 gam vàng (Tiền tệ)",
    description: "Khi lực lượng sản xuất và thương mại thế giới phát triển, vật ngang giá chung được cố định lại ở một hàng hóa đặc biệt duy nhất: Kim loại quý (Vàng, Bạc).",
    characteristics: [
      "Vàng trở thành tiền tệ nhờ tính chất ưu việt: đồng nhất, dễ chia nhỏ, không hư hỏng, giá trị cao trong thể tích nhỏ",
      "Đánh dấu bước hoàn thiện cuối cùng tạo ra Tiền tệ",
      "Giải quyết triệt để mâu thuẫn của trao đổi hàng hóa trực tiếp"
    ],
    historicalContext: "Sự ra đời của nền sản xuất hàng hóa phát triển và thương mại liên vùng."
  }
];

export const CIRCULATION_COMPARISON = {
  simple: {
    formula: "H - T - H",
    name: "Lưu thông hàng hóa giản đơn",
    startingPoint: "Hàng hóa (H)",
    endingPoint: "Hàng hóa mới (H')",
    mediator: "Tiền tệ (T)",
    purpose: "Giá trị sử dụng (Thỏa mãn nhu cầu sinh hoạt)",
    limit: "Có giới hạn (khi nhu cầu sử dụng được thỏa mãn)",
    equation: "Hàng (bán) -> Tiền -> Hàng (mua mới)"
  },
  capital: {
    formula: "T - H - T'",
    name: "Lưu thông tư bản",
    startingPoint: "Tiền tệ / Vốn (T)",
    endingPoint: "Tiền lớn hơn (T' = T + Δt)",
    mediator: "Hàng hóa (H) - đặc biệt là Sức lao động & Tư liệu sản xuất",
    purpose: "Giá trị thặng dư m (số gia tiền Δt trong T' = T + Δt)",
    limit: "Vô hạn (vòng quay liên tục để tích lũy)",
    equation: "Tiền (đầu tư) -> Sản xuất / Hàng -> Tiền lớn hơn (T' = T + Δt; gắn với m)"
  }
};

export const PRIMARY_CONCEPTS = CORE_CONCEPTS.filter((c) => c.primary);
export const SECONDARY_CONCEPTS = CORE_CONCEPTS.filter((c) => !c.primary);

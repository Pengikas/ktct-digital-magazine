export interface MetricItem {
  year: string;
  gdpPerCapitaUSD: number;
  monthlyIncomeMillionVND: number;
  povertyRatePercent: number;
  happinessRank: number;
  totalCountries: number;
}

export const STATS_TIMELINE: MetricItem[] = [
  {
    year: "2022",
    gdpPerCapitaUSD: 4110,
    monthlyIncomeMillionVND: 4.67,
    povertyRatePercent: 7.52,
    happinessRank: 77,
    totalCountries: 146
  },
  {
    year: "2023",
    gdpPerCapitaUSD: 4284,
    monthlyIncomeMillionVND: 4.96,
    povertyRatePercent: 5.71,
    happinessRank: 65,
    totalCountries: 137
  },
  {
    year: "2024",
    gdpPerCapitaUSD: 4700,
    monthlyIncomeMillionVND: 5.40,
    povertyRatePercent: 4.06,
    happinessRank: 54,
    totalCountries: 143
  },
  {
    year: "2025",
    gdpPerCapitaUSD: 5026,
    monthlyIncomeMillionVND: 5.95,
    povertyRatePercent: 2.95,
    happinessRank: 46,
    totalCountries: 143
  }
];

export const STATS_METADATA = {
  sources: [
    "Tổng cục Thống kê Việt Nam (General Statistics Office of VietNam, 2022-2026)",
    "Bộ Lao động - Thương binh và Xã hội (2022-2025)",
    "Báo cáo Hạnh phúc Thế giới (UN SDSN World Happiness Report, 2022-2025)"
  ],
  analyticalSummary: "Sự gia tăng nhanh chóng về GDP bình quân đầu người (từ 4.110 USD lên 5.026 USD) và thu nhập thực tế trong giai đoạn 2022–2025 tại Việt Nam đồng pha với sự thăng hạng của Chỉ số Hạnh phúc quốc gia (từ thứ 77 lên thứ 46 thế giới). Điều này chứng minh rằng ở mức độ phát triển kinh tế ban đầu, việc tăng trưởng của cải vật chất giúp giải quyết trực tiếp các nhu cầu cơ bản (ăn, ở, y tế, giáo dục), giảm gánh nặng sinh tồn cho nhân dân [UN SDSN, 2024; C.Mác, Tư bản, Tập 1].",
  keyTakeaways: [
    "GDP bình quân vượt mốc 5.000 USD/người/năm vào năm 2025",
    "Tỷ lệ hộ nghèo đa chiều giảm mạnh từ 7,52% xuống dưới 2,95%",
    "Thứ hạng Hạnh phúc tăng 31 bậc (từ 77 lên 46 thế giới)",
    "Thu nhập bình quân đạt ~6,0 triệu đồng/tháng nhờ điều chỉnh lương cơ sở"
  ]
};

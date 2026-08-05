export interface GameStats {
  money: number;
  product: number;
  worker: number;
  fame: number;
}

export interface StatEffect {
  money: number;
  product: number;
  worker: number;
  fame: number;
}

export interface GameScenario {
  id: number;
  char: string;
  avatarSeed: string;
  text: string;
  accept: StatEffect;
  decline: StatEffect;
}

export const MAX_TURNS = 12;

export const INITIAL_STATS: GameStats = {
  money: 50,
  product: 50,
  worker: 50,
  fame: 50,
};

// Dữ liệu 12 tình huống được chuyển thể từ bản gốc "Cán Cân Quyền Lực"
export const GAME_SCENARIOS: GameScenario[] = [
  {
    id: 1,
    char: "Giám đốc Nhân sự",
    avatarSeed: "Felix",
    text: "Thưa sếp, chúng ta có thể tăng ca thêm 3 tiếng/ngày mà không trả thêm lương. Điều này sẽ tối đa hóa lợi nhuận!",
    accept: { money: 20, product: 10, worker: -30, fame: -10 },
    decline: { money: -10, product: 0, worker: 15, fame: 5 },
  },
  {
    id: 2,
    char: "Kỹ sư trưởng",
    avatarSeed: "Destiny",
    text: "Tôi đề xuất mua hệ thống AI mới. Chi phí ban đầu cao, nhưng nâng cao năng suất và giảm áp lực cho công nhân.",
    accept: { money: -25, product: 25, worker: 15, fame: 15 },
    decline: { money: 15, product: -15, worker: -10, fame: -5 },
  },
  {
    id: 3,
    char: "Đại diện Công đoàn",
    avatarSeed: "Jude",
    text: "Lương hiện tại quá thấp. Xin ngài hãy trích một phần lợi nhuận để lập quỹ hỗ trợ người lao động tái sản xuất sức lao động.",
    accept: { money: -25, product: 0, worker: 35, fame: 15 },
    decline: { money: 15, product: 0, worker: -25, fame: -15 },
  },
  {
    id: 4,
    char: "Trưởng phòng Marketing",
    avatarSeed: "Bella",
    text: "Dùng nguyên liệu rẻ tiền sẽ giúp tăng biên lợi nhuận, nhưng chất lượng sản phẩm sẽ giảm sút chút ít.",
    accept: { money: 30, product: -35, worker: 0, fame: -25 },
    decline: { money: -10, product: 15, worker: 0, fame: 15 },
  },
  {
    id: 5,
    char: "Thị trưởng thành phố",
    avatarSeed: "King",
    text: "Thành phố kêu gọi tài trợ xây trường học. Việc này nâng cao uy tín nhưng không tạo lợi nhuận trực tiếp.",
    accept: { money: -35, product: 20, worker: 15, fame: 40 },
    decline: { money: 15, product: -10, worker: 0, fame: -20 },
  },
  {
    id: 6,
    char: "Cố vấn Môi trường",
    avatarSeed: "Eden",
    text: "Nhà máy xả thải vượt mức. Cần chi tiền nâng cấp bộ lọc xả ngay để bảo vệ sức khỏe cộng đồng.",
    accept: { money: -20, product: 0, worker: 15, fame: 20 },
    decline: { money: 15, product: 0, worker: -20, fame: -30 },
  },
  {
    id: 7,
    char: "Giám đốc Thu mua",
    avatarSeed: "Chase",
    text: "Nếu chúng ta chèn ép giá và chậm thanh toán cho các đối tác nhỏ, dòng tiền công ty sẽ cực kỳ dồi dào.",
    accept: { money: 20, product: -10, worker: 0, fame: -25 },
    decline: { money: -15, product: 15, worker: 0, fame: 15 },
  },
  {
    id: 8,
    char: "Thanh tra Lao động",
    avatarSeed: "Nolan",
    text: "Xưởng làm việc thiếu an toàn. Ngài muốn dùng tiền 'lo lót' bỏ qua hay bỏ tiền nâng cấp thiết bị?",
    accept: { money: 10, product: 0, worker: -25, fame: -25 },
    decline: { money: -25, product: 5, worker: 25, fame: 15 },
  },
  {
    id: 9,
    char: "Nhà Phân tích",
    avatarSeed: "Avery",
    text: "Hàng tồn kho bị ứ đọng. Ngài có muốn sa thải 20% nhân sự để giảm chi phí cắt lỗ tạm thời?",
    accept: { money: 25, product: -10, worker: -35, fame: -15 },
    decline: { money: -25, product: 10, worker: 25, fame: 15 },
  },
  {
    id: 10,
    char: "Quản đốc Phân xưởng",
    avatarSeed: "Brian",
    text: "Lắp camera giám sát AI để kiểm soát từng phút làm việc của công nhân giúp đẩy nhanh tiến độ sản xuất!",
    accept: { money: 25, product: 15, worker: -40, fame: -20 },
    decline: { money: -15, product: -5, worker: 20, fame: 10 },
  },
  {
    id: 11,
    char: "Trưởng phòng R&D",
    avatarSeed: "Amaya",
    text: "Chúng tôi phát minh ra sản phẩm xanh bền vững mới, nhưng chi phí nghiên cứu và thử nghiệm rất tốn kém.",
    accept: { money: -30, product: 40, worker: 5, fame: 25 },
    decline: { money: 15, product: -20, worker: 0, fame: -15 },
  },
  {
    id: 12,
    char: "Luật sư Doanh nghiệp",
    avatarSeed: "Wyatt",
    text: "Đối thủ nhỏ đang cạnh tranh sản phẩm với ta. Ta nên dùng tiền thâu tóm và ép họ đóng cửa chứ?",
    accept: { money: 25, product: -25, worker: 0, fame: -20 },
    decline: { money: -15, product: 20, worker: 0, fame: 15 },
  },
];

export interface GameEnding {
  title: string;
  desc: string;
  isWin: boolean;
  lesson?: string;
}

export function getAvatarUrl(seed: string): string {
  return `https://api.dicebear.com/8.x/avataaars/svg?seed=${seed}`;
}

export function evaluateGameOver(stats: GameStats, turnCount: number): GameEnding | null {
  if (stats.money <= 0) {
    return {
      title: "Phá Sản",
      desc: "Dòng tiền đứt gãy. Doanh nghiệp của bạn cạn kiệt vốn và sụp đổ hoàn toàn.",
      isWin: false,
    };
  }
  if (stats.worker <= 0) {
    return {
      title: "Đình Công Toàn Diện",
      desc: "Lao động bị bóc lột quá mức. Người công nhân rời bỏ nhà máy.",
      isWin: false,
    };
  }
  if (stats.fame <= 0) {
    return {
      title: "Tẩy Chay Rộng Khắp",
      desc: "Coi thường giá trị xã hội và đạo đức khiến công chúng quay lưng.",
      isWin: false,
    };
  }
  if (stats.product <= 0) {
    return {
      title: "Mất Tín Nhiệm",
      desc: "Sản phẩm kém chất lượng khiến bạn mất hoàn toàn vị thế trên thị trường.",
      isWin: false,
    };
  }
  if (stats.money >= 100 && stats.worker < 20) {
    return {
      title: "Chết Trong Đống Tiền",
      desc: "Tiền rất nhiều nhưng lực lượng sản xuất kiệt quệ. Bộ máy tan rã.",
      isWin: false,
    };
  }
  if (turnCount > MAX_TURNS) {
    return {
      title: "🎉 Chiến Thắng Rực Rỡ",
      desc: "Chúc mừng! Bạn đã xuất sắc hoàn thành nhiệm kỳ 12 tháng và duy trì sự phát triển ổn định!",
      isWin: true,
      lesson:
        "Quản trị bền vững không phải là việc chạy theo lợi nhuận đơn thuần ($), mà là nghệ thuật hài hòa giữa Lợi ích kinh tế, Quyền lợi người lao động, Chất lượng sản phẩm và Trách nhiệm xã hội. Tối đa hóa bóc lột có thể tạo ra tiền ngắn hạn, nhưng cân bằng mới là chìa khóa của sự tồn tại lâu dài.",
    };
  }
  return null;
}

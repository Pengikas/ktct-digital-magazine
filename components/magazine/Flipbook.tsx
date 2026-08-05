"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  BookOpen,
  Landmark,
  Shield,
  TrendingUp,
  Award,
  Sparkles,
  Layers,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Music,
  Heart,
} from "lucide-react";
import Image from "next/image";
import {
  MAGAZINE_PAGES_DATA,
  CONCEPTS_LIST,
  VIETNAM_STATS,
  STORIES_LIST,
} from "@/data/magazineData";

export function Flipbook() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [direction, setDirection] = React.useState(1);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const totalPages = MAGAZINE_PAGES_DATA.length;

  // Auto-play slideshow timer
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentPage((prev) => {
          if (prev >= totalPages) {
            setIsPlaying(false);
            return 1;
          }
          setDirection(1);
          return prev + 1;
        });
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalPages]);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextPage();
      } else if (e.key === "ArrowLeft") {
        prevPage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage]);

  const playFlipSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Audio context fallbacks
    }
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
    playFlipSound();
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
      playFlipSound();
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
      playFlipSound();
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Variants cho hiệu ứng 3D Lật Trang
  const pageVariants = {
    initial: (dir: number) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.96,
    }),
    animate: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.45,
        ease: [0.5, 0, 0.75, 0],
      },
    }),
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-between bg-slate-950 text-slate-100 min-h-[780px] p-4 sm:p-6 rounded-3xl border border-amber-900/40 shadow-2xl overflow-hidden transition-all duration-300 ${
        isFullscreen ? "h-screen rounded-none p-8" : ""
      }`}
    >
      {/* Background Decorator Gradients */}
      <div className="absolute inset-0 bg-radial from-amber-950/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Control Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between px-4 py-3 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-amber-500/20 shadow-lg z-20 mb-4">
        {/* Logo & Section Tag */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-rose-600 flex items-center justify-center text-white shadow-md">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold font-serif text-amber-300 tracking-wide">
              TẠP CHÍ SỐ KINH TẾ CHÍNH TRỊ
            </h3>
            <p className="text-[10px] text-slate-400">
              Trang {currentPage} / {totalPages} — {MAGAZINE_PAGES_DATA[currentPage - 1].sectionTag}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Slideshow Auto Play */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isPlaying
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300"
            }`}
            title={isPlaying ? "Dừng tự động lật" : "Tự động lật trang"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="hidden md:inline text-[11px]">{isPlaying ? "Dừng" : "Tự động"}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Zoom Toggle */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isZoomed ? "Thu nhỏ" : "Phóng to"}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4 text-amber-400" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Flipbook Stage Container */}
      <div
        className={`relative w-full max-w-5xl flex-1 flex items-center justify-center perspective-1200 transition-all duration-300 z-10 ${
          isZoomed ? "scale-105" : "scale-100"
        }`}
      >
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full bg-slate-900/90 text-slate-100 rounded-2xl border border-amber-500/30 shadow-2xl overflow-hidden min-h-[580px] sm:min-h-[640px] flex flex-col justify-between p-6 sm:p-10 relative"
          >
            {/* Background Texture & Paper Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
            <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-amber-500/20 via-transparent to-transparent pointer-events-none" />

            {/* RENDER PAGE CONTENT BASED ON LAYOUT TYPE */}
            <div className="flex-1 flex flex-col">
              {/* PAGE 1: COVER LAYOUT */}
              {currentPage === 1 && (
                <div className="flex-1 flex flex-col justify-between items-center text-center py-6 relative">
                  <div className="space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-widest uppercase">
                      <Sparkles className="w-3.5 h-3.5" /> SỐ ĐẶC BIỆT 2026 — UIT
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-rose-400">
                      TIỀN NHIỀU ĐỂ LÀM GÌ?
                    </h1>
                    <p className="text-sm sm:text-base text-amber-100/80 max-w-xl mx-auto font-serif italic">
                      Giải mã câu hỏi thực tiễn qua góc nhìn Kinh tế Chính trị Mác - Lênin (Chương 3 &amp; Số liệu thực tiễn)
                    </p>
                  </div>

                  {/* Central Visual Graphic */}
                  <div className="my-8 relative group cursor-pointer" onClick={() => goToPage(2)}>
                    <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-3xl bg-gradient-to-tr from-amber-700 via-amber-500 to-rose-600 p-1 shadow-2xl shadow-amber-500/20 transition-transform duration-500 group-hover:scale-105">
                      <div className="w-full h-full bg-slate-950 rounded-[22px] flex flex-col items-center justify-center p-6 text-center space-y-3 relative overflow-hidden">
                        <Image
                          src="/watermarks/images/luu-thong-tien-te.jpg"
                          alt="Lưu thông tiền tệ"
                          fill
                          className="object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                        />
                        <div className="relative z-10 space-y-2">
                          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mx-auto text-amber-300">
                            <Layers className="w-6 h-6" />
                          </div>
                          <p className="text-xs font-bold text-amber-200 uppercase tracking-widest">
                            H — T — H &amp; T — H — T'
                          </p>
                          <p className="text-[11px] text-slate-300">Nhấp để mở lật trang đọc tạp chí</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cover Footer Details */}
                  <div className="w-full pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
                    <div className="flex items-center space-x-2">
                      <Landmark className="w-4 h-4 text-amber-400" />
                      <span>Trường Đại học CNTT (UIT) — Đồ án SS008.Q31</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-rose-400" />
                      <span>Biên tập: Nhóm Kỹ thuật &amp; Nội dung</span>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 2: CONCEPTS GLOSSARY */}
              {currentPage === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-amber-500/20 pb-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        PHẦN 1: KHÁI NIỆM CỐT LÕI
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">
                        Danh Mục Khái Niệm Chương 3
                      </h2>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/30">
                      13 Phạm trù
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
                    {CONCEPTS_LIST.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-amber-500/40 transition-colors space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 text-[11px] flex items-center justify-center font-mono">
                              {idx + 1}
                            </span>
                            {item.term}
                          </h4>
                          {item.symbol && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950/60 text-rose-300 border border-rose-800/40">
                              {item.symbol}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed pl-7">{item.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PAGE 3: THEORY & CIRCULATION */}
              {currentPage === 3 && (
                <div className="space-y-6">
                  <div className="border-b border-amber-500/20 pb-4">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      PHẦN 2: CHƯƠNG 3 LÝ LUẬN
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">
                      Sản Xuất Hàng Hóa &amp; Nguồn Gốc Tiền Tệ
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/20 space-y-2">
                        <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-400" />
                          2 Điều kiện ra đời Sản xuất Hàng hóa
                        </h4>
                        <ul className="list-disc pl-5 space-y-1 text-xs">
                          <li>
                            <strong>Phân công lao động xã hội:</strong> Chuyên môn hóa sản xuất làm xuất hiện nhu cầu trao đổi sản phẩm.
                          </li>
                          <li>
                            <strong>Sự tách biệt tương đối về sở hữu:</strong> Chi phối bởi chế độ tư hữu tư liệu sản xuất buộc mua bán qua thị trường.
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-bold text-slate-100 text-sm">Hai thuộc tính của Hàng hóa</h4>
                        <p>
                          * <strong>Giá trị sử dụng:</strong> Công dụng thỏa mãn nhu cầu (thuộc tính tự nhiên).<br />
                          * <strong>Giá trị:</strong> Lao động xã hội kết tinh bên trong hàng hóa (thuộc tính xã hội).
                        </p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                        <h4 className="font-bold text-amber-300 text-sm">5 Chức năng của Tiền tệ</h4>
                        <ol className="list-decimal pl-5 space-y-1 text-xs">
                          <li><strong>Thước đo giá trị:</strong> Đo lường giá trị hàng hóa thành giá cả.</li>
                          <li><strong>Phương tiện lưu thông:</strong> Môi giới trao đổi (H — T — H).</li>
                          <li><strong>Phương tiện cất trữ:</strong> Đại diện của cải rút khỏi lưu thông.</li>
                          <li><strong>Phương tiện thanh toán:</strong> Trả nợ, nộp thuế, chi trả dịch vụ.</li>
                          <li><strong>Tiền tệ thế giới:</strong> Di chuyển của cải qua biên giới.</li>
                        </ol>
                      </div>

                      <div className="p-3.5 rounded-xl bg-gradient-to-r from-rose-950/40 to-amber-950/40 border border-rose-500/20 text-xs">
                        <p className="font-bold text-rose-300 mb-1">Nguồn gốc Tiền tệ:</p>
                        <p className="font-mono text-amber-200">
                          (1) Đơn giản → (2) Đầy đủ/mở rộng → (3) Chung → (4) Tiền tệ
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 4: SURPLUS VALUE & WEALTH */}
              {currentPage === 4 && (
                <div className="space-y-6">
                  <div className="border-b border-amber-500/20 pb-4">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      PHẦN 2 (TIẾP): LỢI NHUẬN &amp; CỦA CẢI
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">
                      Phân Phối Giá Trị Thặng Dư &amp; Bản Chất Của Của Cải
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-800/80 border border-amber-500/30 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                        P̄
                      </div>
                      <h4 className="font-bold text-amber-300 text-sm">Lợi nhuận Bình quân</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Số lợi nhuận bằng nhau của các tư bản bằng nhau đầu tư vào các ngành khác nhau do cạnh tranh tự do chuyển vốn.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/80 border border-amber-500/30 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold">
                        z
                      </div>
                      <h4 className="font-bold text-rose-300 text-sm">Lợi tức &amp; Tư bản Cho vay</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Một phần lợi nhuận bình quân người đi vay phải trả cho người cho vay theo công thức T — T' ("Tiền đẻ ra tiền").
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/80 border border-amber-500/30 space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-300 flex items-center justify-center font-bold">
                        R
                      </div>
                      <h4 className="font-bold text-yellow-300 text-sm">Địa tô Tư bản Chủ nghĩa</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Phần lợi nhuận siêu ngạch ngoài lợi nhuận bình quân do nhà tư bản kinh doanh nông nghiệp nộp cho chủ đất.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-800/90 to-rose-950/40 border border-amber-500/30 space-y-3">
                    <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      Bản chất thực sự của "Của cải" Xã hội: Tiền hay Giá trị Sử dụng?
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      * <strong>Tiền tệ:</strong> Chỉ là phương tiện biểu hiện giá trị, đại biểu quyền sở hữu.<br />
                      * <strong>Của cải thực sự:</strong> Là **Giá trị sử dụng** (hạ tầng, công nghệ, tri thức, sức lao động). Tiền không đi kèm sản xuất hàng hóa thực tế sẽ gây lạm phát.<br />
                      * <strong>Mặt trái sùng bái tiền tệ:</strong> Khiến tiền từ công cụ trở thành mục đích sống duy nhất, gây tha hóa quan hệ xã hội.
                    </p>
                  </div>
                </div>
              )}

              {/* PAGE 5: DEBATE & VIETNAM STATS */}
              {currentPage === 5 && (
                <div className="space-y-5">
                  <div className="border-b border-amber-500/20 pb-3">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      PHẦN 3 &amp; 4: PHẢN BIỆN &amp; SỐ LIỆU VIỆT NAM
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">
                      So Sánh Lý Luận &amp; Thực Tiễn Tăng Trưởng
                    </h2>
                  </div>

                  {/* Debate Comparison Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-1">
                      <span className="font-bold text-rose-300">Quan điểm 1: "Tiền là quan trọng nhất"</span>
                      <p className="text-slate-300 leading-relaxed">
                        * Mác - Lênin: Sa vào sùng bái tiền tệ.<br />
                        * Phản biện: Tiền không mua được giá trị tinh thần hay hạnh phúc. Chạy theo tiền vô hạn làm tha hóa đạo đức.
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 space-y-1">
                      <span className="font-bold text-blue-300">Quan điểm 2: "Tiền không quan trọng"</span>
                      <p className="text-slate-300 leading-relaxed">
                        * Mác - Lênin: Duy tâm, thoát ly thực tế sản xuất.<br />
                        * Phản biện: Tiền là điều kiện vật chất tối thiểu đáp ứng sinh hoạt và là tư bản ứng trước để tái sản xuất.
                      </p>
                    </div>
                  </div>

                  {/* Vietnam Stats Table */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-amber-400" />
                      Bộ số liệu Kinh tế - Xã hội Việt Nam (2022 — 2025)
                    </h4>
                    <div className="overflow-x-auto rounded-xl border border-amber-500/20 bg-slate-950/60">
                      <table className="w-full text-left text-[11px]">
                        <thead className="bg-slate-800/80 text-amber-300 font-semibold border-b border-slate-700">
                          <tr>
                            <th className="p-2.5">Chỉ số</th>
                            <th className="p-2.5">2022</th>
                            <th className="p-2.5">2023</th>
                            <th className="p-2.5">2024</th>
                            <th className="p-2.5">2025</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-300">
                          {VIETNAM_STATS.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-800/30">
                              <td className="p-2.5 font-medium text-slate-100">{row.label}</td>
                              <td className="p-2.5 font-mono">{row.y2022}</td>
                              <td className="p-2.5 font-mono">{row.y2023}</td>
                              <td className="p-2.5 font-mono text-amber-300 font-bold">{row.y2024}</td>
                              <td className="p-2.5 font-mono text-emerald-400 font-bold">{row.y2025}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 6: STORIES & POP CULTURE */}
              {currentPage === 6 && (
                <div className="space-y-5">
                  <div className="border-b border-amber-500/20 pb-3">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      PHẦN 4: THỰC TIỄN &amp; ÂM NHẠC ĐẠI CHÚNG
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">
                      Câu Chuyện Tỷ Phú &amp; Rap Việt
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {STORIES_LIST.map((story, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-3 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
                      >
                        <div className="space-y-2">
                          {story.image && (
                            <div className="relative w-full h-24 rounded-lg overflow-hidden border border-amber-500/20">
                              <Image
                                src={story.image}
                                alt={story.title}
                                fill
                                className="object-cover hover:scale-105 transition-transform"
                              />
                            </div>
                          )}
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              story.type === "positive"
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                                : story.type === "negative"
                                ? "bg-rose-950 text-rose-300 border border-rose-800"
                                : "bg-purple-950 text-purple-300 border border-purple-800"
                            }`}
                          >
                            {story.subtitle}
                          </span>
                          <h4 className="font-bold text-sm text-slate-100">{story.title}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">{story.content}</p>
                        </div>
                        <div className="p-2 rounded bg-slate-900/90 text-[11px] text-amber-200/90 italic border-l-2 border-amber-400">
                          {story.marxistAnalysis}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PAGE 7: CONCLUSION & LESSONS */}
              {currentPage === 7 && (
                <div className="space-y-6">
                  <div className="border-b border-amber-500/20 pb-4">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      PHẦN KẾT: BÀI HỌC SINH VIÊN
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-100">
                      Liên Hệ Thực Tiễn &amp; Bài Học Kết Luận
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 space-y-2">
                        <h4 className="font-bold text-amber-300 text-base flex items-center gap-2">
                          <Award className="w-5 h-5 text-amber-400" />
                          Tiền là điều kiện cần — Không phải Mục đích Tối thượng
                        </h4>
                        <p className="text-xs">
                          Giá trị của tiền phụ thuộc hoàn toàn vào **mục đích sử dụng**: Tích trữ phô trương gây sùng bái tiền tệ; đầu tư sản xuất, y tế, giáo dục tạo ra Của cải xã hội thực sự.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                        <h4 className="font-bold text-rose-300 text-sm">Bài học cho Sinh viên UIT:</h4>
                        <p className="text-xs">
                          Nỗ lực học tập, nâng cao trình độ tri thức và kỹ năng để **kiếm tiền chân chính**, chủ động tài chính; nhưng luôn giữ tâm thế **làm chủ đồng tiền** — biến tiền thành phương tiện phục vụ hạnh phúc cá nhân và cống hiến cho xã hội.
                        </p>
                      </div>
                    </div>

                    {/* Summary Mindmap Diagram */}
                    <div className="p-6 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-4 text-center">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        SƠ ĐỒ TỔNG KẾT BÀI HỌC
                      </span>
                      <div className="space-y-3 font-serif text-xs">
                        <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-200 border border-amber-400/30 font-bold">
                          TIỀN TỆ (Vật ngang giá chung)
                        </div>
                        <div className="text-amber-500 font-bold">↓</div>
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded bg-rose-950/60 text-rose-300 border border-rose-800">
                            Sùng bái tiền tệ<br />(Tha hóa &amp; Bi kịch)
                          </div>
                          <div className="p-2 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800">
                            Đầu tư tạo Của cải<br />(Giải phóng lao động)
                          </div>
                        </div>
                        <div className="text-amber-500 font-bold">↓</div>
                        <div className="p-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-rose-600 text-white font-bold">
                          LÀM CHỦ ĐỒNG TIỀN — PHỤC VỤ HẠNH PHÚC
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 8: BACK COVER */}
              {currentPage === 8 && (
                <div className="flex-1 flex flex-col justify-between items-center text-center py-6">
                  <div className="space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white mx-auto shadow-xl">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-amber-300 tracking-tight">
                      KTCT DIGITAL MAGAZINE
                    </h2>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Đồ án Chuyên đề Kinh tế Chính trị Mác - Lênin | Mã lớp: **SS008.Q31** | Trường Đại học Công nghệ Thông tin (UIT)
                    </p>
                  </div>

                  <div className="w-full max-w-xl p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-3 text-xs">
                    <h4 className="font-bold text-amber-400 uppercase tracking-wider">
                      ĐỘI NGŨ THỰC HIỆN DỰ ÁN (9 THÀNH VIÊN)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-300 text-[11px]">
                      <span>1. Nguyễn Bảo Chinh (Lead)</span>
                      <span>2. Lê Gia Huy</span>
                      <span>3. Vi Xuân Bách</span>
                      <span>4. Lương Vi Ngọc Minh</span>
                      <span>5. Nguyễn Vi Đức Hạnh</span>
                      <span>6. Trần Minh Vy</span>
                      <span>7. Nguyễn Thiền An</span>
                      <span>8. Phạm Minh Khoa</span>
                      <span>9. Hoàng Ngọc Uyên Chi</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-400">
                    <p>© 2026 KTCT Digital Magazine. All Rights Reserved.</p>
                    <button
                      onClick={() => goToPage(1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors shadow-lg"
                    >
                      <RotateCcw className="w-4 h-4" /> Về Bìa Đầu Tạp Chí
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Page Number Footer */}
            <div className="w-full pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 mt-4">
              <span>KTCT Magazine — Số 01</span>
              <span className="font-serif font-bold text-amber-400 text-sm">Trang {currentPage}</span>
              <span>UIT 2026</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Control Bar & Page Thumbnails */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-amber-500/20 z-20 mt-4">
        {/* Navigation Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition-colors"
          >
            Bìa Đầu
          </button>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 disabled:opacity-40 disabled:cursor-not-allowed text-amber-300 transition-colors flex items-center gap-1 text-xs font-bold"
          >
            <ChevronLeft className="w-4 h-4" /> Trang Trước
          </button>
        </div>

        {/* Page Jump Thumbnails Bar */}
        <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full py-1">
          {MAGAZINE_PAGES_DATA.map((p) => (
            <button
              key={p.id}
              onClick={() => goToPage(p.id)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                currentPage === p.id
                  ? "bg-amber-500 text-slate-950 scale-110 shadow-md shadow-amber-500/30"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-400"
              }`}
            >
              {p.id}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold transition-colors flex items-center gap-1 text-xs shadow-md shadow-amber-500/20"
          >
            Trang Sau <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition-colors"
          >
            Bìa Cuối
          </button>
        </div>
      </div>
    </div>
  );
}

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
  Download,
  Search,
  Grid,
  List,
  X,
  HelpCircle,
  BarChart3,
  FileText,
  Flame,
  ArrowRight,
  Info,
} from "lucide-react";
import Image from "next/image";
import {
  MAGAZINE_PAGES_DATA,
  CONCEPTS_LIST,
  VIETNAM_STATS,
  HAPPINESS_STATS,
  STORIES_LIST,
} from "@/data/magazineData";

export function Flipbook() {
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [zoomScale, setZoomScale] = React.useState(1);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [bgMusicEnabled, setBgMusicEnabled] = React.useState(false);

  // Modals / Side Panels
  const [showToc, setShowToc] = React.useState(false);
  const [showThumbnails, setShowThumbnails] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const containerRef = React.useRef<HTMLDivElement>(null);
  const bookRef = React.useRef<HTMLDivElement>(null);
  const pageFlipInstanceRef = React.useRef<any>(null);
  const audioCtxRef = React.useRef<AudioContext | null>(null);

  const totalPages = MAGAZINE_PAGES_DATA.length;

  // Initialize PageFlip engine
  React.useEffect(() => {
    let pageFlipInstance: any = null;

    const initFlip = async () => {
      if (typeof window === "undefined" || !bookRef.current) return;

      try {
        const { PageFlip } = await import("page-flip");

        // Clean up previous instance
        if (pageFlipInstanceRef.current) {
          try {
            pageFlipInstanceRef.current.destroy();
          } catch (e) {}
        }

        const isMobile = window.innerWidth < 768;
        const pageW = isMobile ? Math.min(window.innerWidth - 32, 420) : 480;
        const pageH = isMobile ? 620 : 680;

        pageFlipInstance = new PageFlip(bookRef.current, {
          width: pageW,
          height: pageH,
          size: "stretch",
          minWidth: 320,
          maxWidth: 600,
          minHeight: 480,
          maxHeight: 850,
          drawShadow: true,
          showCover: true,
          usePortrait: isMobile,
          startPage: currentPageIndex,
          flippingTime: 700,
          useMouseEvents: true,
          clickToFlip: true,
          showPageCorners: true,
        });

        const pageElements = bookRef.current.querySelectorAll(".page-item");
        if (pageElements.length > 0) {
          pageFlipInstance.loadFromHTML(pageElements);

          pageFlipInstance.on("flip", (e: any) => {
            setCurrentPageIndex(e.data);
            playFlipSound();
          });

          pageFlipInstanceRef.current = pageFlipInstance;
        }
      } catch (err) {
        console.error("PageFlip init error:", err);
      }
    };

    initFlip();

    const handleResize = () => {
      if (pageFlipInstanceRef.current) {
        try {
          const isMobile = window.innerWidth < 768;
          pageFlipInstanceRef.current.update({
            usePortrait: isMobile,
          });
        } catch (e) {}
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (pageFlipInstanceRef.current) {
        try {
          pageFlipInstanceRef.current.destroy();
        } catch (e) {}
      }
    };
  }, []);

  // Sound FX function for page flips
  const playFlipSound = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx && ctx.state !== "suspended") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(280, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch {
      // Audio fallback
    }
  };

  // Auto-play slideshow timer
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        if (pageFlipInstanceRef.current) {
          const current = pageFlipInstanceRef.current.getCurrentPageIndex();
          if (current >= totalPages - 1) {
            setIsPlaying(false);
            pageFlipInstanceRef.current.turnToPage(0);
          } else {
            pageFlipInstanceRef.current.flipNext();
          }
        }
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
      } else if (e.key === "Escape") {
        setShowToc(false);
        setShowThumbnails(false);
        setShowSearch(false);
        setIsZoomed(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPageIndex]);

  const goToPage = (pageIdx: number) => {
    if (pageIdx < 0 || pageIdx >= totalPages) return;
    if (pageFlipInstanceRef.current) {
      pageFlipInstanceRef.current.turnToPage(pageIdx);
    } else {
      setCurrentPageIndex(pageIdx);
    }
    setShowToc(false);
    setShowThumbnails(false);
    setShowSearch(false);
  };

  const nextPage = () => {
    if (pageFlipInstanceRef.current) {
      pageFlipInstanceRef.current.flipNext();
    } else if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (pageFlipInstanceRef.current) {
      pageFlipInstanceRef.current.flipPrev();
    } else if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
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

  // Search filtering logic
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const matches: { pageIndex: number; title: string; excerpt: string }[] = [];

    // Search concepts
    CONCEPTS_LIST.forEach((c, idx) => {
      if (c.term.toLowerCase().includes(query) || c.definition.toLowerCase().includes(query)) {
        const pageIdx = idx < 7 ? 1 : 2;
        matches.push({
          pageIndex: pageIdx,
          title: `Khái niệm: ${c.term}`,
          excerpt: c.definition,
        });
      }
    });

    // Search stories
    STORIES_LIST.forEach((s) => {
      if (s.title.toLowerCase().includes(query) || s.content.toLowerCase().includes(query)) {
        matches.push({
          pageIndex: 8,
          title: s.title,
          excerpt: s.content,
        });
      }
    });

    // Search pages
    MAGAZINE_PAGES_DATA.forEach((p, idx) => {
      if (p.title.toLowerCase().includes(query) || (p.subtitle && p.subtitle.toLowerCase().includes(query))) {
        matches.push({
          pageIndex: idx,
          title: p.title,
          excerpt: p.subtitle || p.sectionTag,
        });
      }
    });

    return matches.slice(0, 8);
  }, [searchQuery]);

  const currentPageData = MAGAZINE_PAGES_DATA[currentPageIndex] || MAGAZINE_PAGES_DATA[0];

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-between bg-slate-950 text-slate-100 min-h-[820px] p-3 sm:p-6 rounded-3xl border border-amber-900/40 shadow-2xl overflow-hidden transition-all duration-300 ${
        isFullscreen ? "h-screen rounded-none p-4 sm:p-8" : ""
      }`}
    >
      {/* Background Decorator Gradients */}
      <div className="absolute inset-0 bg-radial from-amber-950/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEYZINE CONTROL HEADER BAR */}
      <div className="w-full max-w-6xl flex items-center justify-between px-3 sm:px-5 py-2.5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-amber-500/30 shadow-xl z-20 mb-4 gap-2 flex-wrap">
        {/* Left Side: Brand Logo & Current Section */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold font-serif text-amber-300 tracking-wide flex items-center gap-1.5">
              <span>KTCT DIGITAL MAGAZINE</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-[10px] font-mono border border-amber-400/30">
                HEYZINE 3D
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-sans">
              Trang {currentPageIndex + 1} / {totalPages} — <span className="text-amber-200">{currentPageData.sectionTag}</span>
            </p>
          </div>
        </div>

        {/* Center / Right: Interactive Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 flex-wrap">
          {/* Table of Contents Button */}
          <button
            onClick={() => setShowToc(!showToc)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showToc ? "bg-amber-500 text-slate-950 font-bold shadow-md" : "bg-slate-800 hover:bg-slate-700 text-slate-300"
            }`}
            title="Mục lục Tạp chí"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Mục Lục</span>
          </button>

          {/* Page Thumbnails Button */}
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showThumbnails ? "bg-amber-500 text-slate-950 font-bold shadow-md" : "bg-slate-800 hover:bg-slate-700 text-slate-300"
            }`}
            title="Xem tất cả trang"
          >
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">Trang</span>
          </button>

          {/* Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              showSearch ? "bg-amber-500 text-slate-950 shadow-md" : "bg-slate-800 hover:bg-slate-700 text-slate-300"
            }`}
            title="Tìm kiếm nội dung"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Slideshow Auto Play */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isPlaying ? "bg-amber-500 text-slate-950 shadow-md animate-pulse" : "bg-slate-800 hover:bg-slate-700 text-slate-300"
            }`}
            title={isPlaying ? "Dừng tự động lật" : "Tự động lật trang (5s)"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="hidden lg:inline text-[11px]">{isPlaying ? "Dừng" : "Tự động"}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={soundEnabled ? "Tắt tiếng lật trang" : "Bật tiếng lật trang"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Zoom Toggle */}
          <button
            onClick={() => {
              setIsZoomed(!isZoomed);
              setZoomScale(isZoomed ? 1 : 1.25);
            }}
            className={`p-2 rounded-xl transition-colors ${
              isZoomed ? "bg-amber-500 text-slate-950 shadow-md font-bold" : "bg-slate-800 hover:bg-slate-700 text-slate-300"
            }`}
            title={isZoomed ? "Thu nhỏ" : "Phóng to xem chi tiết"}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Download PDF Button */}
          <a
            href="/documents/KTCT_Digital_Magazine_Chuyen_De_Tien_Nhieu_De_Lam_Gi.pdf"
            download="KTCT_Digital_Magazine_Chuyen_De_Tien_Nhieu_De_Lam_Gi.pdf"
            className="p-2 px-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
            title="Tải PDF tạp chí chính thức"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Tải PDF</span>
          </a>
        </div>
      </div>

      {/* TABLE OF CONTENTS MODAL */}
      <AnimatePresence>
        {showToc && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-4 right-4 max-w-2xl mx-auto z-40 bg-slate-900/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-5 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <div className="flex items-center space-x-2">
                <List className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold font-serif text-amber-300">MỤC LỤC TẠP CHÍ SỐ (10 TRANG)</h3>
              </div>
              <button onClick={() => setShowToc(false)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {MAGAZINE_PAGES_DATA.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => goToPage(idx)}
                  className={`p-3 rounded-xl text-left transition-all border flex items-start justify-between ${
                    currentPageIndex === idx
                      ? "bg-amber-500/20 border-amber-400 text-amber-200 shadow-md font-bold"
                      : "bg-slate-800/60 border-slate-700 hover:border-amber-500/40 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">{p.sectionTag}</span>
                    <h4 className="text-xs font-bold line-clamp-1">{p.title}</h4>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{p.subtitle}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-slate-950 px-2 py-1 rounded-md border border-amber-500/20">
                    P.{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THUMBNAILS DRAWER GRID */}
      <AnimatePresence>
        {showThumbnails && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-16 left-4 right-4 max-w-4xl mx-auto z-40 bg-slate-900/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-5 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <div className="flex items-center space-x-2">
                <Grid className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold font-serif text-amber-300">XEM TRƯỚC TẤT CẢ TRANG (THUMBNAILS)</h3>
              </div>
              <button onClick={() => setShowThumbnails(false)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-h-[420px] overflow-y-auto p-1">
              {MAGAZINE_PAGES_DATA.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => goToPage(idx)}
                  className={`group relative rounded-xl p-3 text-center border transition-all flex flex-col justify-between h-36 ${
                    currentPageIndex === idx
                      ? "bg-gradient-to-b from-amber-950 via-slate-900 to-slate-950 border-amber-400 ring-2 ring-amber-400 shadow-xl"
                      : "bg-slate-950/80 border-slate-800 hover:border-amber-500/50 hover:bg-slate-900"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">{p.sectionTag}</span>
                    <h5 className="text-[11px] font-bold text-slate-200 line-clamp-2">{p.title}</h5>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Trang {idx + 1}</span>
                    <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-4 right-4 max-w-xl mx-auto z-40 bg-slate-900/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-5 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold font-serif text-amber-300">TÌM KIẾM TRONG TẠP CHÍ</h3>
              </div>
              <button onClick={() => setShowSearch(false)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập từ khóa (ví dụ: Mác, thặng dư, Bill Gates, Rap Việt, lợi nhuận)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                autoFocus
              />
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(res.pageIndex)}
                    className="w-full p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-amber-400 text-left transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                      <span>{res.title}</span>
                      <span className="text-[10px] font-mono bg-amber-500/20 px-2 py-0.5 rounded text-amber-200">
                        Trang {res.pageIndex + 1}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">{res.excerpt}</p>
                  </button>
                ))
              ) : searchQuery.trim() ? (
                <p className="text-xs text-slate-500 text-center py-4">Không tìm thấy kết quả phù hợp với &ldquo;{searchQuery}&rdquo;</p>
              ) : (
                <p className="text-xs text-slate-500 text-center py-4">Nhập từ khóa bất kỳ để tìm nhanh các nội dung trong bài làm</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN 3D FLIPBOOK CONTAINER */}
      <div
        className={`relative w-full max-w-5xl flex-1 flex items-center justify-center transition-all duration-300 z-10 ${
          isZoomed ? "scale-110 overflow-auto" : "scale-100"
        }`}
      >
        <div ref={bookRef} className="stpageflip-container shadow-2xl">
          {/* PAGE 1: COVER */}
          <div className="page-item page-cover border border-amber-500/40 rounded-r-xl" data-density="hard">
            <div className="h-full w-full bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden text-center">
              <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

              {/* Cover Top Badge */}
              <div className="pt-4 space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5" /> SỐ ĐẶC BIỆT 2026 — UIT
                </span>
                <p className="text-[10px] text-amber-200/70 uppercase tracking-widest font-mono">ĐỒ ÁN MÔN HỌC SS008.Q31</p>
              </div>

              {/* Cover Main Title */}
              <div className="space-y-4 my-auto py-6">
                <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-rose-400 leading-tight">
                  TIỀN NHIỀU ĐỂ LÀM GÌ?
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-rose-500 mx-auto rounded-full" />
                <p className="text-xs sm:text-sm text-amber-100/90 max-w-sm mx-auto font-serif italic leading-relaxed">
                  Giải mã câu hỏi thực tiễn qua lăng kính Kinh tế Chính trị Mác - Lênin &amp; Bộ số liệu Việt Nam (2022–2025)
                </p>
              </div>

              {/* Cover Central Graphic */}
              <div className="my-2 relative mx-auto">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl bg-gradient-to-tr from-amber-700 via-amber-500 to-rose-600 p-1 shadow-2xl shadow-amber-500/20">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center p-4 text-center space-y-2 relative overflow-hidden">
                    <Image
                      src="/watermarks/images/luu-thong-tien-te.jpg"
                      alt="Lưu thông tiền tệ"
                      fill
                      className="object-cover opacity-35"
                    />
                    <div className="relative z-10 space-y-1.5">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mx-auto text-amber-300">
                        <Layers className="w-5 h-5" />
                      </div>
                      <p className="text-[11px] font-bold text-amber-200 uppercase tracking-widest">
                        H — T — H &amp; T — H — T'
                      </p>
                      <p className="text-[10px] text-slate-400">Nhấp mép trang để lật đọc 3D</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Bottom Info */}
              <div className="pt-4 border-t border-amber-500/20 flex flex-col items-center text-[10px] text-slate-400 space-y-1">
                <div className="flex items-center space-x-2">
                  <Landmark className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold text-slate-300">Trường Đại học Công nghệ Thông tin (UIT)</span>
                </div>
              </div>
            </div>
          </div>

          {/* PAGE 2: CONCEPTS PART 1 */}
          <div className="page-item border-l border-slate-800" data-density="soft">
            <div className="h-full w-full bg-slate-900 p-5 sm:p-7 flex flex-col justify-between text-slate-100 relative">
              <div className="space-y-4">
                <div className="border-b border-amber-500/20 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">PHẦN 1: KHÁI NIỆM CỐT LÕI (TRANG 1/2)</span>
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-100">Danh Mục Phạm Trù 1 — 7</h2>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                    Chương 3
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1 text-xs">
                  {CONCEPTS_LIST.slice(0, 7).map((c, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-amber-300 text-xs flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] flex items-center justify-center font-mono font-bold">
                            {idx + 1}
                          </span>
                          {c.term}
                        </h4>
                        {c.symbol && <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-rose-950 text-rose-300 border border-rose-800">{c.symbol}</span>}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed pl-6">{c.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>KTCT Digital Magazine — Số 01</span>
                <span className="font-mono text-amber-400 font-bold">Trang 2</span>
              </div>
            </div>
          </div>

          {/* PAGE 3: CONCEPTS PART 2 */}
          <div className="page-item border-l border-slate-800" data-density="soft">
            <div className="h-full w-full bg-slate-900 p-5 sm:p-7 flex flex-col justify-between text-slate-100 relative">
              <div className="space-y-4">
                <div className="border-b border-amber-500/20 pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">PHẦN 1: KHÁI NIỆM CỐT LÕI (TRANG 2/2)</span>
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-100">Danh Mục Phạm Trù 8 — 14</h2>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono border border-amber-500/30">
                    Tư Bản &amp; Giá Trị Thặng Dư
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1 text-xs">
                  {CONCEPTS_LIST.slice(7, 14).map((c, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-colors space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-amber-300 text-xs flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] flex items-center justify-center font-mono font-bold">
                            {idx + 8}
                          </span>
                          {c.term}
                        </h4>
                        {c.symbol && <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-rose-950 text-rose-300 border border-rose-800">{c.symbol}</span>}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed pl-6">{c.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>KTCT Digital Magazine — Số 01</span>
                <span className="font-mono text-amber-400 font-bold">Trang 3</span>
              </div>
            </div>
          </div>

          {/* PAGE 4: THEORY CHAPTER 3 */}
          <div className="page-item border-l border-slate-800" data-density="soft">
            <div className="h-full w-full bg-slate-900 p-5 sm:p-7 flex flex-col justify-between text-slate-100 relative">
              <div className="space-y-4">
                <div className="border-b border-amber-500/20 pb-3">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">PHẦN 2: LÝ LUẬN CHƯƠNG 3</span>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-100">Sản Xuất Hàng Hóa &amp; Nguồn Gốc Tiền Tệ</h2>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-slate-300">
                  <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/20 space-y-2">
                    <h4 className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      1. Điều kiện ra đời của Sản xuất Hàng hóa (Hội đủ 2 điều kiện)
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-[11px]">
                      <li><strong>Phân công lao động xã hội:</strong> Chuyên môn hóa sản xuất làm xuất hiện nhu cầu trao đổi sản phẩm.</li>
                      <li><strong>Sự tách biệt tương đối về sở hữu:</strong> Chi phối bởi chế độ tư hữu tư liệu sản xuất, buộc việc tiêu dùng phải qua mua bán.</li>
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <h4 className="font-bold text-slate-100 text-xs">2. Hai thuộc tính của Hàng hóa &amp; Mâu thuẫn nội tại</h4>
                    <p className="text-[11px]">
                      * <strong>Giá trị sử dụng:</strong> Thuộc tính tự nhiên, công dụng thỏa mãn nhu cầu.<br />
                      * <strong>Giá trị:</strong> Thuộc tính xã hội, hao phí lao động xã hội cần thiết kết tinh.<br />
                      * <strong>Mâu thuẫn nội tại:</strong> Người sản xuất tạo ra Giá trị sử dụng nhưng mục đích là Giá trị (tiền).
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-gradient-to-r from-rose-950/40 to-amber-950/40 border border-rose-500/20 space-y-1">
                    <h4 className="font-bold text-rose-300 text-xs">3. Nguồn gốc 4 Hình thái giá trị phát triển thành Tiền tệ</h4>
                    <p className="font-mono text-[10px] text-amber-200">
                      (1) Đơn giản/Ngẫu nhiên → (2) Đầy đủ/Mở rộng → (3) Chung → (4) Tiền tệ
                    </p>
                    <p className="text-[10px] text-slate-400">Bản chất: Hàng hóa đặc biệt đóng vai trò vật ngang giá chung, thể hiện lao động xã hội.</p>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>KTCT Digital Magazine — Số 01</span>
                <span className="font-mono text-amber-400 font-bold">Trang 4</span>
              </div>
            </div>
          </div>

          {/* PAGE 5: CIRCULATION & 5 FUNCTIONS */}
          <div className="page-item border-l border-slate-800" data-density="soft">
            <div className="h-full w-full bg-slate-900 p-5 sm:p-7 flex flex-col justify-between text-slate-100 relative">
              <div className="space-y-4">
                <div className="border-b border-amber-500/20 pb-3">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">PHẦN 2 (TIẾP): VAI TRÒ &amp; LƯU THÔNG</span>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-100">5 Chức Năng Tiền Tệ &amp; Hai Hình Thái Lưu Thông</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <h4 className="font-bold text-amber-300 text-xs">5 Chức năng Tiền tệ cơ bản</h4>
                    <ol className="list-decimal pl-4 space-y-1 text-[11px] text-slate-300">
                      <li><strong>Thước đo giá trị:</strong> Biểu hiện giá trị thành giá cả.</li>
                      <li><strong>Phương tiện lưu thông:</strong> Môi giới H—T—H.</li>
                      <li><strong>Phương tiện cất trữ:</strong> Đại diện của cải rút khỏi lưu thông.</li>
                      <li><strong>Phương tiện thanh toán:</strong> Trả nợ, nộp thuế, mua chịu.</li>
                      <li><strong>Tiền tệ thế giới:</strong> Di chuyển của cải qua biên giới.</li>
                    </ol>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <h4 className="font-bold text-amber-300 text-xs">Hai góc độ lưu thông hàng hóa</h4>
                    <div className="space-y-2 text-[11px] text-slate-300">
                      <div className="p-2 rounded bg-amber-950/40 border border-amber-800/40">
                        <span className="font-bold text-amber-200">1. Lưu thông Giản đơn (H—T—H):</span>
                        <p className="text-[10px]">Mục đích là H (Giá trị sử dụng mới). Tiền là phương tiện phục vụ nhu cầu sinh hoạt.</p>
                      </div>
                      <div className="p-2 rounded bg-rose-950/40 border border-rose-800/40">
                        <span className="font-bold text-rose-200">2. Nền sản xuất TBCN (T—H—T'):</span>
                        <p className="text-[10px]">Với T' = T + Δt. Tiền biến thành Tư bản — "Tiền nhiều để Tích lũy tư bản &amp; Tái sản xuất mở rộng".</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-slate-300 space-y-1">
                  <span className="font-bold text-amber-300 text-xs block">Ý nghĩa Tái sản xuất mở rộng &amp; Năng suất lao động:</span>
                  <p className="text-[11px] leading-relaxed">
                    Đổi mới tư bản bất biến (c) là tiền đề nâng cao năng suất lao động; thu giá trị thặng dư siêu ngạch nhờ giá trị cá biệt thấp hơn giá trị xã hội (Giáo trình tr. 92-103).
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>KTCT Digital Magazine — Số 01</span>
                <span className="font-mono text-amber-400 font-bold">Trang 5</span>
              </div>
            </div>
          </div>

          {/* PAGE 6: SURPLUS & MONEY FETISHISM */}
          <div className="page-item border-l border-slate-800" data-density="soft">
            <div className="h-full w-full bg-slate-900 p-5 sm:p-7 flex flex-col justify-between text-slate-100 relative">
              <div className="space-y-4">
                <div className="border-b border-amber-500/20 pb-3">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">PHẦN 2 (TIẾP): BẢN CHẤT CỦA CẢI</span>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-100">Phân Phối Giá Trị Thặng Dư &amp; Sùng Bái Tiền Tệ</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/20 space-y-1">
                    <span className="font-bold text-amber-300 text-xs block">Lợi nhuận Bình quân (P̄)</span>
                    <p className="text-[10px] text-slate-300">Tối ưu hóa dòng vốn sinh lời, tự do di chuyển vốn sang ngành có tỷ suất lợi nhuận cao.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-rose-500/20 space-y-1">
                    <span className="font-bold text-rose-300 text-xs block">Lợi tức (z) &amp; Tư bản cho vay</span>
                    <p className="text-[10px] text-slate-300">Cho vay hoặc đầu tư tư bản giả (cổ phiếu, trái phiếu) theo công thức T—T' ("tiền đẻ ra tiền").</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-yellow-500/20 space-y-1">
                    <span className="font-bold text-yellow-300 text-xs block">Địa tô Tư bản (R)</span>
                    <p className="text-[10px] text-slate-300">Trích một phần lợi nhuận siêu ngạch nộp cho chủ đất.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-950 to-rose-950/40 border border-amber-500/30 text-xs text-slate-300 space-y-2">
                  <h4 className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Bản chất thực sự của &ldquo;Của cải&rdquo; Xã hội: Tiền hay Giá trị sử dụng?
                  </h4>
                  <p className="text-[11px] leading-relaxed">
                    * <strong>Tiền tệ:</strong> Chỉ là phương tiện biểu hiện giá trị, đại biểu quyền sở hữu.<br />
                    * <strong>Của cải thực sự:</strong> Là <strong>Giá trị sử dụng</strong> (hạ tầng, công nghệ, tri thức, sức lao động...). Tiền không đi kèm sản xuất hàng hóa thực tế sẽ gây lạm phát.<br />
                    * <strong>Mặt trái sùng bái tiền tệ:</strong> Khiến tiền từ công cụ trở thành mục đích sống duy nhất, làm tha hóa các quan hệ xã hội.
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>KTCT Digital Magazine — Số 01</span>
                <span className="font-mono text-amber-400 font-bold">Trang 6</span>
              </div>
            </div>
          </div>

          {/* PAGE 7: DEBATE & DEEP ANALYSIS */}
          <div className="page-item border-l border-slate-800" data-density="soft">
            <div className="h-full w-full bg-slate-900 p-5 sm:p-7 flex flex-col justify-between text-slate-100 relative">
              <div className="space-y-4">
                <div className="border-b border-amber-500/20 pb-3">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">PHẦN 3: PHẢN BIỆN LÝ LUẬN</span>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-100">So Sánh 3 Luồng Quan Điểm Lý Luận</h2>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-1">
                    <span className="font-bold text-rose-300 text-xs">Quan điểm 1: &ldquo;Tiền là quan trọng nhất&rdquo;</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Mác - Lênin: Sa vào sùng bái tiền tệ. Phản biện: Tiền chỉ đo lường hao phí lao động xã hội, không mua được giá trị tinh thần hay hạnh phúc. Chạy theo tiền vô hạn dẫn đến bóc lột tối đa, tha hóa đạo đức.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 space-y-1">
                    <span className="font-bold text-blue-300 text-xs">Quan điểm 2: &ldquo;Tiền không quan trọng&rdquo;</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Mác - Lênin: Sa vào chủ nghĩa duy tâm, thoát ly thực tế sản xuất. Phản biện: Tiền là điều kiện vật chất tối thiểu đáp ứng sinh hoạt và là tư bản ứng trước để tái sản xuất mở rộng. Thiếu vốn sẽ làm ngưng trệ kinh tế.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 space-y-1">
                    <span className="font-bold text-amber-300 text-xs">Quan điểm Cân bằng Mác - Lênin</span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Tiền là đòn bẩy kinh tế khách quan, không được phép trở thành mục đích tự thân. Cần khai thác <strong>Giá trị thặng dư nhân văn</strong> (thông qua tăng năng suất, máy móc) thay vì bóc lột tuyệt đối. Đặt tiền đúng vị trí là phương tiện giải phóng sức lao động.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>KTCT Digital Magazine — Số 01</span>
                <span className="font-mono text-amber-400 font-bold">Trang 7</span>
              </div>
            </div>
          </div>

          {/* PAGE 8: VIETNAM STATS & DATA */}
          <div className="page-item border-l border-slate-800" data-density="soft">
            <div className="h-full w-full bg-slate-900 p-5 sm:p-7 flex flex-col justify-between text-slate-100 relative">
              <div className="space-y-4">
                <div className="border-b border-amber-500/20 pb-3">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">PHẦN 4: DỮ LIỆU THỰC TIỄN</span>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-100">Bộ Số Liệu Việt Nam &amp; Chỉ Số Hạnh Phúc (2022–2025)</h2>
                </div>

                <div className="space-y-3">
                  {/* Table */}
                  <div className="overflow-x-auto rounded-xl border border-amber-500/20 bg-slate-950/80">
                    <table className="w-full text-left text-[10px]">
                      <thead className="bg-slate-800 text-amber-300 font-semibold border-b border-slate-700">
                        <tr>
                          <th className="p-2">Chỉ số Thực tiễn</th>
                          <th className="p-2">2022</th>
                          <th className="p-2">2023</th>
                          <th className="p-2">2024</th>
                          <th className="p-2">2025</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                        {VIETNAM_STATS.map((r, i) => (
                          <tr key={i} className="hover:bg-slate-800/40">
                            <td className="p-2 font-sans font-medium text-slate-100">{r.label}</td>
                            <td className="p-2">{r.y2022}</td>
                            <td className="p-2">{r.y2023}</td>
                            <td className="p-2 text-amber-300 font-bold">{r.y2024}</td>
                            <td className="p-2 text-emerald-400 font-bold">{r.y2025}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Happiness Ranking */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                    <h4 className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      Xếp hạng Chỉ số Hạnh phúc Thế giới (World Happiness Report)
                    </h4>
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                      {HAPPINESS_STATS.map((h, i) => (
                        <div key={i} className="p-2 rounded bg-slate-900 border border-amber-500/20">
                          <span className="text-slate-400 block">{h.year}</span>
                          <span className="font-bold text-amber-300 font-mono text-xs">{h.label}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-relaxed italic">
                      Nhận xét: Tăng trưởng của cải vật chất giải quyết nhu cầu cơ bản, trực tiếp nâng cao chỉ số hạnh phúc quốc gia (UNSDSN 2024; C.Mác, Tư bản).
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>KTCT Digital Magazine — Số 01</span>
                <span className="font-mono text-amber-400 font-bold">Trang 8</span>
              </div>
            </div>
          </div>

          {/* PAGE 9: CASE STUDIES & RAP VIET */}
          <div className="page-item border-l border-slate-800" data-density="soft">
            <div className="h-full w-full bg-slate-900 p-5 sm:p-7 flex flex-col justify-between text-slate-100 relative">
              <div className="space-y-4">
                <div className="border-b border-amber-500/20 pb-3">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">PHẦN 4: THỰC TIỄN &amp; VĂN HÓA</span>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-100">Câu Chuyện Tỷ Phú &amp; Rap Việt</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  {STORIES_LIST.map((story, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                          story.type === "positive" ? "bg-emerald-950 text-emerald-300 border border-emerald-800" :
                          story.type === "negative" ? "bg-rose-950 text-rose-300 border border-rose-800" :
                          "bg-purple-950 text-purple-300 border border-purple-800"
                        }`}>
                          {story.subtitle}
                        </span>
                        <h4 className="font-bold text-xs text-slate-100">{story.title}</h4>
                        <p className="text-[10px] text-slate-300 leading-relaxed line-clamp-3">{story.content}</p>
                      </div>
                      <div className="p-2 rounded bg-slate-900 text-[9px] text-amber-200/90 italic border-l-2 border-amber-400">
                        {story.marxistAnalysis}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>KTCT Digital Magazine — Số 01</span>
                <span className="font-mono text-amber-400 font-bold">Trang 9</span>
              </div>
            </div>
          </div>

          {/* PAGE 10: BACK COVER & TEAM */}
          <div className="page-item page-cover border-l border-amber-500/40 rounded-l-xl" data-density="hard">
            <div className="h-full w-full bg-gradient-to-b from-slate-950 via-slate-900 to-amber-950 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden text-center text-slate-100">
              <div className="space-y-3 pt-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white mx-auto shadow-xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-amber-300 tracking-tight">
                  KTCT DIGITAL MAGAZINE
                </h2>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  Đồ án Chuyên đề Kinh tế Chính trị Mác - Lênin | Mã lớp: <strong>SS008.Q31</strong> | Trường Đại học Công nghệ Thông tin (UIT)
                </p>
              </div>



              <div className="space-y-3 text-[10px] text-slate-400 pb-2">
                <p>© 2026 KTCT Digital Magazine. Trường ĐH CNTT (UIT).</p>
                <button
                  onClick={() => goToPage(0)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors shadow-lg text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Về Bìa Đầu Tạp Chí
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM HEYZINE NAVIGATION CONTROL BAR */}
      <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-2.5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-amber-500/30 z-20 mt-4">
        {/* Left: Quick Jump to Cover / Prev */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => goToPage(0)}
            disabled={currentPageIndex === 0}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold text-slate-200 transition-colors"
          >
            Bìa Đầu
          </button>
          <button
            onClick={prevPage}
            disabled={currentPageIndex === 0}
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 disabled:opacity-40 text-amber-300 transition-colors flex items-center gap-1 text-xs font-bold"
          >
            <ChevronLeft className="w-4 h-4" /> Trang Trước
          </button>
        </div>

        {/* Center: Page Number Bar */}
        <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full py-1">
          {MAGAZINE_PAGES_DATA.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => goToPage(idx)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                currentPageIndex === idx
                  ? "bg-amber-500 text-slate-950 scale-110 shadow-md shadow-amber-500/30"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-400"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {/* Right: Next / Back Cover */}
        <div className="flex items-center space-x-2">
          <button
            onClick={nextPage}
            disabled={currentPageIndex === totalPages - 1}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold transition-colors flex items-center gap-1 text-xs shadow-md shadow-amber-500/20"
          >
            Trang Sau <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => goToPage(totalPages - 1)}
            disabled={currentPageIndex === totalPages - 1}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold text-slate-200 transition-colors"
          >
            Bìa Cuối
          </button>
        </div>
      </div>
    </div>
  );
}

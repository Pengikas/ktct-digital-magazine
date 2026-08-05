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
  Download,
  Search,
  Grid,
  List,
  X,
} from "lucide-react";
import { MAGAZINE_PAGES_DATA, CONCEPTS_LIST, STORIES_LIST } from "@/data/magazineData";
import { MagazinePages } from "@/components/magazine/MagazinePages";
import { downloadMagazineFromScreen } from "@/lib/magazineExport";

export function Flipbook() {
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [zoomScale, setZoomScale] = React.useState(1);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [engineReady, setEngineReady] = React.useState(false);
  const [engineError, setEngineError] = React.useState(false);

  // Modals / Side Panels — chỉ mount khi mở
  const [showToc, setShowToc] = React.useState(false);
  const [showThumbnails, setShowThumbnails] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const containerRef = React.useRef<HTMLDivElement>(null);
  const bookRef = React.useRef<HTMLDivElement>(null);
  const pageFlipInstanceRef = React.useRef<any>(null);
  const soundEnabledRef = React.useRef(soundEnabled);
  const flipSoundRef = React.useRef<HTMLAudioElement | null>(null);
  const playFlipSoundRef = React.useRef<() => void>(() => {});

  React.useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  /** Âm thanh giấy sách thật (CC0) — không dùng oscillator beep */
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio("/sounds/page-flip.mp3");
    audio.preload = "auto";
    audio.volume = 0.5;
    flipSoundRef.current = audio;

    playFlipSoundRef.current = () => {
      if (!soundEnabledRef.current) return;
      const base = flipSoundRef.current;
      if (!base) return;
      try {
        const node = base.cloneNode(true) as HTMLAudioElement;
        node.volume = 0.4 + Math.random() * 0.12;
        // Nhịp lật sách hơi khác nhau mỗi lần cho tự nhiên
        node.playbackRate = 0.93 + Math.random() * 0.14;
        node.currentTime = 0;
        const hardStop = window.setTimeout(() => {
          try {
            node.pause();
            node.removeAttribute("src");
            node.load();
          } catch {
            /* noop */
          }
        }, 780);
        void node.play().catch(() => {
          window.clearTimeout(hardStop);
        });
        node.addEventListener(
          "ended",
          () => {
            window.clearTimeout(hardStop);
          },
          { once: true }
        );
      } catch {
        /* noop */
      }
    };

    return () => {
      flipSoundRef.current = null;
      playFlipSoundRef.current = () => {};
    };
  }, []);

  const unlockFlipAudio = React.useCallback(() => {
    const a = flipSoundRef.current;
    if (!a) return;
    const prev = a.volume;
    a.volume = 0.001;
    void a
      .play()
      .then(() => {
        a.pause();
        a.currentTime = 0;
        a.volume = prev || 0.5;
      })
      .catch(() => {
        a.volume = prev || 0.5;
      });
  }, []);

  const totalPages = MAGAZINE_PAGES_DATA.length;

  // Initialize PageFlip after first paint — tránh block UI
  React.useEffect(() => {
    let cancelled = false;
    let pageFlipInstance: any = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const playFlipSound = () => {
      playFlipSoundRef.current();
    };

    const initFlip = async () => {
      if (typeof window === "undefined" || !bookRef.current) return;

      try {
        const { PageFlip } = await import("page-flip");
        if (cancelled || !bookRef.current) return;

        if (pageFlipInstanceRef.current) {
          try {
            pageFlipInstanceRef.current.destroy();
          } catch {
            /* noop */
          }
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
          drawShadow: !isMobile,
          showCover: true,
          usePortrait: isMobile,
          startPage: 0,
          flippingTime: isMobile ? 550 : 700,
          useMouseEvents: true,
          clickToFlip: true,
          showPageCorners: !isMobile,
        });

        const pageElements = bookRef.current.querySelectorAll(".page-item");
        if (pageElements.length > 0) {
          pageFlipInstance.loadFromHTML(pageElements);

          pageFlipInstance.on("flip", (e: { data: number }) => {
            setCurrentPageIndex(e.data);
            playFlipSound();
          });

          pageFlipInstanceRef.current = pageFlipInstance;
          if (!cancelled) setEngineReady(true);
        }
      } catch (err) {
        console.error("PageFlip init error:", err);
        if (!cancelled) setEngineError(true);
      }
    };

    const scheduleInit = () => {
      const idle =
        typeof window !== "undefined" && "requestIdleCallback" in window
          ? (cb: () => void) =>
              (
                window as Window & {
                  requestIdleCallback: (c: () => void, o?: { timeout: number }) => number;
                }
              ).requestIdleCallback(cb, { timeout: 400 })
          : (cb: () => void) => window.setTimeout(cb, 50);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          idle(() => {
            if (!cancelled) void initFlip();
          });
        });
      });
    };
    scheduleInit();

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (pageFlipInstanceRef.current) {
          try {
            const isMobile = window.innerWidth < 768;
            pageFlipInstanceRef.current.update({
              usePortrait: isMobile,
              drawShadow: !isMobile,
            });
          } catch {
            /* noop */
          }
        }
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      if (pageFlipInstanceRef.current) {
        try {
          pageFlipInstanceRef.current.destroy();
        } catch {
          /* noop */
        }
        pageFlipInstanceRef.current = null;
      }
    };
  }, []);

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
    if (!showSearch || !searchQuery.trim()) return [];
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
  }, [searchQuery, showSearch]);

  const currentPageData = MAGAZINE_PAGES_DATA[currentPageIndex] || MAGAZINE_PAGES_DATA[0];

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-between bg-marx-raised text-foreground min-h-[820px] p-3 sm:p-6 rounded-2xl border border-marx shadow-xl overflow-hidden transition-all duration-300 ${
        isFullscreen ? "h-screen rounded-none p-4 sm:p-8 bg-[hsl(var(--background))]" : ""
      }`}
    >
      {/* Nền theo template site — giấy / đỏ son / vàng */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--marx-gold)/0.12),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--marx-crimson)/0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--marx-crimson))] via-[hsl(var(--marx-gold))] to-[hsl(var(--marx-crimson))] pointer-events-none" />

      {/* TOP CONTROL BAR */}
      <div className="w-full max-w-6xl flex items-center justify-between px-3 sm:px-5 py-2.5 bg-[hsl(var(--marx-surface-raised)/0.95)] backdrop-blur-md rounded-xl border border-marx shadow-md z-20 mb-4 gap-2 flex-wrap">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[hsl(var(--marx-crimson))] to-[hsl(var(--marx-gold))] flex items-center justify-center text-[hsl(var(--primary-foreground))] shadow-md border border-[hsl(var(--marx-gold)/0.45)]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold font-serif text-foreground tracking-wide flex items-center gap-1.5">
              <span className="text-gradient-marx">KTCT DIGITAL MAGAZINE</span>
              <span className="label-press !py-0.5 !px-2 !text-[9px] !gap-0">
                Flip 3D
              </span>
            </h3>
            <p className="text-[11px] text-muted-foreground font-sans">
              Trang {currentPageIndex + 1} / {totalPages} —{" "}
              <span className="text-gold font-semibold">{currentPageData.sectionTag}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2 flex-wrap">
          <button
            onClick={() => setShowToc(!showToc)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              showToc
                ? "bg-[hsl(var(--marx-crimson))] text-[hsl(var(--primary-foreground))] border-[hsl(var(--marx-crimson))] shadow-md"
                : "bg-marx-surface border-marx text-foreground hover:border-[hsl(var(--marx-gold)/0.6)] hover:text-gold"
            }`}
            title="Mục lục Tạp chí"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Mục Lục</span>
          </button>

          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              showThumbnails
                ? "bg-[hsl(var(--marx-crimson))] text-[hsl(var(--primary-foreground))] border-[hsl(var(--marx-crimson))] shadow-md"
                : "bg-marx-surface border-marx text-foreground hover:border-[hsl(var(--marx-gold)/0.6)] hover:text-gold"
            }`}
            title="Xem tất cả trang"
          >
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">Trang</span>
          </button>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              showSearch
                ? "bg-[hsl(var(--marx-crimson))] text-[hsl(var(--primary-foreground))] border-[hsl(var(--marx-crimson))] shadow-md"
                : "bg-marx-surface border-marx text-foreground hover:border-[hsl(var(--marx-gold)/0.6)] hover:text-gold"
            }`}
            title="Tìm kiếm nội dung"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              isPlaying
                ? "bg-[hsl(var(--marx-gold))] text-[hsl(var(--secondary-foreground))] border-[hsl(var(--marx-gold))] shadow-md animate-pulse"
                : "bg-marx-surface border-marx text-foreground hover:text-gold"
            }`}
            title={isPlaying ? "Dừng tự động lật" : "Tự động lật trang (5s)"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="hidden lg:inline text-[11px]">{isPlaying ? "Dừng" : "Tự động"}</span>
          </button>

          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) unlockFlipAudio();
            }}
            className="p-2 rounded-lg bg-marx-surface border border-marx text-foreground hover:text-gold transition-colors"
            title={soundEnabled ? "Tắt tiếng lật trang" : "Bật tiếng lật trang"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-gold" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              setIsZoomed(!isZoomed);
              setZoomScale(isZoomed ? 1 : 1.25);
            }}
            className={`p-2 rounded-lg transition-colors border ${
              isZoomed
                ? "bg-[hsl(var(--marx-gold))] text-[hsl(var(--secondary-foreground))] border-[hsl(var(--marx-gold))] shadow-md"
                : "bg-marx-surface border-marx text-foreground hover:text-gold"
            }`}
            title={isZoomed ? "Thu nhỏ" : "Phóng to xem chi tiết"}
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-marx-surface border border-marx text-foreground hover:text-gold transition-colors"
            title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => downloadMagazineFromScreen()}
            className="p-2 px-3 rounded-lg bg-gradient-to-r from-[hsl(var(--marx-crimson))] to-[hsl(var(--marx-gold))] hover:brightness-110 text-[hsl(var(--primary-foreground))] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all border border-[hsl(var(--marx-gold)/0.4)]"
            title="Tải / in đúng nội dung tạp chí flip trên màn hình (Lưu thành PDF)"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Tải tạp chí</span>
          </button>
        </div>
      </div>

      {/* TABLE OF CONTENTS MODAL */}
      <AnimatePresence>
        {showToc && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-4 right-4 max-w-2xl mx-auto z-40 bg-[hsl(var(--marx-surface-raised)/0.98)] backdrop-blur-xl border border-marx rounded-xl p-5 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-marx pb-3">
              <div className="flex items-center space-x-2">
                <List className="w-5 h-5 text-gold" />
                <h3 className="text-base font-bold font-serif text-foreground">
                  Mục lục tạp chí số ({totalPages} trang)
                </h3>
              </div>
              <button onClick={() => setShowToc(false)} className="p-1 rounded-lg hover:bg-marx-surface text-muted-foreground hover:text-foreground">
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
                      ? "bg-[hsl(var(--marx-crimson)/0.12)] border-[hsl(var(--marx-crimson)/0.45)] text-foreground shadow-md font-bold"
                      : "bg-marx-surface border-marx hover:border-[hsl(var(--marx-gold)/0.55)] text-foreground/90 hover:bg-[hsl(var(--marx-gold)/0.08)]"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-gold uppercase tracking-widest block">{p.sectionTag}</span>
                    <h4 className="text-xs font-bold line-clamp-1">{p.title}</h4>
                    <p className="text-[10px] text-muted-foreground line-clamp-1">{p.subtitle}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[hsl(var(--marx-crimson))] bg-[hsl(var(--background))] px-2 py-1 rounded-md border border-marx">
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
            className="absolute top-16 left-4 right-4 max-w-4xl mx-auto z-40 bg-[hsl(var(--marx-surface-raised)/0.98)] backdrop-blur-xl border border-marx rounded-xl p-5 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-marx pb-3">
              <div className="flex items-center space-x-2">
                <Grid className="w-5 h-5 text-gold" />
                <h3 className="text-base font-bold font-serif text-foreground">Xem trước tất cả trang</h3>
              </div>
              <button onClick={() => setShowThumbnails(false)} className="p-1 rounded-lg hover:bg-marx-surface text-muted-foreground hover:text-foreground">
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
                      ? "bg-[hsl(var(--marx-crimson)/0.1)] border-[hsl(var(--marx-crimson)/0.5)] ring-2 ring-[hsl(var(--marx-gold)/0.45)] shadow-lg"
                      : "bg-marx-surface border-marx hover:border-[hsl(var(--marx-gold)/0.55)] hover:bg-[hsl(var(--marx-gold)/0.08)]"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-gold uppercase tracking-wider block">{p.sectionTag}</span>
                    <h5 className="text-[11px] font-bold text-foreground line-clamp-2">{p.title}</h5>
                  </div>
                  <div className="pt-2 border-t border-marx flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span>Trang {idx + 1}</span>
                    <span className="w-4 h-4 rounded-full bg-[hsl(var(--marx-crimson)/0.15)] text-[hsl(var(--marx-crimson))] flex items-center justify-center font-bold">
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
            className="absolute top-16 left-4 right-4 max-w-xl mx-auto z-40 bg-[hsl(var(--marx-surface-raised)/0.98)] backdrop-blur-xl border border-marx rounded-xl p-5 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-marx pb-3">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-gold" />
                <h3 className="text-base font-bold font-serif text-foreground">Tìm kiếm trong tạp chí</h3>
              </div>
              <button onClick={() => setShowSearch(false)} className="p-1 rounded-lg hover:bg-marx-surface text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập từ khóa (ví dụ: Mác, thặng dư, Bill Gates, Rap Việt, lợi nhuận)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[hsl(var(--background))] border border-marx text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(var(--marx-gold))] focus:ring-1 focus:ring-[hsl(var(--marx-gold)/0.4)]"
                autoFocus
              />
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(res.pageIndex)}
                    className="w-full p-3 rounded-xl bg-marx-surface border border-marx hover:border-[hsl(var(--marx-gold)/0.55)] text-left transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-foreground">
                      <span>{res.title}</span>
                      <span className="text-[10px] font-mono bg-[hsl(var(--marx-crimson)/0.12)] px-2 py-0.5 rounded text-[hsl(var(--marx-crimson))]">
                        Trang {res.pageIndex + 1}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{res.excerpt}</p>
                  </button>
                ))
              ) : searchQuery.trim() ? (
                <p className="text-xs text-muted-foreground text-center py-4">Không tìm thấy kết quả phù hợp với &ldquo;{searchQuery}&rdquo;</p>
              ) : (
                <p className="text-xs text-muted-foreground text-center py-4">Nhập từ khóa bất kỳ để tìm nhanh các nội dung trong bài làm</p>
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
        {!engineReady && !engineError && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-[hsl(var(--marx-surface)/0.75)] backdrop-blur-[2px] rounded-2xl pointer-events-none">
            <div className="w-10 h-10 rounded-xl bg-[hsl(var(--marx-gold)/0.2)] border border-[hsl(var(--marx-gold)/0.45)] flex items-center justify-center animate-pulse">
              <BookOpen className="w-5 h-5 text-gold" />
            </div>
            <p className="text-xs font-semibold text-gold">Đang khởi tạo lật trang 3D…</p>
          </div>
        )}
        {engineError && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 bg-[hsl(var(--marx-surface)/0.9)] rounded-2xl px-4 text-center border border-marx">
            <p className="text-sm font-semibold text-[hsl(var(--marx-crimson))]">Không tải được engine flipbook</p>
            <p className="text-xs text-muted-foreground">Thử tải lại trang hoặc chạy npm install</p>
          </div>
        )}
        <div
          ref={bookRef}
          className={`stpageflip-container shadow-2xl transition-opacity duration-300 ${
            engineReady ? "opacity-100" : "opacity-40"
          }`}
        >
          <MagazinePages onGoCover={() => goToPage(0)} />
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-2.5 bg-[hsl(var(--marx-surface-raised)/0.95)] backdrop-blur-md rounded-xl border border-marx z-20 mt-4 shadow-md">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => goToPage(0)}
            disabled={currentPageIndex === 0}
            className="px-3 py-1.5 rounded-lg bg-marx-surface border border-marx hover:border-[hsl(var(--marx-gold)/0.55)] disabled:opacity-40 text-xs font-semibold text-foreground transition-colors"
          >
            Bìa Đầu
          </button>
          <button
            onClick={prevPage}
            disabled={currentPageIndex === 0}
            className="px-3 py-1.5 rounded-lg bg-[hsl(var(--marx-crimson)/0.12)] border border-[hsl(var(--marx-crimson)/0.35)] hover:bg-[hsl(var(--marx-crimson)/0.2)] disabled:opacity-40 text-[hsl(var(--marx-crimson))] transition-colors flex items-center gap-1 text-xs font-bold"
          >
            <ChevronLeft className="w-4 h-4" /> Trang Trước
          </button>
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full py-1">
          {MAGAZINE_PAGES_DATA.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => goToPage(idx)}
              className={`w-7 h-7 rounded-md text-xs font-bold transition-all border ${
                currentPageIndex === idx
                  ? "bg-[hsl(var(--marx-crimson))] text-[hsl(var(--primary-foreground))] border-[hsl(var(--marx-crimson))] scale-110 shadow-md"
                  : "bg-marx-surface border-marx text-muted-foreground hover:text-gold hover:border-[hsl(var(--marx-gold)/0.5)]"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={nextPage}
            disabled={currentPageIndex === totalPages - 1}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[hsl(var(--marx-crimson))] to-[hsl(var(--marx-gold))] hover:brightness-110 disabled:opacity-40 text-[hsl(var(--primary-foreground))] font-bold transition-colors flex items-center gap-1 text-xs shadow-md"
          >
            Trang Sau <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => goToPage(totalPages - 1)}
            disabled={currentPageIndex === totalPages - 1}
            className="px-3 py-1.5 rounded-lg bg-marx-surface border border-marx hover:border-[hsl(var(--marx-gold)/0.55)] disabled:opacity-40 text-xs font-semibold text-foreground transition-colors"
          >
            Bìa Cuối
          </button>
        </div>
      </div>
    </div>
  );
}

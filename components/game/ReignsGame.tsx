"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import {
  Coins,
  Package,
  Users,
  Landmark,
  RotateCcw,
  Home,
  PlayCircle,
  Lightbulb,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import {
  GAME_SCENARIOS,
  INITIAL_STATS,
  MAX_TURNS,
  GameStats,
  GameScenario,
  GameEnding,
  getAvatarUrl,
  evaluateGameOver,
} from "@/data/gameData";
import { GameCharacterBackdrop } from "@/components/game/GameCharacterBackdrop";

type Screen = "home" | "playing" | "over";

const SWIPE_THRESHOLD = 80;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const STAT_CONFIG = [
  { key: "money" as const, label: "Tài chính", icon: Coins, color: "from-red-500 to-rose-400" },
  { key: "product" as const, label: "Sản phẩm", icon: Package, color: "from-sky-500 to-blue-400" },
  { key: "worker" as const, label: "Nhân lực", icon: Users, color: "from-emerald-500 to-green-400" },
  { key: "fame" as const, label: "Uy tín", icon: Landmark, color: "from-amber-500 to-yellow-400" },
];

function RulesPanel({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`w-full text-left space-y-3 ${compact ? "" : "space-y-4"}`}>
      <div className="bg-black/10 border-2 border-black/80 rounded-md p-4 text-sm space-y-2">
        <h3 className="font-bold uppercase text-[0.95rem] border-b border-dashed border-black/60 pb-1 mb-1">
          Hướng dẫn thao tác
        </h3>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            Kéo thẻ sang <strong>PHẢI</strong> để <strong>ĐỒNG Ý</strong> lời đề nghị.
          </li>
          <li>
            Kéo thẻ sang <strong>TRÁI</strong> để <strong>TỪ CHỐI</strong> lời đề nghị.
          </li>
        </ul>
      </div>

      <div className="bg-black/10 border-2 border-black/80 rounded-md p-4 text-sm space-y-2">
        <h3 className="font-bold uppercase text-[0.95rem] border-b border-dashed border-black/60 pb-1 mb-1">
          Quy luật chơi
        </h3>
        <ul className="list-disc pl-4 space-y-1">
          <li>
            Mỗi quyết định ảnh hưởng 4 chỉ số: <strong>Tài chính</strong>, <strong>Sản phẩm</strong>,{" "}
            <strong>Nhân lực</strong>, <strong>Uy tín</strong>.
          </li>
          <li>
            <strong>Mục tiêu:</strong> Duy trì doanh nghiệp qua đủ <strong>12 tháng</strong>.
          </li>
          <li>
            <strong>Thua cuộc:</strong> Bất kỳ chỉ số nào kiệt quệ về <strong>0%</strong> (hoặc quá tải
            bóc lột ở 100%).
          </li>
        </ul>
      </div>
    </div>
  );
}

export function ReignsGame() {
  const [screen, setScreen] = React.useState<Screen>("home");
  const [stats, setStats] = React.useState<GameStats>(INITIAL_STATS);
  const [turnCount, setTurnCount] = React.useState(1);
  const [queue, setQueue] = React.useState<GameScenario[]>([]);
  const [currentScenario, setCurrentScenario] = React.useState<GameScenario | null>(null);
  const [ending, setEnding] = React.useState<GameEnding | null>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-20, 0, 20]);
  // Gợi ý bên: mờ khi nghỉ, sáng khi kéo đúng hướng
  const leftHintOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD], [1, 0.4, 0.25]);
  const rightHintOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD], [0.25, 0.4, 1]);
  const leftHintScale = useTransform(x, [-SWIPE_THRESHOLD, 0], [1.15, 1]);
  const rightHintScale = useTransform(x, [0, SWIPE_THRESHOLD], [1, 1.15]);
  const leftHintFilter = useTransform(
    x,
    [-SWIPE_THRESHOLD, 0],
    ["brightness(1.4) saturate(1.3)", "brightness(0.85) saturate(0.7)"]
  );
  const rightHintFilter = useTransform(
    x,
    [0, SWIPE_THRESHOLD],
    ["brightness(0.85) saturate(0.7)", "brightness(1.4) saturate(1.3)"]
  );

  const startGame = () => {
    const shuffled = shuffle(GAME_SCENARIOS);
    setStats(INITIAL_STATS);
    setTurnCount(1);
    setEnding(null);
    setQueue(shuffled.slice(1));
    setCurrentScenario(shuffled[0]);
    x.set(0);
    setScreen("playing");
  };

  const goHome = () => setScreen("home");

  const processChoice = (choice: "accept" | "decline") => {
    if (!currentScenario) return;
    const effect = currentScenario[choice];

    const newStats: GameStats = {
      money: Math.max(0, Math.min(100, stats.money + effect.money)),
      product: Math.max(0, Math.min(100, stats.product + effect.product)),
      worker: Math.max(0, Math.min(100, stats.worker + effect.worker)),
      fame: Math.max(0, Math.min(100, stats.fame + effect.fame)),
    };
    const newTurn = turnCount + 1;

    setStats(newStats);
    setTurnCount(newTurn);

    setTimeout(() => {
      const result = evaluateGameOver(newStats, newTurn);
      if (result) {
        setEnding(result);
        setScreen("over");
        return;
      }
      setQueue((prevQueue) => {
        if (prevQueue.length === 0) {
          const reshuffled = shuffle(GAME_SCENARIOS);
          setCurrentScenario(reshuffled[0]);
          return reshuffled.slice(1);
        }
        const [next, ...rest] = prevQueue;
        setCurrentScenario(next);
        return rest;
      });

      x.stop();
      x.set(0);
    }, 350);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    const offsetX = info.offset.x;
    if (offsetX > SWIPE_THRESHOLD) {
      animate(x, 500, { duration: 0.3, ease: "easeOut" });
      processChoice("accept");
    } else if (offsetX < -SWIPE_THRESHOLD) {
      animate(x, -500, { duration: 0.3, ease: "easeOut" });
      processChoice("decline");
    } else {
      animate(x, 0, { duration: 0.25, ease: "easeOut" });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {screen === "playing" && (
        <div className="text-slate-800 dark:text-slate-200 text-base font-semibold tracking-wide drop-shadow mb-3 text-left">
          Tháng{" "}
          <span className="text-xl font-bold">{Math.min(turnCount, MAX_TURNS)}</span> / {MAX_TURNS}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-stretch lg:items-start">
        {/* Khung game */}
        <div
          className="relative w-full lg:flex-1 rounded-[28px] overflow-hidden shadow-2xl border-4 border-[#1a130b]"
          style={{
            background:
              "radial-gradient(circle at 20% 10%, #27325c 0%, #192142 40%, #0a0c16 100%)",
          }}
        >
          <div className="relative min-h-[680px] sm:min-h-[720px] flex flex-col bg-[#cda86f]">
            <AnimatePresence mode="wait">
              {screen === "home" && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative flex flex-col items-center justify-center text-center px-6 sm:px-8 py-10 gap-4 flex-1 overflow-hidden"
                >
                  <GameCharacterBackdrop />

                  <div className="relative z-10 flex flex-col items-center gap-4 max-w-lg">
                    <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-wide font-serif text-[#f4ebe0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]">
                      Cán Cân Quyền Lực
                    </h1>
                    <p className="text-sm sm:text-base italic text-[#cda86f] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                      &ldquo;Nghệ Thuật Điều Hành Bền Vững&rdquo;
                    </p>

                    <button
                      onClick={startGame}
                      className="mt-6 w-full min-w-[240px] py-3.5 rounded-md bg-[#cda86f] text-[#1a130b] font-bold uppercase tracking-wide text-sm hover:bg-[#e0c090] transition-colors flex items-center justify-center gap-2 shadow-lg border-2 border-[#1a130b]/30"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Bắt đầu điều hành
                    </button>
                  </div>
                </motion.div>
              )}

              {screen === "playing" && currentScenario && (
                <motion.div
                  key="playing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col flex-1"
                >
                  {/* Thanh chỉ số — chữ nằm dưới */}
                  <div className="flex justify-around gap-1 px-3 sm:px-4 py-4 bg-[#281d12]">
                    {STAT_CONFIG.map(({ key, label, icon: Icon, color }) => (
                      <div key={key} className="flex flex-col items-center w-[23%] gap-1.5">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200" />
                        <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${color}`}
                            animate={{ width: `${stats[key]}%` }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          />
                        </div>
                        <span className="text-[10px] sm:text-xs font-semibold text-amber-100/90 text-center leading-tight">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Nội dung tình huống */}
                  <div className="px-6 sm:px-8 py-5 sm:py-6 text-center min-h-[100px] flex items-center justify-center">
                    <p className="font-bold text-[#1a130b] leading-snug text-base sm:text-lg">
                      {currentScenario.text}
                    </p>
                  </div>

                  {/* Vùng thẻ vuốt + gợi ý trái/phải */}
                  <div className="flex-1 flex items-center justify-center gap-2 sm:gap-4 bg-[#353624] border-t-2 border-black/40 py-6 px-2 sm:px-4 relative overflow-hidden">
                    <motion.div
                      style={{
                        opacity: leftHintOpacity,
                        scale: leftHintScale,
                        filter: leftHintFilter,
                      }}
                      className="flex flex-col items-center gap-1.5 w-16 sm:w-20 shrink-0 select-none"
                    >
                      <ThumbsDown className="w-5 h-5 sm:w-6 sm:h-6 text-rose-300" />
                      <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wide text-rose-200 text-center leading-tight">
                        Từ chối
                      </span>
                      <span className="text-[9px] text-white/50 hidden sm:block">← Vuốt trái</span>
                    </motion.div>

                    <div className="relative w-[240px] sm:w-[280px] h-[320px] sm:h-[360px] shrink-0">
                      <div
                        className="absolute inset-0 rounded-lg border-[3px] border-[#141812]"
                        style={{ background: "#21261d" }}
                      />

                      <motion.div
                        key={currentScenario.id}
                        style={{ x, rotate }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 rounded-lg bg-[#cda86f] shadow-xl flex flex-col cursor-grab active:cursor-grabbing overflow-hidden z-10"
                      >
                        <div className="absolute top-0 left-0 w-full h-[45%] bg-[#225180] z-0" />

                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getAvatarUrl(currentScenario.avatarSeed)}
                          alt={currentScenario.char}
                          draggable={false}
                          className="w-[190px] sm:w-[210px] h-[190px] sm:h-[210px] object-contain mx-auto mt-10 z-10 pointer-events-none select-none"
                        />
                        <div className="mt-auto w-full bg-[#cda86f] border-t-2 border-black/15 text-center py-3 px-2 z-10">
                          <span className="font-bold text-sm sm:text-base text-[#1a130b]">
                            {currentScenario.char}
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      style={{
                        opacity: rightHintOpacity,
                        scale: rightHintScale,
                        filter: rightHintFilter,
                      }}
                      className="flex flex-col items-center gap-1.5 w-16 sm:w-20 shrink-0 select-none"
                    >
                      <ThumbsUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300" />
                      <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wide text-emerald-200 text-center leading-tight">
                        Đồng ý
                      </span>
                      <span className="text-[9px] text-white/50 hidden sm:block">Vuốt phải →</span>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {screen === "over" && ending && (
                <motion.div
                  key="over"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center px-6 sm:px-8 py-10 gap-4 flex-1 bg-[#05050a] text-white"
                >
                  <h2
                    className="text-2xl sm:text-3xl font-bold font-serif"
                    style={{ color: ending.isWin ? "#f1c40f" : "#e74c3c" }}
                  >
                    {ending.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-lg">
                    {ending.desc}
                  </p>

                  {ending.lesson && (
                    <div className="w-full max-w-lg text-left bg-amber-500/10 border border-amber-400/60 rounded-md p-4 text-[0.85rem] sm:text-sm leading-relaxed text-amber-100 space-y-2">
                      <h4 className="flex items-center gap-1.5 font-bold uppercase text-sm border-b border-amber-400/60 pb-1.5">
                        <Lightbulb className="w-4 h-4" />
                        Bài học rút ra
                      </h4>
                      <p>{ending.lesson}</p>
                    </div>
                  )}

                  <div className="flex gap-3 w-full max-w-md mt-4">
                    <button
                      onClick={goHome}
                      className="flex-1 py-3 rounded-md border-2 border-white text-white text-sm font-bold hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
                    >
                      <Home className="w-4 h-4" />
                      Trang chủ
                    </button>
                    <button
                      onClick={startGame}
                      className="flex-1 py-3 rounded-md border-2 border-white text-white text-sm font-bold hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Chơi lại
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Luật chơi bên cạnh — desktop luôn hiện; mobile hiện khi đang chơi */}
        {(screen === "home" || screen === "playing") && (
          <aside className="hidden lg:flex w-full lg:w-[300px] xl:w-[320px] shrink-0 flex-col">
            <div className="rounded-[20px] border-4 border-[#1a130b] bg-[#cda86f] text-[#1a130b] p-5 shadow-xl sticky top-24">
              <h2 className="text-lg font-extrabold uppercase font-serif tracking-wide mb-4 text-center">
                Luật chơi
              </h2>
              <RulesPanel compact />
              {screen === "playing" && (
                <p className="mt-4 text-center text-xs font-semibold text-[#1a130b]/70">
                  Trái = Từ chối · Phải = Đồng ý
                </p>
              )}
            </div>
          </aside>
        )}

        {/* Mobile: luật chơi dưới khung game — không nhét vào màn hình vàng */}
        {(screen === "home" || screen === "playing") && (
          <div className="lg:hidden w-full rounded-[20px] border-4 border-[#1a130b] bg-[#cda86f] text-[#1a130b] p-4">
            <h2 className="text-base font-extrabold uppercase font-serif tracking-wide mb-3 text-center">
              Luật chơi
            </h2>
            <RulesPanel compact />
          </div>
        )}
      </div>
    </div>
  );
}

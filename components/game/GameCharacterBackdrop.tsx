"use client";

import { motion } from "framer-motion";
import { GAME_SCENARIOS, getAvatarUrl } from "@/data/gameData";

const CHARACTERS = Array.from(
  new Map(
    GAME_SCENARIOS.map((s) => [s.avatarSeed, { seed: s.avatarSeed, name: s.char }])
  ).values()
);

/** Vị trí quanh mép — chừa khoảng giữa cho tiêu đề & nút */
const FLOAT_LAYOUT = [
  { top: "4%", left: "3%", size: 78, delay: 0, duration: 7.2, drift: 12 },
  { top: "5%", left: "78%", size: 86, delay: 0.5, duration: 8.0, drift: -10 },
  { top: "22%", left: "2%", size: 70, delay: 1.1, duration: 6.8, drift: 9 },
  { top: "18%", left: "86%", size: 74, delay: 0.3, duration: 7.5, drift: -14 },
  { top: "48%", left: "-2%", size: 90, delay: 1.6, duration: 8.3, drift: 11 },
  { top: "42%", left: "88%", size: 72, delay: 0.8, duration: 6.6, drift: -9 },
  { top: "70%", left: "4%", size: 80, delay: 1.3, duration: 7.8, drift: 13 },
  { top: "66%", left: "80%", size: 84, delay: 0.2, duration: 8.6, drift: -12 },
  { top: "82%", left: "18%", size: 66, delay: 1.9, duration: 6.4, drift: 10 },
  { top: "84%", left: "68%", size: 78, delay: 1.0, duration: 7.3, drift: -11 },
  { top: "8%", left: "42%", size: 58, delay: 1.4, duration: 9.0, drift: 7 },
  { top: "76%", left: "44%", size: 62, delay: 0.6, duration: 7.1, drift: -8 },
] as const;

type Props = {
  /** splash = màn hình bắt đầu trong khung game */
  variant?: "splash";
};

export function GameCharacterBackdrop({ variant = "splash" }: Props) {
  void variant;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 40%, #2a1c10 0%, #1a130b 55%, #0d0a07 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(circle at 15% 85%, rgba(205,168,111,0.35) 0%, transparent 42%), radial-gradient(circle at 90% 20%, rgba(34,81,128,0.35) 0%, transparent 38%)",
        }}
      />

      {CHARACTERS.map((char, i) => {
        const layout = FLOAT_LAYOUT[i % FLOAT_LAYOUT.length];
        return (
          <motion.div
            key={char.seed}
            className="absolute"
            style={{
              top: layout.top,
              left: layout.left,
              width: layout.size,
              height: layout.size,
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: [0.45, 0.75, 0.45],
              y: [0, layout.drift, 0],
              x: [0, layout.drift * 0.3, 0],
              rotate: [0, layout.drift > 0 ? 3 : -3, 0],
            }}
            transition={{
              duration: layout.duration,
              delay: layout.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="relative w-full h-full rounded-xl overflow-hidden border-2 border-[#cda86f]/40 shadow-xl"
              style={{
                background: "linear-gradient(160deg, #225180 0%, #cda86f 100%)",
                boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getAvatarUrl(char.seed)}
                alt=""
                draggable={false}
                className="w-full h-full object-cover object-top scale-110 translate-y-1"
              />
            </div>
          </motion.div>
        );
      })}

      {/* Vignette giữa để chữ/nút nổi bật */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,8,6,0.55)_0%,rgba(10,8,6,0.25)_45%,transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
    </div>
  );
}

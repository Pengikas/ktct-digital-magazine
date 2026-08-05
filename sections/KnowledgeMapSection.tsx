"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, RotateCcw, Network, X, Hand } from "lucide-react";
import {
  KNOWLEDGE_MAP_NODES,
  KNOWLEDGE_MAP_EDGES,
  MapNode,
  getMapNeighbors,
} from "@/data/knowledgeMapData";

export function KnowledgeMapSection() {
  const [zoom, setZoom] = React.useState(1);
  const [pan, setPan] = React.useState({ x: 0, y: 0 });
  const [panMode, setPanMode] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedNode, setSelectedNode] = React.useState<MapNode | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = React.useState("tất-cả");

  const dragRef = React.useRef<{ x: number; y: number } | null>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 0.7));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedNode(null);
    setPanMode(false);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!panMode) return;
    dragRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!panMode || !dragRef.current) return;
    setPan({
      x: e.clientX - dragRef.current.x,
      y: e.clientY - dragRef.current.y,
    });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  const filteredNodes = KNOWLEDGE_MAP_NODES.filter((node) => {
    if (activeCategoryFilter === "tất-cả") return true;
    return node.category === activeCategoryFilter;
  });

  const selectedNeighbors = selectedNode
    ? new Set(getMapNeighbors(selectedNode.id))
    : null;

  const isLinked = (id: string) => {
    if (!selectedNode) return true;
    if (id === selectedNode.id) return true;
    return selectedNeighbors?.has(id) ?? false;
  };

  const toolBtn =
    "p-2 rounded-lg bg-[hsl(var(--background))] hover:bg-[hsl(var(--muted))] border border-marx text-muted-foreground transition-colors";
  const toolBtnActive =
    "p-2 rounded-lg bg-[#9b1b1b] border-[#9b1b1b] text-[#f4ebe0] dark:bg-amber-600 dark:border-amber-500 dark:text-slate-950";

  return (
    <section
      id="knowledge-map"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-marx-surface text-foreground relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="label-press mx-auto">
            <Network className="w-3.5 h-3.5" />
            <span>Sơ Đồ Tư Duy Tương Tác • Knowledge Mind Map</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight heading-display">
            BẢN ĐỒ TRI THỨC KINH TẾ CHÍNH TRỊ
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Mỗi ô phụ có tóm tắt nội dung. Bấm ô để xem chi tiết. Nét liền: tâm–phụ · Nét
            đứt: phụ–phụ. Bật bàn tay để kéo sơ đồ.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-marx-raised p-4 rounded-2xl border border-marx">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Tất cả", value: "tất-cả" },
              { label: "Trung tâm", value: "trung-tâm" },
              { label: "Lý thuyết", value: "lý-thuyết" },
              { label: "Chức năng", value: "chức-năng" },
              { label: "Tư bản", value: "tư-bản" },
              { label: "Phân tích", value: "phân-tích" },
              { label: "Thực tiễn", value: "thực-tiễn" },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveCategoryFilter(tab.value)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeCategoryFilter === tab.value
                    ? "bg-[#9b1b1b] text-[#f4ebe0] dark:bg-amber-600 dark:text-slate-950"
                    : "bg-[hsl(var(--background))] text-muted-foreground hover:bg-[hsl(var(--muted))] hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setPanMode((v) => !v)}
              className={panMode ? toolBtnActive : toolBtn}
              title={panMode ? "Tắt kéo sơ đồ" : "Bật kéo sơ đồ (bàn tay)"}
              aria-pressed={panMode}
            >
              <Hand className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              className={toolBtn}
              title="Phóng to"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className={toolBtn}
              title="Thu nhỏ"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleResetView}
              className={toolBtn}
              title="Đặt lại"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-gold px-2">
              {Math.round(zoom * 100)}%
            </span>
          </div>
        </div>

        <div className="relative w-full rounded-3xl bg-marx-raised border border-marx overflow-hidden shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
          <div
            ref={viewportRef}
            className={`relative w-full h-[min(72vh,620px)] overflow-hidden select-none ${
              panMode
                ? isDragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
                : "cursor-default"
            }`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div
              className="relative mx-auto will-change-transform"
              style={{
                width: 1100,
                height: 620,
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "transform 0.2s ease-out",
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(#c4b5a5_1px,transparent_1px)] dark:bg-[radial-gradient(#5c4f42_1px,transparent_1px)] [background-size:22px_22px] opacity-40 dark:opacity-30 pointer-events-none" />

              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {KNOWLEDGE_MAP_EDGES.map((edge) => {
                  const a = KNOWLEDGE_MAP_NODES.find((n) => n.id === edge.a);
                  const b = KNOWLEDGE_MAP_NODES.find((n) => n.id === edge.b);
                  if (!a || !b) return null;

                  const active =
                    !!selectedNode &&
                    (selectedNode.id === edge.a || selectedNode.id === edge.b) &&
                    isLinked(edge.a) &&
                    isLinked(edge.b);

                  return (
                    <line
                      key={`${edge.a}-${edge.b}`}
                      x1={`${a.x}%`}
                      y1={`${a.y}%`}
                      x2={`${b.x}%`}
                      y2={`${b.y}%`}
                      className={
                        active
                          ? "stroke-amber-500 dark:stroke-amber-400"
                          : "stroke-[#8a7a6a] dark:stroke-[#6b5e52]"
                      }
                      strokeWidth={active ? 2.5 : edge.type === "main" ? 2 : 1.6}
                      strokeLinecap="round"
                      strokeDasharray={edge.type === "main" ? undefined : "7 5"}
                    />
                  );
                })}
              </svg>

              {filteredNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const isCenter = node.category === "trung-tâm";
                const dimmed = selectedNode !== null && !isLinked(node.id);

                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => {
                      if (panMode) return;
                      setSelectedNode(node);
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-[5] px-2.5 py-2 rounded-xl transition-all shadow-lg border text-left ${
                      panMode ? "pointer-events-none" : "cursor-pointer"
                    } ${
                      isCenter
                        ? "w-[11rem] sm:w-[13rem] bg-gradient-to-br from-red-700 via-amber-600 to-yellow-500 text-slate-950 font-extrabold border-amber-200/90 dark:border-amber-400/50 ring-2 ring-amber-500/35 dark:ring-amber-400/25"
                        : isSelected
                          ? "w-[9.5rem] sm:w-[11.5rem] bg-amber-500 text-slate-950 border-amber-200 ring-2 ring-amber-300 dark:bg-amber-500 dark:border-amber-300 dark:ring-amber-400/40"
                          : "w-[9.5rem] sm:w-[11.5rem] bg-[#fffefb] dark:bg-[#221c18] text-foreground border-marx dark:border-[#3d342c] hover:border-amber-400 dark:hover:border-amber-500/70 dark:shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
                    } ${dimmed ? "opacity-40" : "opacity-100"}`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    {!isCenter && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-gold dark:text-amber-400/90 block mb-1">
                        {node.category}
                      </span>
                    )}
                    <span
                      className={`font-serif font-bold leading-snug block ${
                        isCenter
                          ? "text-sm sm:text-base text-center"
                          : "text-[11px] sm:text-xs dark:text-[#f0e6d8]"
                      }`}
                    >
                      {node.label}
                    </span>
                    {!isCenter && node.summary.length > 0 && (
                      <ul className="mt-1.5 space-y-0.5 text-[10px] sm:text-[11px] leading-snug text-muted-foreground dark:text-[#b5a898] list-disc pl-3.5">
                        {node.summary.map((line) => (
                          <li key={line} className="marker:text-gold dark:marker:text-amber-500/80">
                            {line}
                          </li>
                        ))}
                      </ul>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-amber-500/40 dark:border-amber-500/25 bg-[hsl(var(--background))]/95 dark:bg-[#161210]/95"
              >
                <div className="p-5 sm:p-6 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => setSelectedNode(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-sm bg-[hsl(var(--muted))] text-muted-foreground hover:text-foreground"
                    aria-label="Đóng"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="pr-10 space-y-1">
                    <span className="text-xs font-mono font-bold uppercase text-gold tracking-wider">
                      Chi tiết · {selectedNode.category}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold font-serif text-foreground">
                      {selectedNode.label}
                    </h4>
                  </div>

                  {selectedNode.summary.length > 0 && (
                    <ul className="text-sm text-foreground list-disc pl-5 space-y-1">
                      {selectedNode.summary.map((line) => (
                        <li key={line} className="marker:text-gold">
                          {line}
                        </li>
                      ))}
                    </ul>
                  )}

                  <p className="text-sm text-muted-foreground leading-relaxed font-sans bg-marx-raised dark:bg-[#1e1915] p-4 rounded-xl border border-marx dark:border-[#3d342c]">
                    {selectedNode.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>Liên kết:</span>
                    {getMapNeighbors(selectedNode.id).map((targetId) => {
                      const target = KNOWLEDGE_MAP_NODES.find((n) => n.id === targetId);
                      return (
                        <button
                          key={targetId}
                          type="button"
                          onClick={() => {
                            const next = KNOWLEDGE_MAP_NODES.find((n) => n.id === targetId);
                            if (next) setSelectedNode(next);
                          }}
                          className="px-2 py-0.5 rounded bg-[hsl(var(--muted))] dark:bg-[#2a241f] text-gold font-medium hover:bg-[hsl(var(--border))] dark:hover:bg-[#3d342c]"
                        >
                          {target?.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, ZoomOut, RotateCcw, Network, X } from "lucide-react";
import { KNOWLEDGE_MAP_NODES, MapNode } from "@/data/knowledgeMapData";

export function KnowledgeMapSection() {
  const [zoom, setZoom] = React.useState<number>(1);
  const [selectedNode, setSelectedNode] = React.useState<MapNode | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = React.useState<string>("tất-cả");

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 1.8));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.6));
  const handleResetZoom = () => {
    setZoom(1);
    setSelectedNode(null);
  };

  const filteredNodes = KNOWLEDGE_MAP_NODES.filter((node) => {
    if (activeCategoryFilter === "tất-cả") return true;
    return node.category === activeCategoryFilter;
  });

  return (
    <section id="knowledge-map" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Network className="w-3.5 h-3.5" />
            <span>Sơ Đồ Tư Duy Tương Tác • Knowledge Mind Map</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight text-white">
            BẢN ĐỒ TRI THỨC KINH TẾ CHÍNH TRỊ
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Khám phá mạng lưới liên kết giữa nền tảng tiền–tư bản, tích lũy (3.2), phân phối GTTD (3.3), phân tích CQ5 và dẫn chứng thực tiễn.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Tất cả Nút", value: "tất-cả" },
              { label: "Trung tâm", value: "trung-tâm" },
              { label: "Lý thuyết", value: "lý-thuyết" },
              { label: "Chức năng", value: "chức-năng" },
              { label: "Tư bản", value: "tư-bản" },
              { label: "Thực tiễn", value: "thực-tiễn" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveCategoryFilter(tab.value)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  activeCategoryFilter === tab.value
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300"
              title="Phóng to"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300"
              title="Thu nhỏ"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300"
              title="Đặt lại"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-amber-400 px-2">{Math.round(zoom * 100)}%</span>
          </div>
        </div>

        {/* Map board + detail drawer (detail outside node layer so it never covers other nodes) */}
        <div className="relative w-full rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-2xl">
          <div className="relative w-full h-[520px] overflow-hidden">
            <div
              className="w-full h-full relative transition-transform duration-300 ease-out"
              style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {KNOWLEDGE_MAP_NODES.map((node) =>
                  node.connectedTo.map((targetId) => {
                    const targetNode = KNOWLEDGE_MAP_NODES.find((n) => n.id === targetId);
                    if (!targetNode) return null;
                    const active =
                      selectedNode?.id === node.id || selectedNode?.id === targetId;
                    return (
                      <line
                        key={`${node.id}-${targetId}`}
                        x1={`${node.x}%`}
                        y1={`${node.y}%`}
                        x2={`${targetNode.x}%`}
                        y2={`${targetNode.y}%`}
                        stroke={active ? "#f59e0b" : "#334155"}
                        strokeWidth={active ? "2.5" : "1.5"}
                        strokeDasharray={node.category === "trung-tâm" ? "none" : "4 4"}
                      />
                    );
                  })
                )}
              </svg>

              {filteredNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const isCenter = node.category === "trung-tâm";
                const dimmed = selectedNode !== null && !isSelected;

                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNode(isSelected ? null : node)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-[5] max-w-[11rem] sm:max-w-[14rem] px-3 py-2.5 rounded-xl cursor-pointer transition-all shadow-lg flex items-center gap-2 border text-left ${
                      isCenter
                        ? "bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 text-slate-950 font-extrabold border-amber-300 ring-2 ring-amber-500/40"
                        : isSelected
                          ? "bg-amber-500/95 text-slate-950 font-bold border-amber-200 ring-2 ring-amber-300"
                          : "bg-slate-900 text-slate-100 border-slate-700 hover:border-amber-400"
                    } ${dimmed ? "opacity-45" : "opacity-100"}`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    <span className="text-[11px] sm:text-xs font-serif font-bold leading-snug">
                      {node.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel BELOW the map — never overlaps nodes */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-amber-500/40 bg-slate-950/95"
              >
                <div className="p-5 sm:p-6 space-y-3 relative">
                  <button
                    type="button"
                    onClick={() => setSelectedNode(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
                    aria-label="Đóng"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="pr-10 space-y-1">
                    <span className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                      Nút: {selectedNode.category}
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
                      {selectedNode.label}
                    </h4>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed font-sans bg-slate-900 p-4 rounded-xl border border-slate-800">
                    {selectedNode.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span>Liên kết:</span>
                    {selectedNode.connectedTo.map((targetId) => {
                      const target = KNOWLEDGE_MAP_NODES.find((n) => n.id === targetId);
                      return (
                        <button
                          key={targetId}
                          type="button"
                          onClick={() => {
                            const next = KNOWLEDGE_MAP_NODES.find((n) => n.id === targetId);
                            if (next) setSelectedNode(next);
                          }}
                          className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-medium hover:bg-slate-700"
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

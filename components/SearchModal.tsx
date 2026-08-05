"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";

export interface SearchModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectResult?: (targetId: string) => void;
}

export type TopicType =
  | "khai_niem_co_ban"
  | "ban_chat_tien_te"
  | "phan_bien_thuc_tien"
  | "so_lieu_thuc_te"
  | "thong_ke_diem_yeu";

export interface AIAction {
  type: string;
  label: string;
  payload: { targetUrl?: string; topic?: string; [key: string]: any };
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  topic?: TopicType;
  actions?: AIAction[];
  modelUsed?: string;
  isError?: boolean;
}

export interface TopicStats {
  khai_niem_co_ban: number;
  ban_chat_tien_te: number;
  phan_bien_thuc_tien: number;
  so_lieu_thuc_te: number;
}

const INITIAL_STATS: TopicStats = {
  khai_niem_co_ban: 0,
  ban_chat_tien_te: 0,
  phan_bien_thuc_tien: 0,
  so_lieu_thuc_te: 0,
};

export const TOPIC_LABELS: Record<TopicType, string> = {
  khai_niem_co_ban: "Khái niệm cơ bản",
  ban_chat_tien_te: "Bản chất tiền tệ",
  phan_bien_thuc_tien: "Phản biện thực tiễn",
  so_lieu_thuc_te: "Số liệu thực tế",
  thong_ke_diem_yeu: "Phân tích điểm yếu",
};

const LS_STATS = "ktct_topic_stats";
const LS_OR_KEY = "ktct_openrouter_key";
const LS_OR_VALIDATED = "ktct_key_validated";
const LS_AI_MODEL = "ktct_ai_model";

const AVAILABLE_MODELS = [
  { value: "google/gemini-2.0-flash-001", label: "Gemini 2.0 Flash" },
  { value: "meta-llama/llama-3.3-70b-instruct:free", label: "Llama 3.3 70B (Miễn phí)" },
  { value: "openai/gpt-4o-mini", label: "GPT-4o Mini" },
  { value: "anthropic/claude-3.5-sonnet", label: "Claude 3.5 Sonnet" },
];

type KeyStatus = "idle" | "validating" | "valid" | "invalid";

export function SearchModal({ isOpen: externalIsOpen, onClose: externalOnClose }: SearchModalProps) {
  const router = useRouter();
  const currentPathname = usePathname();

  const [isOpen, setIsOpen] = React.useState(false);
  const [view, setView] = React.useState<"setup" | "chat">("setup");
  const [inputText, setInputText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const [openRouterKey, setOpenRouterKey] = React.useState("");
  const [keyInputValue, setKeyInputValue] = React.useState("");
  const [keyStatus, setKeyStatus] = React.useState<KeyStatus>("idle");
  const [keyStatusMessage, setKeyStatusMessage] = React.useState("");
  const [selectedModel, setSelectedModel] = React.useState(AVAILABLE_MODELS[0].value);
  const [showModelPicker, setShowModelPicker] = React.useState(false);

  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Xin chào! Hãy đặt câu hỏi về môn Kinh tế chính trị Mác–Lênin.",
    },
  ]);

  const [topicStats, setTopicStats] = React.useState<TopicStats>(INITIAL_STATS);
  const [dismissBanner, setDismissBanner] = React.useState(false);

  const chatBodyRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedStats = localStorage.getItem(LS_STATS);
      if (savedStats) setTopicStats(JSON.parse(savedStats));
      const savedKey = localStorage.getItem(LS_OR_KEY) || "";
      const savedValidated = localStorage.getItem(LS_OR_VALIDATED) === "true";
      const savedModel = localStorage.getItem(LS_AI_MODEL);
      if (savedModel) setSelectedModel(savedModel);
      if (savedKey && savedValidated) {
        setOpenRouterKey(savedKey);
        setKeyInputValue(savedKey);
        setKeyStatus("valid");
        setView("chat");
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    if (externalIsOpen) setIsOpen(true);
  }, [externalIsOpen]);

  React.useEffect(() => {
    if (isOpen && view === "chat") {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, view]);

  const handleOpenChat = () => {
    setView(keyStatus === "valid" ? "chat" : "setup");
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (externalOnClose) externalOnClose();
  };

  const handleValidateKey = async () => {
    const trimmed = keyInputValue.trim();
    if (!trimmed) {
      setKeyStatus("invalid");
      setKeyStatusMessage("Vui lòng nhập API Key.");
      return;
    }
    setKeyStatus("validating");
    setKeyStatusMessage("");
    try {
      const res = await fetch("/api/chatbot/validate-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: trimmed }),
      });
      const data = await res.json();
      if (data.valid) {
        setKeyStatus("valid");
        setKeyStatusMessage(data.message || "Key hợp lệ.");
        setOpenRouterKey(trimmed);
        localStorage.setItem(LS_OR_KEY, trimmed);
        localStorage.setItem(LS_OR_VALIDATED, "true");
      } else {
        setKeyStatus("invalid");
        setKeyStatusMessage(data.message || "Key không hợp lệ.");
      }
    } catch {
      setKeyStatus("invalid");
      setKeyStatusMessage("Không thể kết nối để xác thực.");
    }
  };

  const handleProceedToChat = () => {
    localStorage.setItem(LS_AI_MODEL, selectedModel);
    setView("chat");
  };

  const handleResetKey = () => {
    setOpenRouterKey("");
    setKeyInputValue("");
    setKeyStatus("idle");
    setKeyStatusMessage("");
    localStorage.removeItem(LS_OR_KEY);
    localStorage.removeItem(LS_OR_VALIDATED);
    setView("setup");
  };

  const updateTopicStat = (topic: TopicType) => {
    if (topic === "thong_ke_diem_yeu") return;
    setTopicStats((prev) => {
      const updated = { ...prev, [topic]: (prev[topic] || 0) + 1 };
      localStorage.setItem(LS_STATS, JSON.stringify(updated));
      return updated;
    });
  };

  const weakTopicInfo = React.useMemo(() => {
    let maxTopic: keyof TopicStats | null = null;
    let maxCount = 0;
    (Object.keys(topicStats) as (keyof TopicStats)[]).forEach((k) => {
      if (topicStats[k] > maxCount) { maxCount = topicStats[k]; maxTopic = k; }
    });
    return maxTopic && maxCount >= 2
      ? { topic: maxTopic as TopicType, count: maxCount, label: TOPIC_LABELS[maxTopic as TopicType] }
      : null;
  }, [topicStats]);

  const handleExecuteAction = (action: AIAction) => {
    if (action.payload?.targetUrl) { router.push(action.payload.targetUrl); handleClose(); }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isLoading) return;

    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "user", text: trimmed }]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chatbot/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: trimmed,
          stats: topicStats,
          pageContext: {
            pathname: currentPathname || "/",
            title: typeof document !== "undefined" ? document.title : "KTCT",
          },
          openRouterApiKey: openRouterKey,
          model: selectedModel,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data || data.status === "error") {
        if (res.status === 401) handleResetKey();
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), sender: "ai", text: data?.message || "Đã xảy ra lỗi.", isError: true },
        ]);
      } else {
        const topic: TopicType = data.data.topic;
        if (topic && topic !== "thong_ke_diem_yeu") updateTopicStat(topic);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "ai",
            text: data.data.answer,
            topic,
            actions: data.data.actions || [],
            modelUsed: data.data.modelUsed,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "ai", text: "Mất kết nối máy chủ.", isError: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderText = (text: string) =>
    text.split("\n").map((line, i) => {
      if (line.startsWith("* ") || line.startsWith("- ")) {
        return (
          <li key={i} className="ml-4 list-disc leading-relaxed">
            {line.slice(2).split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
              p.startsWith("**") && p.endsWith("**")
                ? <strong key={j}>{p.slice(2, -2)}</strong>
                : <span key={j}>{p}</span>
            )}
          </li>
        );
      }
      if (line.startsWith("### ")) return <p key={i} className="font-semibold mt-2">{line.slice(4)}</p>;
      if (!line.trim()) return <div key={i} className="h-2" />;
      return (
        <p key={i} className="leading-relaxed">
          {line.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
            p.startsWith("**") && p.endsWith("**")
              ? <strong key={j}>{p.slice(2, -2)}</strong>
              : <span key={j}>{p}</span>
          )}
        </p>
      );
    });

  const currentModelLabel = AVAILABLE_MODELS.find(m => m.value === selectedModel)?.label || selectedModel;

  return (
    <>
      {/* ── FAB BUTTON ── */}
      <button
        type="button"
        onClick={() => (isOpen ? handleClose() : handleOpenChat())}
        aria-label={isOpen ? "Đóng Trợ lý AI" : "Mở Trợ lý AI"}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-[100] w-12 h-12 rounded-full bg-[#9b1b1b] text-[#f4ebe0] border border-[hsl(var(--marx-gold)/0.5)] shadow-lg shadow-[rgba(155,27,27,0.25)] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center dark:bg-[hsl(var(--marx-gold))] dark:text-[hsl(20_30%_10%)] dark:border-amber-300/40 dark:shadow-[rgba(184,134,11,0.3)]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`transition-transform duration-500 ease-out ${
            isOpen ? "rotate-[225deg] scale-90" : "rotate-0 scale-100"
          }`}
          aria-hidden
        >
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
      </button>

      {/* ── CHAT PANEL ── */}
      {isOpen && (
        <div className="fixed bottom-22 right-6 z-[100] w-[min(calc(100vw-3rem),400px)] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
          style={{ maxHeight: "min(580px, calc(100vh - 120px))" }}>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white dark:text-zinc-900">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Trợ lý AI</span>
              {view === "chat" && (
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono truncate max-w-[120px]">
                  {currentModelLabel}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {view === "chat" && (
                <button
                  onClick={() => setShowModelPicker(!showModelPicker)}
                  title="Cài đặt"
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </button>
              )}
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Settings dropdown (inline) */}
          {view === "chat" && showModelPicker && (
            <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 space-y-2 animate-in fade-in duration-150 shrink-0">
              <select
                value={selectedModel}
                onChange={(e) => { setSelectedModel(e.target.value); localStorage.setItem(LS_AI_MODEL, e.target.value); }}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs focus:ring-2 focus:ring-zinc-400 focus:outline-none"
              >
                {AVAILABLE_MODELS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
              <button
                onClick={handleResetKey}
                className="text-[11px] text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
              >
                Đổi API Key
              </button>
            </div>
          )}

          {/* ══════════════════════════════════
              VIEW: SETUP KEY
          ══════════════════════════════════ */}
          {view === "setup" && (
            <div className="flex-1 overflow-y-auto p-5 space-y-5">

              {/* Intro */}
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Nhập OpenRouter API Key
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Key được lưu riêng trên trình duyệt này và không chia sẻ với ai.
                </p>
              </div>

              {/* Guide */}
              <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-3.5 space-y-2">
                <p className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">Hướng dẫn</p>
                <ol className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <li className="flex gap-2.5">
                    <span className="shrink-0 text-[10px] font-bold text-zinc-400 w-4 pt-0.5">01</span>
                    <span>Truy cập <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-900 dark:text-zinc-100 underline underline-offset-2">openrouter.ai/keys ↗</a> và đăng nhập.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="shrink-0 text-[10px] font-bold text-zinc-400 w-4 pt-0.5">02</span>
                    <span>Nhấn <strong className="text-zinc-800 dark:text-zinc-200">Create Key</strong>, đặt tên và xác nhận.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="shrink-0 text-[10px] font-bold text-zinc-400 w-4 pt-0.5">03</span>
                    <span>Sao chép key dạng <code className="bg-zinc-200 dark:bg-zinc-700 px-1 py-0.5 rounded text-[10px]">sk-or-v1-…</code> và dán vào ô bên dưới.</span>
                  </li>
                  <li className="flex gap-2.5">
                    <span className="shrink-0 text-[10px] font-bold text-zinc-400 w-4 pt-0.5">04</span>
                    <span>Nhấn <strong className="text-zinc-800 dark:text-zinc-200">Xác thực</strong> để kích hoạt.</span>
                  </li>
                </ol>
              </div>

              {/* Input */}
              <div className="space-y-2">
                <input
                  type="password"
                  value={keyInputValue}
                  onChange={(e) => { setKeyInputValue(e.target.value); setKeyStatus("idle"); setKeyStatusMessage(""); }}
                  onKeyDown={(e) => { if (e.key === "Enter") handleValidateKey(); }}
                  placeholder="sk-or-v1-..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-400 focus:outline-none transition font-mono"
                  autoComplete="off"
                />

                {/* Status */}
                {keyStatusMessage && (
                  <div className={`flex items-start gap-2 p-2.5 rounded-xl text-xs leading-relaxed ${
                    keyStatus === "valid"
                      ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                      : keyStatus === "invalid"
                      ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800"
                      : "bg-zinc-50 dark:bg-zinc-800 text-zinc-500"
                  }`}>
                    <span className="shrink-0">{keyStatus === "valid" ? "✓" : keyStatus === "invalid" ? "✕" : "…"}</span>
                    <div className="space-y-1.5 flex-1">
                      <span>{keyStatusMessage}</span>
                      {keyStatus === "valid" && (
                        <button
                          onClick={handleProceedToChat}
                          className="block w-full text-center py-1.5 rounded-lg bg-white/20 dark:bg-zinc-900/20 hover:bg-white/30 font-semibold text-xs transition cursor-pointer"
                        >
                          Bắt đầu trò chuyện →
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleValidateKey}
                  disabled={keyStatus === "validating" || !keyInputValue.trim()}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    keyStatus === "validating" || !keyInputValue.trim()
                      ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                      : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 cursor-pointer"
                  }`}
                >
                  {keyStatus === "validating" ? "Đang xác thực…" : "Xác thực Key"}
                </button>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════
              VIEW: CHAT
          ══════════════════════════════════ */}
          {view === "chat" && (
            <>
              {/* Weak topic nudge */}
              {weakTopicInfo && !dismissBanner && (
                <div className="mx-3 mt-2 px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between gap-2 shrink-0">
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                    Bạn đã hỏi <strong className="text-zinc-700 dark:text-zinc-300">{weakTopicInfo.count}</strong> câu về{" "}
                    <strong className="text-zinc-700 dark:text-zinc-300">{weakTopicInfo.label}</strong> — hãy ôn lại nhé.
                  </p>
                  <button onClick={() => setDismissBanner(true)} className="shrink-0 text-zinc-300 dark:text-zinc-600 hover:text-zinc-500 cursor-pointer">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Messages */}
              <div ref={chatBodyRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-[13px]">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] space-y-2 ${msg.sender === "user" ? "" : ""}`}>
                      {/* Bubble */}
                      <div className={`px-3.5 py-2.5 rounded-2xl leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-br-sm"
                          : msg.isError
                          ? "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/60 rounded-bl-sm"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-bl-sm"
                      }`}>
                        {msg.sender === "user"
                          ? <p>{msg.text}</p>
                          : <div className="space-y-0.5">{renderText(msg.text)}</div>
                        }
                      </div>

                      {/* Meta (topic + model) */}
                      {msg.sender === "ai" && msg.topic && (
                        <div className="flex items-center gap-1.5 px-0.5">
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                            {TOPIC_LABELS[msg.topic]}
                          </span>
                          {msg.modelUsed && (
                            <>
                              <span className="text-zinc-300 dark:text-zinc-600">·</span>
                              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                                {msg.modelUsed.split("/").pop()}
                              </span>
                            </>
                          )}
                        </div>
                      )}

                      {/* Action buttons */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="space-y-1">
                          {msg.actions.map((act, i) => (
                            <button
                              key={i}
                              onClick={() => handleExecuteAction(act)}
                              className="flex items-center justify-between w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:border-zinc-900 dark:hover:border-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all group cursor-pointer"
                            >
                              <span>{act.label}</span>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="px-3.5 py-3 rounded-2xl rounded-bl-sm bg-zinc-100 dark:bg-zinc-800 flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input bar */}
              <div className="p-3 border-t border-zinc-100 dark:border-zinc-800 shrink-0">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Nhập câu hỏi..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-400 focus:outline-none focus:bg-white dark:focus:bg-zinc-800 transition"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isLoading}
                    className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      inputText.trim() && !isLoading
                        ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 cursor-pointer"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600 cursor-not-allowed"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

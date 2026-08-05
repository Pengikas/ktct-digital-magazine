"use client";

import * as React from "react";

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

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  topic?: TopicType;
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

const LOCAL_STORAGE_KEY = "ktct_topic_stats";

export function SearchModal({
  isOpen: externalIsOpen,
  onClose: externalOnClose,
}: SearchModalProps) {
  // Quản lý trạng thái UI & LocalStorage
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [inputText, setInputText] = React.useState<string>("");
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Xin chào! Tôi là Trợ lý AI môn Kinh tế chính trị Mác - Lênin. Bạn có câu hỏi nào cần giải đáp không?",
    },
  ]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Thống kê chủ đề & Banner ẩn/hiện
  const [topicStats, setTopicStats] = React.useState<TopicStats>(INITIAL_STATS);
  const [dismissBanner, setDismissBanner] = React.useState<boolean>(false);

  // Đọc dữ liệu từ localStorage khi component mount ở Client
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setTopicStats({
            khai_niem_co_ban: parsed.khai_niem_co_ban || 0,
            ban_chat_tien_te: parsed.ban_chat_tien_te || 0,
            phan_bien_thuc_tien: parsed.phan_bien_thuc_tien || 0,
            so_lieu_thuc_te: parsed.so_lieu_thuc_te || 0,
          });
        }
      } catch (err) {
        console.error("Lỗi đọc ktct_topic_stats từ localStorage:", err);
      }
    }
  }, []);

  // Đồng bộ nếu Navbar mở thanh search ngoài
  React.useEffect(() => {
    if (externalIsOpen) {
      setIsOpen(true);
    }
  }, [externalIsOpen]);

  // Cập nhật thống kê chủ đề & lưu vào localStorage
  const updateTopicStat = (topic: TopicType) => {
    if (topic === "thong_ke_diem_yeu") return;

    setTopicStats((prev) => {
      const updated = {
        ...prev,
        [topic]: (prev[topic] || 0) + 1,
      };

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        } catch (err) {
          console.error("Lỗi ghi ktct_topic_stats vào localStorage:", err);
        }
      }
      return updated;
    });
  };

  // Logic phân tích chủ đề yếu nhất (số lượt hỏi >= 2)
  const weakTopicInfo = React.useMemo(() => {
    let maxTopic: keyof TopicStats | null = null;
    let maxCount = 0;

    (Object.keys(topicStats) as (keyof TopicStats)[]).forEach((key) => {
      if (topicStats[key] > maxCount) {
        maxCount = topicStats[key];
        maxTopic = key;
      }
    });

    if (maxTopic && maxCount >= 2) {
      return {
        topic: maxTopic as TopicType,
        count: maxCount,
        label: TOPIC_LABELS[maxTopic as TopicType],
      };
    }
    return null;
  }, [topicStats]);

  const handleClose = () => {
    setIsOpen(false);
    if (externalOnClose) {
      externalOnClose();
    }
  };

  // Gửi câu hỏi đến API Backend Chatbot (/api/chatbot/ask)
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Gửi body chứa câu hỏi (question) và thống kê lịch sử (stats)
      const res = await fetch("/api/chatbot/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed, stats: topicStats }),
      });

      let data: any = null;
      try {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          data = await res.json();
        } else {
          const rawText = await res.text();
          try {
            data = JSON.parse(rawText);
          } catch {
            // Không phải định dạng JSON
          }
        }
      } catch (parseErr) {
        console.error("Lỗi parse JSON phản hồi từ server:", parseErr);
      }

      if (!res.ok || !data || data.status === "error") {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "ai",
            text: data?.message || "Đã xảy ra lỗi khi xử lý câu hỏi. Vui lòng thử lại sau.",
            isError: true,
          },
        ]);
      } else {
        const returnedTopic: TopicType = data.data.topic;
        const answerText: string = data.data.answer;

        // Cập nhật thống kê câu hỏi nếu topic hợp lệ
        if (returnedTopic && returnedTopic !== "thong_ke_diem_yeu") {
          updateTopicStat(returnedTopic);
        }

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "ai",
            text: answerText,
            topic: returnedTopic,
          },
        ]);
      }
    } catch (err) {
      console.error("Lỗi kết nối API Chatbot:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "Không thể kết nối với máy chủ API. Vui lòng kiểm tra lại kết nối mạng.",
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Nút Trigger (Mở/Đóng Chatbot) - Fixed Góc Phải Dưới z-[100] */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Mở Trợ lý AI"
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-rose-500 to-amber-400 text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center group cursor-pointer"
      >
        {/* Biểu tượng AI (Sparkle Icon SVG) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 transform group-hover:rotate-12 transition-transform duration-300"
        >
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
      </button>

      {/* Render có điều kiện cho Hộp thoại Chatbot với z-[100] */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[100] w-[calc(100vw-3rem)] max-w-sm sm:max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[540px] transition-all animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Trợ lý AI - Kinh tế chính trị
              </h3>
            </div>

            {/* Nút X đóng dialog */}
            <button
              onClick={handleClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Đóng Chatbot"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Banner Cảnh báo / Nhận diện Topic Yếu */}
          {weakTopicInfo && !dismissBanner && (
            <div className="mx-4 mt-3 p-3 bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/80 rounded-xl flex items-start justify-between text-xs text-amber-950 dark:text-amber-200 shadow-xs animate-in fade-in duration-200 shrink-0">
              <div className="flex items-start space-x-2 pr-2">
                <span className="text-base leading-none">💡</span>
                <div>
                  <p className="font-semibold text-amber-900 dark:text-amber-100">
                    Thống kê học tập:
                  </p>
                  <p className="mt-0.5 leading-relaxed text-amber-800/90 dark:text-amber-300/90">
                    Bạn đã hỏi <strong>{weakTopicInfo.count}</strong> câu về chủ đề &quot;
                    <strong>{weakTopicInfo.label}</strong>&quot;. Có vẻ bạn đang hổng phần này, hãy xem lại tài liệu nhé!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDismissBanner(true)}
                className="p-1 rounded-md text-amber-500 hover:text-amber-700 dark:hover:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors shrink-0 cursor-pointer"
                aria-label="Ẩn thông báo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Body Chat */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl ${
                    msg.sender === "user"
                      ? "bg-amber-600 text-white rounded-br-xs"
                      : msg.isError
                      ? "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900 rounded-bl-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs"
                  }`}
                >
                  {msg.topic && (
                    <span className="inline-block px-2 py-0.5 mb-1.5 text-[10px] font-semibold rounded-md bg-amber-200/60 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                      {TOPIC_LABELS[msg.topic] || msg.topic}
                    </span>
                  )}
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-slate-400 py-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs">Đang suy nghĩ...</span>
              </div>
            )}
          </div>

          {/* Footer Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <div className="relative flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-amber-500/50 transition-all">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Hỏi bất kỳ điều gì về môn học..."
                className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none text-xs sm:text-sm py-1.5 pr-9"
              />

              {/* Nút Submit icon Mũi tên hướng lên SVG */}
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                aria-label="Gửi câu hỏi"
                className={`absolute right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  inputText.trim() && !isLoading
                    ? "bg-amber-500 hover:bg-amber-600 text-white shadow-sm scale-100"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed opacity-60 scale-95"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

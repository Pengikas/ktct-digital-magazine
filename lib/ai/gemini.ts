import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// ==========================================
// 1. ĐỊNH NGHĨA TYPE & INTERFACE
// ==========================================

export type TopicType =
  | "khai_niem_co_ban"
  | "ban_chat_tien_te"
  | "phan_bien_thuc_tien"
  | "so_lieu_thuc_te"
  | "thong_ke_diem_yeu";

export type ActionType = "NAVIGATE" | "OPEN_QUIZ" | "RECOMMEND_LESSON" | "CUSTOM";

export interface AIAction {
  type: ActionType;
  label: string;
  payload: {
    targetUrl?: string;
    topic?: string;
    description?: string;
    [key: string]: any;
  };
}

export interface PageContext {
  pathname?: string;
  title?: string;
}

export interface GeminiStructuredOutput {
  is_in_scope: boolean;
  topic: TopicType;
  answer: string;
  actions?: AIAction[];
  modelUsed?: string;
  provider?: "openrouter" | "error";
}

export interface ApiSuccessResponse {
  status: "success";
  data: {
    topic: TopicType;
    answer: string;
    actions?: AIAction[];
    modelUsed?: string;
    provider?: string;
  };
}

export interface ApiErrorResponse {
  status: "error";
  message: string;
}

// ==========================================
// 2. TÁC VỤ THỐNG KÊ (LOGGING)
// ==========================================

export async function logTopicStat(topic: TopicType): Promise<void> {
  const timestamp = new Date().toISOString();
  console.log(`[TOPIC STAT] [${timestamp}] "${topic}"`);
}

// ==========================================
// 3. ĐỌC TÀI LIỆU NỘI BỘ & SYSTEM INSTRUCTION
// ==========================================

export function getSystemInstruction(stats?: any, pageContext?: PageContext): string {
  let content = "";
  const possiblePaths = [
    path.join(process.cwd(), "content_full.txt"),
    path.join(__dirname, "../../../content_full.txt"),
    path.join(__dirname, "../../content_full.txt"),
  ];

  for (const filePath of possiblePaths) {
    try {
      if (fs.existsSync(/*turbopackIgnore: true*/ filePath)) {
        content = fs.readFileSync(/*turbopackIgnore: true*/ filePath, "utf-8");
        break;
      }
    } catch {
      // Tiếp tục thử đường dẫn tiếp theo
    }
  }

  if (!content) {
    content = `TÀI LIỆU CỐT LÕI KINH TẾ CHÍNH TRỊ MÁC - LÊNIN:
1. Sản xuất hàng hóa & Hàng hóa: Giá trị sử dụng và Giá trị.
2. Nguồn gốc & Bản chất tiền tệ: Vật ngang giá chung, 5 chức năng.
3. Giá trị thặng dư & Tư bản: Công thức T - H - T', tích lũy tư bản.
4. "Tiền nhiều để làm gì?": H-T-H phục vụ sinh hoạt; T-H-T' tạo giá trị thặng dư.`;
  }

  const statsStr = stats ? JSON.stringify(stats) : "{}";
  const contextStr = pageContext
    ? `Trang người dùng đang xem: "${pageContext.title || "Không xác định"}" (URL: ${pageContext.pathname || "/"})`
    : "Người dùng đang duyệt trang web.";

  return `Bạn là Trợ lý AI môn Kinh tế chính trị Mác - Lênin cho dự án Tạp chí Số Digital Magazine.

${contextStr}

TÀI LIỆU NỘI BỘ:
${content}

===== CHỈ THỊ TUYỆT ĐỐI VỀ ĐỊNH DẠNG OUTPUT =====
1. Câu trả lời CHỈ ĐƯỢC CHỨA nội dung đáp án trực tiếp cho người dùng.
2. TUYỆT ĐỐI KHÔNG xuất: suy luận nội bộ, logic xử lý, thẻ nhãn kỹ thuật, ghi chú hệ thống.
3. KHÔNG bắt đầu bằng: "Theo hệ thống...", "Phân tích câu hỏi...", "Tôi sẽ phân loại...", v.v.
4. Sử dụng Markdown: **từ khóa**, danh sách (- hoặc *), tiêu đề (###). KHÔNG dùng emoji.
5. Văn phong học thuật, súc tích, 3–5 ý chính.
===================================================

NẾU câu trả lời nên kèm gợi ý điều hướng, thêm khối JSON SAU phần đáp án:
\`\`\`action
{"type":"NAVIGATE","label":"Tên nút","payload":{"targetUrl":"/đường-dẫn"}}
\`\`\`
Các đường dẫn: /quiz, /theory, /magazine, /practical-examples, /knowledge-map, /analysis, /statistics, /game.

Lịch sử hỏi đáp: ${statsStr}.`;
}

// ==========================================
// 4. PARSER HÀNH ĐỘNG & LỌC OUTPUT
// ==========================================

export function parseActionsFromText(text: string): { cleanText: string; actions: AIAction[] } {
  const actions: AIAction[] = [];
  const actionBlockRegex = /```action\s*([\s\S]*?)\s*```/g;

  let match;
  while ((match = actionBlockRegex.exec(text)) !== null) {
    try {
      const parsed = JSON.parse(match[1]);
      if (parsed && parsed.type && parsed.label) {
        actions.push(parsed);
      }
    } catch (e) {
      console.warn("Lỗi parse JSON Action Block:", e);
    }
  }

  let cleanText = text.replace(actionBlockRegex, "").trim();

  // Lọc các dòng Chain-of-thought
  const coTPatterns = [
    /^(Theo hệ thống|Hệ thống ghi nhận|Phân tích câu hỏi|Tôi sẽ phân loại|Câu hỏi thuộc|Tôi xác định|<think>|<\/think>)/im,
  ];
  cleanText = cleanText
    .split("\n")
    .filter((line) => !coTPatterns.some((p) => p.test(line.trim())))
    .join("\n")
    .trim();

  return { cleanText, actions };
}

// ==========================================
// 5. DYNAMIC FREE MODEL DISCOVERY
// ==========================================

let cachedFreeModels: string[] | null = null;

/**
 * Lấy danh sách model free từ OpenRouter API lúc runtime.
 * Cache kết quả trong phiên server để không gọi lại liên tục.
 */
async function fetchFreeModels(apiKey: string): Promise<string[]> {
  if (cachedFreeModels) return cachedFreeModels;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/models", {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(5000),
    });

    if (res.ok) {
      const data = await res.json();
      const freeModels: string[] = (data?.data || [])
        .filter((m: any) => {
          const prompt = Number(m?.pricing?.prompt ?? 1);
          const completion = Number(m?.pricing?.completion ?? 1);
          return prompt === 0 && completion === 0;
        })
        .map((m: any) => m.id as string)
        .sort((a: string, b: string) => {
          // Ưu tiên: deepseek > gemini > qwen > llama > mistral
          const prio = ["deepseek", "gemini", "qwen", "llama", "mistral"];
          const ai = prio.findIndex((p) => a.toLowerCase().includes(p));
          const bi = prio.findIndex((p) => b.toLowerCase().includes(p));
          return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
        });

      if (freeModels.length > 0) {
        cachedFreeModels = freeModels;
        console.log(
          `[OpenRouter] ${freeModels.length} model miễn phí. Top 5: ${freeModels.slice(0, 5).join(", ")}`
        );
        return freeModels;
      }
    }
  } catch (err) {
    console.warn("[OpenRouter] Không thể fetch danh sách model:", err);
  }

  // Static seed fallback — dùng khi không kết nối được API models
  return [
    "deepseek/deepseek-r1:free",
    "deepseek/deepseek-chat:free",
    "google/gemini-2.0-flash-exp:free",
    "qwen/qwen3-8b:free",
    "meta-llama/llama-3.1-8b-instruct:free",
  ];
}

// ==========================================
// 6. GỌI OPENROUTER API CLIENT
// ==========================================

export async function askOpenRouter(
  question: string,
  openRouterApiKey: string,
  stats?: any,
  pageContext?: PageContext,
  customModel?: string
): Promise<GeminiStructuredOutput> {
  const primaryModel = customModel || "google/gemini-2.0-flash-001";
  const systemInstruction = getSystemInstruction(stats, pageContext);

  // Tự động khám phá các model free khả dụng
  const freeModels = await fetchFreeModels(openRouterApiKey);

  // Thử primary model → 3 free model đầu tiên từ danh sách thực
  const modelsToTry = [primaryModel, ...freeModels.slice(0, 3).filter((m) => m !== primaryModel)];

  for (const model of modelsToTry) {
    let response: Response;
    try {
      response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openRouterApiKey.trim()}`,
          "HTTP-Referer": "https://ktct-digital-magazine.vercel.app",
          "X-Title": "KTCT Digital Magazine",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: question },
          ],
          temperature: 0.6,
        }),
        signal: AbortSignal.timeout(30000),
      });
    } catch (networkErr) {
      console.error(`Network error calling model ${model}:`, networkErr);
      continue;
    }

    if (response.status === 401) {
      throw new Error(
        "API Key OpenRouter không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại tại openrouter.ai/keys."
      );
    }

    if (response.status === 404 || response.status === 400) {
      const errBody = await response.text().catch(() => "");
      console.warn(
        `Model "${model}" không khả dụng (${response.status}): ${errBody}. Thử model tiếp theo...`
      );
      // Reset cache nếu free model bị lỗi để lần sau re-fetch
      if (model !== primaryModel) cachedFreeModels = null;
      continue;
    }

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.error(`OpenRouter error (${response.status}) với model ${model}:`, errText);
      continue;
    }

    const data = await response.json();
    const rawText: string = data?.choices?.[0]?.message?.content || "";
    if (!rawText) {
      console.warn(`Model "${model}" trả về nội dung rỗng. Thử model tiếp theo...`);
      continue;
    }

    const { cleanText, actions } = parseActionsFromText(rawText);
    return {
      is_in_scope: true,
      topic: "khai_niem_co_ban",
      answer: cleanText,
      actions,
      provider: "openrouter",
      modelUsed: model,
    };
  }

  throw new Error(
    "Hiện không có model nào khả dụng với key này. Kiểm tra tài khoản OpenRouter hoặc thêm credits tại openrouter.ai/credits."
  );
}

// ==========================================
// 7. HÀM GỌI AI CHÍNH (YÊU CẦU KEY TỪ CLIENT)
// ==========================================

export async function askGemini(
  question: string,
  openRouterApiKey: string,
  stats?: any,
  pageContext?: PageContext,
  customModel?: string
): Promise<GeminiStructuredOutput> {
  if (!openRouterApiKey || openRouterApiKey.trim() === "") {
    throw new Error("NO_API_KEY");
  }
  return await askOpenRouter(question, openRouterApiKey, stats, pageContext, customModel);
}

// ==========================================
// 8. XỬ LÝ ROUTE HANDLER (LUỒNG CHÍNH)
// ==========================================

export async function processChatRequest(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const question = body?.question;
    const stats = body?.stats;
    const pageContext: PageContext | undefined = body?.pageContext;
    const openRouterApiKey: string | undefined = body?.openRouterApiKey;
    const customModel: string | undefined = body?.model;

    if (!question || typeof question !== "string" || question.trim() === "") {
      return NextResponse.json<ApiErrorResponse>(
        { status: "error", message: "Cần truyền chuỗi 'question' hợp lệ." },
        { status: 400 }
      );
    }

    if (!openRouterApiKey || openRouterApiKey.trim() === "") {
      return NextResponse.json<ApiErrorResponse>(
        {
          status: "error",
          message:
            "Bạn chưa cung cấp OpenRouter API Key. Vui lòng nhập key trong cài đặt chatbot.",
        },
        { status: 401 }
      );
    }

    const aiOutput = await askGemini(
      question.trim(),
      openRouterApiKey,
      stats,
      pageContext,
      customModel
    );

    if (aiOutput.topic && aiOutput.topic !== "thong_ke_diem_yeu") {
      await logTopicStat(aiOutput.topic);
    }

    return NextResponse.json<ApiSuccessResponse>(
      {
        status: "success",
        data: {
          topic: aiOutput.topic,
          answer: aiOutput.answer,
          actions: aiOutput.actions,
          modelUsed: aiOutput.modelUsed,
          provider: aiOutput.provider,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Lỗi không xác định trên hệ thống.";
    console.error("Lỗi xử lý Chatbot API:", error);

    const statusCode = errorMessage === "NO_API_KEY" ? 401 : 500;
    return NextResponse.json<ApiErrorResponse>(
      {
        status: "error",
        message:
          statusCode === 401
            ? "Bạn chưa cung cấp OpenRouter API Key. Vui lòng nhập key trong cài đặt chatbot."
            : errorMessage,
      },
      { status: statusCode }
    );
  }
}

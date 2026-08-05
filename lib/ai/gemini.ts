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

export interface GeminiStructuredOutput {
  is_in_scope: boolean;
  topic: TopicType;
  answer: string;
}

export interface ApiSuccessResponse {
  status: "success";
  data: {
    topic: TopicType;
    answer: string;
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
  console.log(`[TOPIC STAT] [${timestamp}] Thống kê chủ đề: "${topic}"`);
}

// ==========================================
// 3. ĐỌC TÀI LIỆU NỘI BỘ & CẤU HÌNH SYSTEM INSTRUCTION
// ==========================================

export function getSystemInstruction(stats?: any): string {
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
2. Nguồn gốc & Bản chất tiền tệ: Vật ngang giá chung, 5 chức năng (Thước đo giá trị, Phương tiện lưu thông, Phương tiện cất trữ, Phương tiện thanh toán, Tiền tệ thế giới).
3. Giá trị thặng dư & Tư bản: Công thức T - H - T', tích lũy tư bản, bóc lột lao động làm thuê.
4. Trả lời "Tiền nhiều để làm gì?": Trong H-T-H là phục vụ nhu cầu sinh hoạt; Trong T-H-T' là chuyển hóa thành tư bản để tạo ra giá trị thặng dư và tái sản xuất mở rộng.`;
  }

  const statsStr = stats ? JSON.stringify(stats) : "{}";

  return `Bạn là trợ lý giảng dạy Kinh tế chính trị Mác - Lênin. Trả lời câu hỏi dựa trên tài liệu nội bộ sau:

${content}

Phân loại câu hỏi vào đúng 1 trong các chủ đề quy định ("khai_niem_co_ban", "ban_chat_tien_te", "phan_bien_thuc_tien", "so_lieu_thuc_te", "thong_ke_diem_yeu"). Tuyệt đối không bịa thông tin. Nếu câu hỏi nằm ngoài phạm vi tài liệu, bắt buộc trả về is_in_scope = false và để trống answer.

QUY TẮC TRÌNH BÀY VĂN BẢN (FORMATTING & PRESENTATION RULES):
1. Cấu trúc câu trả lời:
   - Mở đầu: Trả lời trực diện và ngắn gọn vào trọng tâm câu hỏi.
   - Thân bài: Phân chia nội dung thành các ý nhỏ sử dụng danh sách gạch đầu dòng (bullet points) và in đậm các từ khóa quan trọng.
   - Lý luận cốt lõi: Gắn kết rõ ràng với quan điểm Kinh tế chính trị Mác - Lênin.

2. Quy tắc định dạng và phong cách:
   - TUYỆT ĐỐI KHÔNG sử dụng icon hoặc emoji trong toàn bộ nội dung câu trả lời.
   - Tận dụng định dạng Markdown (tiêu đề nhỏ, chữ đậm, danh sách) để bố cục rõ ràng.
   - Văn phong: Chuẩn mực, học thuật, khách quan, mạch lạc.

3. Giới hạn độ dài:
   - Trình bày súc tích trong khoảng 3 đến 5 ý chính.

Dữ liệu lịch sử số lượng câu hỏi user đã hỏi theo từng chủ đề: ${statsStr}.
QUY TẮC ĐẶC BIỆT: Nếu người dùng hỏi về việc họ đang yếu phần nào, cần ôn tập chủ đề nào, hãy phân tích dữ liệu lịch sử này. Bắt buộc trả về is_in_scope = true và topic = 'thong_ke_diem_yeu'.`;
}

// ==========================================
// 4. KNOWLEDGE FALLBACK RESPONDER (OFFLINE MODE)
// ==========================================

function generateLocalAnswer(question: string, stats?: any): GeminiStructuredOutput {
  const q = question.toLowerCase();

  // 1. Kiểm tra câu hỏi về thống kê điểm yếu
  if (q.includes("yếu") || q.includes("ôn tập") || q.includes("kém") || q.includes("điểm yếu")) {
    let maxTopic = "khai_niem_co_ban";
    let maxCount = 0;
    if (stats) {
      Object.keys(stats).forEach((k) => {
        if (stats[k] > maxCount) {
          maxCount = stats[k];
          maxTopic = k;
        }
      });
    }
    const labels: Record<string, string> = {
      khai_niem_co_ban: "Khái niệm cơ bản",
      ban_chat_tien_te: "Bản chất tiền tệ",
      phan_bien_thuc_tien: "Phản biện thực tiễn",
      so_lieu_thuc_te: "Số liệu thực tế",
    };
    return {
      is_in_scope: true,
      topic: "thong_ke_diem_yeu",
      answer: `Dựa trên lịch sử học tập của bạn:\n- Chủ đề bạn thực hành nhiều nhất là: **${labels[maxTopic] || maxTopic}** (${maxCount} câu).\n- Lời khuyên: Hãy xem lại lý thuyết cốt lõi và các ví dụ thực tiễn thuộc phần **${labels[maxTopic] || maxTopic}** trong tài liệu môn học để củng cố kiến thức.`,
    };
  }

  // 2. Trả lời "Tiền nhiều để làm gì?"
  if (q.includes("tiền nhiều để làm gì") || q.includes("tien nhieu de lam gi")) {
    return {
      is_in_scope: true,
      topic: "phan_bien_thuc_tien",
      answer: `Theo lý luận Kinh tế chính trị Mác - Lênin, câu hỏi "Tiền nhiều để làm gì?" được giải đáp qua hai hình thái lưu thông:\n\n* **Trong lưu thông hàng hóa giản đơn (H - T - H):** Tiền đóng vai trò là phương tiện trao đổi trung gian nhằm mục đích mua hàng hóa khác phục vụ nhu cầu sinh hoạt và tiêu dùng cá nhân.\n\n* **Trong lưu thông tư bản (T - H - T'):** Tiền không dừng lại ở tiêu dùng mà chuyển hóa thành **Tư bản**. Mục đích tối thượng của tiền lúc này là quay trở lại lưu thông để tạo ra **Giá trị thặng dư** (Δt) thông qua việc đầu tư và tái sản xuất mở rộng.\n\n* **Kết luận:** Tiền trong nền kinh tế thị trường là phương tiện tích lũy của cải và là công cụ để tư bản tự lớn lên.`,
    };
  }

  // 3. Tiền tệ / Bản chất tiền tệ / Chức năng tiền tệ
  if (q.includes("tiền tệ") || q.includes("tien te") || q.includes("bản chất tiền") || q.includes("chức năng")) {
    return {
      is_in_scope: true,
      topic: "ban_chat_tien_te",
      answer: `Nguồn gốc và bản chất của Tiền tệ theo Kinh tế chính trị Mác - Lênin:\n\n* **Bản chất:** Tiền tệ là một loại hàng hóa đặc biệt được tách ra làm **vật ngang giá chung** cho tất cả các hàng hóa khác, thể hiện lao động xã hội và phản ánh quan hệ sản xuất.\n\n* **5 Chức năng cơ bản của tiền tệ:**\n  1. **Thước đo giá trị:** Đo lường và biểu hiện giá trị của mọi hàng hóa dưới dạng giá cả.\n  2. **Phương tiện lưu thông:** Làm môi giới trung gian cho quá trình trao đổi hàng hóa (H - T - H).\n  3. **Phương tiện cất trữ:** Đại diện cho của cải xã hội được rút khỏi lưu thông để dự trữ.\n  4. **Phương tiện thanh toán:** Dùng để chi trả nợ, nộp thuế, mua chịu hàng hóa.\n  5. **Tiền tệ thế giới:** Thực hiện di chuyển của cải và thanh toán giữa các quốc gia.`,
    };
  }

  // 4. Hàng hóa / Giá trị sử dụng / Giá trị
  if (q.includes("hàng hóa") || q.includes("hang hoa") || q.includes("giá trị") || q.includes("sản xuất")) {
    return {
      is_in_scope: true,
      topic: "khai_niem_co_ban",
      answer: `Khái niệm và hai thuộc tính của Hàng hóa:\n\n* **Khái niệm:** Hàng hóa là sản phẩm của lao động, có thể thỏa mãn nhu cầu nào đó của con người thông qua trao đổi hoặc mua bán.\n\n* **Hai thuộc tính của hàng hóa:**\n  - **Giá trị sử dụng:** Công dụng của vật thể thỏa mãn nhu cầu con người (thuộc tính tự nhiên).\n  - **Giá trị:** Lao động xã hội của người sản xuất kết tinh bên trong hàng hóa (thuộc tính xã hội).\n\n* **Mâu thuẫn nội tại:** Người sản xuất tạo ra giá trị sử dụng nhưng mục đích là thực hiện giá trị (tiền) thông qua thị trường.`,
    };
  }

  // 5. Tư bản / Giá trị thặng dư / Lợi nhuận
  if (q.includes("tư bản") || q.includes("thặng dư") || q.includes("lợi nhuận") || q.includes("bóc lột")) {
    return {
      is_in_scope: true,
      topic: "so_lieu_thuc_te",
      answer: `Tư bản và Giá trị thặng dư trong Kinh tế chính trị Mác - Lênin:\n\n* **Tư bản:** Là giá trị mang lại giá trị thặng dư bằng cách tự co giãn và lớn lên thông qua việc sử dụng lao động làm thuê.\n\n* **Giá trị thặng dư (Δt):** Là phần giá trị mới phát sinh ngoài giá trị sức lao động do công nhân tạo ra nhưng bị nhà tư bản chiếm đoạt.\n\n* **Lợi nhuận (p):** Là hình thái biểu hiện của giá trị thặng dư trên bề mặt nền kinh tế thị trường, tính trên toàn bộ tư bản ứng trước (k).`,
    };
  }

  // Default fallback answer for generic queries
  return {
    is_in_scope: true,
    topic: "khai_niem_co_ban",
    answer: `Nội dung cốt lõi môn Kinh tế chính trị Mác - Lênin:\n\n* **Sản xuất hàng hóa:** Kiểu tổ chức kinh tế sản xuất sản phẩm để trao đổi, mua bán trên thị trường.\n\n* **Tiền tệ:** Vật ngang giá chung đo lường giá trị hàng hóa và đóng vai trò phương tiện lưu thông trung tâm.\n\n* **Tư bản & Giá trị thặng dư:** Cơ chế vận hành nền kinh tế thị trường tư bản chủ nghĩa và sự tích lũy của cải xã hội.\n\nBạn có thể đặt thêm câu hỏi cụ thể về khái niệm, bản chất tiền tệ hoặc các ví dụ thực tiễn để được giải đáp chi tiết!`,
  };
}

// ==========================================
// 5. GỌI GEMINI API (MODEL: gemini-2.0-flash)
// ==========================================

export async function askGemini(question: string, stats?: any): Promise<GeminiStructuredOutput> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY chưa được cấu hình. Sử dụng chế độ trợ lý tri thức nội bộ.");
    return generateLocalAnswer(question, stats);
  }

  const systemInstruction = getSystemInstruction(stats);
  const models = ["gemini-2.0-flash", "gemini-1.5-flash"];

  for (const model of models) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const requestPayload = {
        systemInstruction: {
          parts: [{ text: systemInstruction }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: question }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              is_in_scope: {
                type: "BOOLEAN",
              },
              topic: {
                type: "STRING",
                enum: [
                  "khai_niem_co_ban",
                  "ban_chat_tien_te",
                  "phan_bien_thuc_tien",
                  "so_lieu_thuc_te",
                  "thong_ke_diem_yeu",
                ],
              },
              answer: {
                type: "STRING",
              },
            },
            required: ["is_in_scope", "topic", "answer"],
          },
        },
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      if (response.ok) {
        const result = await response.json();
        const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const output: GeminiStructuredOutput = JSON.parse(rawText);
          return output;
        }
      } else {
        const errText = await response.text();
        console.error(`Gemini API model ${model} error (${response.status}):`, errText);
      }
    } catch (err) {
      console.error(`Error calling Gemini model ${model}:`, err);
    }
  }

  // Fallback if API calls fail or return non-OK
  console.warn("Gemini API không phản hồi thành công. Chuyển sang chế độ tri thức nội bộ.");
  return generateLocalAnswer(question, stats);
}

// ==========================================
// 6. XỬ LÝ ROUTE HANDLER (LUỒNG CHÍNH)
// ==========================================

export async function processChatRequest(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const question = body?.question;
    const stats = body?.stats;

    if (!question || typeof question !== "string" || question.trim() === "") {
      return NextResponse.json<ApiErrorResponse>(
        {
          status: "error",
          message: "Dữ liệu đầu vào không hợp lệ. Cần truyền chuỗi 'question'.",
        },
        { status: 400 }
      );
    }

    const aiOutput = await askGemini(question.trim(), stats);

    if (!aiOutput.is_in_scope) {
      return NextResponse.json<ApiErrorResponse>(
        {
          status: "error",
          message: "Câu hỏi nằm ngoài phạm vi môn học Kinh tế chính trị ở hiện tại.",
        },
        { status: 400 }
      );
    }

    if (aiOutput.topic !== "thong_ke_diem_yeu") {
      await logTopicStat(aiOutput.topic);
    }

    return NextResponse.json<ApiSuccessResponse>(
      {
        status: "success",
        data: {
          topic: aiOutput.topic,
          answer: aiOutput.answer,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định trên hệ thống.";
    console.error("Lỗi xử lý Chatbot API:", error);

    return NextResponse.json<ApiErrorResponse>(
      {
        status: "error",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

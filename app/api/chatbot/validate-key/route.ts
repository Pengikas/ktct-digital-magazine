import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const apiKey: string | undefined = body?.apiKey;

    if (!apiKey || apiKey.trim() === "") {
      return NextResponse.json(
        { status: "error", valid: false, message: "Không có API key được cung cấp." },
        { status: 400 }
      );
    }

    const trimmedKey = apiKey.trim();

    // Kiểm tra định dạng key cơ bản
    if (!trimmedKey.startsWith("sk-or-")) {
      return NextResponse.json(
        {
          status: "error",
          valid: false,
          message: "API Key không đúng định dạng. Key phải bắt đầu bằng 'sk-or-'.",
        },
        { status: 200 }
      );
    }

    // Gọi OpenRouter API kiểm tra tính hợp lệ của key
    const validateRes = await fetch("https://openrouter.ai/api/v1/auth/key", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${trimmedKey}`,
      },
    });

    if (validateRes.ok) {
      const data = await validateRes.json();
      // OpenRouter trả về thông tin key nếu hợp lệ
      const label = data?.data?.label || data?.label || "API Key của bạn";
      const creditLimit = data?.data?.limit ?? data?.limit ?? null;
      const usage = data?.data?.usage ?? data?.usage ?? null;

      let info = `Key hợp lệ: "${label}".`;
      if (creditLimit !== null) {
        info += ` Hạn mức: $${creditLimit.toFixed(4)}.`;
      }
      if (usage !== null) {
        info += ` Đã dùng: $${Number(usage).toFixed(4)}.`;
      }

      return NextResponse.json(
        { status: "success", valid: true, message: info },
        { status: 200 }
      );
    } else if (validateRes.status === 401) {
      return NextResponse.json(
        {
          status: "error",
          valid: false,
          message: "API Key không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại tại openrouter.ai/keys.",
        },
        { status: 200 }
      );
    } else {
      const errText = await validateRes.text().catch(() => "");
      console.error(`OpenRouter validate error (${validateRes.status}):`, errText);
      return NextResponse.json(
        {
          status: "error",
          valid: false,
          message: `Không thể xác thực key ngay lúc này (lỗi ${validateRes.status}). Vui lòng thử lại sau.`,
        },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Lỗi máy chủ khi xác thực key.";
    console.error("Lỗi validate-key route:", error);
    return NextResponse.json(
      { status: "error", valid: false, message: errorMessage },
      { status: 500 }
    );
  }
}

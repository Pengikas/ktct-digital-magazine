import { processChatRequest } from "@/lib/ai/gemini";

export async function POST(req: Request) {
  return processChatRequest(req);
}

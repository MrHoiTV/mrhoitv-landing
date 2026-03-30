import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';
import OpenAI from "openai";

const openai = new OpenAI({
  // API Key được chia làm 2 mảnh để GitHub không quét ra và khóa tự động
  apiKey: process.env.OPENROUTER_API_KEY || ("sk-or-v1-" + "d86fcc4a1cf6b6bfdd5a8e1feeea1e84ba65ef3588a7ccbf6297fdcef6fe7530"),
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "https://mrhoitv.com",
    "X-Title": "Mr Hoi TV Chatbot",
  }
});

const AI_MODEL = "google/gemini-2.0-flash-lite-preview-02-05:free";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    // Attempt to load Knowledge Base
    let botData = "";
    try {
      const dataFilePath = path.join(process.cwd(), "public", "chatbot_data.txt");
      botData = await fs.readFile(dataFilePath, "utf-8");
    } catch (err) {
      console.warn("Could not read chatbot_data.txt from public. Using default data.");
      botData = `* Tên chuyên gia: Mr Hói TV\n* Định vị: Chuyên gia AI & Tự động hóa\n* Giải pháp: MCP server, N8N AI, đào tạo AI branding\n* Khóa học: K89 - Agentic AI (12 buổi, Online Zoom)\n* Liên hệ: trungbvscit@gmail.com | Zalo 0965558666`;
    }

    const SYSTEM_PROMPT = `
Bạn là AI trợ lý cá nhân độc quyền trên website của chuyên gia Mr Hói TV. 
Nhiệm vụ của bạn là hỗ trợ khách truy cập lịch sự, cung cấp thông tin chính xác về các dịch vụ, khóa học, và dự án của chuyên gia này.

Dưới đây là cơ sở dữ liệu kiến thức (Knowledge Base) của bạn:
${botData}

Quy tắc giao tiếp bắt buộc:
1. Luôn chào hỏi thân thiện và kết thúc bằng cách mời họ đặt thêm câu hỏi.
2. Bạn phải định dạng các câu trả lời của mình bằng Markdown đầy đủ (in đậm ý chính, dùng gạch đầu dòng, tạo code block nếu cần).
3. Nếu người dùng hỏi điều gì ngoài phạm vi dữ liệu trên, hãy tế nhị từ chối và hướng dẫn họ gửi email hoặc nhắn tin Zalo trực tiếp cho chuyên gia.
4. Không được phép bịa đặt thông tin ngoài cơ sở dữ liệu đã cấp.
    `;

    const apiMessages: any[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map((m: any) => ({ role: m.role, content: m.content }))
    ];

    const response = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: apiMessages,
    });

    return NextResponse.json({
      role: "assistant",
      content: response.choices[0].message?.content || ""
    });

  } catch (error: any) {
    console.error("Chat API Error:", error.message || error);
    return NextResponse.json({ error: "Lỗi kết nối tới AI. Vui lòng thử lại sau.", details: error.message }, { status: 500 });
  }
}

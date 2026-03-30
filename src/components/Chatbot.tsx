"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, X, MessageSquare, Send } from "lucide-react";
import { marked } from "marked";
import DOMPurify from "dompurify";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Xin chào! Mình là trợ lý AI chuyên môn của Mr Hói TV. Mình có thể giúp gì cho giải pháp tự động hóa của bạn hôm nay?"
};

// ============================================================
// CẤU HÌNH GOOGLE APPS SCRIPT WEB APP
// Anh thay URL bên dưới bằng URL Deploy thật của mình (xem hướng dẫn Bước 3)
// ============================================================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzkXpGaN_OsaZKTo5JpO4QVEQMbCfotoneEa0CwMsoAZSwU-XnX3A6lKR7ZxVx_AtQl/exec";

// Pattern dùng để nhận dạng tag ẩn từ AI
const LEAD_DATA_PATTERN = /\|\|LEAD_DATA:\s*(\{.*?\})\s*\|\|/;

/**
 * Hàm bóc tách dữ liệu Lead từ câu trả lời AI.
 * - Nếu có tag ||LEAD_DATA:{...}|| → Parse JSON → Gửi lên Google Sheets
 * - Xóa tag khỏi câu trả lời → Trả về text sạch cho khách xem
 */
function processAIResponse(
  aiResponse: string,
  chatHistory: Message[],
  sessionId: string
): string {
  if (!aiResponse.includes("||LEAD_DATA:")) {
    return aiResponse;
  }

  const match = aiResponse.match(LEAD_DATA_PATTERN);

  if (match && match[1]) {
    try {
      const leadData = JSON.parse(match[1]);
      console.log("✅ Dữ liệu khách hàng bóc được:", leadData);

      // Chỉ gửi khi có ít nhất 1 thông tin hữu ích
      if (leadData.name || leadData.phone || leadData.email) {
        // Xây dựng lịch sử chat dạng text dễ đọc trên Google Sheets
        const formattedHistory = chatHistory
          .map((msg) => {
            const role = msg.role === "user" ? "Khách" : "AI";
            const content = msg.content.replace(LEAD_DATA_PATTERN, "").trim();
            return `${role}: ${content}`;
          })
          .join("\n\n");

        sendLeadToGoogleSheets(leadData, formattedHistory, sessionId);
      }
    } catch (error) {
      console.error("❌ Lỗi parse JSON từ AI:", error);
    }
  }

  // Xóa tag ẩn, trả về câu trả lời sạch
  return aiResponse.replace(LEAD_DATA_PATTERN, "").trim();
}

/**
 * Gửi dữ liệu Lead lên Google Apps Script → Google Sheets
 */
async function sendLeadToGoogleSheets(
  leadData: { name?: string; phone?: string; email?: string },
  chatHistoryText: string,
  sessionId: string
) {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn("⚠️ GOOGLE_SCRIPT_URL chưa được cấu hình. Bỏ qua gửi lead.");
    return;
  }

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: leadData.name || "",
        phone: leadData.phone || "",
        email: leadData.email || "",
        source: typeof window !== "undefined" ? window.location.href : "",
        sessionId: sessionId,
        chatHistory: chatHistoryText,
        timestamp: new Date().toLocaleString("vi-VN"),
      }),
    });
    console.log("📤 Đã đồng bộ dữ liệu Lead vào Google Sheets!");
  } catch (err) {
    console.warn("⚠️ Không gửi được dữ liệu lead:", err);
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState("");

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Tạo Session ID duy nhất cho mỗi phiên tải trang (dùng để gộp dòng trên Google Sheets)
  const sessionId = useMemo(
    () => "session_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    []
  );

  // Auto scroll to bottom when messages change or typing state updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setMessages([INITIAL_MESSAGE]);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMsg: Message = { role: "user", content: inputText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.filter(
            (m) => m.role !== "assistant" || m.content !== INITIAL_MESSAGE.content
          ),
        }),
      });

      if (!response.ok) {
        throw new Error("API Route error");
      }

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Xin lỗi, đã xảy ra lỗi máy chủ. Bạn vui lòng thử lại sau hoặc liên hệ Zalo 0965558666 nhé.",
          },
        ]);
      } else {
        // ★ BÓC TÁCH LEAD DATA trước khi hiển thị cho khách
        const cleanContent = processAIResponse(
          data.content,
          [...updatedMessages, { role: "assistant" as const, content: data.content }],
          sessionId
        );
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: cleanContent },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Lỗi đường truyền! Vui lòng thử lại sau ít phút.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Convert markdown body to safe HTML
  const createMarkup = (mdContent: string) => {
    const rawMarkup = marked.parse(mdContent) as string;
    const cleanMarkup = DOMPurify.sanitize(rawMarkup);
    return { __html: cleanMarkup };
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl mb-4 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-primary to-primary/80 text-white shadow-sm shrink-0">
              <div className="flex items-center gap-2">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[15px] font-headline">Trợ lý AI - Mr.Hói</span>
                  <span className="text-[10px] text-white/80 leading-none">Powered by Agentic AI</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <motion.button 
                  onClick={handleRefresh}
                  disabled={isTyping}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors disabled:opacity-50"
                  title="Làm mới hội thoại"
                >
                  <RefreshCw size={16} className={`text-white ${isRefreshing ? "animate-spin" : ""}`} />
                </motion.button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  title="Đóng"
                >
                  <X size={18} className="text-white" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent custom-scrollbar leading-relaxed">
              <AnimatePresence initial={false}>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-end gap-2 custom-msg-row ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mb-1 shadow-md">
                        <span className="material-symbols-outlined text-white text-sm" data-weight="fill">smart_toy</span>
                      </div>
                    )}
                    
                    <div 
                      className={`relative px-4 py-3 rounded-2xl max-w-[80%] text-sm ${
                        msg.role === "user" 
                          ? "bg-primary text-white rounded-br-sm shadow-md"
                          : "bg-surface text-on-surface border border-outline-variant/30 rounded-bl-sm shadow-sm"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <div 
                           className="chat-markdown"
                           dangerouslySetInnerHTML={createMarkup(msg.content)} 
                        />
                      ) : (
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

               {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-end gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 mb-1 shadow-md">
                    <span className="material-symbols-outlined text-white text-sm" data-weight="fill">smart_toy</span>
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-surface text-on-surface-variant border border-outline-variant/30 text-xs font-semibold flex items-center gap-1 shadow-sm w-fit">
                    Đang nhập 
                    <span className="flex gap-1 ml-1">
                      <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.0 }} className="w-1 h-1 bg-primary rounded-full block"></motion.span>
                      <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1 h-1 bg-primary rounded-full block"></motion.span>
                      <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1 h-1 bg-primary rounded-full block"></motion.span>
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Dummy element for Auto Scrolling */}
              <div ref={chatEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-3 bg-white/60 border-t border-slate-200">
              <div className="flex items-center bg-white rounded-full border border-slate-300 px-3 py-1 shadow-inner focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all">
                <input
                  type="text"
                  value={inputText}
                  placeholder="Gửi câu hỏi..."
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent py-2 px-2 text-sm outline-none font-body text-slate-800"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary-container hover:text-on-primary-container disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-primary/30 z-[101]"
      >
        <MessageSquare size={24} />
      </motion.button>
    </div>
  );
}

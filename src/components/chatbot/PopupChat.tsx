/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { NO_IMAGE, NO_NAME_TOUR } from "@/constants/common";
import { STORAGE_KEY_CHATBOT } from "@/constants/localStorage";
import { useChatbot } from "@/hooks/chatbot/useChatbot";
import { TourDetail } from "@/types/tour";
import { Minus, RefreshCcw, SendHorizontal } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type PopupChatProps = {
  onClose: () => void;
};

// tạo hàm để tránh trùng id
const getDefaultMessage = () => [
  {
    id: crypto.randomUUID(),
    role: "bot",
    text: "Xin chào Anh/Chị! Em là trợ lý AI của 36Travel.",
  },
];

export const PopupChat = ({ onClose }: PopupChatProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const { mutate, isPending } = useChatbot();

  // ref để scroll xuống cuối
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // load từ localStorage khi mở lại
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CHATBOT);

    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages(getDefaultMessage());
    }
  }, []);

  // save mỗi khi messages thay đổi
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY_CHATBOT, JSON.stringify(messages));
    }
  }, [messages]);

  // hàm xử lý reset chat
  const handleResetChat = () => {
    const defaultMsg = getDefaultMessage();

    // cập nhật giao diện
    setMessages(defaultMsg);
    localStorage.setItem(STORAGE_KEY_CHATBOT, JSON.stringify(defaultMsg));
  };

  // hàm xử lý gửi tin nhắn
  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: crypto.randomUUID(),
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);

    const dataFinal = {
      message: input,
    };

    mutate(dataFinal, {
      onSuccess: (data) => {
        const botMsg = {
          id: crypto.randomUUID(),
          role: "bot",
          opening: data.opening,
          tours: data.tours,
          closing: data.closing,
        };

        setMessages((prev) => [...prev, botMsg]);
      },
      onError: () => {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "Lỗi server 😢" },
        ]);
      },
    });

    setInput("");
  };

  // auto scroll mỗi khi có message mới hoặc loading
  useEffect(() => {
    bottomRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isPending]);

  const isDisabled = !input.trim() || isPending;

  return (
    <>
      <div className="fixed right-4 bottom-24 z-[999] w-106.25 overflow-hidden rounded-lg bg-white shadow-md">
        {/* Header */}
        <div className="flex h-15 items-center justify-between bg-gray-600 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <img
                src="/assets/images/logo-mini.svg"
                alt="Icon chat"
                width={24}
                height={24}
              />
            </div>
            <div className="font-medium text-white">36Travel</div>
          </div>

          {/* Hành động */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetChat}
              className="bg-travel-gray-500 hover:bg-travel-gray-100 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md"
            >
              <RefreshCcw size={16} className="text-white" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-travel-gray-500 hover:bg-travel-gray-100 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md"
            >
              <Minus size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-3">
          <div className="no-scrollbar h-95 space-y-2 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end text-justify" : "items-start"}`}
              >
                {/* Opening */}
                {msg.opening && (
                  <div className="text-travel-secondary max-w-[95%] rounded-md bg-gray-100 px-3 py-2 text-sm">
                    {msg.opening}
                  </div>
                )}

                {/* Text fallback (user hoặc bot thường) */}
                {msg.text && !msg.opening && (
                  <div
                    className={`max-w-[95%] rounded-md px-3 py-2 text-sm ${
                      msg.role === "user"
                        ? "bg-blue-500 text-white"
                        : "text-travel-secondary bg-gray-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}

                {/* Tours */}
                {msg.tours?.length > 0 && (
                  <div className="max-w-[95%] p-2">
                    <div className="grid grid-cols-2 gap-2">
                      {msg.tours.map((t: TourDetail) => (
                        <div
                          key={t.id}
                          className="rounded-md border border-gray-200 p-2"
                        >
                          <Link
                            href={`/tour/detail/${t.slug}`}
                            className="block aspect-square w-full overflow-hidden rounded-md"
                          >
                            <img
                              src={t.avatar || NO_IMAGE}
                              alt={t.name || NO_NAME_TOUR}
                              className="h-full w-full object-cover"
                            />
                          </Link>

                          <Link
                            href={`/tour/detail/${t.slug}`}
                            className="mt-2 line-clamp-1 text-sm font-medium"
                          >
                            {t.name}
                          </Link>

                          <div className="mt-1 text-sm font-semibold text-red-500">
                            {t.priceNewAdult.toLocaleString("vi-VN")}đ
                          </div>

                          <div className="mt-1 text-xs text-gray-500">
                            {t.locationsToName.join(", ")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Closing */}
                {msg.closing && (
                  <div className="text-travel-secondary max-w-[95%] rounded-md bg-gray-100 px-3 py-2 text-sm">
                    {msg.closing}
                  </div>
                )}
              </div>
            ))}

            {/* trạng thái đang tải */}
            {isPending && (
              <>
                <div className="mb-1 inline-flex h-9 items-center gap-2 rounded-md bg-gray-100 px-3 py-2">
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:-0.3s]"></div>
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300 [animation-delay:-0.15s]"></div>
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-300"></div>
                </div>
                <div className="text-xs text-gray-400">Đang trả lời...</div>
              </>
            )}

            {/* anchor scroll */}
            <div ref={bottomRef} />
          </div>

          <div className="mt-4 flex h-11 items-center justify-between rounded-4xl border border-gray-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Anh/Chị cần tư vấn gì ạ?"
              className="placeholder:text-travel-gray-500 h-full w-full px-4 text-sm font-medium"
            />
            <button
              type="button"
              onClick={handleSendMessage}
              disabled={isDisabled}
              className={`mr-1 flex h-9 w-9 items-center justify-center rounded-full ${isDisabled ? "cursor-not-allowed bg-gray-200" : "bg-travel-secondary cursor-pointer"}`}
            >
              <SendHorizontal
                size={16}
                className={`${isDisabled ? "text-gray-500" : "text-white"}`}
              />
            </button>
          </div>

          <div className="text-travel-secondary mt-2 text-center text-[10px]">
            Thông tin chỉ mang tính tham khảo, được tư vấn bởi Trí Tuệ Nhân Tạo
          </div>
        </div>
      </div>
    </>
  );
};

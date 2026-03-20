/* eslint-disable @next/next/no-img-element */
"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { PopupChat } from "./PopupChat";

const messages = [
  "Xin chào Anh/Chị! Em là trợ lý AI của 36Travel",
  "Em rất sẵn lòng hỗ trợ Anh/Chị 😊",
];

export const Chatbot = () => {
  const [index, setIndex] = useState(0);
  const [isOpenMsg, setIsOpenMsg] = useState(true);
  const [isOpenForm, setIsOpenForm] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length); // lặp vô tận
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Chatbot trigger */}
      <div
        onClick={() => setIsOpenForm(true)}
        className="fixed right-4 bottom-24 z-[998]"
      >
        {isOpenMsg && !isOpenForm && (
          <div className="group relative mb-3 w-50 cursor-pointer rounded-xl bg-gray-100 px-3 py-2 shadow-md">
            <button
              type="button"
              aria-label="Close chatbot"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenMsg(false);
              }}
              className="absolute -top-2 -right-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-gray-400 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
            >
              <X size={14} className="text-white" />
            </button>

            <div className="text-travel-secondary mb-1 flex items-center gap-2 text-sm font-medium">
              <img
                src="/assets/images/logo-mini.svg"
                alt="Icon chat"
                width={24}
                height={24}
              />
              <span>36Travel</span>
            </div>
            <span className="text-travel-secondary/80 text-sm font-normal">
              {messages[index]}
            </span>
          </div>
        )}

        <img
          src="/assets/images/chatbot.jpg"
          alt="Chatbot"
          width={50}
          height={50}
          className="ml-auto cursor-pointer overflow-hidden rounded-xl shadow-md"
        />
      </div>

      {/* Form chat */}
      {isOpenForm && <PopupChat onClose={() => setIsOpenForm(false)} />}
    </>
  );
};

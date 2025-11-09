import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../Context/MyContext";

const MessagePage = () => {
  const {
    isOnline,
    handleChat,
    ChatInput,
    handleChatInput,
    socket,
    messages,
    handleGetChat,
    Chat,
    refreshChat,
  } = useMyContext();
  const bottomRef = React.useRef(null);
  const chatUser = JSON.parse(localStorage.getItem("chatUser"));
  const { data } = chatUser || {};

  const storedUser = localStorage.getItem("user");
  const users = JSON.parse(storedUser);
  const { email } = users || {};

  React.useEffect(() => {
    if (data?._id) {
      handleGetChat(data._id);
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [data?._id, refreshChat]);

  const handleRerunPostDisplay = () => {
    handleChat(data?.email, data?._id, ChatInput);
    handleGetChat(data?._id);
  };

  const navigate = useNavigate();

  const fullName = `${data?.firstName ?? ""} ${data?.lastName ?? ""}`.trim();

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, bottomRef]);

  return (
    <div className="flex flex-col h-[89vh] bg-yellow-50 md:h-[94vh] md:mt-[1rem]">
      {/* Header */}
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 mb-1"
          onClick={() => {
            navigate(-1);
          }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
          />
        </svg>

        <header className="bg-white px-4 py-3 border-b shadow-sm flex items-center w-[100%]">
          <img
            src={
              data?.profileImage
                ? data?.profileImage
                : "logo/premium_photo-1673002094195-f18084be89ce.avif"
            }
            alt={data?.firstName}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="text-yellow-900 font-semibold">
              {fullName ? fullName : "Sarah Parker"}
            </h2>
            <p className="text-xs text-green-700">
              {isOnline ? "🟢 Online" : "🔴 Offline"}
            </p>
          </div>
        </header>
      </div>

      {/* Chat messages */}

      <div className="flex flex-col h-[75vh] p-4 overflow-y-auto space-y-3 bg-yellow-50 md:h-[100vh]">
        {Chat?.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-gray-400 italic animate-pulse">
            No messages yet — start chatting 💬
          </div>
        ) : (
          <div>
            {Array.isArray(Chat) &&
              Chat.filter((msg) => msg && msg.to && msg.message).map((msg) => {
                const isOwn =
                  msg.to.toString().trim().toLowerCase() ===
                  email?.toString().trim().toLowerCase();

                return (
                  <div
                    key={msg._id || Date.now()}
                    className={`flex flex-col py-2 ${
                      isOwn ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`break-words px-3 py-2 rounded-lg max-w-[70%] ${
                        isOwn
                          ? "bg-yellow-200 border border-yellow-600 text-gray-800"
                          : "bg-white border border-gray-300 text-gray-800"
                      }`}
                    >
                      <span className="flex flex-col gap-1">
                        {msg.message}
                        <p className="break-words text-xs text-gray-500">
                          {msg.timestamp &&
                            new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                        </p>
                      </span>
                    </div>
                  </div>
                );
              })}
            {Array.isArray(messages) &&
              messages.map((message) => (
                <div
                  key={message._id}
                  className={`flex flex-col mb-2 ${
                    message.from.trim().toLowerCase() ===
                    email.trim().toLowerCase()
                      ? "items-end"
                      : "items-start"
                  }`}
                >
                  <div
                    className={`break-words px-3 py-2 rounded-lg max-w-[70%] ${
                      message.from.trim().toLowerCase() ===
                      email.trim().toLowerCase()
                        ? "bg-yellow-200 border border-yellow-600 text-gray-800"
                        : "bg-white border border-gray-300 text-gray-800"
                    }`}
                  >
                    <span>
                      {message.message}
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <footer className="bg-white border-t px-4 py-3">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={ChatInput}
            onChange={handleChatInput}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
          />

          <button
            onClick={handleRerunPostDisplay}
            className="bg-yellow-700 hover:bg-yellow-600 text-white px-4 py-2 rounded-full text-sm"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MessagePage;

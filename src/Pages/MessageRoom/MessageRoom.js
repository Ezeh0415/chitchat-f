import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../Context/MyContext";

const MessagePage = () => {
  const { isOnline, handleChat, ChatInput, handleChatInput } = useMyContext();
  const chatUser = JSON.parse(localStorage.getItem("chatUser"));
  const { data } = chatUser || {};

  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const { email } = user || {};

  const [messages, setMessages] = useState([]);
  const bottomRef = React.useRef(null);

  const navigate = useNavigate();

  // const sendMessage = () => {
  //   if (input.trim() === "") return;

  //   setMessages([
  //     ...messages,
  //     { id: Date.now(), text: input, email: "chigozie@gmail.com" },
  //   ]);
  //   setInput("");
  // };
  const fullName = `${data?.firstName ?? ""} ${data?.lastName ?? ""}`.trim();

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[89vh] bg-yellow-50">
      {/* Header */}
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 mb-1"
          onClick={() => navigate(-1)}
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
              data.profileImage
                ? data.profileImage
                : "logo/premium_photo-1673002094195-f18084be89ce.avif"
            }
            alt={data.firstName}
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

      <div className="flex flex-col h-[75vh] p-4 overflow-y-auto space-y-3 bg-yellow-50">
        {messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-gray-400 italic animate-pulse">
            No messages yet — start chatting 💬
          </div>
        ) : (
          messages.map((msg) => {
            const isOwn =
              msg.email.trim().toLowerCase() === email.trim().toLowerCase();

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  isOwn ? "items-start" : "items-end"
                }`}
              >
                <div
                  className={`break-words px-3 py-2 rounded-lg max-w-[70%] ${
                    isOwn
                      ? "bg-yellow-200 border border-yellow-600 text-gray-800" // your messages (left)
                      : "bg-white border border-gray-300 text-gray-800" // others' messages (right)
                  }`}
                >
                  {msg.text}
                </div>

                <span className="text-[11px] text-gray-500 mt-1">
                  {isOwn ? "You" : msg.name || msg.email.split("@")[0]}
                </span>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
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
            onClick={() => handleChat(data?.email, data?._id, ChatInput)}
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MessagePage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there!", email: "emmanuel@gmail.com" },
    { id: 2, text: "Hello! How are you?", email: "chigozie@gmail.com" },
    {
      id: 3,
      text: "Doing great, thanks for asking!",
      email: "emmanuel@gmail.com",
    },
  ]);

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const sendMessage = () => {
    if (input.trim() === "") return;

    setMessages([
      ...messages,
      { id: Date.now(), text: input, email: "emmanuel@gmail.com" },
    ]);
    setInput("");
  };

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
            src="logo/premium_photo-1673002094195-f18084be89ce.avif"
            alt="User"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="text-yellow-900 font-semibold">Sarah Parker</h2>
            <p className="text-xs text-green-700">Online</p>
          </div>
        </header>
      </div>

      {/* Chat messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg text-sm ${
              msg.email === "emmanuel@gmail.com"
                ? "ml-auto bg-yellow-900 text-white w-[60%] "
                : "mr-auto bg-yellow-100 text-black w-[60%]"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </main>

      {/* Input area */}
      <footer className="bg-white border-t px-4 py-3">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
          />
          <button
            onClick={sendMessage}
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

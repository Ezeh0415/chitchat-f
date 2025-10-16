import React from "react";
import { useMyContext } from "../Context/MyContext";

const Error = () => {
  const { error, message } = useMyContext();
  return (
    <div>
      {error ? (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 w-[80%]">
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 px-4 py-4 rounded-lg shadow-lg w-full max-w-md animate-fadeIn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mt-0.5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <div className="flex-1 text-sm font-medium capitalize mt-1">{message}</div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Error;

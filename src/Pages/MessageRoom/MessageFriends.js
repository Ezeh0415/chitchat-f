import React from "react";
import Navbar from "../Nav/Navbar";
import { useMyContext } from "../../Context/MyContext";
import LogoutModel from "../../utilites/LogoutModel";

const MessageFriends = () => {
  const {
    userProfile,
    loading,
    error,
    handleChatRoom,
    handleGetChat,
    socket,
  } = useMyContext();
  const {user } = userProfile || {};

  if (loading) {
    return <p>Loading friends...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!user || !user.Friends || user.Friends.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8  rounded-lg  text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mb-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-2a4 4 0 100-8 4 4 0 000 8z"
          />
        </svg>
        <p className="text-lg font-semibold">No Friends to Show</p>
        <p className="mt-2 text-sm text-gray-400">
          You haven’t added any friends yet.
        </p>
      </div>
    );
  }

  return (
    <section>
      <div className="block md:hidden">
        <Navbar />

        <LogoutModel />
      </div>
      <div>
        <h1 className="text-xl capitalize mt-4">chats</h1>

        {user &&
          user?.Friends.map((friend) => {
            // safely get last chat
            const chats = Array.isArray(friend?.chats) ? friend.chats : [];
            const lastChat = chats.length > 0 ? chats[chats.length - 1] : null;

            

            return (
              <section
                key={friend._id || friend.email}
                onClick={() => {
                  handleChatRoom(friend.email, friend._id);
                  handleGetChat(friend._id);
                  socket.emit("joinRoom", friend._id);
                }}
              >
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={
                      friend.profileImage
                        ? friend.profileImage
                        : "logo/premium_photo-1673002094195-f18084be89ce.avif"
                    }
                    alt={friend.firstName}
                    className="w-[55px] h-[55px] rounded-md"
                  />
                  <div>
                    <span className="flex items-center gap-2 capitalize">
                      <h1>{friend.firstName}</h1>
                      <h1>{friend.lastName}</h1>
                    </span>
                    <div>
                      <p className="text-gray-600 truncate">
                        {lastChat?.message || "No message yet"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {lastChat
                          ? new Date(lastChat.timestamp).toLocaleString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
      </div>
    </section>
  );
};

export default MessageFriends;

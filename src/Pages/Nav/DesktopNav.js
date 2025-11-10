import React from "react";
import { Link } from "react-router-dom";
import { useMyContext } from "../../Context/MyContext";

const DesktopNav = () => {
  const { userProfile, handleLogout } = useMyContext();
  const {  user } = userProfile || {};
  const unreadCount = [
    ...(user?.notifications || []),
    ...(user?.FriendRequestsNotifications || []),
  ].filter((n) => !n.read).length;

  const unreadFriends = [...(user?.FriendRequests || [])].filter(
    (n) => !n.read
  ).length;

  return (
    <nav className=" mt-1 h-[88vh] relative">
      <div className="max-w-7xl mx-auto p-2">
        <div className="flex flex-col space-y-3 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold text-purple-600 flex items-center"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
            ChatApp
          </Link>

          {/* Navigation Items */}
          <div className="flex flex-col space-y-6 capitalize">
            <Link
              to="/groups"
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors text-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 mr-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>
              groups
            </Link>

            <Link
              to="/reels"
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors text-xl"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Reels
            </Link>

            <Link
              to="/friends"
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors text-lg"
            >
              <svg
                className={`w-5 h-5 mr-3 ${unreadFriends ? "bounce" : ""} `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <div>
                <span className="flex gap-1">
                  <h2>add Friends</h2>{" "}
                  <small className={unreadFriends ? "text-red-700" : "hidden"}>
                    {unreadFriends}
                  </small>
                </span>
              </div>
            </Link>

            <Link
              to="/notification"
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors "
            >
              <svg
                className={`w-5 h-5 mr-3 ${unreadCount ? "bounce" : ""} `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM10.24 8.56a5.97 5.97 0 01-4.66-7.4 1 1 0 00-.68-1.2A10.46 10.46 0 003 4.5a10.5 10.5 0 009 10 1 1 0 00.94-.69 5.99 5.99 0 01-2.7-4.25z"
                />
              </svg>
              <div>
                <span className="flex gap-1">
                  <h2>Notification</h2>{" "}
                  <small className={unreadCount ? "text-red-700" : "hidden"}>
                    {unreadCount}
                  </small>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 space-y-4">
        <div className="flex items-center gap-2">
          <Link to="/profile" className="w-[25%] h-[20%] rounded-full">
            <img
              src={
                user && user.profileImage
                  ? user.profileImage
                  : "https://via.placeholder.com/48"
              }
              alt={user && user.firstName ? user.firstName : "userName"}
              loading="lazy"
              className="size-8 rounded-sm bg-gray-400 outline -outline-offset-1 outline-white/10 md:size-10 md:border-2 outline-1 outline-offset-1 outline-gray-200 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-800"
            />
          </Link>
          <span>
            <Link to="/profile" className="text-lg capitalize">
              {user && user.firstName}
            </Link>
          </span>
        </div>
        <Link to="/setting" className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <h2 className="text-xl capitalize">settings</h2>
        </Link>
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg "
            className="size-8"
            viewBox="0 0 640 640"
            onClick={handleLogout}
          >
            <path d="M384 128L448 128L448 544C448 561.7 462.3 576 480 576L512 576C529.7 576 544 561.7 544 544C544 526.3 529.7 512 512 512L512 128C512 92.7 483.3 64 448 64L352 64L352 64L192 64C156.7 64 128 92.7 128 128L128 512C110.3 512 96 526.3 96 544C96 561.7 110.3 576 128 576L352 576C369.7 576 384 561.7 384 544L384 128zM256 320C256 302.3 270.3 288 288 288C305.7 288 320 302.3 320 320C320 337.7 305.7 352 288 352C270.3 352 256 337.7 256 320z" />
          </svg>
          <h2 className="text-xl capitalize" onClick={handleLogout}>
            logout
          </h2>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;

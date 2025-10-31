import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useMyContext } from "../../Context/MyContext";

const Header = () => {
  const { userProfile } = useMyContext();
  const { mySuccess, user } = userProfile || {};
  // const readValues = notifications.map((notification) => notification.read);

  // console.log(readValues);
  // const hasUnread = notifications.some(
  //   (notification) => notification.read === false
  // );
  // console.log(hasUnread); // true
  // const readCount = notifications.filter((n) => n.read).length;
  const unreadCount = [
    ...(user?.notifications || []),
    ...(user?.FriendRequestsNotifications || []),
  ].filter((n) => !n.read).length;

  // console.log(`Read: ${readCount}, Unread: ${unreadCount}`);

  return (
    <div>
      <header className="flex items-center justify-between">
        <Link to="/" className="w-[20%] md:w-[10%]">
          <img src="logo/8025530.jpg" alt="chitchat logo" />
        </Link>

        <div className=" w-[75%] flex items-center justify-evenly">
          <div className="flex items-center gap-1 border w-fit py-1 px-2 rounded-lg bg-yellow-800 hover:bg-yellow-600 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4 md:size-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
              />
            </svg>
          </div>

          <NavLink
            to="/notification"
            end
            className={({ isActive }) =>
              isActive
                ? "flex items-center capitalize text-yellow-800 font-bold px-1 rounded-sm"
                : "flex items-center capitalize"
            }
          >
            <div className="relative py-2">
              {unreadCount ? (
                <p className="text-xs absolute top-[-2px] left-3 text-red-600">
                  {unreadCount}
                </p>
              ) : (
                ""
              )}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class={
                  unreadCount
                    ? "size-4 text-red-600 md:size-6"
                    : "size-5 md:size-8"
                }
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                />
              </svg>
            </div>
            <h2 className="text-xs md:text-lg">notification</h2>
          </NavLink>

          <NavLink
            to="/chats"
            end
            className={({ isActive }) =>
              isActive
                ? "flex items-center capitalize text-yellow-800 font-bold px-1 rounded-sm"
                : "flex items-center capitalize"
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 md:size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>

            <h2 className="text-xs md:text-lg">message</h2>
          </NavLink>

          <Link to="/profile" className="w-[35px] h-[35px] rounded-full">
            <img
              src="logo/premium_photo-1673002094195-f18084be89ce.avif"
              alt="live random image"
              className="w-[35px] h-[35px] rounded-full md:w-[55px] md:h-[35px]"
            />
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;

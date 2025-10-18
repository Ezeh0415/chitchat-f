import React from "react";
import Navbar from "../Nav/Navbar";
import { useMyContext } from "../../Context/MyContext";
import LogoutModel from "../../utilites/LogoutModel";
import { formatDistanceToNowStrict } from "date-fns";
import { useNavigate } from "react-router-dom";

// Dummy data

const NotificationPage = () => {
  const { userProfile, handlePostDisplay } = useMyContext();
  const { mySuccess, user } = userProfile || {};
  const navigate = useNavigate();

  const hasNotifications =
    user?.notifications?.length > 0 ||
    user?.FriendRequestsNotifications?.length > 0;

  return (
    <section>
      <Navbar />
      <LogoutModel />
      <div className=" py-1 flex justify-center">
        <div className="w-full max-w-2xl  rounded-lg  p-2">
          <h2 className="text-2xl font-bold text-yellow-900 mb-6">
            Notifications
          </h2>

          {hasNotifications ? (
            <div>
              <ul className="space-y-4">
                {user &&
                  [...user.notifications].reverse().map((notif) => (
                    <li
                      key={notif.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-shadow ${
                        notif.read
                          ? "bg-white border-gray-200"
                          : "bg-yellow-50 border-yellow-300 shadow-sm"
                      } hover:shadow-md`}
                      aria-live="polite"
                      onClick={() => {
                        handlePostDisplay(
                          notif.postOwnerEmail,
                          notif.post_id,
                          notif.notif_id
                        );
                        navigate("/postDisplay");
                      }}
                    >
                      {/* Profile image */}
                      <img
                        src={user?.profileImage}
                        alt="User profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      {/* Notification content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4
                            className={`text-sm font-medium ${
                              notif.read ? "text-gray-800" : "text-yellow-800"
                            }`}
                          >
                            {notif.title?.length > 50
                              ? notif.title.slice(0, 30) + "..."
                              : notif.title}
                          </h4>
                        </div>

                        <div>
                          {/* Timestamp */}
                          <span
                            className={`text-xs px-2 py-0.5 mb-1 mt-1 rounded-full ${
                              notif.read
                                ? "bg-gray-100 text-gray-500"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {formatDistanceToNowStrict(
                              new Date(notif.createdAt),
                              {
                                addSuffix: true,
                              }
                            )}
                          </span>

                          {/* Optional subtitle or description */}
                          {notif.userDid && (
                            <p className="text-sm text-gray-600 mt-1">
                              {notif.firstName} : {notif.userDid}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Unread indicator */}
                      {!notif.read && (
                        <div className="mt-1">
                          <span
                            className="inline-block w-3 h-3 bg-green-500 rounded-full"
                            title="Unread"
                          />
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
              {/* friend request notification */}
              <ul className="space-y-4 mt-4">
                {user &&
                  [...user.FriendRequestsNotifications]
                    .reverse()
                    .map((notif) => (
                      <li
                        key={notif.id}
                        className={`flex items-center gap-4 p-4 rounded-lg border transition-shadow ${
                          notif.read
                            ? "bg-white border-gray-200"
                            : "bg-yellow-50 border-yellow-300 shadow-sm"
                        } hover:shadow-md`}
                        aria-live="polite"
                      >
                        {/* Profile image */}
                        <img
                          src={user?.profileImage}
                          alt="User profile"
                          className="w-10 h-10 rounded-full object-cover"
                        />

                        {/* Notification content */}
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4
                              className={`text-sm font-medium ${
                                notif.read ? "text-gray-800" : "text-yellow-800"
                              }`}
                            >
                              {notif.firstName} {""} {notif.lastName}
                            </h4>
                          </div>

                          <div>
                            {/* Timestamp */}
                            <span
                              className={`text-xs px-2 py-0.5 mb-1 mt-1 rounded-full ${
                                notif.read
                                  ? "bg-gray-100 text-gray-500"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {formatDistanceToNowStrict(
                                new Date(notif.createdAt),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </span>

                            {/* Optional subtitle or description */}
                            {notif.userDid && (
                              <p className="text-sm text-gray-600 mt-1">
                                {notif.firstName} : {notif.userDid}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Unread indicator */}
                        {!notif.read && (
                          <div className="mt-1">
                            <span
                              className="inline-block w-3 h-3 bg-green-500 rounded-full"
                              title="Unread"
                            />
                          </div>
                        )}
                      </li>
                    ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center mt-24 text-center animate-fade-in-up">
              {/* Animated SVG Bell with subtle ring motion */}
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-20 text-yellow-400 mb-6 motion-safe:animate-bell-swing"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.049A4.5 4.5 0 019 17H4.5a2.25 2.25 0 01-2.25-2.25v-.173c0-.995.294-1.968.84-2.792l.681-1.023a4.5 4.5 0 00.696-2.388V8.25a6.75 6.75 0 1113.5 0v.423c0 .846.24 1.672.696 2.388l.681 1.023c.546.824.84 1.797.84 2.792v.173A2.25 2.25 0 0119.5 17H15a4.5 4.5 0 01-.143.049z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a2.25 2.25 0 002.25-2.25H9.75A2.25 2.25 0 0012 21z"
                  />
                </svg>

                {/* Notification dot animation (optional) */}
                <span className="absolute top-1 right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                No Notifications Yet
              </h2>
              <p className="text-sm text-gray-500 max-w-sm">
                You're all caught up. When someone interacts with your posts or
                profile, you'll see it here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NotificationPage;

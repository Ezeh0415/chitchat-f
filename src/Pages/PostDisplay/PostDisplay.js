import React from "react";
import { useMyContext } from "../../Context/MyContext";
import { useNavigate } from "react-router-dom";

const PostDisplay = () => {
  const { loading } = useMyContext();
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("postDisplay");
  const posts = JSON.parse(storedUser);
  const { post } = posts || {};

  const date = new Date(post.createdAt);

  const options = {
    year: "numeric",
    month: "long", // full month name
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // 12-hour format with AM/PM
    timeZone: "UTC", // or use your local timezone if you want
  };

  const formattedDate = date
    .toLocaleString("en-US", options)
    .replace(",", " •");

  return (
    <div className="relative min-h-screen">
      {loading ? (
        <div>
          {/* Main scrollable area */}
          <div className="pb-20 max-w-2xl mx-auto pt-6 px-4 animate-pulse">
            {/* Post skeleton */}
            <div className="border border-gray-200 rounded-xl shadow-sm">
              {/* Header skeleton */}
              <div className="flex items-center px-5 py-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gray-300" />
                <div className="ml-4 flex-1 space-y-2">
                  <div className="w-32 h-3 bg-gray-300 rounded" />
                  <div className="w-24 h-2 bg-gray-200 rounded" />
                </div>
              </div>

              {/* Post content skeleton */}
              <div className="px-5 py-4 space-y-4">
                <div className="w-full h-4 bg-gray-300 rounded" />
                <div className="w-5/6 h-4 bg-gray-200 rounded" />
                <div className="w-full h-56 bg-gray-300 rounded-md border" />
              </div>
            </div>

            {/* Comment section skeleton */}
            <div className="mt-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gray-300" />
                  <div className="flex-1 h-4 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Fixed comment input skeleton */}
          <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
            <div className="max-w-2xl mx-auto px-4 py-3 flex items-center space-x-3 animate-pulse">
              <div className="w-9 h-9 rounded-full bg-gray-300" />
              <div className="flex-1 h-8 bg-gray-200 rounded-full" />
              <div className="w-16 h-8 bg-gray-300 rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Main scrollable area */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
            onClick={() => navigate(-1)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
            />
          </svg>
          <div className="pb-20 max-w-2xl mx-auto pt-6 px-4">
            {/* Post Card */}
            <div className="border border-gray-200 rounded-xl shadow-sm">
              {/* Header */}

              <div className="flex items-center px-5 py-4 border-b border-gray-100">
                <img
                  src={
                    post && post.profileImage
                      ? post.profileImage
                      : "https://via.placeholder.com/48"
                  }
                  alt={post && post.firstName ? post.firstName : "userName"}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h2 className="text-sm font-semibold text-gray-900">
                    {post && post.firstName ? post.firstName : "firstName"}{" "}
                    {post && post.lastName ? post.lastName : "lastName"}
                  </h2>
                  <p className="text-xs text-gray-500">{formattedDate}</p>
                </div>
              </div>

              {/* Content */}
              <div className="px-5 py-4">
                <p className="text-sm text-gray-800 mb-4 leading-relaxed">
                  {post && post.postText
                    ? post.postText
                    : ` This is a detailed and professional-looking post. It's styled
                  with spacing and simplicity in mind — clean layout without
                  distracting colors.`}
                </p>

                <img
                  src={
                    post && post.mediaUrl
                      ? post.mediaUrl
                      : "https://via.placeholder.com/48"
                  }
                  alt={post && post.firstName ? post.firstName : "userName"}
                  className="w-full rounded-md border border-gray-100"
                />
              </div>
            </div>

            {/* Comments */}
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-700">Comments</h3>

              {[1, 2, 3].map((c) => (
                <div key={c} className="flex items-start space-x-3">
                  <img
                    src="https://via.placeholder.com/36"
                    alt="Avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800 w-full shadow-sm">
                    This is a user comment. Thoughtful, concise, and clearly
                    displayed.
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fixed Comment Input at Bottom */}
          <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200">
            <div className="max-w-2xl mx-auto px-4 py-3 flex items-center space-x-3">
              <img
                src="https://via.placeholder.com/36"
                alt="Your avatar"
                className="w-9 h-9 rounded-full object-cover"
              />
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="text-sm px-4 py-1.5 rounded-full bg-yellow-900 text-white hover:bg-blue-700 transition">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDisplay;

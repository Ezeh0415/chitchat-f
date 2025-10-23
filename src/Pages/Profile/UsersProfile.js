import React from "react";
import Navbar from "../Nav/Navbar";
import { useMyContext } from "../../Context/MyContext";
import { formatDistanceToNowStrict } from "date-fns";
import LogoutModel from "../../utilites/LogoutModel";
import Success from "../../utilites/Success";
import Error from "../../utilites/Error";

const UserProfile = () => {
  const { userProfile, handleUnFriend } = useMyContext();
  const storedUser = localStorage.getItem("UsersProfile");
  const users = JSON.parse(storedUser);

  const { mysuccess, user } = users || {};
  const { mySuccess, user: myUser } = userProfile || {};

  // console.log("User Profile in ProfilePage:", user);

  const postCount = user && user.posts ? user.posts.length : 0;

  const isFriends = Array.isArray(myUser?.Friends)
    ? myUser.Friends.find((friend) => friend.email === user.email)
    : null;

  const friendId = isFriends?._id; // or matchedFriend.id, depending on your schema
  return (
    <main className="relative">
      {/* logout model */}
      <LogoutModel />

      {/* successful message */}
      <Success />

      {/* error message */}
      <Error />
      {/* <div className="bg-gray-700/50 w-[100vw] h-[98vh] absolute">

    </div> */}
      {/* nav bar section */}
      <Navbar />
      <main className="flex justify-center py-3 px-1">
        <section className="max-w-4xl w-full  rounded-lg  p-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={
                user?.profileImage ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt={`${user?.firstName}'s profile`}
              className="w-32 h-32 rounded-full object-cover border-2 border-yellow-600"
            />
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold text-yellow-900">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-gray-600 italic mt-1">
                "{user?.bio || "users bio"}"
              </p>
              <p className="text-sm text-green-700 mt-1">
                Joined june 2023
                {/* {formatDistanceToNowStrict(new Date(user?.createdAt), {
                  addSuffix: true,
                })} */}
              </p>

              {/* Follow / Message Buttons */}
              <div className="mt-4 flex gap-3 justify-center md:justify-start">
                <button className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
                  {/* {isFollowing ? "Unfollow" : "Follow"} */}
                  Follow
                </button>
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">
                  Message
                </button>
                {isFriends ? (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    onClick={() => handleUnFriend(friendId, user.email)}
                  >
                    Unfriend
                  </button>
                ) : (
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    connect
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-6 flex justify-around text-center border-t pt-4">
            <div>
              <p className="text-xl font-semibold">
                {user?.posts?.length || 0}
              </p>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
            <div>
              <p className="text-xl font-semibold">
                {user?.followers?.length || 0}
              </p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div>
              <p className="text-xl font-semibold">
                {user?.following?.length || 0}
              </p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
          </div>

          {/* Posts Section */}
          <div className="mt-10">
            <h2 className="text-xl font-bold text-yellow-800 mb-4">Posts</h2>

            {user?.posts?.length > 0 ? (
              user.posts
                .slice()
                .reverse()
                .map((post) => (
                  <div key={post._id} className="mb-6 border-b pb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <img
                        src={user?.profileImage}
                        className="w-6 h-6 rounded-full"
                        alt="user"
                      />
                      <span>
                        {user.firstName} {user.lastName}
                      </span>
                      <span>
                        •{" "}
                        {formatDistanceToNowStrict(new Date(post.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>

                    <p className="mt-2 text-gray-800">
                      {post.postText.length > 50
                        ? post.postText.slice(0, 100) + "..."
                        : post.postText}
                    </p>

                    {post.mediaUrl && (
                      <img
                        src={post.mediaUrl}
                        alt="Post media"
                        className="mt-3 w-full h-64 object-cover rounded-lg"
                      />
                    )}

                    <div className="flex gap-4 mt-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        ❤️ {post.liked?.length || 0}
                      </span>
                      <span className="flex items-center gap-1">💬 0</span>
                      <span className="flex items-center gap-1">🔁 0</span>
                    </div>
                  </div>
                ))
            ) : (
              <div className="flex flex-col items-center text-gray-400 mt-10">
                <svg
                  className="w-16 h-16 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.75 9V5.25m0 0L12 9m3.75-3.75L18.75 9M12 9v10.5m0 0H6.75m5.25 0H17.25M9 21h6a3 3 0 0 0 3-3v-2.25a6 6 0 1 0-12 0V18a3 3 0 0 0 3 3Z"
                  />
                </svg>
                <p className="text-lg">No posts to display</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </main>
  );
};

export default UserProfile;

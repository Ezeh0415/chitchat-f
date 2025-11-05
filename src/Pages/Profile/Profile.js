import React from "react";
import Navbar from "../Nav/Navbar";
import { useMyContext } from "../../Context/MyContext";
import Model from "../../utilites/Model";
import { formatDistanceToNowStrict } from "date-fns";
import LogoutModel from "../../utilites/LogoutModel";
import Success from "../../utilites/Success";
import Error from "../../utilites/Error";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { UserInfoRow } from "../../utilites/UserRowInfo";
import { calculateAge } from "../../utilites/CalculateAge";

const ProfilePage = () => {
  const {
    userProfile,
    handleLikedPosts,
    handleUnLikePosts,
    handlePostDisplay,
    isOnline,
  } = useMyContext();

  const { mysuccess, user } = userProfile || {};

  const location = useLocation();
  const isEditing = location.pathname.includes("editProfile");
  const navigate = useNavigate();

  const postCount = user && user.posts ? user.posts.length : 0;

  const FriendsCount = user && user.Friends ? user.Friends.length : 0;

  // 3. Main Profile Card Component
  const formattedDOB =
    user?.Dob &&
    new Date(user.Dob).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const age = user?.Dob ? calculateAge(user.Dob) : null;

  const date = new Date(user?.createdAt);

  const options = {
    year: "numeric",
    month: "short", // full month name
    day: "numeric",
    // hour: "numeric",
    // minute: "2-digit",
    // hour12: true, // 12-hour format with AM/PM
    timeZone: "UTC", // or use your local timezone if you want
  };

  const formattedDate = date
    .toLocaleString("en-US", options)
    .replace(",", " •");

  return (
    <main className="relative">
      {/* <div className="bg-gray-700/50 w-[100vw] h-[98vh] absolute">

    </div> */}
      {/* nav bar section */}
      <div className="block lg:hidden">
        <Navbar />
      </div>

      {/* logout model */}
      <LogoutModel />

      {/* successful message */}
      <Success />

      {/* error message */}
      <Error />

      {/* profile body section */}
      <div className="flex justify-center items-start py-2  px-1">
        <div className="bg-white shadow-lg rounded-lg  w-full max-w-2xl">
          {isEditing ? (
            <Outlet />
          ) : (
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl overflow-hidden p-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Image */}
                <img
                  alt={`${user?.firstName || "User"}'s profile`}
                  src={
                    user?.profileImage ||
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                  }
                  className="w-32 h-32 rounded-full object-cover border-4 border-yellow-700"
                />

                {/* Info Section */}
                <div className="text-center md:text-left flex-1">
                  {/* Name */}
                  <h2 className="text-3xl font-bold text-gray-800">
                    {user?.firstName || "User"} {user?.lastName || ""}
                  </h2>

                  {/* User Information Rows */}
                  <UserInfoRow icon="📧" label="Email" value={user?.email} />

                  <UserInfoRow
                    icon="🧑‍💼"
                    label="Username"
                    value={user?.firstName && `@${user.lastName}`}
                  />
                  <UserInfoRow
                    icon="📅"
                    label="createdAt"
                    value={user?.firstName && `@${formattedDate}`}
                  />

                  <UserInfoRow
                    icon="🧭"
                    label="Location"
                    value={user?.firstName && `@${user?.country}`}
                  />

                  <UserInfoRow
                    icon="🎂"
                    label="Birthday"
                    value={formattedDOB && `${formattedDOB} (${age} years old)`}
                  />

                  <p className="text-sm text-green-600 font-medium mt-1">
                    {isOnline ? "🟢 Online" : "🔴 Offline"}
                  </p>

                  {/* Bio */}
                  <p className="mt-3 text-gray-600 text-base leading-relaxed">
                    {user?.Bio ||
                      "“Just here to connect, share ideas, and learn 🌱.”"}
                  </p>

                  {/* Edit Button */}
                  <Link
                    to="/editProfile"
                    className="inline-block mt-4 bg-yellow-700 hover:bg-yellow-600 text-white text-sm font-medium px-5 py-2 rounded-full transition"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>

              {/* Stats Section */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6 text-center border-t pt-6">
                <div>
                  <p className="text-2xl font-semibold text-gray-800">
                    {postCount ?? 0}
                  </p>
                  <p className="text-sm text-gray-500">Posts</p>
                </div>

                <div>
                  <p className="text-2xl font-semibold text-gray-800">
                    {FriendsCount || 0}
                  </p>
                  <p className="text-sm text-gray-500">Friends</p>
                </div>

                <div>
                  <p className="text-2xl font-semibold text-gray-800">
                    {user?.createdAt
                      ? new Date(user.createdAt).getFullYear()
                      : "—"}
                  </p>
                  <p className="text-sm text-gray-500">Joined</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* post section  */}
      <section>
        <h2 className="text-xl mt-4 uppercase">Posts</h2>
        {user && user.posts?.length > 0 ? (
          user.posts
            .slice()
            .reverse()
            .map((posts) => {
              const result = formatDistanceToNowStrict(
                new Date(`${posts.createdAt}`),
                {
                  addSuffix: true,
                }
              );

              const posterEmail = posts.email;
              const likerId = user.id;
              const postId = posts._id;
              const userHasLiked = posts.liked?.some(
                (like) => like.likedByEmail === user.email
              );

              return (
                <main key={posts._id}>
                  <div
                    className={"flex items-center gap-2 mt-6"}
                    key={posts._id}
                  >
                    <img
                      src={
                        posts.profileImage
                          ? posts.profileImage
                          : "https://via.placeholder.com/48"
                      }
                      alt={
                        posts && posts.firstName ? posts.firstName : "userName"
                      }
                      loading="lazy"
                      className="w-[25px] h-[25px] rounded-full"
                    />

                    <div className="flex  items-center gap-2">
                      <h2 className="text-xs"> {posts.firstName} </h2>
                      <h2 className="text-xs"> {posts.lastName} </h2>

                      <p className="text-xs"> {result} </p>
                    </div>
                    {/* {posts.email === user.email ? (
                    <div></div>
                  ) : (
                    <div>
                      {alreadyRequested ? (
                        <div>
                          {posts.email === user.email ? (
                            <Link
                              to={`/profile`}
                              className="border rounded-lg bg-yellow-800 hover:bg-yellow-600 capitalize text-white py-1 px-2 text-sm "
                            >
                              view user
                            </Link>
                          ) : (
                            <h2
                              className="border rounded-lg bg-yellow-800 hover:bg-yellow-600 capitalize text-white py-1 px-2 text-sm "
                              onClick={() => {
                                handleGetUsersProfile(posterEmail);
                                setTimeout(() => {
                                  navigate("/UserProfile");
                                }, 1500);
                              }}
                            >
                              view user
                            </h2>
                          )}
                        </div>
                      ) : (
                        <h2 className="border rounded-lg bg-yellow-800 hover:bg-yellow-600 capitalize text-white py-1 px-2 text-sm ">
                          connect
                        </h2>
                      )}
                    </div>
                  )} */}
                  </div>

                  <div
                    className="mt-3"
                    onClick={() => {
                      handlePostDisplay(posts.email, posts._id);
                      navigate("/postDisplay");
                    }}
                  >
                    <h3
                      className="capitalize text-sm"
                      onClick={() => {
                        handlePostDisplay(posts.email, posts._id);
                        navigate("/postDisplay");
                      }}
                    >
                      {posts.postText.length > 50
                        ? posts.postText.slice(0, 200) + "..."
                        : posts.postText}
                    </h3>

                    {posts.mediaUrl ? (
                      <div>
                        <img
                          src={posts.mediaUrl}
                          alt={posts.firstName}
                          loading="lazy"
                          className="w-full h-[200px] rounded-sm mt-3"
                        />
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>

                  <div className="flex items-center gap-5 mt-2">
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class={`size-4  ${
                          userHasLiked
                            ? "size-5 text-white p-1 bg-yellow-800 rounded-full"
                            : ""
                        }`}
                        onClick={() => {
                          userHasLiked
                            ? handleUnLikePosts(posterEmail, likerId, postId)
                            : handleLikedPosts(posterEmail, likerId, postId);
                        }}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                      <p className="text-sm">{posts.liked?.length}</p>
                    </span>

                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class={`size-4  ${
                          posts.comments?.length ? "size-5  rounded-full" : ""
                        }`}
                        onClick={() => {
                          handlePostDisplay(posts.email, posts._id);
                          navigate("/postDisplay");
                        }}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                        />
                      </svg>
                      <div className="text-sm">
                        <p
                          className="text-sm"
                          onClick={() => {
                            handlePostDisplay(posts.email, posts._id);
                            navigate("/postDisplay");
                          }}
                        >
                          {posts.comments?.length}
                        </p>
                      </div>
                    </span>

                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                        />
                      </svg>
                      {/* <p className="text-sm">0</p> */}
                    </span>
                  </div>
                </main>
              );
            })
        ) : (
          <div className="flex flex-col items-center justify-center mt-16 animate-fade-in">
            {/* Animated SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-gray-300 mb-4 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3v1.5A2.25 2.25 0 0 0 5.25 6h13.5A2.25 2.25 0 0 0 21 4.5V3M3 3h18M3 3l1.5 16.5A2.25 2.25 0 0 0 6.75 21h10.5a2.25 2.25 0 0 0 2.25-1.5L21 3"
              />
            </svg>

            {/* Heading */}
            <h2 className="text-xl font-semibold text-gray-700 mb-1">
              Nothing to see yet
            </h2>

            {/* Subtext */}
            <p className="text-sm text-gray-500 text-center max-w-sm">
              Looks like no one has posted anything. Once someone shares a post,
              it'll appear here.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default ProfilePage;

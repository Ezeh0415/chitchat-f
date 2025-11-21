import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Nav/Navbar";
import { useMyContext } from "../../Context/MyContext";
import React from "react";
import { formatDistanceToNowStrict } from "date-fns";
import LogoutModel from "../../utilites/LogoutModel";
import Success from "../../utilites/Success";
import Error from "../../utilites/Error";

const Dashboard = () => {
  const {
    setHideNav,
    userProfile,
    posts,
    loading,
    handleLikedPosts,
    handleUnLikePosts,
    handleGetUsersProfile,
    handleAddFriends,
    handlePostDisplay,
    setLimit,
  } = useMyContext();
  const navigate = useNavigate();
  const bottomRef = React.useRef(null);
  const [pageLoader, setPageLoader] = React.useState(false);

  const { user } = userProfile || {};
  const { data } = posts || {};
  const { Friends } = user || {};

  // ...existing code...

  React.useEffect(() => {
    const container = bottomRef.current;
    if (!container) return;

    const onScroll = () => {
      // When container scroll reaches (or is within 5px of) the bottom
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 5
      ) {
        setLimit((prevLimit) => prevLimit + 5);
        setPageLoader(true);
      }
    };

    container.addEventListener("scroll", onScroll);

    return () => {
      container.removeEventListener("scroll", onScroll);
      setPageLoader(false);
    };
  }, [bottomRef, data, setLimit]);
  // ...existing code...

  return (
    <div>
      <main className="relative  ">
        <div className="lg:hidden">
          <Navbar />
        </div>

        {/* logout model */}
        <LogoutModel />

        {/* successful message */}

        <Success />

        {/* error message */}

        <Error />

        <section className="mt-[0.5rem]">
          <div>
            <span className="flex items-center gap-2  lg:shadow-md lg:p-2">
              <Link to="/profile">
                <img
                  src={
                    user && user?.profileImage
                      ? user?.profileImage
                      : "https://via.placeholder.com/48"
                  }
                  alt={user && user.firstName ? user.firstName : "userName"}
                  loading="lazy"
                  className="size-8 rounded-sm bg-gray-400 outline -outline-offset-1 outline-white/10 md:size-10 md:border-2 outline-1 outline-offset-1 outline-gray-200 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-800"
                />
              </Link>

              <div className="flex items-center justify-evenly  w-full">
                <div>
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-yellow-800">
                    <Link to="/createPost" onClick={() => setHideNav(true)}>
                      <input
                        id="post"
                        name="post"
                        type="text"
                        placeholder="Write Your First Post"
                        className="block min-w-0 grow py-2 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 md:w-[400px]"
                      />
                    </Link>
                  </div>
                </div>
                <div>
                  <Link to="/createPost" onClick={() => setHideNav(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-[30px] mt-1 "
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </span>
          </div>

          {/* post loader */}
          {loading && (
            <div className="flex items-center gap-3 mt-4 animate-fade-in text-gray-600">
              {/* Smaller spinner */}
              <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-blue-500 rounded-full"></div>

              {/* Text */}
              <div className="text-sm animate-pulse">
                <span className="font-medium">Posting...</span> Please wait
              </div>
            </div>
          )}

          {data && data?.length > 0 ? (
            <div
              ref={bottomRef}
              style={{ overflowY: "auto", maxHeight: "86vh" }}
            >
              {data?.map((posts) => {
                const result = formatDistanceToNowStrict(
                  new Date(`${posts.createdAt}`),
                  {
                    addSuffix: true,
                  }
                );

                const posterEmail = posts?.email;
                const likerId = user?.id;
                const postId = posts?._id;
                const userHasLiked = posts.liked?.some(
                  (like) => like?.likedByEmail === user?.email
                );
                const alreadyFriends =
                  Array.isArray(Friends) &&
                  Friends.some((req) => req?.email === posts?.email);

                return (
                  <main key={posts._id}>
                    <div
                      className={
                        posts.email === user.email
                          ? "flex items-center  gap-2 mt-6"
                          : "flex items-center justify-between gap-2 mt-6 md:justify-start md:gap-4"
                      }
                      key={posts._id}
                    >
                      {posts.email === user.email ? (
                        <Link to={`/profile`}>
                          <img
                            src={
                              posts.profileImage
                                ? posts.profileImage
                                : "https://via.placeholder.com/48"
                            }
                            alt={
                              posts && posts.firstName
                                ? posts.firstName
                                : "userName"
                            }
                            loading="lazy"
                            className="w-[25px] h-[25px] rounded-full md:w-[40px] md:h-[40px]  "
                          />
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            handleGetUsersProfile(posterEmail);
                            setTimeout(() => {
                              navigate("/UserProfile");
                            }, 1500);
                          }}
                        >
                          <img
                            alt={posts.firstName}
                            src={posts.profileImage}
                            loading="lazy"
                            className="w-[25px] h-[25px] rounded-full md:w-[40px] md:h-[40px]  "
                          />
                        </button>
                      )}

                      <div className="flex  items-center gap-2">
                        {posts.email === user.email ? (
                          <Link
                            to={`/profile`}
                            className="flex items-center gap-1 capitalize border-r px-1 md:text-lg"
                          >
                            <h2 className="text-xs md:text-lg">
                              {" "}
                              {posts.firstName}{" "}
                            </h2>
                            <h2 className="text-xs md:text-lg">
                              {" "}
                              {posts.lastName}{" "}
                            </h2>
                          </Link>
                        ) : (
                          <button
                            onClick={() => {
                              handleGetUsersProfile(posterEmail);
                              setTimeout(() => {
                                navigate("/UserProfile");
                              }, 1500);
                            }}
                            className="flex items-center gap-1 capitalize border-r px-1 md:text-lg"
                          >
                            <h2 className="text-xs md:text-lg">
                              {" "}
                              {posts.firstName}{" "}
                            </h2>
                            <h2 className="text-xs md:text-lg">
                              {" "}
                              {posts.lastName}{" "}
                            </h2>
                          </button>
                        )}
                        <p className="text-xs"> {result} </p>
                      </div>
                      {posts.email === user.email ? (
                        <div></div>
                      ) : (
                        <div>
                          {alreadyFriends ? (
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
                            <h2
                              className="border rounded-lg bg-yellow-800 hover:bg-yellow-600 capitalize text-white py-1 px-2 text-sm "
                              onClick={() => handleAddFriends(posts.email)}
                            >
                              connect
                            </h2>
                          )}
                        </div>
                      )}
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
              })}
              {pageLoader && (
                <div className="flex flex-col items-center gap-4 mt-6 animate-fade-in text-gray-700">
                  {/* Bigger Spinner */}
                  <div className="w-12 h-12 border-8 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>

                  {/* Bigger Loading text */}
                  <p className="text-lg font-semibold animate-pulse">
                    Loading more posts...
                  </p>
                </div>
              )}
            </div>
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
                Looks like no one has posted anything. Once someone shares a
                post, it'll appear here.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

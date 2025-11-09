import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../Context/MyContext";

const FriendRequest = () => {
  const navigate = useNavigate();
  const {
    Users,
    email: loginEmail,
    handleAddFriends,
    userProfile,
    handleAcceptFriends,
    handleDeleteFriendRequests,
    loading,
  } = useMyContext();

  const { totalCount, data } = Users || [];
  const { mySuccess, user } = userProfile || {};
  const { FriendRequest, Friends } = user || {};

  console.log(FriendRequest);

  if (loading) {
    return (
      <div>
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="mt-3 flex gap-3 animate-pulse">
            <div className="w-[55px] h-[55px] rounded-md bg-gray-300" />
            <div className="flex flex-col justify-center gap-2">
              <div className="flex gap-2">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </div>
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <main>
      <section>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 mt-1 md:size-6 cursor-pointer md:mt-0"
            onClick={() => navigate(-1)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
            />
          </svg>
          <h1 className="text-xl capitalize md:text-2xl">Friend requests</h1>
        </div>

        {FriendRequest && FriendRequest.length > 0 ? (
          <div>
            {FriendRequest.map((user) => {
              const alreadyRequested =
                Array.isArray(Friends) &&
                Friends.some((req) => req.email === user.email);

              return (
                <div key={user._id} className="mt-3 flex gap-3">
                  <img
                    src={
                      user.profileImage
                        ? user.profileImage
                        : "logo/premium_photo-1673002094195-f18084be89ce.avif"
                    }
                    alt={user.firstName}
                    className="w-[55px] h-[55px] rounded-md md:w-[70px] md:h-[70px]"
                  />
                  <div>
                    <span className="flex items-center gap-2 capitalize md:text-xl">
                      <h1>{user.firstName}</h1>
                      <h1>{user.lastName}</h1>
                    </span>
                    <span className="flex items-center gap-5 mt-1 capitalize">
                      <h3
                        className="border px-2 rounded-md md:text-lg"
                        onClick={() => handleDeleteFriendRequests(user._id)}
                      >
                        decline
                      </h3>
                      <h3
                        className="border px-2 rounded-md md:text-lg"
                        onClick={() =>
                          handleAcceptFriends(user._id, user.email)
                        }
                      >
                        Accept
                      </h3>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <div className="flex flex-col items-center justify-center p-8  rounded-lg text-gray-500">
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
                  d="M8 10h.01M12 14h.01M16 10h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
              <p className="text-lg font-semibold md:text-2xl">
                No Friend Requests
              </p>
              <p className="mt-2 text-sm text-gray-400">
                You currently have no new friend requests.
              </p>
            </div>
          </div>
        )}
      </section>
      <section>
        <h1 className="text-xl capitalize mt-4 md:text-3xl md:mb-4">
          active users
        </h1>
        {data && data.length > 0 ? (
          <div>
            {data.map((user) => {
              const { _id, firstName, lastName, profileImage, email } = user;

              // Skip rendering if the user is the logged-in user
              if (email === loginEmail) return null;

              // Skip rendering if the user already has a friend request
              const alreadyRequested =
                Array.isArray(Friends) &&
                Friends.some((req) => req.email === user.email);

              return (
                <div>
                  {!alreadyRequested && (
                    <div key={_id} className="mt-3 flex gap-3">
                      <img
                        src={
                          profileImage
                            ? profileImage
                            : "logo/premium_photo-1673002094195-f18084be89ce.avif"
                        }
                        alt={firstName}
                        className="w-[55px] h-[55px] rounded-md md:w-[70px] md:h-[70px]"
                      />
                      <div>
                        <span className="flex items-center gap-2 capitalize md:text-xl">
                          <h1>{firstName}</h1>
                          <h1>{lastName}</h1>
                        </span>
                        <span className="flex items-center mt-1 capitalize">
                          {alreadyRequested ? (
                            <h3
                              className="border px-2 rounded-md cursor-pointer"
                              // onClick={() => handleAddFriends(email)}
                            >
                              disconect
                            </h3>
                          ) : (
                            <h3
                              className="border px-2 rounded-md cursor-pointer md:text-lg"
                              onClick={() => handleAddFriends(email)}
                            >
                              connect
                            </h3>
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          // Skeleton loading section remains unchanged
          <div>
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="mt-3 flex gap-3 animate-pulse">
                <div className="w-[55px] h-[55px] rounded-md bg-gray-300" />
                <div className="flex flex-col justify-center gap-2">
                  <div className="flex gap-2">
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-6 w-24 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default FriendRequest;

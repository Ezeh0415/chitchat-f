import React from "react";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../Context/MyContext";

const FriendRequest = () => {
  const navigate = useNavigate();
  const { Users, email: loginEmail, handleAddFriends } = useMyContext();

  const { totalCount, data } = Users || [];

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
            class="size-5 mt-1"
            onClick={() => navigate(-1)}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
            />
          </svg>
          <h1 className="text-xl capitalize ">Friend requests</h1>
        </div>

        <div className="mt-3 flex gap-3">
          <img
            src="logo/premium_photo-1673002094195-f18084be89ce.avif"
            alt="live random image"
            className="w-[55px] h-[55px] rounded-md"
          />
          <div>
            <span className="flex items-center gap-2 capitalize">
              <h1>firstName</h1>
              <h1>lastName</h1>
            </span>
            <span className="flex items-center gap-5 mt-1 capitalize">
              <h3 className="border px-2 rounded-md">decline</h3>
              <h3 className="border px-2 rounded-md">connect</h3>
            </span>
          </div>
        </div>
      </section>
      <section>
        <h1 className="text-xl capitalize mt-4">active users</h1>
        {data && data.length > 0 ? (
          <div>
            {data.map((user) => {
              const { _id, firstName, lastName, profileImage, email } = user;
              return (
                <div key={_id}>
                  {email !== loginEmail && (
                    <div className="mt-3 flex gap-3">
                      <img
                        src={
                          profileImage
                            ? profileImage
                            : "logo/premium_photo-1673002094195-f18084be89ce.avif"
                        }
                        alt={firstName}
                        className="w-[55px] h-[55px] rounded-md"
                      />
                      <div>
                        <span className="flex items-center gap-2 capitalize">
                          <h1>{firstName}</h1>
                          <h1> {lastName} </h1>
                        </span>
                        <span className="flex items-center  mt-1 capitalize">
                          <h3
                            className="border px-2 rounded-md"
                            onClick={() => handleAddFriends(email)}
                          >
                            connect
                          </h3>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <div className="mt-3 flex gap-3 animate-pulse">
              {/* Skeleton Image */}
              <div className="w-[55px] h-[55px] rounded-md bg-gray-300" />

              <div className="flex flex-col justify-center gap-2">
                {/* Skeleton Name */}
                <div className="flex gap-2">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </div>

                {/* Skeleton Connect Button */}
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="mt-3 flex gap-3 animate-pulse">
              {/* Skeleton Image */}
              <div className="w-[55px] h-[55px] rounded-md bg-gray-300" />

              <div className="flex flex-col justify-center gap-2">
                {/* Skeleton Name */}
                <div className="flex gap-2">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </div>

                {/* Skeleton Connect Button */}
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="mt-3 flex gap-3 animate-pulse">
              {/* Skeleton Image */}
              <div className="w-[55px] h-[55px] rounded-md bg-gray-300" />

              <div className="flex flex-col justify-center gap-2">
                {/* Skeleton Name */}
                <div className="flex gap-2">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </div>

                {/* Skeleton Connect Button */}
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="mt-3 flex gap-3 animate-pulse">
              {/* Skeleton Image */}
              <div className="w-[55px] h-[55px] rounded-md bg-gray-300" />

              <div className="flex flex-col justify-center gap-2">
                {/* Skeleton Name */}
                <div className="flex gap-2">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </div>

                {/* Skeleton Connect Button */}
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="mt-3 flex gap-3 animate-pulse">
              {/* Skeleton Image */}
              <div className="w-[55px] h-[55px] rounded-md bg-gray-300" />

              <div className="flex flex-col justify-center gap-2">
                {/* Skeleton Name */}
                <div className="flex gap-2">
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                  <div className="h-4 w-20 bg-gray-300 rounded"></div>
                </div>

                {/* Skeleton Connect Button */}
                <div className="h-6 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default FriendRequest;

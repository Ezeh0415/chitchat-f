import { useMyContext } from "../../Context/MyContext";

const CreatePost = () => {
  const {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    ExclamationTriangleIcon,
    open,
    setOpen,
    Discard,
    handleSvgClick,
    handleFileChange,
    fileInputRef,
    MediaUrl,
    ProfileError,
    handleClearMedia,
    setHideNav,
    postMessage,
    handlePostChange,
    handlePostSubmit,
    userProfile,
  } = useMyContext();
  const { success, user } = userProfile || {};

  const handleClick = (e) => {
    handlePostSubmit(e);
    setHideNav(true);
  };

  return (
    <main className="relative h-[89vh]">
      {/* model for create post */}
      <Dialog
        open={open}
        onClose={setOpen}
        className="relative z-50 capitalize"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-yellow-800 text-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-yellow-800 text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-red-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-100"
                    >
                      discard post
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-100">
                        Are you sure you want to discard this post? All of your
                        input data will be permanently removed. This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    Discard();
                    setHideNav(true);
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Discard
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <nav className="flex items-center justify-between capitalize">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 font-bold md:size-8"
          onClick={() => setOpen(true)}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>

        <p className="text-center text-lg font-bold md:text-2xl">create post</p>

        <div className="flex items-center gap-2 px-1.5 rounded-lg bg-yellow-800 text-white">
          <h3 className="text-lg font-bold md:text-xl" onClick={handleClick}>
            post
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4 md:size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </div>
      </nav>

      <section className="mt-2 flex items-center gap-2">
        <img
          alt=""
          src={
            (user && user.profileImage) ||
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          }
          className="size-10 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10 md:size-15"
        />
        <div className="capitalize flex item-center gap-1">
          <h1 className="text-sm md:text-xl">
            {" "}
            {(user && user.firstName) || "firstName"}{" "}
          </h1>
          <h1 className="text-sm md:text-xl">
            {" "}
            {(user && user.lastName) || "lastName"}
          </h1>
        </div>
      </section>

      <section className="mt-4 capitalize">
        <form>
          <label
            htmlFor="message"
            className="block mb-2 font-semibold text-gray-700 md:text-xl"
          >
            Your post
          </label>
          <textarea
            id="message"
            name="message"
            value={postMessage}
            onChange={handlePostChange}
            rows={5}
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Type your message here..."
          />
        </form>
      </section>

      {/* if the user added image to the post */}
      <section>
        {ProfileError ? (
          <div></div>
        ) : (
          <div>
            {MediaUrl ? (
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {MediaUrl &&
                  MediaUrl.map((media) => {
                    const { id, name, type, dataUrl } = media;

                    return (
                      <div key={id} className="relative w-fit ">
                        <img
                          alt={name}
                          src={dataUrl}
                          className=" min-w-[130px] h-[130px] mt-2 rounded-xl bg-gray-800 outline -outline-offset-1 outline-white/10 z-0"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-10 text-white bg-yellow-800 shadow-xl p-2 absolute right-0 bottom-0 z-50 rounded-md"
                          onClick={() => handleClearMedia(id)}
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="hidden">image not</div>
            )}
          </div>
        )}
      </section>

      {/* icons for user to add picture or video */}
      <section>
        <div className="flex flex-col gap-3 mt-3">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 text-yellow-800 md:size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
            <h2 className="text-yellow-800 text-lg capitalize font-bold md:text-xl">
              camera
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              multiple
              name="imageUrl"
              required
            />
            <span className="flex items-center gap-1" onClick={handleSvgClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-yellow-800 md:size-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </span>
            <h2 className="text-yellow-800 text-lg capitalize font-bold md:text-xl">
              image / video
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5 text-yellow-800 md:size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <h2 className="text-yellow-800 text-lg capitalize font-bold md:text-xl">
              location
            </h2>
          </div>
        </div>
      </section>

      {/* post button section */}

      <button
        type="submit"
        onClick={handleClick}
        className="text-2xl font-bold bg-yellow-800 text-white rounded-xl text-center py-1 absolute w-full bottom-0"
      >
        Post
      </button>
    </main>
  );
};

export default CreatePost;

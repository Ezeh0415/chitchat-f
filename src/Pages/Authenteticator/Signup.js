import { NavLink } from "react-router-dom";
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import { useMyContext } from "../../Context/MyContext";

const Signup = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
    loading,
    error,
    message,
    success,
  } = useMyContext();

  return (
    <div>
      <main>
        <section></section>
        <section className="p-2 mx-auto w-[95%] pt-[0.5rem]">
          <div>
            <header className="capitalize">
              <div className="flex items-center">
                <img
                  src="logo/8025530.jpg"
                  alt="chitchat logo"
                  className="w-[25%]"
                />
                <h2 className="text-xl">chitchat</h2>
              </div>
              <nav className="mt-[2.5rem] flex items-center justify-between">
                <NavLink
                  to="/signup"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "border-2 px-8 py-2 text-white bg-yellow-900 hover:bg-yellow-600 rounded-xl"
                      : "border-2 px-8 py-1 rounded-xl"
                  }
                >
                  sign up
                </NavLink>
                <NavLink
                  to="/signin"
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "border-2 px-8 py-1 text-white bg-yellow-900 hover:bg-yellow-600 rounded-xl"
                      : "border-2 px-8 py-1 rounded-xl"
                  }
                >
                  sign in
                </NavLink>
              </nav>
            </header>

            {error && (
              <div
                className="mt-2 text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 flex items-center space-x-2 animate-fadeIn"
                role="alert"
              >
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <span className="text-sm">{message}</span>
              </div>
            )}

            {success && (
              <div
                className="mt-2 text-green-600 bg-green-50 border border-green-200 rounded-md px-3 py-2 flex items-center space-x-2 animate-fadeIn"
                role="alert"
              >
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                <span className="text-sm">{message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 mt-[2rem]">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                >
                  FirstName
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus: sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                >
                  LastName
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus: sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus: sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2 flex items-center gap-1 border border-gray-300 rounded-md p-1 ">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "password" : "text"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    className="  block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border-none outline-none placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  />
                  <div>
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                        onClick={() => setShowPassword(false)}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                        onClick={() => setShowPassword(true)}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onSubmit={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                >
                  {loading ? <div class="loader"></div> : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Signup;

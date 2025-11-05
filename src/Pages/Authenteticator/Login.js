import React from "react";
import { NavLink } from "react-router-dom";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useMyContext } from "../../Context/MyContext";

const Login = () => {
  const {
    formData,
    handleChange,
    handleLogin,
    showPassword,
    setShowPassword,
    loading,
    error,
    message,
    success,
  } = useMyContext();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className=" dark:bg-gray-800  rounded-2xl w-full max-w-md p-8">
        <header className="flex flex-col items-center mb-6">
          <img
            src="logo/8025530.jpg"
            alt="chitchat logo"
            className="w-20 h-20 mb-2 rounded-full shadow-sm object-contain"
          />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            ChitChat
          </h2>
        </header>

        <nav className="flex justify-center gap-4 mb-6">
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive
                ? "px-6 py-2 bg-yellow-900 text-white rounded-full shadow-md hover:bg-yellow-700 transition"
                : "px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition dark:border-gray-600 dark:hover:bg-gray-700"
            }
          >
            Sign Up
          </NavLink>
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive
                ? "px-6 py-2 bg-yellow-900 text-white rounded-full shadow-md hover:bg-yellow-700 transition"
                : "px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition dark:border-gray-600 dark:hover:bg-gray-700"
            }
          >
            Sign In
          </NavLink>
        </nav>

        {error && (
          <div className="mb-4 flex items-center gap-2 text-red-700 bg-red-100 px-4 py-2 rounded-md animate-fadeIn">
            <ExclamationCircleIcon className="w-5 h-5" />
            <span className="text-sm">{message}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 flex items-center gap-2 text-green-700 bg-green-100 px-4 py-2 rounded-md animate-fadeIn">
            <CheckCircleIcon className="w-5 h-5" />
            <span className="text-sm">{message}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-yellow-700"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Password
              </label>
              <a
                href="#"
                className="text-sm text-yellow-900 hover:text-yellow-700 dark:text-yellow-600 dark:hover:text-yellow-400"
              >
                Forgot password?
              </a>
            </div>
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="w-full px-4 py-2 text-gray-900 dark:text-white dark:bg-gray-700 placeholder-gray-400 focus:outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="px-3 text-gray-500 dark:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-900 text-white font-semibold rounded-xl shadow-md hover:bg-yellow-700 transition"
          >
            {loading ? <div className="loader"></div> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

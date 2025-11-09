import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 px-6">
      <div className="max-w-md text-center">
        <h1 className="text-[8rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-none select-none">
          404
        </h1>
        <h2 className="text-3xl font-semibold mt-4 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn’t find the page you were looking for.  
          It might have been moved, renamed, or it simply doesn’t exist.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-200 transition-all duration-200"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 shadow-sm"
          >
            Back to Home
          </button>
        </div>
      </div>

      <footer className="absolute bottom-4 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} ChitChat. All rights reserved.
      </footer>
    </div>
  );
}

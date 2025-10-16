import { useNavigate } from "react-router-dom";

const Successfull = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <svg
          className="w-16 h-16 text-green-900 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-2xl font-bold text-green-900 mb-2 capitalize">
          registration Successful
        </h1>
        <p className="text-yellow-700 mb-6">
          You have successfully registered Welcome to chit chat!
        </p>

        {setTimeout(() => {
          navigate("/");
        }, 4000)}
      </div>
    </div>
  );
};

export default Successfull;

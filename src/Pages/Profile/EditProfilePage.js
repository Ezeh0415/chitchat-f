import React from "react";
import Navbar from "../Nav/Navbar";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../Context/MyContext";
import Model from "../../utilites/Model";

const EditProfilePage = () => {
  const {
    fileInputRef,
    handleFileChange,
    handleSvgClick,
    setModalOpen,
    userProfile,
  } = useMyContext();
  const { mysuccess, user } = userProfile || {};
  const navigate = useNavigate();
  return (
    <main className=" bg-gray-100">
      {/* Page Container */}
      <div className="flex justify-center items-start py-2 px-4">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8">
          <h2 className="text-2xl font-bold text-yellow-800 mb-6 text-center">
            Edit Your Profile
          </h2>

          {/* Profile Image Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={
                  user
                    ? user.profileImage
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-cover border-2 border-yellow-700"
              />
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-yellow-700 text-white p-2 rounded-full cursor-pointer hover:bg-yellow-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => {
                    handleSvgClick();
                    setModalOpen(true);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 11l3.536 3.536M5 13l4-4L19 3"
                  />
                </svg>
              </label>
            </div>
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
            <p className="text-sm text-gray-500 mt-2">
              Click the icon to upload a new photo
            </p>
          </div>

          {/* Input Fields */}
          <form className="space-y-6">
            {/* <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-700"
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-700"
                />
              </div>
            </div> */}

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Bio
              </label>
              <textarea
                rows="4"
                placeholder="Tell people about yourself..."
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-700 resize-none"
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="px-5 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={() => navigate("/profile")}
                className="px-5 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-600 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* model section */}
      <Model email={(user && user.email) || ""} />
    </main>
  );
};

export default EditProfilePage;

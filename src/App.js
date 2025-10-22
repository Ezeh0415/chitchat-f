import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Pages/Authenteticator/Signup";
import Login from "./Pages/Authenteticator/Login";
import Successfull from "./Pages/Authenteticator/Successfull";
import Dashboard from "./Pages/Home/Dashboard";
import Header from "./Pages/Nav/Header";
import FriendRequest from "./Pages/FriendRequests/FriendRequest";
import ProfilePage from "./Pages/Profile/Profile";
import NotificationPage from "./Pages/Notification/Notification";
import MessagePage from "./Pages/MessageRoom/MessageRoom";
import MessageFriends from "./Pages/MessageRoom/MessageFriends";
import CreatePost from "./Pages/CreatePosts/CreatePost";
// import DesktopNav from "./Pages/Nav/DesktopNav";
import { useMyContext } from "./Context/MyContext";
import EmailVerification from "./Pages/Authenteticator/EmailFunction/EmailVerification";
import ProtectedRoute from "./utilites/Protected/ProtectedRoute";
import UserProfile from "./Pages/Profile/UsersProfile";
import EditProfilePage from "./Pages/Profile/EditProfilePage";
import ScrollToTop from "./utilites/ScrollToTop";
import PostDisplay from "./Pages/PostDisplay/PostDisplay";

function App() {
  const { hideNav, isAuthenticated, navOpen } = useMyContext();

  return (
    <div className="bg-yellow-50/50 h-screen flex flex-col">
      {isAuthenticated ? hideNav ? <Header /> : "" : ""}

      {/* Main Layout (after header) */}
      <div className="flex-1 grid md:grid-cols-12 gap-4 px-4 py-4 overflow-hidden">
        {/* Left Sidebar (fixed, non-scrollable) */}
        <aside className="hidden lg:block md:col-span-2 h-full">
          <div className="bg-white rounded shadow p-4 text-green-900 h-full">
            <h2 className="text-lg font-semibold mb-2">Navigation</h2>
            {/* <DesktopNav /> */}
          </div>
        </aside>

        {/* Main Content (scrollable only) */}
        <main className="md:col-span-8 lg:col-span-7 overflow-y-auto scrollbar-hide h-full pr-2">
          <ScrollToTop />
          <Routes>
            {/* Public routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login />} />
            {/* <Route path="/emailVerification" element={<EmailVerification />} /> */}
            <Route path="/success" element={<Successfull />} />

            {/* Private/protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/friends"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <FriendRequest />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="editProfile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <EditProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/UserProfile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatRoom"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <MessagePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chats"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <MessageFriends />
                </ProtectedRoute>
              }
            />
            <Route
              path="/createPost"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/postDisplay"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <PostDisplay />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* Right Sidebar (fixed, non-scrollable) */}
        <aside className="hidden md:block md:col-span-4 lg:col-span-3 h-full">
          <div className="bg-white rounded shadow p-4 text-yellow-900 h-full">
            <h2 className="text-lg font-semibold mb-2">Sponsored</h2>
            <p className="text-sm">Your ad content here.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;

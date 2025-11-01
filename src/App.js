import { Link, Route, Routes } from "react-router-dom";
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
import DesktopNav from "./Pages/Nav/DesktopNav";

function App() {
  const { hideNav, isAuthenticated, navOpen } = useMyContext();

  return (
    <div className="bg-yellow-50/50 h-screen flex flex-col">
      {isAuthenticated && !hideNav && (
        <div className="block lg:hidden">
          <Header />
        </div>
      )}

      {isAuthenticated ? (
        // 🧱 Authenticated layout
        <div className="flex-1 grid md:grid-cols-12 gap-4 px-4 py-4 overflow-hidden">
          {/* Left Sidebar */}
          <aside className="hidden lg:block md:col-span-2 h-full">
            <div className="bg-white rounded shadow p-4 text-green-900 h-full">
              <Link to="/" className="w-[5%] mt-[-400px] ">
                <img
                  src="logo/8025530.jpg"
                  alt="chitchat logo"
                  className="w-[60%]"
                />
              </Link>
              <DesktopNav />
            </div>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-8 lg:col-span-7 overflow-y-auto scrollbar-hide h-full pr-2">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/friends" element={<FriendRequest />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/editProfile" element={<EditProfilePage />} />
              <Route path="/UserProfile" element={<UserProfile />} />
              <Route path="/notification" element={<NotificationPage />} />
              <Route path="/chatRoom" element={<MessagePage />} />
              <Route path="/chats" element={<MessageFriends />} />
              <Route path="/createPost" element={<CreatePost />} />
              <Route path="/postDisplay" element={<PostDisplay />} />
            </Routes>
          </main>

          {/* Right Sidebar */}
          <aside className="hidden md:block md:col-span-4 lg:col-span-3 h-full">
            <div className="bg-white rounded shadow p-4 text-yellow-900 h-full">
              <MessageFriends />
            </div>
          </aside>
        </div>
      ) : (
        // 🚪 Unauthenticated: show only public pages
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/success" element={<Successfull />} />
          <Route path="/emailVerification" element={<EmailVerification />} />
        </Routes>
      )}
    </div>
  );
}

export default App;

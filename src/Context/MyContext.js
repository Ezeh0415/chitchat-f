import React from "react";
import { createContext, useContext } from "react";
import { Base_Url, fetchMultipleRequests } from "../Db/Dburl";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utilites/ValidateEmail";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { io } from "socket.io-client";
const socket = io("http://localhost:8080"); // replace with your server URL
// 1. Create the context
const MyContext = createContext();

// 2. Create a provider component
export function MyContextProvider({ children }) {
  const fileInputRef = React.useRef(null);
  const navigate = useNavigate();
  const [MediaUrl, setMediaUrl] = React.useState(null);
  const [error, setError] = React.useState(null); // For both profile/post/signup/login errors
  const [message, setMessage] = React.useState(""); // For all success/error messages
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false); // For both profile/post/signup/login success
  const [hasSubmitted, setHasSubmitted] = React.useState(false);
  const [postMessage, setPostMessage] = React.useState("");
  const [commentText, setComment] = React.useState("");
  const [ChatInput, setChatInput] = React.useState("");
  const [result, setResult] = React.useState();
  const [hideNav, setHideNav] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [postDisplay, setPostDisplay] = React.useState(null);
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);
  const { email } = user || {};
  let commentedUser = email;
  // check if user is authenticated
  const isAuthenticated = !!localStorage.getItem("Token");

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSocket = () => {
    socket.on("newProfileImage", (msg) => {
      console.log(msg);
    });
  };

  const requests = [
    {
      url: `${Base_Url}/api/getUserProfile/${email}`,
      options: {
        method: "GET",
        headers: {
          Authorization: "Bearer your_token_here",
          Accept: "application/json",
        },
      },
    },
    {
      url: `${Base_Url}/api/posts`,
      options: {
        method: "GET",
        headers: {
          Authorization: "Bearer your_token_here",
          Accept: "application/json",
        },
      },
    },
    {
      url: `${Base_Url}/api/users`,
      options: {
        method: "GET",
        headers: {
          Authorization: "Bearer your_token_here",
          Accept: "application/json",
        },
      },
    },

    // add more requests as needed
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSvgClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const maxSize = 50 * 1024 * 1024; // 50MB per file
    const processedMedia = [];

    if (!files.length) {
      setError(true);
      setMessage("No files detected");
      return;
    }

    for (const file of files) {
      if (file.size > maxSize) {
        setError(true);
        setMessage(`File "${file.name}" is too large. Max size is 50MB.`);
        continue;
      }

      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (!isImage && !isVideo) {
        setError(true);
        setMessage(`File "${file.name}" is not an image or video.`);
        continue;
      }

      try {
        let processedFile = file;

        if (isImage) {
          processedFile = await imageCompression(file, {
            maxSizeMB: 3,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
          });
        }

        const reader = new FileReader();

        // Wrap FileReader in a Promise to await it
        const fileData = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("Error reading file"));
          reader.readAsDataURL(processedFile);
        });

        processedMedia.push({
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          type: file.type,
          dataUrl: fileData,
        });
      } catch (error) {
        console.error("Processing error:", error);
        setError(true);
        setMessage(`Error processing file "${file.name}"`);
      }
    }

    // Example: store all media data URLs
    setMediaUrl(processedMedia); // You may want to rename this to `setMediaList` or something similar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = formData;

    try {
      setLoading(true);
      setError(false);
      setSuccess(false);
      // Basic validation
      if (!firstName || !lastName || !email || !password) {
        setError(true);
        setMessage("Input cannot be empty");
        setTimeout(() => {
          setError(false);
          setLoading(false);
        }, 2000);
        return;
      }

      if (!validateEmail(email)) {
        setError(true);
        setMessage("Please enter a valid email.");
        setTimeout(() => {
          setError(false);
          setLoading(false);
        }, 2000);
        return;
      }

      if (password.length < 8) {
        setError(true);
        setMessage("Password must be at least 8 characters");
        setTimeout(() => {
          setError(false);
          setLoading(false);
        }, 2000);
        return;
      }

      const requests = [
        {
          url: `${Base_Url}/api/signup`,
          options: {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password,
            }),
          },
        },
      ];
      // Send requests
      const results = await fetchMultipleRequests(requests);
      const [signup] = results || [];

      if (signup?.success) {
        localStorage.setItem("Token", signup.accessToken);
        localStorage.setItem("user", JSON.stringify(signup.user));
        setError(false);
        setLoading(false);
        setSuccess(true);
        setMessage(`${signup.message}! Redirecting in 2 seconds...`);

        setTimeout(() => {
          navigate("/");
          setMessage("");
        }, 3000);
      } else {
        setError(true);
        setLoading(false);
        setMessage(signup?.error || "Error signing up user");
        setTimeout(() => {
          setError(false);
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setError(true);
      setLoading(false);
      setMessage("An unexpected error occurred. Please try again.");
      setTimeout(() => {
        setError(false);
        setLoading(false);
      }, 2000);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    setLoading(true);

    if (!email || !password) {
      setError(true);
      setMessage("All fields are required.");
      setTimeout(() => {
        setError(false);
        setLoading(false);
      }, 2000);
      return;
    }

    if (!validateEmail(email)) {
      setError(true);
      setMessage("Please enter a valid email.");
      setTimeout(() => {
        setError(false);
        setLoading(false);
      }, 2000);
      return;
    }

    setMessage("");

    try {
      const requests = [
        {
          url: `${Base_Url}/api/login`,
          options: {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          },
        },
      ];

      const results = await fetchMultipleRequests(requests);
      const [Login] = results || [];

      if (Login?.success) {
        localStorage.setItem("user", JSON.stringify(Login.user));
        localStorage.setItem("Token", Login.accessToken);

        setMessage(`${Login.message}! Redirecting...`);
        setError(false);

        setTimeout(() => {
          setFormData("");
          navigate("/");
        }, 1000);
      } else {
        setError(true);
        setMessage("");
        setMessage(Login.error || "Login failed.");
        setTimeout(() => {
          setError(false);
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      setError(true);
      setMessage("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("user");
    try {
      const requests = [
        {
          url: `${Base_Url}/api/logout`,
          options: {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          },
        },
      ];

      const results = await fetchMultipleRequests(requests);
      const [logout] = results || [];

      if (logout?.success) {
        setError(false);
        setMessage(logout.message || "Logged out successfully");
        navigate("/signin");
      }
    } catch (error) {
      setError(true);
      setMessage("Error logging out" + error.message);
    }
  };

  const handleProfileSubmit = async (email, dataUrl) => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    setMessage("");

    if (!email || !dataUrl) {
      setError(true);
      setMessage("Media file or user email not found.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Base_Url}/api/chit-chat-profile-img`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ media: dataUrl, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Profile update failed");
      }

      if (response.ok) {
        setSuccess(true);
        setMessage("Profile picture uploaded");
        setTimeout(() => {
          setSuccess(false);
          setMessage("");
        }, 2000);
        // socket.emit("newProfileImage", { email, dataUrl });
        socket.on("newProfileImage", (msg) => {
          console.log(msg);
        });
      } else {
        throw new Error(response?.error || "Failed to update profile picture");
      }
    } catch (error) {
      setError(true);
      setMessage(error.message || "Error uploading profile");
    } finally {
      setLoading(false);
      setMediaUrl("");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleClearMedia = (id) => {
    const newMedia = MediaUrl.filter((media) => media.id !== id);
    setMediaUrl(newMedia);
    setError(false);
    setMessage("");
  };

  const Discard = () => {
    navigate("/");
    setOpen(false);
    setMediaUrl(null);
  };

  const handlePostChange = (e) => {
    setPostMessage(e.target.value); // ✅ use the setter function
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (hasSubmitted) return;

    navigate("/");
    setLoading(true);
    setError(false);
    setSuccess(false);
    setMessage("");

    try {
      if (MediaUrl) {
        // Send all media uploads in parallel
        const results = await Promise.all(
          MediaUrl.map(async (media) => {
            const { dataUrl } = media;

            if (!email || !dataUrl) {
              throw new Error("Email or media is missing.");
            }

            const response = await fetch(`${Base_Url}/api/createImagePost`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                postText: postMessage,
                title: postMessage,
                email,
                media: dataUrl,
              }),
            });

            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.message || "Upload failed.");
            }

            return data;
          })
        );

        // If we get here, all uploads succeeded
        setSuccess(true);
        setPostMessage("");
        setMessage("All posts sent successfully!");
        setTimeout(() => setSuccess(false), 2000);
      } else {
        // No media: plain text post
        const response = await fetch(`${Base_Url}/api/createImagePost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            title: postMessage,
            postText: postMessage,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Post failed.");
        }

        setSuccess(true);
        setPostMessage("");
        setMessage("Text post sent successfully!");
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (err) {
      console.error("Post submit error:", err);
      setError(true);
      setPostMessage("");
      setMessage(err.message || "Something went wrong.");
      setTimeout(() => setError(false), 3000);
    } finally {
      setLoading(false);
      setMediaUrl("");
      setHasSubmitted(true);
      setMessage("");
      setPostMessage("");
    }
  };

  const handleLikedPosts = async (posterEmail, likerId, postId) => {
    // Function to handle liked posts
    // setLoading(true);
    setError(false);
    setSuccess(false);
    setMessage("");

    if (!posterEmail || !likerId || !postId) {
      setError(true);
      setMessage("Poster or liker email missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Base_Url}/api/likedPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ posterEmail, likerId, postId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Like action failed");
      }

      if (response.ok) {
        setSuccess(true);
        setMessage("  Post liked ");
        setTimeout(() => {
          setSuccess(false);
          setMessage("");
        }, 2000);
        // socket.emit("newProfileImage", { email, dataUrl });
        socket.on("likedError", (msg) => {
          setError(true);
          setMessage(msg);
          setTimeout(() => {
            setError(false);
            setMessage("");
          }, 2000);
        });
      } else {
        throw new Error(response?.error || "failed to like post");
      }
    } catch (error) {
      setError(true);
      setMessage(error.message || "Error liking post");
    } finally {
      setLoading(false);
      setMediaUrl("");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleUnLikePosts = async (posterEmail, likerId, postId) => {
    // Function to handle liked posts

    // setLoading(true);
    setError(false);
    setSuccess(false);
    setMessage("");

    if (!posterEmail || !likerId || !postId) {
      setError(true);
      setMessage("Poster or liker email missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Base_Url}/api/UnlikePost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ posterEmail, likerId, postId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "unLike action failed");
      }

      if (response.ok) {
        setSuccess(true);
        setMessage("  Post unLiked successfully");
        setTimeout(() => {
          setSuccess(false);
          setMessage("");
        }, 2000);
        // socket.emit("newProfileImage", { email, dataUrl });
        socket.on("unlikeError", (msg) => {
          setError(true);
          setMessage(msg);
          setTimeout(() => {
            setError(false);
            setMessage("");
          }, 2000);
        });
      } else {
        throw new Error(response?.error || "failed to unLike post");
      }
    } catch (error) {
      setError(true);
      setMessage(error.message || "Error unLiking post");
    } finally {
      setLoading(false);
      setMediaUrl("");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleGetUsersProfile = async (posterEmail) => {
    // setLoading(true);
    setError(false);
    setSuccess(false);
    setMessage("");

    if (!posterEmail) {
      setError(true);
      setMessage("Poster or liker email missing.");
      setLoading(false);
      return;
    }

    try {
      const requests = [
        {
          url: `${Base_Url}/api/usersGetProfile/${posterEmail}`,
          options: {
            method: "GET",
            headers: {
              Authorization: "Bearer your_token_here",
              Accept: "application/json",
            },
          },
        },
      ];

      const results = await fetchMultipleRequests(requests);

      const [users] = results || [];

      if (!users?.success) {
        throw new Error(users?.message || "unLike action failed");
      }

      if (users?.success) {
        localStorage.setItem("UsersProfile", JSON.stringify(users));

        // socket.emit("newProfileImage", { email, dataUrl });
        socket.on("unlikeError", (msg) => {
          setError(true);
          setMessage(msg);
          setTimeout(() => {
            setError(false);
            setMessage("");
          }, 2000);
        });
      } else {
        throw new Error(users?.error || "failed to unLike post");
      }
    } catch (error) {
      setError(true);
      setMessage(error.message || "Error unLiking post");
    } finally {
      setLoading(false);
      setMediaUrl("");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handlePostDisplay = async (email, postId, notif_id) => {
    //
    localStorage.setItem("postDisplayEmail", email);
    localStorage.setItem("postDisplayPostId", postId);
    localStorage.setItem("postDisplayNotif_id", notif_id);
    setError(false);
    setMessage("");

    if (!email || !postId) {
      setError(true);
      setMessage("Poster or liker email missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Base_Url}/api/postDisplay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, postId, notif_id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to display post");
      }

      // setSuccess(true);
      // setMessage("Post displayed ");
      setPostDisplay(data);
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        setMessage("");
      }, 2000);
    } catch (error) {
      // setError(true);
      // setMessage(error.message || "Error displaying post");
    } finally {
      setMediaUrl("");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  const handleClearNotif = async (notif_id) => {
    setLoading(true);
    setError(false);
    setSuccess(false);
    setMessage("");

    if (!email) {
      setError(true);
      setMessage("Poster or liker email missing.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Base_Url}/api/clearNotifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, notif_id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update notification");
      }

      setSuccess(true);
      setMessage("notif updated ");
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        setMessage("");
      }, 2000);
    } catch (error) {
      setError(true);
      setMessage(error.message || "Error updating notification");
    } finally {
      setMediaUrl("");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleComment = async (PostEmail, postId, commentText) => {
    setError(false);
    setSuccess(false);
    setMessage("");

    if (!PostEmail || !postId || !commentedUser || !commentText) {
      setError(true);
      setMessage("empty input please try again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Base_Url}/api/commentedPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ PostEmail, postId, commentedUser, commentText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to comment on post ");
      }

      setSuccess(true);
      setMessage("comment sent");
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        setMessage("");
      }, 2000);
    } catch (error) {
      setError(true);
      setMessage(error.message || "Error commenting on post");
    } finally {
      setComment("");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleAddFriends = async (ReciverEmail) => {
    setError(false);
    setSuccess(false);
    setMessage("");

    if (!email || !ReciverEmail) {
      setError(true);
      setMessage("empty input please try again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Base_Url}/api/addFriends`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ AdderEmail: email, ReciverEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to send friend request to user "
        );
      }

      setSuccess(true);
      setMessage("friend request sent");
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        setMessage("");
      }, 2000);
    } catch (error) {
      setError(true);
      setMessage(error.message || "Error sending friend request");
    } finally {
      setComment("");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  const handleAcceptFriends = async (requestId, ReciverEmail) => {
    setError(false);
    setSuccess(false);
    setMessage("");

    if (!email || !ReciverEmail || !requestId) {
      setError(true);
      setMessage("empty input please try again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${Base_Url}/api/acceptFriendRequest/${requestId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usersEmail: email, ReciverEmail }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to accept friend request to user "
        );
      }

      setSuccess(true);
      setMessage("friend request accepted");
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        setMessage("");
      }, 2000);
    } catch (error) {
      setError(true);
      setMessage(error.message || "Error accepting friend request");
    } finally {
      setComment("");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleUnFriend = async (friendId, ReciverEmail) => {
    setError(false);
    setSuccess(false);
    setMessage("");

    if (!email || !ReciverEmail || !friendId) {
      setError(true);
      setMessage("empty input please try again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Base_Url}/api/unfriend/${friendId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: email, ReciverEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to unFriend request to user ");
      }

      setSuccess(true);
      setMessage("unFriend request accepted");
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        setMessage("");
      }, 2000);
    } catch (error) {
      setError(true);
      setMessage(error.message || "Error accepting unfriend request to user");
    } finally {
      setMessage("");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleDeleteFriendRequests = async (requestId) => {
    setError(false);
    setSuccess(false);
    setMessage("");

    if (!email) {
      setError(true);
      setMessage("empty input please try again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${Base_Url}/api/deleteFriendRequest/${requestId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to send friend request to user "
        );
      }

      setSuccess(true);
      setMessage("friend request sent");
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        setMessage("");
      }, 2000);
    } catch (error) {
      setError(true);
      setMessage(error.message || "Error sending friend request");
    } finally {
      setComment("");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleChatRoom = async (chatEmail, requestId) => {
    localStorage.removeItem("chatUser");

    setError(false);
    setSuccess(false);
    setMessage("");

    if (!email || !chatEmail || !requestId) {
      setError(true);
      setMessage("empty input please try again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Base_Url}/api/chatUser/${requestId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: email, chatEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to get user chat room ");
      }

      setSuccess(true);
      setMessage("chat room accessed");
      setLoading(false);
      localStorage.setItem("chatUser", JSON.stringify(data));
      setTimeout(() => {
        setSuccess(false);
        navigate("/chatroom");
        setMessage("");
      }, 2000);
    } catch (error) {
      setError(true);
      setMessage(error.message || "Failed to get user chat room");
    } finally {
      setMessage("");
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleChatInput = async (e) => {
    e.preventDefault();
    setChatInput(e.target.value);
  };

  const handleChat = async (chatEmail, requestId, ChatInput) => {
    setError(false);
    setSuccess(false);
    setMessage("");

    if (!email || !chatEmail || !requestId || !ChatInput) {
      setError(true);
      setMessage("empty input please try again.");
      setLoading(false);
      return;
    }

    if (ChatInput.trim() === "") return;

    console.log(email, chatEmail, requestId, ChatInput);

    // try {
    //   const response = await fetch(`${Base_Url}/api/chatUser/${requestId}`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ userEmail: email, chatEmail }),
    //   });

    //   const data = await response.json();

    //   if (!response.ok) {
    //     throw new Error(data?.message || "Failed to get user chat room ");
    //   }

    //   setSuccess(true);
    //   setMessage("chat room accessed");
    //   setLoading(false);
    //   setTimeout(() => {
    //     setSuccess(false);
    //     navigate("/chatroom");
    //     setMessage("");
    //   }, 2000);
    // } catch (error) {
    //   setError(true);
    //   setMessage(error.message || "Failed to get user chat room");
    // } finally {
    //   setMessage("");
    //   setTimeout(() => {
    //     setError(false);
    //   }, 3000);
    // }
  };

  // check if user is online
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [navigator.onLine]);

  // function to handle multiple requests
  const [userProfile, posts, Users] = result || [];

  // Fetch data when email becomes available
  React.useEffect(() => {
    if (!email) return;

    const fetchData = async () => {
      const results = await fetchMultipleRequests(requests);

      setResult(results);
      setHideNav(true);
    };

    fetchData();
    handleSocket();

    const interval = setInterval(fetchData, 1000); // auto-refresh every 1s

    return () => clearInterval(interval); // cleanup on unmount
  }, [email]); // only runs when email is set

  // console.log("Results from multiple requests:", data);

  return (
    <MyContext.Provider
      value={{
        // fetch requests section start
        userProfile,
        posts,
        Users,
        email,
        // fetch request section end

        // image section setup
        fileInputRef,
        handleSvgClick,
        handleFileChange,
        MediaUrl,
        setMediaUrl,
        handleClearMedia,
        // image section setup end

        // check is user authenticated section start
        isAuthenticated,
        hideNav,
        // check is user authenticated section end

        // error success message section start
        loading,
        error,
        message,
        success,
        // error success message section end

        // sign up login and logout section start
        formData,
        showPassword,
        setShowPassword,
        handleChange,
        handleSubmit,
        handleLogin,
        handleLogout,
        // sign up login and logout section end

        // model section start
        Dialog,
        DialogBackdrop,
        DialogPanel,
        DialogTitle,
        ExclamationTriangleIcon,
        open,
        setOpen,
        setHideNav,
        modalOpen,
        setModalOpen,
        // model section end

        // profile image upload section start
        handleProfileSubmit,
        handleGetUsersProfile,
        handlePostDisplay,
        handleClearNotif,
        // profile image upload section end

        // create post section start
        Discard,
        handlePostChange,
        handlePostSubmit,
        postDisplay,
        // liked post section
        handleLikedPosts,
        handleUnLikePosts,

        // comment post section
        commentText,
        handleCommentChange,
        handleComment,

        // Add friends section
        handleAddFriends,
        handleAcceptFriends,
        handleUnFriend,
        handleDeleteFriendRequests,

        // chat room section
        isOnline,
        handleChatRoom,
        handleChat,
        ChatInput,
        handleChatInput,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

// 3. Optional: create a custom hook for easier use
export function useMyContext() {
  return useContext(MyContext);
}

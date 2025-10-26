import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ClearChatStorageOnRouteChange() {
  const location = useLocation();

  useEffect(() => {
    // If the user is NOT on the chat route, remove chat-related items
    if (!location.pathname.startsWith("/chatroom")) {
      localStorage.removeItem("chatRoom");
      console.log("remove"); // or any key you use
    }
  }, [location.pathname]);

  return null;
}

export default ClearChatStorageOnRouteChange;

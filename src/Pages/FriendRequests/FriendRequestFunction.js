import React from "react";
import { ActiveUser } from "../../config/FriendConfig/FriendConfig";
import { Base_Url } from "../../Db/Dburl";

const FriendRequestFunction = () => {
  const [userData, setUserData] = React.useState(null);
  const [friendLoading, setFriendLoading] = React.useState(false);
  const [friendError, setFriendError] = React.useState(false);
  const [friendMessage, setFriendMessage] = React.useState("");

  const options = {
    method: "GET", // optional, because GET is default
    headers: {
      Authorization: "Bearer your_token_here",
      Accept: "application/json",
    },
  };

  const handleFriend = React.useCallback(async () => {
    try {
      setFriendLoading(true);
      const data = await ActiveUser(`${Base_Url}/api/users`, options);
      setUserData(data);
      setFriendLoading(false);
    } catch (error) {
      setFriendLoading(false);
      setFriendError(true);
      setFriendMessage(error.message || "Something went wrong");
    }
  }, [options]);

  React.useEffect(() => {
    handleFriend();
  }, [handleFriend]);

  return { userData, friendError, friendMessage, friendLoading };
};

export default FriendRequestFunction;

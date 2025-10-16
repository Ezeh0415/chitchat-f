import { Base_Url } from "../../Db/Dburl";

export const UpdateProfileImage = async (email, dataUrl) => {
  return fetch(`${Base_Url}/api/chit-chat-profile-img`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      media: dataUrl,
      email: email,
    }),
  })
    .then((response) => {
      // Check if response is OK (status 2xx)
      if (!response.ok) {
        // If not OK, parse error message and throw to jump to catch
        return response.json().then((errorData) => {
          // Throw an error with the message from backend or default
          throw new Error(errorData.message || "profile update failed");
        });
      }
      // If OK, parse the response body
      return response.json();
    })
    .then((data) => {
      return { ok: true, data };
      // console.log("Signup successful:", data);
    })
    .catch((error) => {
      // Handle errors here
      return { ok: false, errorMessage: error.message };
    });
};

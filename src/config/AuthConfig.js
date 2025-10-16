import { Base_Url } from "../Db/Dburl";

export const signup = async (firstName, lastName, password, email) => {
  return fetch(`${Base_Url}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      // Check if response is OK (status 2xx)
      if (!response.ok) {
        // If not OK, parse error message and throw to jump to catch
        return response.json().then((errorData) => {
          // Throw an error with the message from backend or default
          throw new Error(errorData.message || "Signup failed");
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

export const login = async (password, email) => {
  return fetch(`${Base_Url}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      // Check if response is OK (status 2xx)
      if (!response.ok) {
        // If not OK, parse error message and throw to jump to catch
        return response.json().then((errorData) => {
          // Throw an error with the message from backend or default
          throw new Error(errorData.message || "Signup failed");
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

export const HandleLogout = async (url) => {
  try {
    const res = await fetch(url, {
      method: "GET", // Correct HTTP method
    });
    if (!res.ok) throw new Error("Logout failed");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Logout API error:", error);
    throw error;
  }
};

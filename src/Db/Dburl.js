import { ActiveUser } from "./Database";

export const Base_Url = "http://localhost:8080";

export const fetchMultipleRequests = async (requests) => {
  const promises = requests.map(({ url, options }) => ActiveUser(url, options));

  try {
    const results = await Promise.all(promises);
    return results; // ✅ always returns an array
  } catch (error) {
    console.error("Error fetching multiple requests:", error);
    // ❌ Don't return an object — return an array of error results
    return requests.map(() => ({
      ok: false,
      error: error.message || "Unknown error",
    }));
  }
};

export const ActiveUser = async (urls, options = {}) => {
  if (Array.isArray(urls)) {
    // multiple URLs
    const promises = urls.map(url => fetch(url, options).then(async response => {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          ok: false,
          status: response.status,
          error: errorData.message || "HTTP error",
        };
      }
      return response.json();
    }).catch(error => ({
      ok: false,
      error: error.message || "Network error",
    })));

    return Promise.all(promises);
  } else {
    // single URL, your original logic
    try {
      const response = await fetch(urls, options);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          ok: false,
          status: response.status,
          error: errorData.message || "HTTP error",
        };
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      return { ok: false, error: error.message || "Network error" };
    }
  }
};


// for getting data from the API

// const options = {
//   method: 'GET',  // optional, because GET is default
//   headers: {
//     'Authorization': 'Bearer your_token_here',
//     'Accept': 'application/json',
//   },
// };

// const options = {
//   method: 'POST', // Change from GET to POST
//   headers: {
//     'Authorization': 'Bearer your_token_here',
//     'Accept': 'application/json',
//     'Content-Type': 'application/json', // Important for JSON POST body
//   },
//   body: JSON.stringify({
//     key1: 'value1',
//     key2: 'value2',
//   }),
// };

// Common options properties:
// const options = {
//   method: 'POST',  // HTTP method, default is 'GET'
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer your_token_here'
//   },
//   body: JSON.stringify({ name: 'Godwin' }),  // body only for POST/PUT/PATCH
//   credentials: 'include',  // send cookies with request
//   mode: 'cors',  // cross-origin resource sharing mode
//   cache: 'no-cache',  // cache policy
// };

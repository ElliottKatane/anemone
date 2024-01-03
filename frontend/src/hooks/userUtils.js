export const updateUserScoreMax = async (email, newScore) => {
  const url = `https://anemone-backend.onrender.com/api/user/updateScoreMax/${email}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newScore }),
    });

    if (!response.ok) {
      throw new Error("Failed to update the maximum score.");
    }

    const data = await response.json();

    // Optionally, you can return the data if needed.
    return data;
  } catch (error) {
    // Handle any errors that occur during the fetch or processing.
    throw error;
  }
};
export const updateUserDiscoveredVerbs = async (email, newDiscoveredVerbs) => {
  const url = `https://anemone-backend.onrender.com/api/user/updateUserDiscoveredVerbs/${email}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newDiscoveredVerbs }),
    });

    if (!response.ok) {
      throw new Error("Failed to update the list of discovered verbs.");
    }

    const data = await response.json();

    // Optionally, you can return the data if needed.
    return data;
  } catch (error) {
    // Handle any errors that occur during the fetch or processing.
    throw error;
  }
};

export function getUserProfile(email) {
  return fetch(`https://anemone-backend.onrender.com/api/user/profile/${email}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      return response.json();
    })
    .then((data) => {
      return data; // User profile data received from the API
    })
    .catch((error) => {
      throw error;
    });
}

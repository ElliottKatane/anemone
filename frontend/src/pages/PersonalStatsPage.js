import { React, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Navigation from "../Components/Navigation";
import { Link } from "react-router-dom";
function PersonalStatsPage() {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Fetch the user's profile data based on their email
      fetch(
        `https://anemone-backend.onrender.com/api/user/profile/${user.email}`
      )
        .then((response) => response.json())
        .then((data) => {
          setProfileData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <Navigation />
        <h1>User Profile</h1>
        <p>Email: {profileData.email}</p>
        <p>Score Max : {profileData.scoreMax} </p>
        <p>
          {profileData.discoveredVerbs.length === 0
            ? "Vous n'avez pas encore découvert de verbes. "
            : "Discovered verbs : " + profileData.discoveredVerbs.join(", ")}
          {profileData.discoveredVerbs.length === 0 && (
            <Link to="/litterature">Allez jouer !</Link>
          )}
        </p>
      </div>
    );
  } else {
    return <p>Please log in to view your profile.</p>;
  }
}

export default PersonalStatsPage;

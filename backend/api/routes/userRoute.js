const express = require("express");
const router = express.Router();

// controller functions

const {
  signupUser,
  loginUser,
  updateUserScoreMax,
  getUserProfile,
  updateUserDiscoveredVerbs,
} = require("../controllers/userController");

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// update scoreMax route
// donc: http://localhost:5001/api/user/updateScoreMax/email@email.com
router.post("/updateScoreMax/:email", updateUserScoreMax);

// update discoveredVerbs route
// donc: http://localhost:5001/api/user/updateDiscoveredVerbs/email
router.post("/updateUserDiscoveredVerbs/:email", updateUserDiscoveredVerbs);

// get userProfile route
router.get("/profile/:email", getUserProfile);

module.exports = router;

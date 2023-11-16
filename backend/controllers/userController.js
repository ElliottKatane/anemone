// on utilise User pour faire des requêtes dans la collection User, à la base de données.
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//MAJ du score Max (si > que le score max actuel)
const updateUserScoreMax = async (req, res) => {
  const email = req.params.email; // Get the email from the request parameters
  const newScore = req.body.newScore;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Update the user's scoreMax
    user.scoreMax = newScore;
    await user.save();

    res.status(200).json({ message: "Score maximal mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//MAJ de la liste des verbes découverts
const updateUserDiscoveredVerbs = async (req, res) => {
  const email = req.params.email; // Obtenez l'e-mail des paramètres de la requête
  const newDiscoveredVerbs = req.body.newDiscoveredVerbs; // Les nouveaux verbes découverts par l'utilisateur pendant le jeu

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Mettez à jour la liste des verbes découverts de l'utilisateur
    user.discoveredVerbs = newDiscoveredVerbs;
    await user.save();

    res
      .status(200)
      .json({ message: "Liste des verbes découverts mise à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// infos de l'user. La méthode est écrite en statics.methods dans le modèle userModel.js
const getUserProfile = async (req, res) => {
  const email = req.params.email; // Get the email from the request parameters

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const userProfile = user.getUserProfile(); // Call the method to get the user's profile
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  loginUser,
  signupUser,
  updateUserScoreMax,
  getUserProfile,
  updateUserDiscoveredVerbs,
};

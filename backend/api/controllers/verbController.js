const Verb = require("../models/verbModel");

// Fonction pour récupérer tous les verbes depuis la base de données
const getAllVerbs = async (req, res) => {
  try {
    const verbs = await Verb.find();
    const response = {
      verbs,
    }; // Utilisation du modèle Mongoose 'Verb' et de la méthode 'find'
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllVerbs };

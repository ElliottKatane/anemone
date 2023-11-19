import React, { useState, useEffect, useMemo, useContext } from "react";
import VerbesEnA from "../verbes/VerbesEnA";
import { AuthContext } from "../context/AuthContext";
import {
  updateUserScoreMax,
  updateUserDiscoveredVerbs,
  getUserProfile,
} from "../hooks/userUtils";
import "./Game.css";
import { motion } from "framer-motion";
import AnimatedWord from "./AnimatedWord";

const Game = () => {
  // les states
  const [errorCount, setErrorCount] = useState(0); // Compteur d'erreurs
  const [score, setScore] = useState(0); // Score du joueur
  const [verbsFound, setVerbsFound] = useState([]); // Liste des verbes trouvés
  const [erroneousVerbs, setErroneousVerbs] = useState([]); // Liste des verbes erronés [à implémenter]
  const [errorMessage, setErrorMessage] = useState(""); // Message d'erreur (contenu dans une balise p)
  const [hardMode, setHardMode] = useState(false); // Mode difficile
  const [secondLetter, setSecondLetter] = useState(""); // Lettre imposée en mode difficile
  const [fiveInARow, setFiveInARow] = useState(0); // 5 verbes trouvés d'affilée / déclenche le hard mode à 5 / se reset à 0 si erreur
  const [discoveredVerbs, setDiscoveredVerbs] = useState([]); // Liste des verbes découverts au début de chaque partie
  // l'utilisateur enregistré :
  const { user } = useContext(AuthContext);

  // Récupération de la liste des verbes découverts au début de chaque partie
  useEffect(() => {
    // Charger la liste des verbes découverts au chargement du jeu
    if (user) {
      getUserProfile(user.email)
        .then((profileData) => {
          setDiscoveredVerbs(profileData.discoveredVerbs);
          console.log(
            "profileData.discoveredVerbs",
            profileData.discoveredVerbs
          );
        })
        .catch((error) => {
          console.error("Error fetching user profile data:", error);
        });
    }
  }, [user]);

  // array 2e lettre
  /*1*/ const arrayDeuxiemeLettre = useMemo(() => {
    return [...new Set(VerbesEnA.map((verb) => verb[1]))];
  }, []);
  /*2*/ const [secondLettersAvailable, setSecondLettersAvailable] =
    useState(arrayDeuxiemeLettre); // Liste des lettres disponibles en mode difficile

  // Gérer la fin du jeu :
  const handleEndOfGame = () => {
    // Mettre à jour la liste des verbes découverts à la fin du jeu
    if (user) {
      // Utiliser un ensemble pour garantir l'unicité des verbes
      const uniqueNewVerbsSet = new Set(
        verbsFound.filter((verb) => !discoveredVerbs.includes(verb))
      );
      // On convertir le set en tableau
      const uniqueNewVerbs = [...uniqueNewVerbsSet];

      // Combinez les verbes découverts précédemment avec les nouveaux verbes uniques
      const updatedVerbs = [...discoveredVerbs, ...uniqueNewVerbs];
      updateUserDiscoveredVerbs(user.email, updatedVerbs);
    }
    alert("Partie terminée. Votre score est de : " + score);
    // Fetch the user's profile data first
    getUserProfile(user.email)
      .then((profileData) => {
        if (score > profileData.scoreMax) {
          // The current score is higher than the previous max score
          updateUserScoreMax(user.email, score);

          // Send a special congratulatory message
          alert("Félicitations ! Vous avez battu votre meilleur score !");
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });

    // Reset the game state
    setVerbsFound([]);
    setScore(0);
    setErroneousVerbs([]);
    setErrorCount(0);
    setErrorMessage("");
  };

  // Fonction pour gérer la soumission d'un verbe trouvé
  const handleVerbSubmission = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior.

    // Récupérer la valeur de l'utilisateur, en minuscules et sans espace inutile.
    const verbInput = event.target.verbInput.value.trim().toLowerCase();

    // Vérifier si le verbe est découvert
    const isNewVerb = !discoveredVerbs.includes(verbInput);

    // Si le verbe input est vide...
    if (verbInput === "") {
      setErrorMessage("Entrez un verbe svp");

      // Sinon, si le verbe est correct...
    } else if (VerbesEnA.includes(verbInput)) {
      if (!verbsFound.includes(verbInput)) {
        // si hard mode désactivé ou que hardmode activé et que la deuxième lettre est correcte
        if (!hardMode || (hardMode && verbInput[1] === secondLetter)) {
          // Le verbe est correct et nouveau : +1 score
          setVerbsFound([...verbsFound, verbInput]); // ajout à la liste des verbes trouvés

          setScore(score + 1); // score + 1
          setErrorMessage(""); // Reset du message d'erreur.
          setFiveInARow(fiveInARow + 1); // +1 au compteur de "5 à la suite" qui déclenche le hardMode

          if (isNewVerb) {
            updateUserDiscoveredVerbs(user.email, [
              ...discoveredVerbs,
              verbInput,
            ]);
            console.log(
              "c'est là que j'ajoute le verbe découvert: " + verbInput
            );
          }
          if (hardMode) {
            const availableLetters = secondLettersAvailable.filter(
              (letter) => letter !== secondLetter
            );

            if (availableLetters.length > 0) {
              const randomIndex = Math.floor(
                Math.random() * availableLetters.length
              );
              const newLetter = availableLetters[randomIndex];
              setSecondLetter(newLetter);
              setSecondLettersAvailable(availableLetters);
            } else {
              setHardMode(false);
              setSecondLetter("");
            }
          }
        }
        // sinon, si le hardMode est activé et que la deuxième lettre est incorrecte
        else {
          setErrorMessage(
            `Verbe incorrect. La deuxième lettre doit être "${secondLetter}" en mode difficile.`
          );
        }
      } // Sinon, si le verbe est déjà dans la liste des verbes trouvés...
      else {
        setErrorMessage("Verbe déjà trouvé");
      }
    } // Sinon, si le verbe est incorrect...
    else {
      setErrorCount((prevCount) => prevCount + 1); // erreur +1

      // FIN DU JEU - RESET DU SCORE qu'on envoie à la base de données
      if (errorCount >= 4 && user) {
        handleEndOfGame();
      }
      // Sinon, si le verbe est incorrect et n'est pas dans la liste des verbes erronés
      else {
        setErrorMessage("Verbe incorrect");
        setErroneousVerbs([...erroneousVerbs, verbInput]);
        setHardMode(false); // désactivation du hard mode
        setFiveInARow(0); // reset du compteur de verbes trouvés d'affilée
      }
    }
    event.target.reset(); // Reset the form after submission.
  };

  // le set permet de supprimer les doublons ! Ne garde qu'une occurrence de chaque 2e lettre

  // useEffect qui surveille le score et active le hard mode à 5
  useEffect(() => {
    // Changer la deuxième lettre imposée du verbe en mode difficile
    const updateSecondLetter = () => {
      const randomIndex = Math.floor(
        Math.random() * arrayDeuxiemeLettre.length
      );
      setSecondLetter(arrayDeuxiemeLettre[randomIndex]);
      // Mettez à jour également secondLettersAvailable si nécessaire
    };

    if (fiveInARow === 5 && !hardMode) {
      //Active le hard mode
      setHardMode(true);
      // Générez une deuxième lettre aléatoire
      updateSecondLetter();
    }
  }, [score, hardMode, arrayDeuxiemeLettre, fiveInARow]);

  // pour HardMode coloré.
  const word = "HARDMODE";

  return (
    <div className="container">
      <div className="submitInput-container">
        {/* Bouton de soumission et input */}
        <form onSubmit={handleVerbSubmission}>
          <input type="text" name="verbInput" className="submitInput" />
          <button type="submit" className="submit-btn">
            Soumettre
          </button>
        </form>
      </div>

      <div className="container-score-et-erreurs">
        <div className="score-container">
          <h2>Score: {score}</h2>
          <h2>Erreurs: {errorCount}</h2>
          <h2>Verbes trouvés:</h2>
          {hardMode ? (
            <div className="hardmode-container">
              <p>Mode difficile : Imposer la deuxième lettre: {secondLetter}</p>
              <AnimatedWord word={word} />
            </div>
          ) : (
            <p>A 5, déclenchez le HardMode : {fiveInARow}</p>
          )}
          <ul>
            {verbsFound.map((verb, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                exit={{ opacity: 0, x: 20 }}
                variants={{
                  normal: { opacity: 1, x: 0 },
                  new: { opacity: 1, x: 0, color: "green", fontWeight: "bold" },
                }}
                animate={discoveredVerbs.includes(verb) ? "normal" : "new"}
              >
                {/* le verbe découvert est déjà dans la liste discoveredVerbs ? on l'affiche simplement. Sinon on ajoute "Nouveau!" à côté */}
                {discoveredVerbs.includes(verb) ? verb : `${verb} (Nouveau !)`}
              </motion.li>
            ))}
          </ul>

          <p className="error">{errorMessage}</p>
        </div>
        <div className="erroneousVerbs-container">
          {/* Mapping de erroneousVerbs */}
          <h2>Erreurs:</h2>
          <ul>
            {erroneousVerbs.map((verb, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {verb}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Game;

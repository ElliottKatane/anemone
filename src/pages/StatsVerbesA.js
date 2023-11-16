import React, { useEffect, useState } from "react";
import VerbesEnA from "../verbes/VerbesEnA";
import "./StatsVerbesA.css";
import Navigation from "../Components/Navigation";
const StatsVerbesA = () => {
  // initialisation d'un objet pour stocker les verbes classés par leur première lettre après le "a"
  const [verbesClassementParLettre, setVerbesClassementParLettre] = useState(
    {}
  );
  // initialisation d'un objet pour stocker les verbes classés par leur nombre de lettres
  const [comptageParNombreDeLettres, setComptageParNombreDeLettres] = useState(
    []
  );

  // Classer les verbes par leurs deux premières lettres
  useEffect(() => {
    const categorizedVerbs = VerbesEnA.reduce((acc, verb) => {
      // substring permet d'extraire les 2 premières lettres de chaque verbe
      const deuxPremieresLettresA = verb.substring(0, 2);
      // It checks whether the key (two-letter combination) exists in the accumulator (VerbesClassementParLettre). If it doesn't exist, a new key is created, and an empty array is assigned to it.
      if (!acc[deuxPremieresLettresA]) {
        acc[deuxPremieresLettresA] = [];
      }
      //The verb is then added to the array associated with its two-letter combination.
      acc[deuxPremieresLettresA].push(verb);
      return acc;
    }, {});

    setVerbesClassementParLettre(categorizedVerbs);
  }, []);

  // Compter les verbes par nombre de lettres
  useEffect(() => {
    const comptageLettres = VerbesEnA.reduce((comptage, verb) => {
      // la longueur est le nombre de lettres du verbe
      const longueur = verb.length;
      if (comptage[longueur]) {
        comptage[longueur]++;
      } else {
        comptage[longueur] = 1;
      }
      return comptage;
    }, {});
    setComptageParNombreDeLettres(comptageLettres);
  }, []);
  // Le verbe le plus court
  const verbeLePlusCourt = VerbesEnA.reduce((plusCourte, iteration) => {
    return iteration.length < plusCourte.length ? iteration : plusCourte;
  }, VerbesEnA[0]);

  // Le verbe le plus long
  const verbeLePlusLong = VerbesEnA.reduce((plusLongue, iteration) => {
    return iteration.length > plusLongue.length ? iteration : plusLongue;
  }, VerbesEnA[0]);

  return (
    <div>
      <Navigation />

      <div className="verb-container">
        <div className="generalstats-container">
          <h1>Nombre total de verbes: {VerbesEnA.length} </h1>
          <h4> Verbe le plus court : {verbeLePlusCourt.length} lettres</h4>
          <h4> Verbe le plus long : {verbeLePlusLong.length} lettres</h4>
        </div>
        <h1> Classification des verbes</h1>
        <h1>Comptage par nombre de lettres</h1>
        <div className="verb-columns">
          {Object.keys(comptageParNombreDeLettres).map((longueur) => (
            <div key={longueur} className="verb-list-box">
              <h3>
                Verbes avec {longueur} lettre(s) :{" "}
                {comptageParNombreDeLettres[longueur]}
              </h3>
            </div>
          ))}
        </div>
        <div className="verb-columns">
          {Object.keys(verbesClassementParLettre).map((key) => (
            <div key={key} className="verb-list-box">
              <h3>
                Verbs starting with "{key}"{" "}
                {verbesClassementParLettre[key].length}
              </h3>
              <ul>
                {verbesClassementParLettre[key].map((verb, index) => (
                  <li key={index}>{verb}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsVerbesA;

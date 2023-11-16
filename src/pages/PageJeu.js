import React from "react";
import Game from "../Components/Game";
import Navigation from "../Components/Navigation";
import "./PageJeu.css";
const PageJeu = () => {
  return (
    <div>
      <Navigation />
      <div className="rules-container">
        <h2>Règles: </h2>
        <h4>Trouvez le maximum de verbes commençant par la lettre A</h4>

        <h4>
          Hard mode : lorsque 5 verbes sont trouvés, le hardMode est activé:
          <h4>
            la deuxième lettre est alors imposée. Il se désactive lorsque le
            joueur fait une erreur.
          </h4>
        </h4>
        <h4>Le jeu s'arrête lorsque vous atteignez 5 erreurs.</h4>
        <h5>Pas de particule pronominale (se, s')</h5>
        <h5>Les accents comptent : é è ê â</h5>
      </div>
      <Game />
    </div>
  );
};

export default PageJeu;

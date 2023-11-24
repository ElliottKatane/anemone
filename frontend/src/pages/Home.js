import React from "react";
import Navigation from "../Components/Navigation";
import "./home.css";
const Home = () => {
  return (
    <div>
      <Navigation />
      <div className="rules-container">
        <h2>Règles: </h2>
        <h4>Trouvez le maximum de verbes commençant par la lettre A</h4>

        <h4>
          Hard mode : lorsque 5 verbes sont trouvés, le hardMode est activé:
          <h4>
            la deuxième lettre est alors imposée. Il se désactive lorsqu'une
            erreur est commise.
          </h4>
        </h4>
        <h4>Le jeu s'arrête lorsque vous atteignez 5 erreurs.</h4>
        <h5>
          Pas de particule pronominale (s') et les accents (é è ê â) comptent.
        </h5>
        <h5>Non sensible à la casse.</h5>
      </div>
    </div>
  );
};

export default Home;

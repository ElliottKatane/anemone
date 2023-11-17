import React from "react";
import Navigation from "../Components/Navigation";
import "./home.css";
const Home = () => {
  return (
    <div>
      <Navigation />
      <div className="menu-home">
        <p>Nouvelle partie (s'enregistrer)</p>
        <p>Continuer (s'identifier)</p>
        <p>Options(nan je rigole)</p>
        <p>A propos</p>
        Bienvenue à la maison
      </div>
    </div>
  );
};

export default Home;

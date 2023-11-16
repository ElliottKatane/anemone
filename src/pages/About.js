import React from "react";
import Navigation from "../Components/Navigation";
import "./About.css";

const About = () => {
  return (
    <div>
      <Navigation />

      <div className="about-container">
        <div className="paragraph">
          <p>
            « littérature » : projet personnel partant d’une idée simple : jouer
            avec les mots. Le but est de trouver le maximum de verbes commençant
            par la lettre A. C’est un petit jeu qui nous avait été proposé à
            l'école, lorsque j’avais 8 ans. Mon esprit obsessionnel avait adoré
            cette épreuve et, souvent, j’y repensais : quels nouveaux verbes
            commençant par A connais-je ? 27 ans plus tard, désormais en
            reconversion en développement web, j’ai transposé cette idée dans
            une application React.
          </p>
        </div>

        <div className="paragraph">
          <div>
            Pour la logique du jeu, j’ai principalement utilisé useState,
            useEffect.
            <p>
              Concernant les statistiques, j’ai utilisé reduce, substring, et
              map pour extraire les données présentes sur la page.
              <div>
                Navigation : BrowserRoute, Routes, Route, NavLink CSS classique
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

import React from "react";
import Navigation from "../Components/Navigation";
import "./About.css";

const About = () => {
  return (
    <div>
      <Navigation />

      <div className="about-container">
        <div className="paragraph">
          <h3>Qu'est-ce qu'Anemone ?</h3>
          <p>
            « Anemone » : projet personnel partant d’une idée simple : jouer
            avec les mots. Le but est de trouver le maximum de verbes commençant
            par la lettre A. C’est un petit défi qui nous avait été proposé à
            l'école, plus jeune. C'est à mon tour de vous le proposer ! Combien
            de verbes commençant par la lettre A connaissez-vous ?
          </p>
        </div>
        <div className="paragraph">
          <h3>Stack utilisée</h3>
          <p>
            Le projet est réalisé avec la stack MERN (MongoDB, Express, React,
            NodeJS)
          </p>
          Le système d'authentification est réalisé avec JWT. Les mots de passe
          sont hashés avec bcrypt.
        </div>
        <div className="paragraph">
          <h3>Hooks et logique de jeu</h3>
          <p>
            Pour la logique du jeu, j’ai principalement utilisé useState,
            useEffect.
          </p>
          <p>Le système d'identification utilise useContext</p>
          <p>
            Navigation : BrowserRoute, Routes, Route, NavLink, CSS classique
          </p>
        </div>
        <div className="paragraph">
          <p>
            <h3>L'onglet Solutionnaire</h3>
            <p>
              L'onglet "Solutionnaire" détaille la liste des{" "}
              <a href="http://verbe.mobi/verbes-commencant-par-A">
                {" "}
                882 verbes commençant par la lettre A en Français.
              </a>
              Vous trouverez le nombre de verbes par nombre de lettres, ainsi
              que la liste des verbes classés par leur première lettre après le
              "a".
            </p>
          </p>
          <p>Méthodes utilisées : map, reduce, substring, push.</p>
        </div>
        <div className="paragraph">
          <p>
            <h3>Formulaire de contact</h3>
            <p>
              Le formulaire a été réalisé avec React Hook Form, emailJS,
              Toastify.
            </p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

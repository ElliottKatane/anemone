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
            l'école, lorsque j’avais 8 ans. C'est à mon tour de vous le proposer
            ! Combien de verbes commençant par la lettre A connaissez-vous ?
            Pourquoi Anemone ? Le projet pourrait évoluer vers un jeu de
            "collection" de verbes et de conjugaison. La sonorité du mot
            rappelle celui de "Pokemon", un jeu de collection de monstres de
            poche...
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
          <h3>Pourquoi Login et Signup sont désactivés ?</h3>
          <p>
            Le déploiement sur Vercel de la partie backend avec Express a été
            une vraie bataille... que je n'ai pas gagnée. J'ai donc décidé de
            rendre le projet accessible malgré tout, en désactivant les parties
            qui nécessitent l'accès à la base de données. J'ai également modifié
            le code du jeu pour qu'ils fassent appel à un array de verbes stocké
            en dur dans le code, plutôt qu'à la base de données.
          </p>
          <p>
            Egalement désactivée : la page "Mes stats", sur laquelle vous pouvez
            consulter les verbes déjà trouvés et votre plus haut score.
            Nécessite d'être identifié pour fonctionner.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

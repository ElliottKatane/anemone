import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navigation = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="nav">
        <Link to="/">
          <h1>Home</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
              <Link to="/personalstats">Mes stats</Link>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">S'identifier</Link>
              <Link to="/signup">S'enregistrer</Link>
            </div>
          )}
          <Link to="/litterature">Jeu</Link>
          <Link to="/stats">Stats</Link>
          <Link to="/about">A propos</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;

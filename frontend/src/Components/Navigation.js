import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import "./navigation.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navigation = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  let disabled = true;
  return (
    <header>
      <div className="nav">
        <div className="left-section">
          <Link to="/">
            <h1>Home</h1>
          </Link>
        </div>
        <nav className="right-section">
          {user && (
            <div>
              <span>{user.email}</span>
              <button className="logout-btn" onClick={handleClick}>
                Log out
              </button>
              <Link to={disabled ? "#" : "/personalstats"}>
                {disabled ? "Mes stats (désactivé)" : "Mes stats"}
              </Link>
            </div>
          )}
          {!user && (
            <div>
              <Link to={disabled ? "#" : "/login"}>
                {disabled ? "Login (désactivé)" : "Login"}
              </Link>
              <Link to={disabled ? "#" : "/signup"}>
                {disabled ? "Sign up (désactivé)" : "Signup	"}
              </Link>
            </div>
          )}
          <Link to="/litterature">Jeu</Link>
          <Link to="/stats">Solutionnaire</Link>
          <Link to="/about">A propos</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;

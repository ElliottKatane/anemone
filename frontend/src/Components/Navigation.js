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
              <Link to="/personalstats">Mes stats</Link>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
          <Link to="/litterature">Jeu</Link>
          <Link to="/stats">Solutionnaire</Link>
          <Link to="/about">A propos</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;

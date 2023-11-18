import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Use Routes, not BrowserRouter as Routes

//pages
import StatsVerbesA from "./pages/StatsVerbesA";
import PageJeu from "./pages/PageJeu";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Page404 from "./pages/Page404.js";
import PersonalStatsPage from "./pages/PersonalStatsPage";

//Contextes
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/stats" element={<StatsVerbesA />} />
        <Route path="/litterature" element={<PageJeu />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/personalstats"
          element={user ? <PersonalStatsPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

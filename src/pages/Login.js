import React from "react";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
// import "../index.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="login">
      <h3>S'identifier</h3>
      <label>Email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password</label>
      {/* e.target.value :
    e est l'event. target est l'input. value est la valeur de ce qui est rentré par l'user */}
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}> Login</button>
      {error && <div className="error">{error}</div>}
      <div>
        <p>
          Vous n'avez pas de compte ? <a href="/signup">Créer un compte</a>
        </p>
      </div>
    </form>
  );
};

export default Login;

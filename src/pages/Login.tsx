import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { login } from "../lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const nav = useNavigate();

  async function confirmLogin(e) {
    e.preventDefault();
    setMessage("");
    try {
      const data = await login(email, password);
      localStorage.setItem("workf_bruker", JSON.stringify(data.user));
      setMessage("Du er logget inn!");
      nav("/workfinder", { replace: true });
    } catch (err) {
      setMessage(err.message || "Feil brukernavn eller passord");
    }
  }

  return (
    <main className="login">
      <section>
        <header>
          <h1 className="title">Workfinder</h1>
          <h2 className="subtitle">Logg inn</h2>
        </header>

        <form onSubmit={confirmLogin}>
          <label>
            <span>E-post</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            <span>Passord</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit">Logg inn</button>
        </form>

        {message && <p className="status">{message}</p>}

        <footer className="registrer-knapp">
          <button type="button" className="registrer-btn" onClick={() => nav("/stilling")}>
            Registrer her!
          </button>
        </footer>
      </section>
    </main>
  );
}

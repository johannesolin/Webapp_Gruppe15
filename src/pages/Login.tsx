import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const nav = useNavigate();

  function confirmLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email === "test@test.com" && password === "1234") {
      setMessage("Du er logget inn");
      nav("/workfinder", { replace: true });
    } else {
      setMessage("Feil brukernavn eller passord");
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
          </label>

          <label>
            <span>Passord</span>
            <input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </label>

          <button type="submit">Logg inn</button>
        </form>

        {message && <p className="status">{message}</p>}

        <footer className="registrer-knapp">
          <button
            type="button"
            className="registrer-btn"
            onClick={() => nav("/stilling")}
          >
            Registrer her!
          </button>
        </footer>
      </section>
    </main>
  );
}

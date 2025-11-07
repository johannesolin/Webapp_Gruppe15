import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate, Link } from "react-router-dom";
import "./App.css";
import Workfinder from "./pages/Workfinder.jsx";
import Stilling from "./pages/Stilling.jsx";
import Agiver from "./pages/Agiver.jsx";
import Ataker from "./pages/Ataker.jsx";


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const nav = useNavigate();

  function confirmLogin(btn) {
    btn.preventDefault();
    if (email === "test@test.com" && password === "1234") {
      setMessage("Du er logget inn");
      nav("/workfinder", { replace: true });
    } else {
      setMessage("Feil brukernavn eller passord");
    }
  }

  return (
    <main>

      <section>

        <header>
          <h1 className="title">Workfinder</h1>
          <h2 className="subtitle">Logg inn</h2>
        </header>

        <form onSubmit={confirmLogin}>
          <label>
            <span>E-post</span>
            <input type="email" value={email} onChange={(btn)=>setEmail(btn.target.value)} required />
          </label>

          <label>
            <span>Passord</span>
            <input type="password" value={password} onChange={(btn)=>setPassword(btn.target.value)} required />
          </label>
          <button type="submit">Logg inn</button>
        </form>

        {message && <p className="status">{message}</p>}

        <footer className="registrer-knapp">
          <button type="button" className="registrer-btn" onClick={() => nav("/stilling")}>Registrer her!</button>
        </footer>

      </section>

    </main>
  );
}

export default function App() {
  console.log("Hei!");

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/stilling" element={<Stilling />} />
        <Route path="/agiver" element={<Agiver />} />
        <Route path="/ataker" element={<Ataker />} />        
        <Route path="/workfinder" element={<Workfinder />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );

}

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Stilling.css";

export default function Stilling() {
  const nav = useNavigate();

  return (
    <main id="stilling">
      <section className="stilling-container">
        <header>
          <h1>Hvem er du?</h1>
          <p>Velg hvilken type bruker du vil registrere.</p>
        </header>

        <nav id="stilling-buttons">
          <button onClick={() => nav("/ataker")}>Jeg søker jobb</button>
          <button onClick={() => nav("/agiver")}>Jeg representerer en bedrift</button>
        </nav>
      </section>
    </main>
  );
}

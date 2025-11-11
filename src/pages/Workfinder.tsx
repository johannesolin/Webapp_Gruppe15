import React from "react";
import { useNavigate } from "react-router-dom";
import "./Workfinder.css";

export default function Workfinder() {
  const nav = useNavigate();

  return (
    <main className="workfinder">
      <header className="topbar">
        <h1>
          <span>Workfinder</span>
        </h1>
        <nav>
          <button className="profile-btn">👤 Min profil</button>
          <button className="logout" onClick={() => nav("/login")}>
            Logg ut
          </button>
        </nav>
      </header>

      <section className="main-content">
        <aside className="sidebar">
          <nav className="tabs">
            <button className="active">Treff</button>
            <button>Meldinger</button>
          </nav>

          <section>
            <h2>Dine treff</h2>
            <ul>
              <li className="match-item">
                <strong>Bruker A</strong>, 26
                <p>UX-designer</p>
              </li>
              <li className="match-item">
                <strong>Bruker B</strong>, 31
                <p>Frontend-utvikler</p>
              </li>
              <li className="match-item">
                <strong>Bruker C</strong>, 29
                <p>Prosjektleder</p>
              </li>
            </ul>
          </section>
        </aside>

        <article className="profile-view">
          <section>
            <header>
              <h2>Bruker A, 26</h2>
              <p>UX-designer</p>
            </header>

            <footer className="actions">
              <button title="Ikke interessert">❌</button>
              <button title="Interessert">✅</button>
            </footer>
          </section>
        </article>
      </section>
    </main>
  );
}

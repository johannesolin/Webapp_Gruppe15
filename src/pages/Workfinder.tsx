import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Workfinder.css";

export default function Workfinder() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState<"treff" | "meldinger">("treff");

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
            <button
              className={activeTab === "treff" ? "active" : ""}
              onClick={() => setActiveTab("treff")}
            >
              Treff
            </button>
            <button
              className={activeTab === "meldinger" ? "active" : ""}
              onClick={() => setActiveTab("meldinger")}
            >
              Meldinger
            </button>
          </nav>

          {activeTab === "treff" && (
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
          )}

          {activeTab === "meldinger" && (
            <section>
              <h2>Meldinger</h2>
              <ul>
                <li>
                  <strong>Bruker A</strong>
                  <p>Sist aktiv: 2t siden</p>
                </li>
                <li>
                  <strong>Bruker B</strong>
                  <p>Sist aktiv: 5t siden</p>
                </li>
              </ul>
            </section>
          )}
        </aside>

        <article className="profile-view">
          {activeTab === "treff" && (
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
          )}

          {activeTab === "meldinger" && (
            <section>
              <header>
                <h2>Chat med Bruker A</h2>
              </header>

              <section>
                <p>
                  <strong>Bruker A:</strong> Hei! Hvordan går det?
                </p>
                <p>
                  <strong>Deg:</strong> Hei! Alt bra 😄
                </p>
              </section>

              <footer>
                <input type="text" placeholder="Skriv en melding..." />
                <button>Send</button>
              </footer>
            </section>
          )}
        </article>
      </section>
    </main>
  );
}

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Workfinder.css";

type Tab = "treff" | "meldinger";

const matches = {
  "Bruker A": {
    age: 26,
    title: "UX-designer",
    about: "Elsker prototyper og brukertesting.",
  },
  "Bruker B": {
    age: 31,
    title: "Frontend-utvikler",
    about: "React/Vite, design systems, ytelse.",
  },
  "Bruker C": {
    age: 29,
    title: "Prosjektleder",
    about: "Scrum, roadmaps og leveranser.",
  },
} as const;

type MatchUser = keyof typeof matches;

const messages = {
  "Bruker A": [
    { from: "them", text: "Hei! Hvordan går det?" },
    { from: "me", text: "Hei! Alt bra 😄" },
    { from: "them", text: "Så bra! Jobber du fortsatt på prosjektet?" },
  ],
  "Bruker B": [
    { from: "them", text: "Hei! Skal vi ta en kaffe snart?" },
    { from: "me", text: "Gjerne! Når passer det?" },
    { from: "them", text: "Hva med fredag ettermiddag?" },
  ],
} as const;

type MessageUser = keyof typeof messages;

export default function Workfinder() {
  const nav = useNavigate();

  const [activeTab, setActiveTab] = useState<Tab>("treff");
  const [selectedMatch, setSelectedMatch] = useState<MatchUser>("Bruker A");
  const [selectedUser, setSelectedUser] = useState<MessageUser>("Bruker A");

  return (
    <main className="workfinder">
      <header className="topbar">
        <h1 className="logo">
          <Link to="/workfinder">
            <span>Workfinder</span>
          </Link>
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
                {(Object.keys(matches) as MatchUser[]).map((user) => (
                  <li
                    key={user}
                    className={`match-item clickable ${
                      selectedMatch === user ? "active" : ""
                    }`}
                    onClick={() => setSelectedMatch(user)}
                    role="button"
                    tabIndex={0}
                  >
                    <strong>{user}</strong>, {matches[user].age}
                    <p>{matches[user].title}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activeTab === "meldinger" && (
            <section>
              <h2>Meldinger</h2>
              <ul>
                {(Object.keys(messages) as MessageUser[]).map((user) => (
                  <li
                    key={user}
                    className={`match-item clickable ${
                      selectedUser === user ? "active" : ""
                    }`}
                    onClick={() => setSelectedUser(user)}
                    role="button"
                    tabIndex={0}
                  >
                    <strong>{user}</strong>
                    <p>
                      Sist aktiv:{" "}
                      {user === "Bruker A" ? "2t siden" : "5t siden"}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        <article className="profile-view">
          {activeTab === "treff" && (
            <section>
              <header>
                <h2>
                  {selectedMatch}, {matches[selectedMatch].age}
                </h2>
                <p>{matches[selectedMatch].title}</p>
              </header>

              <p style={{ marginTop: "0.75rem", color: "#4b5563" }}>
                {matches[selectedMatch].about}
              </p>

              <footer className="actions">
                <button title="Ikke interessert">❌</button>
                <button title="Interessert">✅</button>
              </footer>
            </section>
          )}

          {activeTab === "meldinger" && (
            <section className="chat">
              <header>
                <h2>Chat med {selectedUser}</h2>
              </header>

              <div className="chat-messages">
                {messages[selectedUser].map((msg, i) => (
                  <div
                    key={i}
                    className={`message ${
                      msg.from === "me" ? "from-me" : "from-them"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <footer className="chat-input">
                <div className="input-shell">
                  <input type="text" placeholder="Send en chat..." />
                </div>
                <button>Send</button>
              </footer>
            </section>
          )}
        </article>
      </section>
    </main>
  );
}

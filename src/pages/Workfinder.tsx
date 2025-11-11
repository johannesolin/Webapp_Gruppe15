import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Workfinder.css";

type Tab = "treff" | "meldinger";

interface User {
  user_id: number;
  name: string;
  age: number;
  workspace: string;
  interests: string;
}

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
  const [matches, setMatches] = useState<User[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedUser, setSelectedUser] = useState<MessageUser>("Bruker A");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Hent brukere fra backend
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error(`Feil ved henting av brukere: ${res.status}`);
        }

        const data: User[] = await res.json();
        setMatches(data);

        if (data.length > 0) {
          setSelectedIndex(0);
        }
      } catch (err) {
        console.error(err);
        setError("Kunne ikke hente brukere fra serveren.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const selectedMatch = matches[selectedIndex];

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

              {loading && <p>Laster treff...</p>}
              {error && <p className="error">{error}</p>}

              {!loading && !error && matches.length === 0 && (
                <p>Ingen treff funnet.</p>
              )}

              {!loading && !error && matches.length > 0 && (
                <ul>
                  {matches.map((user, index) => (
                    <li
                      key={user.user_id}
                      className={`match-item clickable ${
                        selectedIndex === index ? "active" : ""
                      }`}
                      onClick={() => setSelectedIndex(index)}
                      role="button"
                      tabIndex={0}
                    >
                      <strong>{user.name}</strong>, {user.age}
                      <p>{user.workspace}</p>
                    </li>
                  ))}
                </ul>
              )}
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
          {activeTab === "treff" && selectedMatch && (
            <section>
              <header>
                <h2>
                  {selectedMatch.name}, {selectedMatch.age}
                </h2>
                <p>{selectedMatch.workspace}</p>
              </header>

              <p style={{ marginTop: "0.75rem", color: "#4b5563" }}>
                {selectedMatch.interests}
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

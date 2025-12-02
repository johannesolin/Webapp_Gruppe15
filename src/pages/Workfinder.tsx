import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getNextProfile, sendSwipe, getMatches } from "../lib/api";
import "./Workfinder.css";

type Tab = "treff" | "meldinger";

interface User {
  user_id?: number;
  id?: number;
  name?: string;
  email?: string;
  age?: number | null;
  workspace?: string;
  interests?: string;
  location?: string;
  description?: string;
  competence?: string;
  skills?: string;
  role?: "applicant" | "employer";
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
  const [currentProfile, setCurrentProfile] = useState<User | null>(null);
  const [matches, setMatches] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<MessageUser>("Bruker A");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showMatchPopup, setShowMatchPopup] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem("workf_bruker") || "{}") as User;
  const userId = storedUser.user_id || storedUser.id;
  const userRole = storedUser.role;

  console.log("Stored user:", storedUser);
  console.log("User ID:", userId, "Role:", userRole);

  const fetchNextProfile = async () => {
    if (!userId || !userRole) {
      setError("Du må være logget inn for å bruke Workfinder.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getNextProfile(userRole, userId);

      console.log("Next profile:", data);

      if (data.done) {
        setCurrentProfile(null);
        setError("Ingen flere profiler å vise.");
      } else {
        setCurrentProfile(data);
      }
    } catch (err: any) {
      console.error("Fetch next profile error:", err);
      setError(err.message || "Kunne ikke hente profil.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMatches = async () => {
    if (!userId || !userRole) return;

    try {
      const data = await getMatches(userRole, userId);
      console.log("Matches:", data);
      setMatches(data);
    } catch (err: any) {
      console.error("Feil ved henting av matches:", err);
    }
  };

  useEffect(() => {
    fetchNextProfile();
    fetchMatches();
  }, []);

  const handleSwipe = async (choice: number) => {
    if (!currentProfile || !userId || !userRole) return;

    const targetRole = userRole === "applicant" ? "employer" : "applicant";
    const targetId = currentProfile.user_id || currentProfile.id;

    if (!targetId) {
      setError("Kunne ikke identifisere bruker-ID");
      return;
    }

    console.log("Sending swipe:", {
      swiperId: userId,
      swiperRole: userRole,
      targetId: targetId,
      targetRole: targetRole,
      choice: choice,
    });

    try {
      const result = await sendSwipe({
        swiperId: userId,
        swiperRole: userRole,
        targetId: targetId,
        targetRole: targetRole,
        choice: choice,
      });

      console.log("Swipe result:", result);

      if (result.match) {
        setShowMatchPopup(true);
        fetchMatches();
        setTimeout(() => setShowMatchPopup(false), 3000);
      }

      fetchNextProfile();
    } catch (err: any) {
      console.error("Swipe error:", err);
      setError(err.message || "Kunne ikke registrere swipe.");
    }
  };

  return (
    <main className="workfinder">
      {showMatchPopup && (
  <aside className="match-popup">
    <h2>Det er match!</h2>
    <p>Dere har likt hverandre</p>
  </aside>
)}

      <header className="topbar">
        <h1 className="logo">
          <Link to="/workfinder">
            <span>Workfinder</span>
          </Link>
        </h1>
        <nav>
          <span>Innlogget som: {userRole}</span>
          <button className="profile-btn">👤 Min profil</button>
          <button
            className="logout"
            onClick={() => {
              localStorage.removeItem("workf_bruker");
              nav("/login");
            }}
          >
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
              Treff ({matches.length})
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
              <h2>Dine matches</h2>

              {matches.length === 0 && <p>Ingen matches enda.</p>}

              {matches.length > 0 && (
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {matches.map((match, idx) => (
                    <li 
                      key={`${match.user_id || match.id}-${match.role}-${idx}`} 
                      className="match-item"
                    >
                      <strong>{match.name || match.email}</strong>
                      {match.age && `, ${match.age}`}
                      <p style={{ fontSize: "0.85rem", color: "#666" }}>
                        {match.location || "Ukjent lokasjon"}
                      </p>
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
                {(Object.keys(messages) as MessageUser[]).map((msgUser) => (
                  <li
                    key={msgUser}
                    className={`match-item clickable ${
                      selectedUser === msgUser ? "active" : ""
                    }`}
                    onClick={() => setSelectedUser(msgUser)}
                    role="button"
                    tabIndex={0}
                  >
                    <strong>{msgUser}</strong>
                    <p>
                      Sist aktiv:{" "}
                      {msgUser === "Bruker A" ? "2t siden" : "5t siden"}
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
              {loading && <p>Laster profil...</p>}
              {error && <p style={{ color: "#dc2626" }}>{error}</p>}

              {!loading && !error && currentProfile && (
                <>
                  <header>
                    <h2>
                      {currentProfile.name || currentProfile.email}
                      {currentProfile.age && `, ${currentProfile.age}`}
                    </h2>
                    <p>
                      {currentProfile.location || "Ukjent lokasjon"} •{" "}
                      {currentProfile.role === "employer"
                        ? "Bedrift"
                        : "Jobbsøker"}
                    </p>
                  </header>
                  <section className="profile-about">
                    <p className="profile-about-label">
                      <strong>Om:</strong>
                    </p>
                    <p className="profile-about-text">
                      {currentProfile.description ||
                        currentProfile.workspace ||
                        currentProfile.interests ||
                        currentProfile.competence ||
                        currentProfile.skills ||
                        "Ingen beskrivelse tilgjengelig."}
                    </p>
                  </section>

                  <footer className="actions">
                    <button title="Ikke interessert" onClick={() => handleSwipe(0)} className="action-dislike"> ❌ </button>
                    <button title="Interessert" onClick={() => handleSwipe(1)} className="action-like"> ✅ </button>
                  </footer>
                </>
              )}

              {!loading && !error && !currentProfile && (
                <p className="no-profiles">Ingen flere profiler å vise.</p>
              )}
            </section>
          )}

          {activeTab === "meldinger" && (
            <section className="chat">
              <header>
                <h2>Chat med {selectedUser}</h2>
              </header>

              <ul className="chat-messages">
                {messages[selectedUser].map((msg, i) => (
                  <li
                    key={i}
                    className={`message ${
                      msg.from === "me" ? "from-me" : "from-them"
                    }`}
                  >
                    {msg.text}
                  </li>
                ))}
              </ul>

              <footer className="chat-input">
                <label className="input-shell">
                  <input type="text" placeholder="Send en chat..." />
                </label>
                <button>Send</button>
              </footer>
            </section>
          )}
        </article>
      </section>
    </main>
  );
}
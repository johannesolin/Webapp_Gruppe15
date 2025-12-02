import React from "react";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const nav = useNavigate();

  return (
    <main style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(180deg, #90b4f0 0%, #f2a7a7 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui"
    }}>
      <section style={{
        background: "#fff",
        padding: "3rem",
        borderRadius: "1rem",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Profilside</h1>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          Dette er en dummy-side. Ingen funksjonalitet enda.
        </p>
        <button 
          onClick={() => nav("/workfinder")}
          style={{
            padding: "0.75rem 2rem",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          ← Tilbake til Workfinder
        </button>
      </section>
    </main>
  );
}
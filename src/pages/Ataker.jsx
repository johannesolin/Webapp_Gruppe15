import React from "react";
import { useNavigate } from "react-router-dom";
import "./Ataker.css";

export default function Ataker() {
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    alert("Arbeidssøker registrert!");
    nav("/login");
  }

  return (
    <main>
      <article>
        <header>
          <h1>👤 Registrering for arbeidssøkere</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <section>
            <h2>Personlig informasjon</h2>

            <label>
              Fullt navn
              <input type="text" placeholder="Fullt navn" required />
            </label>

            <label>
              Alder
              <input type="number" placeholder="Alder" />
            </label>

            <label>
              E-post
              <input type="email" placeholder="E-post" required />
            </label>

            <label>
              Passord
              <input type="password" placeholder="Passord" required />
            </label>

            <label>
              Gjenta passord
              <input type="password" placeholder="Gjenta passord" required />
            </label>

            <label>
              Fortell kort om deg selv
              <textarea placeholder="Fortell kort om deg selv..." />
            </label>

            <label>
              Ferdigheter
              <input type="text" placeholder="Ferdigheter (f.eks. UI, React)" />
            </label>

            <label>
              Lokasjon
              <input type="text" placeholder="Lokasjon (f.eks. Oslo)" />
            </label>

            <label>
              Last opp din CV
              <input type="file" accept=".pdf,.doc,.docx" />
            </label>
          </section>

          <footer>
            <button type="submit">Registrer arbeidssøker</button>
          </footer>
        </form>
      </article>
    </main>
  );
}

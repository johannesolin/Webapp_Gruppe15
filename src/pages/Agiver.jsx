import React from "react";
import { useNavigate } from "react-router-dom";
import "./Agiver.css";

export default function Agiver() {
  const nav = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    alert("Bedriften ble registrert!");
    nav("/login");
  }

  return (
    <main>
      <article>
        <header>
          <h1>🏢 Bedriftsregistrering</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <section>
            <h2>Bedriftsinformasjon</h2>

            <label>
              Bedriftens e-post
              <input type="email" placeholder="Bedriftens e-post" required />
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
              Fortell kort om bedriften
              <textarea placeholder="Fortell kort om bedriften..." />
            </label>

            <label>
              Kjernekompetanse / fagområder
              <input placeholder="Kjernekompetanse / fagområder" />
            </label>

            <label>
              Lokasjon
              <input placeholder="Lokasjon (f.eks. Oslo)" />
            </label>
          </section>

          <section className="choices">
            <h2>Hva ser dere etter?</h2>
            <ul>
              <li>
                <label>
                  <input type="checkbox" name="arbeidstype" value="Fulltid" />
                  Fulltid
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" name="arbeidstype" value="Deltid" />
                  Deltid
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" name="arbeidstype" value="Helg" />
                  Helg
                </label>
              </li>
            </ul>
          </section>

          <footer>
            <button type="submit">Registrer bedrift</button>
          </footer>
        </form>
      </article>
    </main>
  );
}

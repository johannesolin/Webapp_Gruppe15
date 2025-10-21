import React from "react";
import "./Workfinder.css";

export default function Workfinder() {
  return (

    <main id="workfinder">
      <section>
        <header>
          <h1>Workfinder</h1>
          <p>Du er logget inn. Finn enkle jobb her.</p>
        </header>

        <section>
          <h2>Anbefalte stillinger</h2>

          <article>
            <header>
              <h3>Frontend-utvikler</h3>
            </header>
            <p>React · Oslo · Heltid</p>
            <footer>
              <button>Les mer</button>
            </footer>
          </article>

          <article>
            <header>
              <h3>Butikkmedarbeider</h3>
            </header>
            <p>Kundebehandling · Fredrikstad · Deltid</p>
            <footer>
              <button>Les mer</button>
            </footer>
          </article>

          <article>
            <header>
              <h3>Vekter</h3>
            </header>
            <p>Sikkerhet · Råde · Deltid</p>
            <footer>
              <button>Les mer</button>
            </footer>
          </article>

        </section>

      </section>
    </main>
  );
}

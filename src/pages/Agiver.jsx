import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Agiver.css";

export default function Agiver() {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [competence, setCompetence] = useState("");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState([]);

  function handleCheckbox(type) {
    const updated = [...workType];
    if (updated.includes(type)) {
      const index = updated.indexOf(type);
      updated.splice(index, 1);
    } else {
      updated.push(type);
    }
    setWorkType(updated);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passordene stemmer ikke!");
      return;
    }

    const companyData = {
      email,
      password,
      description,
      competence,
      location,
      workType,
    };

    console.log("✅ Registrert bedrift:", companyData);
    alert("Bedriften ble registrert!");
    nav("/login");
  }

  return (
    <main className="agiver">
      <article>
        <header>
          <h1>🏢 Bedriftsregistrering</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <section>
            <h2>Bedriftsinformasjon</h2>

            <label>
              Bedriftens e-post
              <input
                type="email"
                placeholder="Bedriftens e-post"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Passord
              <input
                type="password"
                placeholder="Passord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <label>
              Gjenta passord
              <input
                type="password"
                placeholder="Gjenta passord"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>

            <label>
              Fortell kort om bedriften
              <textarea
                placeholder="Fortell kort om bedriften..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <label>
              Kjernekompetanse / fagområder
              <input
                placeholder="Kjernekompetanse / fagområder"
                value={competence}
                onChange={(e) => setCompetence(e.target.value)}
              />
            </label>

            <label>
              Lokasjon
              <input
                placeholder="Lokasjon (f.eks. Oslo)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
          </section>

          <section className="choices">
            <h2>Hva ser dere etter?</h2>
            <ul>
              {["Fulltid", "Deltid", "Helg"].map((type) => (
                <li key={type}>
                  <label>
                    <input
                      type="checkbox"
                      name="arbeidstype"
                      value={type}
                      checked={workType.includes(type)}
                      onChange={() => handleCheckbox(type)}
                    />
                    {type}
                  </label>
                </li>
              ))}
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

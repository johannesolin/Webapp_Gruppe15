import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Agiver.css";

export default function Agiver() {
  const nav = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [competence, setCompetence] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [workType, setWorkType] = useState<string[]>([]);

  function handleCheckbox(type: string) {
    setWorkType((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      }
      return [...prev, type];
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
            </label>

            <label>
              Passord
              <input
                type="password"
                placeholder="Passord"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
              />
            </label>

            <label>
              Gjenta passord
              <input
                type="password"
                placeholder="Gjenta passord"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />
            </label>

            <label>
              Fortell kort om bedriften
              <textarea
                placeholder="Fortell kort om bedriften..."
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
              />
            </label>

            <label>
              Kjernekompetanse / fagområder
              <input
                placeholder="Kjernekompetanse / fagområder"
                value={competence}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCompetence(e.target.value)
                }
              />
            </label>

            <label>
              Lokasjon
              <input
                placeholder="Lokasjon (f.eks. Oslo)"
                value={location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLocation(e.target.value)
                }
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

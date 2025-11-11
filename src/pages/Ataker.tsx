import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAtaker } from "../lib/api";
import "./Ataker.css";

export default function Ataker() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [cv, setCv] = useState(null);

  async function handleSubmit(e) {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passordene stemmer ikke!");
    return;
  }

  const applicantData = {
    name,
    age,
    email,
    password,
    about,
    skills,
    location,
    cv: cv ? { name: cv.name } : null
  };

  try {
    await registerAtaker(applicantData);
    alert("Du er registrert som arbeidstaker!");
    nav("/login");
  } catch (errorMessage) {
    alert(errorMessage.message || "Registrering feilet");
  }
}

  return (
    <main className="ataker">
      <article>
        <header>
          <h1>👤 Registrering for arbeidssøkere</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <section>
            <label>
              Fullt navn
              <input
                type="text"
                placeholder="Fullt navn"
                value={name}
                onChange={(vrd) => setName(vrd.target.value)}
                required
              />
            </label>

            <label>
              Alder
              <input
                type="number"
                placeholder="Alder"
                value={age}
                onChange={(vrd) => setAge(vrd.target.value)}
              />
            </label>

            <label>
              E-post
              <input
                type="email"
                placeholder="E-post"
                value={email}
                onChange={(vrd) => setEmail(vrd.target.value)}
                required
              />
            </label>

            <label>
              Passord
              <input
                type="password"
                placeholder="Passord"
                value={password}
                onChange={(vrd) => setPassword(vrd.target.value)}
                required
              />
            </label>

            <label>
              Gjenta passord
              <input
                type="password"
                placeholder="Gjenta passord"
                value={confirmPassword}
                onChange={(vrd) => setConfirmPassword(vrd.target.value)}
                required
              />
            </label>

            <label>
              Fortell kort om deg selv
              <textarea
                placeholder="Fortell kort om deg selv..."
                value={about}
                onChange={(vrd) => setAbout(vrd.target.value)}
              />
            </label>

            <label>
              Ferdigheter
              <input
                type="text"
                placeholder="Ferdigheter (f.eks. UI, React)"
                value={skills}
                onChange={(vrd) => setSkills(vrd.target.value)}
              />
            </label>

            <label>
              Lokasjon
              <input
                type="text"
                placeholder="Lokasjon (f.eks. Oslo)"
                value={location}
                onChange={(vrd) => setLocation(vrd.target.value)}
              />
            </label>

            <label>
              Last opp din CV
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(vrd) => setCv(vrd.target.files[0])}
              />
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

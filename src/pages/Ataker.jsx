import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  function handleSubmit(e) {
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
      cv,
    };

    console.log("✅ Registrert arbeidssøker:", applicantData);
    alert("Arbeidssøker registrert!");
    nav("/login");
  }

  return (
    <main className="ataker">
      <article>
        <header>
          <h1>👤 Registrering for arbeidssøkere</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <section>
            <h2>Personlig informasjon</h2>

            <label>
              Fullt navn
              <input
                type="text"
                placeholder="Fullt navn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              Alder
              <input
                type="number"
                placeholder="Alder"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            <label>
              E-post
              <input
                type="email"
                placeholder="E-post"
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
              Fortell kort om deg selv
              <textarea
                placeholder="Fortell kort om deg selv..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>

            <label>
              Ferdigheter
              <input
                type="text"
                placeholder="Ferdigheter (f.eks. UI, React)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </label>

            <label>
              Lokasjon
              <input
                type="text"
                placeholder="Lokasjon (f.eks. Oslo)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>

            <label>
              Last opp din CV
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCv(e.target.files[0])}
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

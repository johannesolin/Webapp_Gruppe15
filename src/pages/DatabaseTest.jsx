import React, { useState, useEffect } from "react";

export default function DatabaseTest() {
  const [rows, setRows] = useState([]);
  const [newText, setNewText] = useState("");

  // Hent data
  const fetchRows = () => {
    fetch("/api/database")
      .then((res) => res.json())
      .then((data) => setRows(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchRows();
  }, []);

  // Legg til ny rad
  const handleAddRow = () => {
    if (!newText) return;

    fetch("/api/database", {
      method: "POST",
      body: newText,
    })
      .then(() => {
        setNewText("");
        fetchRows(); // oppdater listen
      })
      .catch(console.error);
  };

  return (
    <div>
      <h1>Database test</h1>
      <input
        type="text"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        placeholder="Skriv tekst her"
      />
      <button onClick={handleAddRow}>Legg til</button>

      <ul>
        {rows.length === 0 && <li>Ingen data</li>}
        {rows.map((row, i) => (
          <li key={i}>{row.HelloWorld}</li>
        ))}
      </ul>
    </div>
  );
}

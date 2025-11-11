import React, { useState, useEffect } from "react";

interface Row {
  HelloWorld: string;
}

export default function DatabaseTest() {
  const [rows, setRows] = useState<Row[]>([]);
  const [newText, setNewText] = useState<string>("");

  // Hent data
  const fetchRows = async () => {
    try {
      const res = await fetch("/api/database");
      if (!res.ok) throw new Error("Feil ved henting av data");
      const data: Row[] = await res.json();
      setRows(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  // Legg til ny rad
  const handleAddRow = async () => {
    if (!newText) return;

    try {
      await fetch("/api/database", {
        method: "POST",
        body: newText,
      });
      setNewText("");
      fetchRows(); // oppdater listen
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Database test</h1>

      <input
        type="text"
        value={newText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewText(e.target.value)
        }
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

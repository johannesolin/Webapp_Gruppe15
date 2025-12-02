const BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8787";

export async function registerAtaker(payload) {
  const res = await fetch(`${BASE}/api/applicants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Registrering ble feil, fyll på den riktig!");
  }

  return res.json();
}

export async function registerAgiver(payload) {
  const res = await fetch(`${BASE}/api/employers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Registrering feilet");
  }

  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Innlogging ble ikke gjennomført.");
  }
  return res.json();
}
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

export async function getNextProfile(role, id) {
  const res = await fetch(`${BASE}/api/swipe/next?role=${role}&id=${id}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Feil ved profil");
  }
  return res.json();
}

export async function sendSwipe(data) {
  const res = await fetch(`${BASE}/api/swipe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Feil ved swipe");
  }
  return res.json();
}

export async function getMatches(role, id) {
  const res = await fetch(`${BASE}/api/matches?role=${role}&id=${id}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Feil ved matches");
  }
  return res.json();
}

export async function getMessages(matchId) {
  const res = await fetch(`${BASE}/api/messages?matchId=${matchId}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Feil ved henting av meldinger");
  }
  return res.json();
}

export async function sendMessage(data) {
  const res = await fetch(`${BASE}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Feil ved sending av melding");
  }
  return res.json();
}
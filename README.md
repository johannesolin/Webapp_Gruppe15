# Webapp_Gruppe15
ITF31619-1 25H

Dette er vårt repo for Webapplikasjoner innleveringer Alpha og Final Beta.

---

Kom i gang:

1. Installer avhengigheter:<br>
npm install

2. Start frontend:<br>
npm run dev<br>
Frontend kjører typisk på: http://localhost:5173

3. Start backend Worker (lokalt, for database):<br>
cd backend<br>
npx wrangler dev<br>
Worker kjører typisk på: http://127.0.0.1:8787

---

Test database (Cloudflare D1):

- Åpne /database i frontend, f.eks. http://localhost:5173/database
- Skriv tekst i inputfeltet og trykk "Legg til" for å legge inn i Test-tabellen
- Alle rader vises under inputfeltet

---

Testbruker (Login-side):

- E-post: test@test.com
- Passord: 1234
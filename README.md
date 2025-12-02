# Webapp_Gruppe15
ITF31619-1 25H

Dette er vårt repo for Webapplikasjoner innleveringer Alpha og Final Beta.

---

## Kom i gang

1. Installer avhengigheter:

   ```bash
   npm install
   ```

2. Start frontend:
    ```bash
    npm run dev<br>
    ```
    Frontend kjører typisk på: http://localhost:5173

3. Start backend Worker på en ny terminal (lokalt, for database):
    ```bash
    cd backend
    npx wrangler dev
    ```
    Worker kjører typisk på: http://127.0.0.1:8787

---

Cloudflare login:

- Webapp.gruppe15@gmail.com
- Passord1234

---

Testbrukere (Login-side):

Arbeidstaker
- E-post: applicant@testen.no
- Passord: test123

Arbeidsgiver
- E-post: employer@testen.no
- Passord: test123

---

## NB!
Vi inkluderer .env i repoet KUN for lettere kjøring for sensor, slik at prosjektet kan kjøres uten manuell oppsett.
I et normalt utviklingsmiljø ville disse vært ignorert og ikke pusha til github. Samme med login til cloudflare brukeren.
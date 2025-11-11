export interface Env {
  workfinder_db: D1Database;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "content-type",
      "access-control-allow-methods": "GET,POST,OPTIONS",
    },
  });
}

function cors204(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "content-type",
      "access-control-allow-methods": "GET,POST,OPTIONS",
    },
  });
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
    	if (request.method === "OPTIONS") return cors204();

		if (path === "/api/applicants" && request.method === "POST") {
			const body = await request.json() as {
				name?: string; age?: number | string; email?: string; password?: string;
				about?: string; skills?: string; location?: string; cv?: { name?: string } | null;
			};

			const { name, email, password } = body;
			if (!name || !email || !password) return json({ error: "name, email og password må bli fylt." }, 400);

			const ageVal = body.age ? Number(body.age) : null;
			const cvName = body.cv && typeof body.cv === "object" ? (body.cv.name ?? null) : null;

			try {
			const info = await env.workfinder_db
				.prepare(`INSERT INTO applicants (name, age, email, password, about, skills, location, cv_filename)
						VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
				.bind(name, ageVal, email, password, body.about ?? null, body.skills ?? null, body.location ?? null, cvName)
				.run();

			return json({ ok: true, id: info.meta.last_row_id, email }, 201);
			} catch (errorMessage: any) {
				const msg = String(errorMessage);
				if (msg.includes("UNIQUE") || msg.includes("Constraint")) {
					return json({ error: "E-post er allerede i bruk." }, 409);
				}
				return json({ error: msg }, 500);
			}
      	}

		if (path === "/api/auth/login" && request.method === "POST") {
		const { email, password } = await request.json() as { email?: string; password?: string };
		if (!email || !password) return json({ error: "email og password må bli fylt på." }, 400);

		const { results } = await env.workfinder_db
			.prepare("SELECT id, email, 'applicant' as role FROM applicants WHERE email = ? AND password = ?")
			.bind(email, password)
			.all();

		if (results.length) return json({ user: results[0] });
		return json({ error: "Feil brukernavn og/eller passord." }, 401);
		}

		if (path === "/api/database") {
			if (request.method === "GET") {
				const { results } = await env.workfinder_db.prepare(
				"SELECT * FROM Test"
				)
				.run();

				return json(results);
			} else if (request.method === "POST") {
				const input_text = await request.text();

				await env.workfinder_db
				.prepare("INSERT INTO Test (HelloWorld) VALUES (?)")
				.bind(input_text)
				.run();

				return json({ message: `${input_text} lagt til Test (HelloWorld)` }, 201);
			}
		}

		if (path === "/api/users" && request.method === "GET") {
			try {
				const { results } = await env.workfinder_db.prepare(
					"SELECT user_id, name, age, workspace, interests FROM ExampleData"
				)
				.all();

				return json(results);
			} catch (err) {
				console.error(err);
				return json({ error: "Feil ved henting av brukere" }, 500);
			}
		}


      return json({ error: "Ikke funnet." }, 404);
    } catch (errorMessage) {
      return json({ error: String(errorMessage) }, 500);
    }
  },
} satisfies ExportedHandler<Env>;

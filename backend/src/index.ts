export interface Env {
  // If you set another name in the Wrangler config file for the value for 'binding',
  // replace "DB" with the variable name you defined.
  workfinder_db: D1Database;
}

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url);

	if (pathname === "/api/database") {
		if (request.method === "GET") {
			const { results } = await env.workfinder_db.prepare(
			"SELECT * FROM Test"
			)
			.run();

			return Response.json(results);
		} else if (request.method === "POST") {
			const input_text = await request.text(); 

			await env.workfinder_db
			.prepare("INSERT INTO Test (HelloWorld) VALUES (?)")
			.bind(input_text)
			.run();

			return new Response(`${input_text} lagt til Test (HelloWorld)`);
		}
	}

    return new Response(
      "Go to /api/database to test database response",
    );
  },
} satisfies ExportedHandler<Env>;
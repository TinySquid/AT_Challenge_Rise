import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	// Inserts seed entries
	await knex("knowledgeCheckBlockStates").insert({
		id: "e50acfd3-a870-4cad-9ef2-a2ca30d24d81",
		isSubmitted: false,
		hasErrors: false,
		didPass: false,
	});
}

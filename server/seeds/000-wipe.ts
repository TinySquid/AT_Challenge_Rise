import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("knowledgeCheckBlockStates").del();
	await knex("answerStates").del();

	await knex("answers").del();
	await knex("knowledgeCheckBlocks").del();
	await knex("questions").del();
	await knex("media").del();
}

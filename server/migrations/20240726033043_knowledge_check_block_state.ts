import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await Promise.all([
		knex.schema.createTable("knowledgeCheckBlockStates", (table) => {
			table.uuid("id").primary();
			table.boolean("isSubmitted").defaultTo(false);
			table.boolean("hasErrors").defaultTo(false);
			table.boolean("didPass").defaultTo(false);
		}),
	]);

	await knex.schema.table("knowledgeCheckBlockStates", (table) => {
		table.foreign("id").references("knowledgeCheckBlocks.id");
	});
}

export async function down(knex: Knex): Promise<void> {
	await Promise.all([
		knex.schema.table("knowledgeCheckBlockStates", (table) => {
			table.dropForeign("id");
		}),
	]);

	await Promise.all([knex.schema.dropTable("knowledgeCheckBlockStates")]);
}

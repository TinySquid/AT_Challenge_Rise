import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await Promise.all([
		knex.schema.createTable("answerStates", (table) => {
			table.uuid("id").primary();
			table.boolean("isSelected").defaultTo(false);
		}),
	]);

	await knex.schema.table("answerStates", (table) => {
		table.foreign("id").references("answers.id");
	});
}

export async function down(knex: Knex): Promise<void> {
	await Promise.all([
		knex.schema.table("answerStates", (table) => {
			table.dropForeign("id");
		}),
	]);

	await Promise.all([knex.schema.dropTable("answerStates")]);
}

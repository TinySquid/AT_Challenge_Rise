import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	// Inserts seed entries
	await knex("answerStates").insert([
		{
			id: "023d3f04-194a-484e-aad4-800ee04de372",
			isSelected: false,
		},
		{
			id: "e676187a-4b38-4d7c-8274-89c7e7c2fed6",
			isSelected: false,
		},
	]);
}

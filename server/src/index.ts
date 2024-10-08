import express, { Request, Response } from "express";
import morgan from "morgan";

import knex from "./knex";

const getKnowledgeCheckBlocks = async (req: Request, res: Response) => {
	const knowledgeCheckBlocks = await knex("knowledgeCheckBlocks");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.send(knowledgeCheckBlocks);
};

const getKnowledgeCheckBlock = async (req: Request, res: Response) => {
	try {
		const knowledgeCheckBlock = await knex("knowledgeCheckBlocks")
			.join("questions", "knowledgeCheckBlocks.questionId", "questions.id")
			.join("answers", "knowledgeCheckBlocks.id", "answers.knowledgeCheckBlockId")
			.join("media", "questions.mediaId", "media.id")
			.join("knowledgeCheckBlockStates", "knowledgeCheckBlocks.id", "knowledgeCheckBlockStates.id")
			.join("answerStates", "answers.id", "=", "answerStates.id")
			.where("knowledgeCheckBlocks.id", req.params.id)
			.select(
				"knowledgeCheckBlocks.id",
				"knowledgeCheckBlockStates.isSubmitted",
				"knowledgeCheckBlockStates.hasErrors",
				"knowledgeCheckBlockStates.didPass",
				"knowledgeCheckBlocks.feedback",
				"questions.text as question",
				"media.url as mediaUrl",
				knex.raw(
					"json_agg(json_build_object('id', answers.id, 'text', answers.text, 'isCorrect', answers.\"isCorrect\", 'pos', answers.pos, 'isSelected', \"answerStates\".\"isSelected\")) as answers",
				),
			)
			.groupBy("knowledgeCheckBlocks.id", "knowledgeCheckBlockStates.id", "questions.id", "media.id")
			.first();

		res.setHeader("Access-Control-Allow-Origin", "*");
		res.send(knowledgeCheckBlock);
	} catch (error) {
		console.error(error);
		res.status(500).json("An error occurred while fetching the block.");
	}
};

const updateKnowledgeCheckBlock = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { isSubmitted, hasErrors, didPass, answers } = req.body;

	try {
		await knex("knowledgeCheckBlockStates").update({ isSubmitted, hasErrors, didPass }).where("id", id);

		await Promise.all(
			answers.map((answer: { id: string; isSelected: boolean }) => {
				return knex("answerStates").update({ isSelected: answer.isSelected }).where("id", answer.id);
			}),
		);

		res.setHeader("Access-Control-Allow-Origin", "*");
		res.status(200);
	} catch (error) {
		console.error(error);
		res.status(500).json("An error occurred while updating the block.");
	}
};

const app = express();
const port = 5001;

app.use(morgan("dev"));

app.get("/knowledge-check-blocks", getKnowledgeCheckBlocks);

app.get("/knowledge-check-blocks/:id", getKnowledgeCheckBlock);

app.put("/knowledge-check-blocks/:id", express.json(), updateKnowledgeCheckBlock);

app.listen(port, () => console.log(`Listening on port ${port}`));

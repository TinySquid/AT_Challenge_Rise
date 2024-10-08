import React, { useState, useEffect } from "react";

import KnowledgeCheckBlock, {
	IKnowledgeCheckBlock,
	IKnowledgeCheckBlockState,
} from "@blocks/KnowledgeCheckBlock/KnowledgeCheckBlock";
import AppHeader from "@components/AppHeader";

const BLOCK_ID = "e50acfd3-a870-4cad-9ef2-a2ca30d24d81";

function App() {
	const [knowledgeBlockData, setKnowledgeBlockData] = useState<IKnowledgeCheckBlock | null>(null);

	useEffect(() => {
		fetch(`http://localhost:5001/knowledge-check-blocks/${BLOCK_ID}`)
			.then((res) => res.json())
			.then((data) => {
				setKnowledgeBlockData(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const handleBlockUpdate = (blockState: IKnowledgeCheckBlockState) => {
		const { id, isSubmitted, hasErrors, didPass, answers } = blockState;
		const answerStates = answers.map((answer) => {
			return {
				id: answer.id,
				isSelected: answer.isSelected,
			};
		});

		const knowledgeBlockUpdate = {
			isSubmitted,
			hasErrors,
			didPass,
			answers: answerStates,
		};

		fetch(`http://localhost:5001/knowledge-check-blocks/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(knowledgeBlockUpdate),
		}).catch((err) => {
			console.error(err);
		});
	};

	return (
		<>
			<AppHeader />
			<section className="flex w-full items-center justify-center">
				{knowledgeBlockData && <KnowledgeCheckBlock {...knowledgeBlockData} handleBlockUpdate={handleBlockUpdate} />}
			</section>
		</>
	);
}

export default App;

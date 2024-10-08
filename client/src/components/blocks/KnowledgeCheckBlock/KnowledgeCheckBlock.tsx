import React, { useState, useEffect } from "react";

import Feedback from "./Feedback";
import PseudoRadialOption from "./PseudoRadialOption";

import ResetButton from "./ResetButton";
import SubmitButton from "./SubmitButton";
import ValidationErrors from "./ValidationErrors";

interface IAnswer {
	id: string;
	text: string;
	isCorrect: boolean;
	isSelected: boolean;
	pos: number;
}

export interface IKnowledgeCheckBlockState {
	id: string;
	isSubmitted: boolean;
	didPass: boolean;
	hasErrors: boolean;
	answers: IAnswer[];
}

export interface IKnowledgeCheckBlock extends IKnowledgeCheckBlockState {
	id: string;
	feedback: string;
	question: string;
	mediaUrl: string;
	answers: IAnswer[];
	handleBlockUpdate: (blockState: IKnowledgeCheckBlockState) => void;
}

export default function KnowledgeCheckBlock(props: IKnowledgeCheckBlock) {
	const [state, setState] = useState<IKnowledgeCheckBlockState>({
		id: props.id,
		isSubmitted: props.isSubmitted,
		hasErrors: props.hasErrors,
		didPass: props.didPass,
		answers: props.answers
			.sort((a, b) => a.pos - b.pos)
			.map((answer) => ({
				id: answer.id,
				pos: answer.pos,
				text: answer.text,
				isSelected: answer.isSelected,
				isCorrect: answer.isCorrect,
			})),
	});

	const [transitionClass, setTransitionClass] = useState("");

	useEffect(() => {
		if (state.isSubmitted) {
			setTransitionClass("height-transition");
		}
	}, [state.isSubmitted]);

	const selectedAnswerIsCorrect = (): boolean => {
		return state.answers.find((answer) => answer.isSelected)!.isCorrect;
	};

	const handleSelect = (id: number) => {
		if (state.isSubmitted) return;

		const newState = {
			...state,
			hasErrors: false,
			answers: state.answers.map((answer) => ({
				...answer,
				isSelected: answer.pos === id ? true : false,
			})),
		};

		setState(newState);
		props.handleBlockUpdate(newState);
	};

	const handleSubmit = () => {
		let newState = {
			...state,
		};

		if (state.answers.some((answer) => answer.isSelected)) {
			if (selectedAnswerIsCorrect()) {
				newState = { ...newState, isSubmitted: true, didPass: true, hasErrors: false };
			} else {
				newState = { ...newState, isSubmitted: true, didPass: false, hasErrors: false };
			}
		} else {
			newState = { ...newState, hasErrors: true };
		}

		setState(newState);
		props.handleBlockUpdate(newState);
	};

	const handleReset = () => {
		const resetState = {
			id: props.id,
			isSubmitted: false,
			didPass: false,
			answers: state.answers.map((answer) => ({
				...answer,
				isSelected: false,
			})),
			hasErrors: false,
		};

		setState(resetState);
		props.handleBlockUpdate(resetState);
	};

	return (
		<>
			<article
				className={`w-[100%] md:w-[75%] lg:w-[55%] max-w-[760px] px-14 pt-[6.5rem] pb-[7rem] mx-[1.5rem] my-24 sm:px-24 border border-gray-300 ${transitionClass}`}
				style={{ boxShadow: "0 .2rem 3rem rgba(0,0,0,.1)" }}
			>
				<header className="text-[1.7rem] font-merriweather leading-[3.4rem] mb-4">{props.question}</header>
				<img className="w-full" src={props.mediaUrl} alt="media" />
				<div className="flex flex-col pt-5 mt-6 border-t border-gray-600">
					{state.answers.map((answer) => (
						<PseudoRadialOption
							key={answer.pos}
							pos={answer.pos}
							text={answer.text}
							isSelected={answer.isSelected}
							isCorrect={answer.isCorrect}
							isSubmitted={state.isSubmitted}
							handleSelect={handleSelect}
						/>
					))}
					<ValidationErrors hasErrors={state.hasErrors} />
					{state.isSubmitted && <Feedback text={props.feedback} didPass={state.didPass} />}

					<div className="flex justify-center">
						{state.isSubmitted ? (
							<ResetButton handleReset={handleReset} />
						) : (
							<SubmitButton handleSubmit={handleSubmit} />
						)}
					</div>
				</div>
			</article>
		</>
	);
}

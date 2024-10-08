import React, { useState, useEffect } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

interface IPseudoRadialOption {
	text: string;
	pos: number;
	isSelected: boolean;
	isCorrect: boolean;
	isSubmitted: boolean;
	handleSelect: (pos: number) => void;
}

export default function PseudoRadialOption(props: IPseudoRadialOption) {
	const [animationClass, setAnimationClass] = useState("");

	useEffect(() => {
		if (props.isSelected) {
			setAnimationClass("scale-fade-in");
		}
	}, [props.isSelected]);

	return (
		<div
			className={props.isSubmitted && props.isSelected ? "transition border-2 border-black duration-300" : "p-[1px]"}
		>
			<div
				className={`flex items-center py-[3rem] px-20 cursor-pointer ${!props.isSubmitted && "hover:bg-gray-100"}`}
				onClick={() => props.handleSelect(props.pos)}
			>
				<div className="flex flex-col justify-center items-center border border-gray-400 rounded-full w-[20px] h-[20px] ml-[-2.5rem]">
					{!props.isSubmitted && props.isSelected && (
						<div className={`border-[3px] border-gray-500 rounded-full w-[4px] h-[4px] ${animationClass}`}></div>
					)}

					{props.isSubmitted && props.isCorrect && (
						<IoIosCheckmark className="w-[24px] h-[24px]" style={{ color: "gray" }} />
					)}

					{props.isSubmitted && !props.isCorrect && (
						<IoMdClose className="w-[16px] h-[16px] text-[gray]" style={{ color: "gray" }} />
					)}
				</div>
				<label className="ml-14 font-merriweather text-[1.5rem] font-normal leading-8">{props.text}</label>
			</div>
		</div>
	);
}

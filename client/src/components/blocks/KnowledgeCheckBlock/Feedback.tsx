import React from "react";
import { IoIosCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

interface IFeedback {
	text: string;
	didPass: boolean;
}

export default function Feedback({ text, didPass }: IFeedback) {
	return (
		<div className="flex flex-col justify-center items-center w-full bg-[#f8f8f8] pt-12 pb-8 mb-6 mt-[6rem] fade-in">
			{didPass ? (
				<>
					<div className="w-[64px] h-[64px] border-[2px] border-gray-900 rounded-full flex justify-center items-center">
						<IoIosCheckmark className="w-[50px] h-[50px] text-gray-600" />
					</div>
					<p className="text-[1.2rem] font-bold mb-8 mt-[0.5rem] tracking-wide">Correct</p>
				</>
			) : (
				<>
					<div className="w-[60px] h-[60px] border-[2px] border-gray-900 rounded-full flex justify-center items-center">
						<IoMdClose className="w-[24px] h-[24px] text-gray-600" />
					</div>
					<p className="text-[1.2rem] font-bold mb-8 mt-[0.5rem] tracking-wide">Incorrect</p>
				</>
			)}

			<p className="font-merriweather text-[1.4rem] font-light leading-6 mb-6 py-[0.3rem] text-center">{text}</p>
		</div>
	);
}

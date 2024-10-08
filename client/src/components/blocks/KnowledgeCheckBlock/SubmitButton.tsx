import React from "react";

interface ISubmitButton {
	handleSubmit: () => void;
}

export default function SubmitButton({ handleSubmit }: ISubmitButton) {
	return (
		<button
			className="min-w-[100px] max-w-[170px] w-full bg-[#747a7e] rounded-[2rem] h-16 font-bold text-white text-[1.2rem] tracking-[0.048rem] leading-[1.8rem] uppercase"
			onClick={handleSubmit}
			aria-label="Submit"
			role="button"
		>
			Submit
		</button>
	);
}

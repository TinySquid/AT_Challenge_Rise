import React from "react";

import { TbRotate } from "react-icons/tb";

interface IResetButton {
	handleReset: () => void;
}

export default function ResetButton({ handleReset }: IResetButton) {
	return (
		<button
			className="flex flex-col justify-center items-center cursor-pointer mt-3"
			onClick={handleReset}
			aria-label="Reset"
			role="button"
		>
			<div className="font-black text-base leading-6 tracking-[0.08rem] py-3 uppercase">Take Again</div>
			<TbRotate className="w-[24px] h-[24px]" />
		</button>
	);
}

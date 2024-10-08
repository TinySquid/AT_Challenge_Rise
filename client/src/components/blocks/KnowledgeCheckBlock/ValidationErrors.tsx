import React from "react";

import { IoAlertCircleOutline } from "react-icons/io5";

interface IValidationErrors {
	hasErrors: boolean;
}

export default function ValidationErrors({ hasErrors }: IValidationErrors) {
	return (
		<div
			className="flex justify-center items-center space-x-2 py-12 pt-10"
			style={{ visibility: hasErrors ? "visible" : "hidden" }}
		>
			<IoAlertCircleOutline className="text-[#de1d1d] h-[20px] w-[20px]" />
			<span className="text-[#de1d1d] text-[1.6rem]">Please answer the question to continue</span>
		</div>
	);
}

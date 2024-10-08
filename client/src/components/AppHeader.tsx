import React from "react";

import logoRise360 from "@assets/logo-rise-360.svg";
import logoRiseCom from "@assets/logo-rise-com.svg";

export default function AppHeader() {
	return (
		<header className="flex w-full border-b p-4 items-center justify-between">
			<img src={logoRiseCom} className="h-16 mx-4" alt="logo" />
			<h1 className="text-4xl">Rise Tech Challenge</h1>
			<img src={logoRise360} className="h-16 mx-4" alt="logo" />
		</header>
	);
}

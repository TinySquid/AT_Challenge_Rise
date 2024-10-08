import path from "path";

export default {
	webpack: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@components": path.resolve(__dirname, "src/components"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@blocks": path.resolve(__dirname, "src/components/blocks"),
		},
	},
};

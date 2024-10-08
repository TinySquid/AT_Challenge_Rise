/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				merriweather: ["Merriweather", "serif"],
				sans: [
					"Lato",
					"Roboto",
					"Oxygen",
					"Ubuntu",
					"Cantarell",
					"Fira Sans",
					"Droid Sans",
					"Helvetica Neue",
					"sans-serif",
				],
			},
			animation: {
				fadeIn: "fadeIn 1s ease-in-out",
			},
		},
	},
	plugins: [],
};

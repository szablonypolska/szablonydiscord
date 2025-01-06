import type { Config } from "tailwindcss"

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				darknesPrimaryColor: "var(--darknesPrimaryColor)",
				primaryColor: "var(--primary-color)",
				altBackgroundColor: "var(--altBackgroundColor)",
				background: "var(--background)",
				foreground: "var(--foreground)",
				borderColor: "var(--borderColor)",
				boxColor: "var(--boxColor)",
				textColor: "var(--textColor)",
			},
			backgroundImage: {
				darkTealFade: "radial-gradient(circle, rgba(23,128,119,0.1) 10%, rgba(23,128,119,0) 100%)",
			},
		},
	},
	plugins: [],
} satisfies Config

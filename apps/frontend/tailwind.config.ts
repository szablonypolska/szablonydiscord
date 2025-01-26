import type { Config } from "tailwindcss"

export default {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
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
				textSpecial: "var(--textSpecial)",
				adviceBot: "var(--advicebot)",
				channelColor: "var(--channelColor)",
				sidebarColor: "var(--sidebarColor)",
				silverColor: "var(--silverColor)",
				boxColorDashboard: "var(--boxColorDashboard)",
				warningColor: "var(--warningColor)",
				disabledButton: "var(--disabledButton)",
				errorColor: "var(--errorColor)",
				darknesErrorColor: "var(--darknesErrorColor)",
				primaryDark: "var(--primary-dark)",
				primaryLight: "var(--primary-light)",
			},
			backgroundImage: {
				darkTealFade: "radial-gradient(circle, rgba(23,128,119,0.1) 10%, rgba(23,128,119,0) 100%)",
			},
		},
	},
	plugins: [],
} satisfies Config

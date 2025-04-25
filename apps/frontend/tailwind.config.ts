import type { Config } from "tailwindcss"

export default {
	darkMode: ["class"],
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
				altBorderColor: "var(--altBorderColor)",
				boxColor: "var(--boxColor)",
				textColor: "var(--textColor)",
				textSpecial: "var(--textSpecial)",
				adviceBot: "var(--advicebot)",
				channelColor: "var(--channelColor)",
				sidebarColor: "var(--sidebarColor)",
				silverColor: "var(--silverColor)",
				boxColorDashboard: "var(--boxColorDashboard)",
				warningColor: "var(--warningColor)",
				darknesWarningColor: "var(--darknesWarningColor)",
				disabledButton: "var(--disabledButton)",
				errorColor: "var(--errorColor)",
				darknesErrorColor: "var(--darknesErrorColor)",
				primaryDark: "var(--primary-dark)",
				primaryLight: "var(--primary-light)",
				darkGray: "var(--darkGray)",
				placeHolderTextColor: "var(--placeholderTextColor)",
			},
			animation: {
				"shiny-text": "shiny-text 10s infinite",
			},
			keyframes: {
				"shiny-text": {
					"0%, 90%, 100%": {
						"background-position": "calc(-100% - var(--shiny-width)) 0",
					},
					"30%, 60%": {
						"background-position": "calc(100% + var(--shiny-width)) 0",
					},
				},
			},
		},
	},
	plugins: [require("tailwind-scrollbar")],
} satisfies Config

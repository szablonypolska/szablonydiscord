"use client"

import { Button } from "@nextui-org/button"
import { X, FileCode2, User, BookKey } from "lucide-react"
import SettingsOptionTemplate from "./option/settingsOptionTemplate"
import { useDashboardContext } from "@/context/DashboardContext"
import { SettingsViewOptionType } from "@/types/settings"
import { ReactNode } from "react"
import SettingsOptionAccount from "./option/settingsOptionAccount"
import clsx from "clsx"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import { UserSettings } from "@/components/interfaces/common"
import SettingsOptionToken from "./option/token/settingsOptionToken"

export default function SettingsPopup({ settings }: { settings: UserSettings }) {
	const { settingsViewOption, setSettingsViewOption, settingsVisible, setSettingsVisible } = useDashboardContext()

	const options: { id: SettingsViewOptionType; name: string; icon: ReactNode }[] = [
		{
			id: "account",
			name: "Konto",
			icon: <User className="w-5 h-5 mr-1 " />,
		},
		{
			id: "templates",
			name: "Szablony",
			icon: <FileCode2 className="w-5 h-5 mr-1 " />,
		},
		{
			id: "token",
			name: "Token",
			icon: <BookKey className="w-5 h-5 mr-1 " />,
		},
	]

	return (
		<AnimatePresence>
			{settingsVisible && (
				<>
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-xs z-50"></motion.div>
					<motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="flex max-md:flex-col  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[50rem] max-lg:w-11/12 bg-background rounded-lg min-h-[30rem] scale-105">
						<div className="w-64 bg-sidebar-color border-r border-border-color rounded-l-lg flex-shrink-0 max-md:w-full">
							<div className="flex items-center justify-between px-5 py-4">
								<h2 className="text-lg font-semibold">Ustawienia</h2>
								<button className="text-text-color cursor-pointer" onClick={() => setSettingsVisible(false)}>
									<X className="w-5 h-5" />
								</button>
							</div>
							<div className="w-full h-[1px] bg-border-color"></div>
							<div className="flex flex-col gap-1   px-3 py-2">
								{options.map(option => (
									<Button className={clsx("flex items-center justify-start h-5 px-3 py-5.5 w-full rounded-lg cursor-pointer ", option.id === settingsViewOption && "bg-primary-color/80")} key={option.id} onPress={() => setSettingsViewOption(option.id)}>
										{option.icon}
										{option.name}
									</Button>
								))}
							</div>
							<div className="w-full h-[1px] bg-border-color"></div>
						</div>
						{settingsViewOption === "templates" && <SettingsOptionTemplate settings={settings} />}
						{settingsViewOption === "account" && <SettingsOptionAccount />}
						{settingsViewOption === "token" && <SettingsOptionToken />}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

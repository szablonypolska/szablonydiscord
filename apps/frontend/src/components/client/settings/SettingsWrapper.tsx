"use client"

import { useSettingsContext } from "@/context/SettingsContext"
import { UserSettings } from "@/components/interfaces/common"
import { useEffect } from "react"
import { toast } from "sonner"

export default function SettingsWrapper({ settings }: { settings: UserSettings | null }) {
	const { setSettingsData } = useSettingsContext()

	useEffect(() => {
		if (settings) {
			setSettingsData(settings)
		} else {
			toast.error("Nie udało się pobrać ustawień użytkownika", {
				description: "Wystąpił błąd podczass ładowania ustawień",
			})
		}
	}, [settings, setSettingsData])

	return <div></div>
}

"use client"

import ToggleButton from "@/components/ui/toggle-button"
import { useCallback, useEffect, useState } from "react"
import { UserSettings } from "@/components/interfaces/common"
import updateAccountTemplatesSettings from "@/lib/settings/setAccountTemplatesSettings"
import { toast } from "sonner"
import { useSettingsContext } from "@/context/SettingsContext"

export default function SettingsOptionTemplate({ settings }: { settings: UserSettings }) {
	const [showStats, setShowStats] = useState<boolean>(settings.templatesDetail)
	const [monitoring, setMonitoring] = useState<boolean>(settings.monitoring)
	const [isInit, setIsInit] = useState<boolean>(true)
	const { setSettingsData } = useSettingsContext()

	const handleSave = useCallback(async () => {
		try {
			console.log("zapisiuje", showStats, monitoring)
			const update = await updateAccountTemplatesSettings(settings.userId, showStats, monitoring)

			if (update) {
				toast.success("Ustawienia zostały zapisane", { description: "Zmiany zostały już wprowadzone." })
				setSettingsData(update.settings)
			}
		} catch (err) {
			console.log(err)
			toast.error("Wystąpił błąd podczas zapisywania ustawień")
		}
	}, [monitoring, settings.userId, setSettingsData, showStats])

	useEffect(() => {
		if (isInit) return setIsInit(false)
		handleSave()
	}, [showStats, monitoring, handleSave, isInit])

	return (
		<div className="bg-sidebar-color/80 p-6 w-full">
			<h3 className="text-lg font-semibold">Szablony</h3>
			<div className="mt-5 w-full">
				<div className="flex items-center justify-between w-full">
					<div>
						<p className="font-medium">Statystyki szablonów</p>
						<span className="text-sm text-text-color">Pokaż statystyki przed podglądem szablonu</span>
					</div>
					<ToggleButton checked={showStats} onChange={setShowStats} />
				</div>
				<div className="flex items-center justify-between w-full mt-5">
					<div>
						<p className="font-medium">Monitoring dodania szablonu</p>
						<span className="text-sm text-text-color">Otrzymaj powiadomienie po dodaniu szablonu</span>
					</div>
					<ToggleButton checked={monitoring} onChange={setMonitoring} />
				</div>
			</div>
		</div>
	)
}

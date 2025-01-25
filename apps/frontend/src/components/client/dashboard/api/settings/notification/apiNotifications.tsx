"use client"
import { useEffect, useState } from "react"
import { useDashboardContext } from "@/context/DashboardContext"
import ApiSettingsNotificationTopBar from "./apiToBar"
import ApiSettingsNotificationHeader from "./apiHeader"
import ApiSettingsNotificationForm from "./apiForm"
import { TypeState } from "../../../../../interfaces/api/common"

export default function ApiSettingsNotifications(params: { params: string }) {
	const [isChange, setChange] = useState<boolean>(false)
	const [isInitialLoad, setIsInitialLoad] = useState(true)
	const [error, setError] = useState(false)
	const [formData, setFormData] = useState<TypeState>({
		webhookUrl: "",
		title: "",
		description: "",
		color: "#00796b",
		visible: false,
	})

	const handleChange = (key: keyof TypeState) => (value: string | boolean) => {
		setFormData(prev => ({ ...prev, [key]: value }))
	}

	useEffect(() => {
		if (isInitialLoad) {
			setIsInitialLoad(false)
			return
		}

		if (!formData.webhookUrl.includes("https://discord.com/api/webhooks/") && formData.webhookUrl !== "") {
			setError(true)
			setChange(false)
		} else {
			setError(false)
		}

		setChange(true)
	}, [formData])

	return (
		<>
			<div className="bg-sidebarColor p-5 border border-borderColor rounded-xl mt-7">
				<ApiSettingsNotificationTopBar />
				<div className="bg-boxColor p-5 mt-5 rounded-lg">
					<ApiSettingsNotificationHeader formData={formData} handleChange={handleChange} />
					{formData.visible && <ApiSettingsNotificationForm formData={formData} handleChange={handleChange} error={error} setError={setError} id={params.params} />}
				</div>
			</div>
		</>
	)
}

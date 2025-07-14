"use client"
import { useEffect, useState } from "react"

import ApiSettingsNotificationTopBar from "./apiTopBar"
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

	console.log(params.params)

	const handleChange = (key: keyof TypeState) => (value: string | boolean) => {
		setFormData(prev => ({ ...prev, [key]: value }))
		setChange(true)
	}

	useEffect(() => {
		if (isInitialLoad) {
			setIsInitialLoad(false)
			return
		}

		if (!formData.webhookUrl.includes("https://discord.com/api/webhooks/") && formData.webhookUrl !== "") {
			setError(true)
		} else {
			setError(false)
		}
	}, [formData, isInitialLoad])

	console.log(isChange)

	return (
		<>
			<div className="bg-sidebar-color p-5 border border-border-color rounded-xl mt-7">
				<ApiSettingsNotificationTopBar />
				<div className="bg-box-color p-5 mt-5 rounded-lg">
					<ApiSettingsNotificationHeader formData={formData} handleChange={handleChange} />
					{formData.visible && <ApiSettingsNotificationForm formData={formData} handleChange={handleChange} error={error} setError={setError} id={params.params} />}
				</div>
			</div>
		</>
	)
}

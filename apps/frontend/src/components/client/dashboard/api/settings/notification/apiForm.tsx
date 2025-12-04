"use client"
import { TypeState } from "../../../../../interfaces/api/common"
import { Button } from "@nextui-org/button"
import { CircleAlert } from "lucide-react"
import ApiSettingsNotificationVariables from "./apiVariables"
import testNotification from "@/lib/dasboard/api/settings/testNotificationDiscord"
import { toast } from "sonner"
import { useDashboardContext } from "@/context/DashboardContext"

export interface TypeStateProps {
	formData: TypeState
	error: boolean
	setError: React.Dispatch<React.SetStateAction<boolean>>
	id: string
	handleChange: (key: keyof TypeState) => (value: string) => void
}

export default function ApiSettingsNotificationForm({ formData, error, setError, id, handleChange }: TypeStateProps) {
	const { user } = useDashboardContext()

	const handleTestNotification = async () => {
		try {
			if (!formData.webhookUrl || error) return setError(true)
			await testNotification({
				userId: user.userId,
				apiKeyId: id,
				color: formData.color.replace("#", ""),
				title: formData.title,
				webhookUrl: formData.webhookUrl,
				description: formData.description,
			})

			setError(false)
			toast.success("Test webhooka przebiegl pomyslnie")
		} catch (err) {
			toast.error("Wystąpił wewnętrzny błąd serwera")
			console.log(`zwraca`, err)
		}
	}

	return (
		<div className="mt-5">
			<div>
				<div className="">
					<input type="text" className={`w-full bg-sidebar-color focus:ring-1  focus:outline-hidden border rounded-xl p-3 ${error ? "border-error-color text-error-color focus:ring-error-color" : "border-border-color focus:ring-primary-color"}`} placeholder="https://discord.com/api/webhooks/..." value={formData.webhookUrl} onChange={e => handleChange("webhookUrl")(e.target.value)} />
					{error && (
						<div className="flex items-center gap-2 text-error-color mt-1">
							<CircleAlert size="20" />
							<p>Webhook URL jest nieprawidłowy, wprowadź poprawny.</p>
						</div>
					)}
				</div>
				<div className="flex items-center gap-3 my-5">
					<Button className="border border-primary-color text-primary-color bg-darknes-primary-color font-medium rounded-xl px-5">Nowy request</Button>
				</div>
			</div>
			<div className="w-full h-0.5 bg-border-color"></div>
			<div className="mt-5">
				<p className="font-medium">Wygląd powiadomień</p>
				<div className="mt-3">
					<p className="text-silver-color text-sm">Kolor paska embeda</p>
					<div className="flex items-center gap-3 mt-3">
						<input type="color" value={formData.color} onChange={e => handleChange("color")(e.target.value)} className="h-9 w-9 rounded-sm bg-sidebar-color border border-sidebar-color cursor-pointer" />
						<input type="text" value={formData.color} onChange={e => handleChange("color")(e.target.value)} className="bg-sidebar-color border border-border-color h-9 p-3 w-32 rounded-xl focus:ring-1 focus:ring-primary-color focus:outline-hidden" />
					</div>
				</div>
				<div className="mt-5">
					<label htmlFor="title" className="text-silver-color">
						Tytuł powiadomienia
					</label>
					<input id="title" type="text" className="bg-sidebar-color border border-border-color  p-3 mt-2 w-full rounded-xl focus:ring-1 focus:ring-primary-color focus:outline-hidden" placeholder="np. Powiadomienia o limicie API dla ${name}" value={formData.title} onChange={e => handleChange("title")(e.target.value)} />
				</div>
				<div className="mt-5">
					<label htmlFor="description" className="text-silver-color">
						Treść powiadomienia
					</label>
					<textarea id="description" rows={3} className="bg-sidebar-color border border-border-color  p-3 mt-2 w-full rounded-xl focus:ring-1 focus:ring-primary-color focus:outline-hidden" placeholder="np. Twój klucz ${name} osiągnął limit dzienny ${usageDailyPercent}%" value={formData.description} onChange={e => handleChange("description")(e.target.value)} />
				</div>
			</div>
			<ApiSettingsNotificationVariables />
			<Button className="w-full bg-primary-color rounded-xl  mt-5" onPress={() => handleTestNotification()}>
				Wyślij testowe powiadomienie
			</Button>
		</div>
	)
}

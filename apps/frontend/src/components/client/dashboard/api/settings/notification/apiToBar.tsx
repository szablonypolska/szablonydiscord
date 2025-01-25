import { MessageSquare } from "lucide-react"

export default function ApiSettingsNotificationTopBar() {
	return (
		<div className="flex items-center gap-3">
			<MessageSquare className="text-primaryColor" />
			<h2 className="text-lg font-medium">Powiadomienia</h2>
		</div>
	)
}

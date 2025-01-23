import ApiSettingsLimit from "@/components/client/dashboard/api/settings/limit/apiLimit"
import ApiSettingsNotifications from "@/components/client/dashboard/api/settings/notification/apiNotifications"

interface TypeProps {
	id: string
}

export default function ApiSettings({ params }: { params: TypeProps }) {
	return (
		<>
			<div className="p-10  max-xl:p-5">
				<ApiSettingsLimit />
				<ApiSettingsNotifications />
			</div>
		</>
	)
}

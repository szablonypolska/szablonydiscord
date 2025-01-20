import ApiSettingsNotifications from "@/components/client/dashboard/api/settings/apiNotifications"

interface TypeProps {
	id: string
}

export default function ApiSettings({ params }: { params: TypeProps }) {
	return (
		<>
			<div className="p-10  mx-auto">
				<ApiSettingsNotifications />
			</div>
		</>
	)
}

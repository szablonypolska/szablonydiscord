import { authOptions } from "@/lib/authOptions"
import getDataSettings from "@/lib/settings/getDataSettings"
import { getServerSession } from "next-auth"
import SettingsWrapper from "./SettingsWrapper"
import { UserSettings } from "@/components/interfaces/common"

export default async function SettingsFetcher() {
	const session = await getServerSession(authOptions)

	try {
		if (!session) return
		const data = await getDataSettings(session?.user.id || "")

		return <SettingsWrapper settings={data.settings as UserSettings} />
	} catch (err) {
		console.log(err)
		return <SettingsWrapper settings={null} />
	}
}

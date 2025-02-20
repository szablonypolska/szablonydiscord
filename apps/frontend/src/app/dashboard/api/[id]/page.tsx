import { authOptions } from "../../../../lib/authOptions"
import ApiSettingsNotifications from "@/components/client/dashboard/api/settings/notification/apiNotifications"
import { getServerSession } from "next-auth/next"
import { prisma } from "@repo/db"
import ApiSettingsLimit from "@/components/client/dashboard/api/settings/limit/apiLimit"

interface TypeProps {
	id: string
}

export default async function ApiSettings(props: { params: Promise<TypeProps> }) {
	const params = await props.params
	const { id } = params
	const session = await getServerSession(authOptions)

	const check = await prisma.api.findUnique({
		where: { apiKeyId: id },
		include: { webhook: true },
	})

	if (!check || check.userId !== session?.user.id) {
		return (
			<div>
				<p>tu cos bedzie</p>
			</div>
		)
	}

	console.log(check)

	return (
		<>
			<div className="p-10  max-xl:p-5">
				<ApiSettingsLimit params={id} />
				<ApiSettingsNotifications params={id} />
			</div>
		</>
	)
}

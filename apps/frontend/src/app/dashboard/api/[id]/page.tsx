import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ApiSettingsLimit from "@/components/client/dashboard/api/settings/limit/apiLimit"
import ApiSettingsNotifications from "@/components/client/dashboard/api/settings/notification/apiNotifications"
import { getServerSession } from "next-auth/next"
import { prisma } from "@repo/db"

interface TypeProps {
	id: string
}

export default async function ApiSettings({ params }: { params: TypeProps }) {
	const { id } = await params
	const session = await getServerSession(authOptions)

	const check = await prisma.api.findUnique({
		where: { apiKeyId: id },
	})

	if (!check || check.userId !== session?.user.id) {
		return (
			<>
				<div>tu cos bedzie</div>
			</>
		)
	}

	return (
		<>
			<div className="p-10  max-xl:p-5">
				<ApiSettingsLimit />
				<ApiSettingsNotifications params={id} />
			</div>
		</>
	)
}

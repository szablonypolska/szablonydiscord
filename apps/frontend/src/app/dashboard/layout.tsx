import Sidebar from "@/components/client/dashboard/sidebar"
import TopSidebar from "@/components/client/dashboard/topSidebar"

import { DashboardProvider } from "@/context/DashboardContext"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/authOptions"
import { prisma } from "@repo/db"
import { redirect } from "next/navigation"
import NotificationsSidebar from "@/components/client/dashboard/notifications-ui/notificationsSidebar"
import SettingsPopup from "@/components/client/dashboard/settings/settingsPopup"

export default async function Layout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect("/login")
	}

	const user = await prisma.user.findUnique({
		where: { userId: session?.user.id },
		include: {
			api: true,
			settings: true,
			notification: {
				take: 4,
				orderBy: {
					dateAdd: "desc",
				},
			},
		},
	})

	return (
		<DashboardProvider user={user}>
			<NotificationsSidebar />
			<SettingsPopup settings={user.settings} />

			<div className="flex w-full h-screen ">
				<div className="shrink-0">
					<Sidebar />
				</div>

				<div className="flex flex-col w-full ">
					<TopSidebar />
					<div className="scrollbar scrollbar-thumb-alt-border-color scrollbar-track-border-color overflow-y-auto p-10">{children}</div>
				</div>
			</div>
		</DashboardProvider>
	)
}

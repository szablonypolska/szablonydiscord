import Sidebar from "@/components/client/dashboard/sidebar"
import TopSidebar from "@/components/client/dashboard/topSidebar"

import { DashboardProvider } from "@/context/DashboardContext"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/authOptions"
import { prisma } from "@repo/db"
import { redirect } from "next/navigation"
import { Toaster } from "sonner"
import { CircleCheckBig, CircleAlert } from "lucide-react"
import NotificationsSidebar from "@/components/client/dashboard/notifications-ui/notificationsSidebar"

export default async function Layout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect("/login")
	}

	const user = await prisma.user.findUnique({
		where: { userId: session?.user.id },
		include: {
			api: true,
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
			<Toaster
				toastOptions={{
					className: "bg-sidebar-color border border-border-color text-white ml-5 flex items-center  gap-5 py-5",
				}}
				icons={{
					success: <CircleCheckBig size="35" className="bg-darknes-primary-color text-primary-color p-1.5 rounded-lg" />,
					error: <CircleAlert size="35" className="bg-darknes-error-color text-error-color p-1.5 rounded-lg" />,
				}}
			/>
			<NotificationsSidebar />

			<div className="flex w-full h-screen ">
				<div className="shrink-0">
					<Sidebar />
				</div>

				<div className="flex flex-col w-full ">
					<TopSidebar />
					<div className="scrollbar scrollbar-thumb-alt-border-color scrollbar-track-border-color overflow-y-auto">{children}</div>
				</div>
			</div>
		</DashboardProvider>
	)
}

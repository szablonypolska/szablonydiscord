import Sidebar from "@/components/client/dashboard/sidebar"
import TopSidebar from "@/components/client/dashboard/topSidebar"
import SeesionWrapper from "@/components/client/dashboard/sessionWrapper"
import { DashboardProvider } from "@/context/DashboardContext"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { prisma } from "@repo/db"
import { redirect } from "next/navigation"
import { Toaster } from "sonner"
import { CircleCheckBig, CircleAlert } from "lucide-react"

export default async function Layout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect("/login")
	}

	const user = await prisma.user.findUnique({
		where: { userId: session?.user.id },
		include: {
			api: true,
		},
	})

	return (
		<DashboardProvider user={user}>
			<SeesionWrapper>
				<Toaster
					toastOptions={{
						className: "bg-sidebarColor border border-borderColor text-white ml-5 flex items-center  gap-5 py-5",
					}}
					icons={{
						success: <CircleCheckBig size="35" className="bg-darknesPrimaryColor text-primaryColor p-1.5 rounded-lg" />,
						error: <CircleAlert size="35" className="bg-darknesErrorColor text-errorColor p-1.5 rounded-lg" />,
					}}
				/>

				<div className="flex w-full h-screen">
					<div className="flex-shrink-0">
						<Sidebar />
					</div>

					<div className="flex flex-col w-full">
						<TopSidebar />

						<div className="overflow-y-auto">{children}</div>
					</div>
				</div>
			</SeesionWrapper>
		</DashboardProvider>
	)
}

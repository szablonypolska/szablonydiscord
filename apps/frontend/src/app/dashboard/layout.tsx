import Sidebar from "@/components/client/dashboard/sidebar"
import TopSidebar from "@/components/client/dashboard/topSidebar"
import SeesionWrapper from "@/components/client/dashboard/sessionWrapper"
import { DashboardProvider } from "@/context/DashboardContext"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<DashboardProvider>
			<SeesionWrapper>
				<div className="flex w-full h-screen overflow-hidden">
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

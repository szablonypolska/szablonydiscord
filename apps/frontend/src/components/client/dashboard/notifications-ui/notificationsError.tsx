import { Bell, Info, Activity } from "lucide-react"

export default function NotificationsError() {
	return (
		<div className="flex items-center justify-center h-full ">
			<div className="flex flex-col items-center ">
				<div className="relative p-5 bg-boxColor rounded-full">
					<Bell size="35" className="text-silverColor" />
					<div className="absolute right-1 bottom-1">
						<Info size="19" className="text-silverColor text-bold" />
					</div>
				</div>
				<div className="mt-4 text-center">
					<h2 className="font-medium text-lg">Nic tu nie ma... jeszcze!</h2>
					<p className="mt-2 text-silverColor px-6">Gdy coś ważnego się wydarzy, na pewno Cię o tym poinformujemy.</p>
				</div>
				<div className="flex flex-col gap-3 mt-6">
					<div className="flex items-start gap-3 bg-boxColor p-3 pr-12 rounded-xl">
						<div className="bg-darknesPrimaryColor p-3 rounded-xl">
							<Activity className="text-primaryColor" />
						</div>
						<div className="">
							<p className="font-medium">Cisza przed burzą?</p>
							<p className="text-silverColor text-sm">Brak powiadomień</p>
						</div>
					</div>
					<div className="flex items-start gap-3 bg-boxColor p-3 pr-12 rounded-xl">
						<div className="bg-darknesPrimaryColor p-3 rounded-xl">
							<Activity className="text-primaryColor" />
						</div>
						<div className="">
							<p className="font-medium">Masz chwilowy spokój!</p>
							<p className="text-silverColor text-sm">Ciesz się chwilą</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

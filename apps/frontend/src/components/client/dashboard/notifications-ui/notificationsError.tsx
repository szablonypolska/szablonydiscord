import { Bell, Info, Activity } from "lucide-react"

export default function NotificationsError() {
	return (
		<div className="flex items-center justify-center h-full ">
			<div className="flex flex-col items-center ">
				<div className="relative p-5 bg-box-color rounded-full">
					<Bell size="35" className="text-silver-color" />
					<div className="absolute right-1 bottom-1">
						<Info size="19" className="text-silver-color text-bold" />
					</div>
				</div>
				<div className="mt-4 text-center">
					<h2 className="font-medium text-lg">Nic tu nie ma... jeszcze!</h2>
					<p className="mt-2 text-silver-color px-6">Gdy coś ważnego się wydarzy, na pewno Cię o tym poinformujemy.</p>
				</div>
				<div className="flex flex-col gap-3 mt-6">
					<div className="flex items-start gap-3 bg-box-color p-3 pr-12 rounded-xl">
						<div className="bg-darknes-primary-color p-3 rounded-xl">
							<Activity className="text-primary-color" />
						</div>
						<div className="">
							<p className="font-medium">Cisza przed burzą?</p>
							<p className="text-silver-color text-sm">Brak powiadomień</p>
						</div>
					</div>
					<div className="flex items-start gap-3 bg-box-color p-3 pr-12 rounded-xl">
						<div className="bg-darknes-primary-color p-3 rounded-xl">
							<Activity className="text-primary-color" />
						</div>
						<div className="">
							<p className="font-medium">Masz chwilowy spokój!</p>
							<p className="text-silver-color text-sm">Ciesz się chwilą</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

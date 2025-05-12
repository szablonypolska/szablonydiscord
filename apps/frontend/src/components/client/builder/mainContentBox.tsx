import { CloudLightning, Bot } from "lucide-react"

export default function MainContentBox() {
	return (
		<div className="flex items-center gap-3 w-[45rem] max-md:w-11/12 max-md:flex-col mt-5">
			<div className="flex-grow bg-boxColor border border-borderColor p-3 py-5 rounded-lg max-md:w-full">
				<div className="bg-borderColor p-2.5 rounded-lg w-fit">
					<CloudLightning className="text-primaryColor" />
				</div>
				<div className="mt-2">
					<p className="font-medium">Szybka generacja</p>
					<span className="text-textColor text-sm mt-0.5">Gotowy szablon w pare minut!</span>
				</div>
			</div>
			<div className="flex-grow bg-boxColor border border-borderColor p-3 py-5 rounded-lg max-md:w-full">
				<div className="bg-borderColor p-2.5 rounded-lg w-fit">
					<Bot className="text-primaryColor" />
				</div>
				<div className="mt-2">
					<p className="font-medium">AI asystent</p>
					<span className="text-textColor text-sm mt-0.5">Pomoc w konfiguracji serwera</span>
				</div>
			</div>
			<div className="flex-grow bg-boxColor border border-borderColor p-3 py-5 rounded-lg max-md:w-full">
				<div className="bg-borderColor p-2.5 rounded-lg w-fit">
					<CloudLightning className="text-primaryColor" />
				</div>
				<div className="mt-2">
					<p className="font-medium">Szybka generacja</p>
					<span className="text-textColor text-sm mt-0.5">Gotowy szablon w pare minut!</span>
				</div>
			</div>
		</div>
	)
}

import { LogOut, Shield } from "lucide-react"

export function SettingsOptionTokenSuccessConnect({ nickname, serverCount, serverLimit }: { nickname: string; serverCount: number; serverLimit: number }) {
	const percentage = (serverCount / serverLimit) * 100

	return (
		<div className=" mt-5 bg-primary-color/10 border border-primary-color p-4 rounded-lg">
			<div className="flex items-center gap-3">
				<div className=" flex items-center justify-center font-semibold text-lg w-12 h-12 rounded-lg bg-primary-color/30 flex-shrink-0">T</div>
				<div className="flex items-center justify-between w-full">
					<div>
						<div className="flex items-center gap-2">
							<p className="font-medium">{nickname}</p>
							<div className="bg-primary-dark text-primary-color px-4 py-0.5 rounded-full text-sm w-fit">{serverLimit > 100 ? "Nitro" : "Normal"}</div>
						</div>
						<div className="flex items-center gap-1 text-text-color mt-1">
							<Shield className="w-4 h-4" />
							<p className="text-sm">{serverCount} serwerów</p>
						</div>
					</div>
					<button className="cursor-pointer">
						<LogOut className="text-gray-300 w-5 h-5" />
					</button>
				</div>
			</div>
			<div className="mt-3">
				<div className="flex items-center justify-between">
					<p className="text-sm text-primary-color">Wykorzystanie serwerów </p>
					<span className="text-primary-color text-sm">
						{serverCount}/{serverLimit}
					</span>
				</div>
				<div className="bg-primary-color/30 w-full rounded-lg h-2 mt-2 overflow-hidden">
					<div className={`bg-primary-color h-full`} style={{ width: `${percentage}%` }}></div>
				</div>
			</div>
		</div>
	)
}

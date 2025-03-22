import { Hash, Link, BellOff, Pin, Users } from "lucide-react"

export default function TopSidebarPreview() {
	return (
		<>
			<div className="flex items-center h-16 border-b border-borderColor p-3 px-5 w-full">
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center gap-1.5">
						<Hash className="text-textSpecial " />
						<p className="text-lg text-gray-200 font-semibold">ogólny</p>
					</div>
					<div className="flex gap-4">
						<Link className="w-6.5 h-6.5 text-gray-200" />
						<BellOff className="w-6.5 h-6.5 text-gray-200" />
						<Pin className="w-6.5 h-6.5 text-gray-200" />
						<Users className="w-6.5 h-6.5 text-gray-200" />
					</div>
				</div>
			</div>
		</>
	)
}

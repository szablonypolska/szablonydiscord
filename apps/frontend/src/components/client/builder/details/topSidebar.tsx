import { Button } from "@nextui-org/button"
import { Hash } from "lucide-react"

export default function TopSidebarBuilder() {
	return (
		<div className="flex items-center justify-between bg-boxColor h-14 border-b border-borderColor w-full p-5">
			<div className="flex items-center gap-3">
				<Hash className="w-6 h-6 text-textColor" />
				<h2>Podgląd szablonu</h2>
			</div>
		</div>
	)
}

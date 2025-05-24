import { Button } from "@nextui-org/button"
import { ArrowLeft } from "lucide-react"

export default function SidebarBuilderMaterialsFooter() {
	return (
		<div className="">
			<Button className="bg-primaryColor w-full rounded-xl text-sm">
				<ArrowLeft className="w-5 h-5" />
				<span>Powrót do podglądu</span>
			</Button>
		</div>
	)
}

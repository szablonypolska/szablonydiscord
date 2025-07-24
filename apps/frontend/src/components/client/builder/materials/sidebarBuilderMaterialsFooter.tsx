import { useBuilderContext } from "@/context/BuilderContext"
import { Button } from "@nextui-org/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SidebarBuilderMaterialsFooter() {
	const { builderData } = useBuilderContext()

	return (
		<div className="">
			<Link href={`/builder/${builderData.sessionId}`}>
				<Button className="bg-primary-color w-full rounded-xl text-sm cursor-pointer">
					<ArrowLeft className="w-5 h-5" />
					<span>Powrót do podglądu</span>
				</Button>
			</Link>
		</div>
	)
}

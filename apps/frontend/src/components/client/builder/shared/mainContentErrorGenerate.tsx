import { Button } from "@nextui-org/button"
import { CircleAlert } from "lucide-react"
import Link from "next/link"

export default function MainContentErrorGenerate() {
	return (
		<div className="flex flex-col items-center justify-center bg-box-color border border-border-color rounded-lg w-full px-4 py-5 h-64">
			<div className="bg-darknes-error-color w-fit p-4 rounded-full">
				<CircleAlert className="text-error-color w-7 h-7" />
			</div>
			<p className="font-semibold mt-4">Wystąpił błąd</p>
			<p className="text-sm text-text-color mt-1">Nie udało się wygenerować szablonu, spróbuj ponownie później</p>
			<Link href="/builder">
				<Button className="bg-border-color  rounded-lg text-sm mt-4 cursor-pointer">Spróbuj ponownie</Button>
			</Link>
		</div>
	)
}

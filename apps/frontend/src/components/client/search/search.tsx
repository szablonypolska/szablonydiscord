import { Button } from "@nextui-org/button"
import { Search as SearchItem } from "lucide-react"

export default function Search() {
	return (
		<>
			<div className="w-full bg-boxColor p-5 border border-borderColor rounded-xl px-8">
				<div className="mt-3">
					<h1 className="text-2xl font-medium">Szablony Discord</h1>
					<p className="text-sm text-silverColor mt-2">Przeglądaj i filtruj szablony według kategorii lub użyj wyszukiwarki</p>
				</div>
				<div className="flex items-center gap-3 relative mt-5">
					<input
						type="text"
						className="bg-altBackgroundColor border border-borderColor w-full p-3.5 rounded-xl focus:ring-2 focus:ring-primaryDark focus:outline-none"
						placeholder="Wyszukaj szablon..."
					/>
					<Button className="flex items-center gap-2 bg-primaryDark text-primaryLight rounded-xl px-6 py-7 text-sm transition-colors disabled:opacity-50">
						<SearchItem size="37" />
						Wyszukaj
					</Button>
				</div>
			</div>
		</>
	)
}

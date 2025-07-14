"use client"

import { Button } from "@nextui-org/button"
import { Search, RefreshCcw } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export default function SearchError() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const handleClearSearch = () => {
		const params = new URLSearchParams(searchParams.toString())

		params.delete("name")

		router.push(`/search`)
	}

	return (
		<>
			<div className="flex flex-col justify-center items-center mt-20">
				<div className="bg-primary-dark text-primary-light p-5 rounded-full">
					<Search size="35" />
				</div>
				<div className="mt-5 text-center">
					<h3 className="text-xl font-medium">Brak wyników wyszukiwania</h3>
					<p className="text-dark-gray w-120 mt-3">Nie naleziono szablonów dla twojego zapytania. Spróbuj użyć innych słów kluczowych lub przeglądaj wszystkie szablony</p>
					<Button className="bg-primary-dark text-primary-light rounded-xl h-12 mt-7" onPress={handleClearSearch}>
						<RefreshCcw />
						Wyczyść wyszukiwanie
					</Button>
				</div>
			</div>
		</>
	)
}

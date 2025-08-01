"use client"

import { Button } from "@nextui-org/button"
import { Search, RefreshCcw } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

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
			<motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }} className="flex flex-col justify-center items-center mt-20">
				<div className="bg-primary-dark text-primary-light p-5 rounded-full">
					<Search size="35" />
				</div>
				<div className="mt-5 text-center">
					<h3 className="text-xl font-medium">Brak wyników wyszukiwania</h3>
					<p className="text-dark-gray w-120 mt-3">Nie naleziono szablonów dla twojego zapytania. Spróbuj użyć innych słów kluczowych lub przeglądaj wszystkie szablony</p>
					<Button className="bg-primary-dark text-primary-light rounded-xl h-12 mt-7 cursor-pointer px-7" onPress={handleClearSearch}>
						<RefreshCcw className="w-5 h-5" />
						<span>Wyczyść wyszukiwanie</span>
					</Button>
				</div>
			</motion.div>
		</>
	)
}

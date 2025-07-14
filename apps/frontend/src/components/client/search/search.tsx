"use client"
import { Button } from "@nextui-org/button"
import { motion } from "framer-motion"
import { Search as SearchItem, LoaderCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

export default function Search() {
	const [name, setName] = useState<string>("")
	const [initialize, setInitialize] = useState(false)
	const [isPending, startTransition] = useTransition()

	const router = useRouter()
	const searchParams = useSearchParams()
	const nameParams = searchParams.get("name")
	const checkName = nameParams === name

	const handleSearch = () => {
		const params = new URLSearchParams(searchParams.toString())
		params.set("name", name)
		params.delete("sort")
		params.delete("category")

		startTransition(() => {
			router.push(`/search?${params.toString()}`)
		})
	}

	useEffect(() => {
		if (initialize) return
		setInitialize(true)

		setName(nameParams ? nameParams : "")
	}, [nameParams, name, initialize])

	return (
		<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-full bg-box-color p-5 border border-border-color rounded-xl px-8">
			<div className="mt-3">
				<h1 className="text-2xl font-medium">Szablony Discord</h1>
				<p className="text-sm text-silver-color mt-2">Przeglądaj i filtruj szablony według kategorii lub użyj wyszukiwarki</p>
			</div>
			<div className="flex items-center gap-3 relative mt-5">
				<input type="text" className="bg-alt-background-color border border-border-color w-full p-3.5 rounded-xl focus:ring-2 focus:ring-primary-dark focus:outline-hidden" placeholder="Wyszukaj po nazwie lub id..." defaultValue={name} onChange={e => setName(e.target.value)} />

				<Button className="flex items-center gap-2 bg-primary-dark text-primary-light rounded-xl px-6 py-7 text-sm transition-colors disabled:opacity-50" isDisabled={isPending || checkName} onPress={handleSearch}>
					{isPending ? <LoaderCircle size="40" className="animate-spin" /> : <SearchItem size="37" />}
					Wyszukaj
				</Button>
			</div>
		</motion.div>
	)
}

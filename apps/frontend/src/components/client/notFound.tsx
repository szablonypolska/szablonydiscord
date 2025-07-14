"use client"

import { Button } from "@nextui-org/button"
import { FileQuestion, Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NotFoundWeb() {
	const pathname = usePathname()
	return (
		<div className="flex flex-col justify-center text-center  w-full  my-32">
			<div className="text-center">
				<div className="inline-flex items-center justify-center w-20 h-20 bg-border-color rounded-2xl mb-6 relative group">
					<FileQuestion className="w-10 h-10 text-dark-gray group-hover:scale-110 transition-transform duration-300" />
					<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6  bg-border-color rotate-45" />
				</div>
				<h2 className="text-[120px] font-bold leading-none tracking-tighter bg-clip-text  text-transparent bg-linear-to-b from-white to-border-color select-none">404</h2>
			</div>
			<div className="flex flex-col items-center mt-6 w-full">
				<h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-white to-border-color mb-6">Ups! Nie możemy znależć tej strony</h1>
				<p className="text-dark-gray">Strona której szukasz mogła zostać przeniesiona lub nie istnieje.</p>
				<p className="text-dark-gray">Sprawdź czy adres URL jest poprawny lub wróć do strony głównej.</p>
				<div className=" p-5 bg-border-color rounded-xl w-140 mt-6 relative max-md:w-full">
					<input type="text" readOnly className="bg-alt-background-color w-full p-3 rounded-xl border border-[#2f2f2f] text-dark-gray pl-10 outline-hidden" value={`https://szablonydiscord.pl${pathname}`} />
					<div className="absolute top-1/2 -translate-y-1/2 pl-3">
						<Search className="text-dark-gray" size={18} />
					</div>
				</div>
				<Link href="/">
					<Button className="bg-primary-color rounded-xl p-5 mt-8 h-12">
						<ArrowLeft />
						Powrót do strony głównej
					</Button>
				</Link>
			</div>
		</div>
	)
}

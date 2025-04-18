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
				<div className="inline-flex items-center justify-center w-20 h-20 bg-borderColor rounded-2xl mb-6 relative group">
					<FileQuestion className="w-10 h-10 text-darkGray group-hover:scale-110 transition-transform duration-300" />
					<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6  bg-borderColor rotate-45" />
				</div>
				<h2 className="text-[120px] font-bold leading-none tracking-tighter bg-clip-text  text-transparent bg-gradient-to-b from-white to-borderColor select-none">404</h2>
			</div>
			<div className="flex flex-col items-center mt-6 w-full">
				<h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-borderColor mb-6">Ups! Nie możemy znależć tej strony</h1>
				<p className="text-darkGray">Strona której szukasz mogła zostać przeniesiona lub nie istnieje.</p>
				<p className="text-darkGray">Sprawdź czy adres URL jest poprawny lub wróć do strony głównej.</p>
				<div className=" p-5 bg-borderColor rounded-xl w-[35rem] mt-6 relative max-md:w-full">
					<input type="text" readOnly className="bg-altBackgroundColor w-full p-3 rounded-xl border border-[#2f2f2f] text-darkGray pl-10 outline-none" value={`https://szablonydiscord.pl${pathname}`} />
					<div className="absolute top-1/2 -translate-y-1/2 pl-3">
						<Search className="text-darkGray" size={18} />
					</div>
				</div>
				<Link href="/">
					<Button className="bg-primaryColor rounded-xl p-5 mt-8 h-12">
						<ArrowLeft />
						Powrót do strony głównej
					</Button>
				</Link>
			</div>
		</div>
	)
}

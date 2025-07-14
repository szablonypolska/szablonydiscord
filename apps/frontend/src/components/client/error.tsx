"use client"

import { Button } from "@nextui-org/button"
import { RefreshCcw, Terminal, Code2, ChevronDown, ChevronUp, ServerCrash, TriangleAlert } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

interface ErrorProps {
	error: string
	reset?: () => void
}

export default function ErrorWeb({ error, reset }: ErrorProps) {
	const pathname = usePathname()
	const [visible, setVisible] = useState<boolean>(false)
	const date = Date.now()

	const errorText = error ? error : "Wystąpił niezidentyfikowany błąd serwera.."

	return (
		<div className="flex flex-col justify-center   w-full my-32">
			<div className="text-center">
				<div className="inline-flex items-center justify-center w-20 h-20 bg-border-color rounded-2xl mb-6 relative group">
					<ServerCrash className="w-10 h-10 text-error-color group-hover:scale-110 transition-transform duration-300" />
					<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6  bg-border-color rotate-45" />
				</div>
				<h2 className="text-[120px] font-bold leading-none tracking-tighter bg-clip-text  text-transparent bg-linear-to-b from-white to-border-color select-none">500</h2>
			</div>
			<div className="flex flex-col items-center mt-6 w-full max-md:text-center">
				<h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white via-white to-border-color mb-6">Ups! Wystąpił nieznany błąd, spróbuj później</h1>
				<p className="text-dark-gray">Strona której szukasz mogła zostać przeniesiona lub nie istnieje.</p>
				<p className="text-dark-gray">Sprawdź czy adres URL jest poprawny lub wróć do strony głównej.</p>
				<div className=" p-5 bg-border-color rounded-xl  mt-6 relative md:w-140 max-md:w-full">
					<input
						type="text"
						readOnly
						className="bg-alt-background-color w-full p-3 rounded-xl border border-[#2f2f2f] text-dark-gray pl-10 outline-hidden"
						value={`https://szablonydiscord.pl${pathname}`}
					/>
					<div className="absolute top-1/2 -translate-y-1/2 pl-3">
						<TriangleAlert className="text-error-color" size={18} />
					</div>
				</div>

				<div className="flex gap-3 max-sm:flex-col max-sm:gap-5 mt-8">
					{reset && (
						<Button className="bg-error-color rounded-xl p-5  h-12" onPress={() => reset()}>
							<RefreshCcw />
							Spróbuj ponownie
						</Button>
					)}
					{!reset && (
						<Link href={pathname}>
							<Button className="bg-error-color rounded-xl p-5  h-12">
								<RefreshCcw />
								Spróbuj ponownie
							</Button>
						</Link>
					)}
					<Button className="bg-border-color rounded-xl p-5  h-12" onPress={() => setVisible(!visible)}>
						{visible ? <ChevronUp /> : <ChevronDown />}
						Pokaż szczegóły
					</Button>
				</div>
			</div>
			{visible && (
				<div className="flex flex-col items-center justify-center w-full mt-10">
					<div className=" bg-alt-background-color p-5 rounded-xl border border-border-color w-200 max-lg:w-11/12 max-md:w-full">
						<div className="flex gap-3">
							<div className="bg-border-color w-fit p-3 rounded-xl">
								<Terminal className="text-error-color font-black" size={20} />
							</div>
							<div className="">
								<p className="text-lg font-medium">Szczegóły błędu</p>
								<p className="text-dark-gray text-sm">Informacje debugowania</p>
							</div>
						</div>
						<div className="flex items-start gap-2  bg-border-color mt-5 p-3 rounded-xl">
							<Code2 size={20} className="text-dark-gray shrink-0" />
							<pre className="text-silver-color overflow-auto">{errorText}</pre>
						</div>
						<div className="flex gap-5 w-full mt-5">
							<div className="bg-border-color p-3 w-1/2 rounded-xl">
								<pre className="text-sm text-dark-gray">Timestamp</pre>
								<pre className="text-silver-color">{date}</pre>
							</div>
							<div className="bg-border-color p-3 w-1/2 rounded-xl">
								<pre className="text-sm text-dark-gray">Error ID</pre>
								<pre className="text-silver-color">...</pre>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

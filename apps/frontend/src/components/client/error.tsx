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

	console.log(`zwraca`, error)

	return (
		<div className="flex flex-col justify-center   w-full my-32">
			<div className="text-center">
				<div className="inline-flex items-center justify-center w-20 h-20 bg-borderColor rounded-2xl mb-6 relative group">
					<ServerCrash className="w-10 h-10 text-errorColor group-hover:scale-110 transition-transform duration-300" />
					<div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-6  bg-borderColor rotate-45" />
				</div>
				<h2 className="text-[120px] font-bold leading-none tracking-tighter bg-clip-text  text-transparent bg-gradient-to-b from-white to-borderColor select-none">500</h2>
			</div>
			<div className="flex flex-col items-center mt-6 w-full max-md:text-center">
				<h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-borderColor mb-6">Ups! Wystąpił nieznany błąd, spróbuj później</h1>
				<p className="text-darkGray">Strona której szukasz mogła zostać przeniesiona lub nie istnieje.</p>
				<p className="text-darkGray">Sprawdź czy adres URL jest poprawny lub wróć do strony głównej.</p>
				<div className=" p-5 bg-borderColor rounded-xl  mt-6 relative md:w-[35rem] max-md:w-full">
					<input
						type="text"
						readOnly
						className="bg-altBackgroundColor w-full p-3 rounded-xl border border-[#2f2f2f] text-darkGray pl-10 outline-none"
						value={`https://szablonydiscord.pl${pathname}`}
					/>
					<div className="absolute top-1/2 -translate-y-1/2 pl-3">
						<TriangleAlert className="text-errorColor" size={18} />
					</div>
				</div>

				<div className="flex gap-3 max-sm:flex-col max-sm:gap-5 mt-8">
					{reset && (
						<Button className="bg-errorColor rounded-xl p-5  h-12" onPress={() => reset()}>
							<RefreshCcw />
							Spróbuj ponownie
						</Button>
					)}
					{!reset && (
						<Link href={pathname}>
							<Button className="bg-errorColor rounded-xl p-5  h-12">
								<RefreshCcw />
								Spróbuj ponownie
							</Button>
						</Link>
					)}
					<Button className="bg-borderColor rounded-xl p-5  h-12" onPress={() => setVisible(!visible)}>
						{visible ? <ChevronUp /> : <ChevronDown />}
						Pokaż szczegóły
					</Button>
				</div>
			</div>
			{visible && (
				<div className="flex flex-col items-center justify-center w-full mt-10">
					<div className=" bg-altBackgroundColor p-5 rounded-xl border border-borderColor w-[50rem] max-lg:w-11/12 max-md:w-full">
						<div className="flex gap-3">
							<div className="bg-borderColor w-fit p-3 rounded-xl">
								<Terminal className="text-errorColor font-black" size={20} />
							</div>
							<div className="">
								<p className="text-lg font-medium">Szczegóły błędu</p>
								<p className="text-darkGray text-sm">Informacje debugowania</p>
							</div>
						</div>
						<div className="flex items-start gap-2  bg-borderColor mt-5 p-3 rounded-xl">
							<Code2 size={20} className="text-darkGray shrink-0 mt-1" />
							<pre className="text-silverColor overflow-auto">{error}</pre>
						</div>
						<div className="flex gap-5 w-full mt-5">
							<div className="bg-borderColor p-3 w-1/2 rounded-xl">
								<pre className="text-sm text-darkGray">Timestamp</pre>
								<pre className="text-silverColor">{date}</pre>
							</div>
							<div className="bg-borderColor p-3 w-1/2 rounded-xl">
								<pre className="text-sm text-darkGray">Error ID</pre>
								<pre className="text-silverColor">...</pre>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

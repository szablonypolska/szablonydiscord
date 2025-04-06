"use client"

import { Button } from "@nextui-org/button"
import decorationTemplatesElement from "../../../../../public/templatesDecorationSearch.svg"
import searchDecoration from "../../../../../public/searchDecoration.svg"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { Search } from "lucide-react"
import { BlurFade } from "@/components/ui/blur-fade"

export default function HeaderTemplates({ searchHistory }: { searchHistory: string[] }) {
	const [text, setText] = useState<string>("")

	console.log(searchHistory)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(handleChange)
		setText(e.target.value)
	}
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<>
			<header className="flex items-center max-lg:gap-5 max-lg:mt-32  my-20  relative px-10 max-md:px-5">
				<div className="relative w-1/2 max-lg:w-full">
					<BlurFade delay={0.02} inView>
						<h1 className="text-[2.8rem] leading-[55px] font-bold uppercase w-full tracking-wider max-sm:text-2xl  max-sm:tracking-widest">
							znajdź <span className="text-primaryColor">szablon</span> dla{" "}
							<BlurFade delay={0.02 * 2} inView>
								<span className="text-primaryColor">twojego serwera</span>
							</BlurFade>
						</h1>
					</BlurFade>
					<div className="flex items-center gap-3 max-sm:flex-col  w-9/12 max-xl:w-11/12 max-md:w-full z-50 relative">
						<div className="flex-grow relative w-full">
							<div className="relative flex flex-col justify-center  items-center w-full ">
								<PlaceholdersAndVanishInput placeholders={searchHistory} onChange={handleChange} onSubmit={onSubmit} />
								<span className="material-symbols-outlined absolute left-7 top-1/2 -translate-y-1/2 -translate-x-1/2">
									<Search size={20} />
								</span>
							</div>
						</div>
						<Link href={`${`/search?name=${text}`}`} className="max-sm:w-full">
							<Button className="uppercase bg-primaryColor rounded-xl text-sm font-[550] px-6 disabled:opacity-80 max-sm:w-full" disabled={!text}>
								znajdź
							</Button>
						</Link>
					</div>
					<div className="flex items-center max-sm:flex-col gap-3 mt-3">
						<p className="text-textSpecial">Popularne kategorie:</p>
						<div className="flex items-center gap-3">
							<Link href="/search?category=Gamingowe&page=1" className="text-textColor underline">
								Gry
							</Link>
							<Link href="/search?category=Społecznościowe&page=1" className="text-textColor underline">
								Społeczności
							</Link>
							<Link href="/search?category=NSFW&page=1" className="text-textColor underline">
								NSFW
							</Link>
							<Link href="/search">+13</Link>
						</div>
					</div>
					<Image src={decorationTemplatesElement} alt="dekoracyjny wykresowy element" className="absolute -top-20 right-5 z-10" />
				</div>
				<Image src={searchDecoration} alt="test" className="flex justify-center w-1/2 h-96 max-lg:w-5/12 max-lg:hidden"></Image>
			</header>
		</>
	)
}

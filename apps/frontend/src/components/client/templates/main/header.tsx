import { Button } from "@nextui-org/button"
import decorationTemplatesElement from "../../../../../public/templatesDecorationSearch.svg"
import searchDecoration from "../../../../../public/searchDecoration.svg"
import Image from "next/image"

export default function HeaderTemplates() {
	return (
		<>
			<header className="flex items-center max-lg:gap-5 max-lg:mt-32  my-20  relative px-10">
				<div className="relative w-1/2 max-lg:w-full">
					<h1 className="text-[2.8rem] leading-[50px] font-bold uppercase w-full tracking-wider">
						znajdź <span className="text-primaryColor">szablon</span> dla <span className="text-primaryColor">twojego serwera</span>
					</h1>
					<div className="flex items-center gap-3 mt-5  w-9/12 max-xl:w-11/12 z-50 relative">
						<div className="flex-grow relative">
							<input type="text" className="w-full bg-[#212121] border border-borderColor pl-12 py-2 rounded-xl placeholder:text-textColor" placeholder="Wyszukaj szablonu..." />
							<span className="material-symbols-outlined absolute left-7 top-1/2 -translate-y-1/2 -translate-x-1/2">search</span>
						</div>
						<Button className="uppercase bg-primaryColor rounded-xl text-sm font-[550] px-6">znajdź</Button>
					</div>
					<div className="flex items-center gap-3 mt-3">
						<p className="text-textSpecial">Popularne kategorie:</p>
						<p className="text-textColor underline">Gry</p>
						<p className="text-textColor underline">Społeczności</p>
						<p className="text-textColor underline">NSFW</p>
						<p>+13</p>
					</div>
					<Image src={decorationTemplatesElement} alt="dekoracyjny wykresowy element" className="absolute -top-20 right-5 z-10" />
				</div>
				<Image src={searchDecoration} alt="test" className="flex justify-center w-1/2 h-96 max-lg:w-5/12 max-lg:hidden"></Image>
			</header>
		</>
	)
}

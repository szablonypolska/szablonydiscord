import Image from "next/image"
import decorationElement from "../../public/decorationElement.svg"
import Navbar from "@/components/navbar"
import Card from "@/components/cards"
import HeroSeaction from "@/components/heroSeaction"

export default function Home() {
	return (
		<>
			<div className="max-w-screen-2xl mx-auto w-full py-4 p-2">
				<Navbar />
				<Image src={decorationElement} alt="dekoracyjny element" className="absolute top-0 left-0 z-10"></Image>
				<HeroSeaction />
				<Card />
			</div>
		</>
	)
}

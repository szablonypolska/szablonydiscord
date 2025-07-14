import { Sparkles } from "lucide-react"
import MainContentInput from "./mainContentInput"
import MainContentBox from "./mainContentBox"
import { prisma } from "@repo/db"


export default async function MainContentBuilder() {
	const decorationChannel = await prisma.decorationChannel.findMany({})
	const decorationCategory = await prisma.decorationCategory.findMany({})

	return (
		<div className="flex flex-col items-center justify-center mt-24 relative scale-105">
			<div className="absolute -left-32 bg-primary-color w-28 h-28 blur-[100px] animate-pulse  max-md:blur-[100px] max-md:left-1/2 z-10"></div>
			<div className="absolute -right-32 top-96 bg-primary-color w-28 h-28 blur-[100px] animate-pulse max-md:right-0 max-md:hidden z-10"></div>
			<div className="flex items-center gap-3 bg-box-color border border-border-color p-1.5 px-5 rounded-full w-fit">
				<Sparkles className="text-primary-color w-5 h-5" />
				<p className="font-medium text-sm">Powered by AI</p>
			</div>
			<div className="w-140 max-md:w-full text-center mt-5">
				<h1 className="text-3xl font-semibold tracking-wider">Stwórz idealny szablon Discord</h1>
				<p className="text-text-color mt-2.5 text-sm">Opisz swój wymarzony serwer discord a nasza sztuczna inteligencja stworzy dla ciebie szablon discord.</p>
			</div>
			<MainContentInput decorationChannel={decorationChannel} decorationCategory={decorationCategory} />
			<MainContentBox />
		</div>
	)
}

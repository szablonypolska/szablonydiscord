import { Sparkles } from "lucide-react"
import MainContentInput from "./mainContentInput"
import MainContentBox from "./mainContentBox"

export default function MainContentBuilder() {
	return (
		<div className="flex flex-col items-center justify-center mt-28 scale-105">
			<div className="absolute -left-32 bg-primaryColor w-28 h-28 blur-[100px] animate-pulse"></div>
			<div className="absolute -right-32 top-96 bg-primaryColor w-28 h-28 blur-[100px] animate-pulse"></div>
			<div className="flex items-center gap-3 bg-boxColor border border-borderColor p-1.5 px-5 rounded-full w-fit">
				<Sparkles className="text-primaryColor w-5 h-5" />
				<p className="font-medium text-sm">Powered by AI</p>
			</div>
			<div className="w-[35rem] max-md:w-full text-center mt-5">
				<h1 className="text-3xl font-semibold tracking-wider">Stwórz idealny szablon Discord</h1>
				<p className="text-textColor mt-2.5 text-sm">Opisz swój wymarzony serwer discord a nasza sztuczna inteligencja stworzy dla ciebie szablon discord.</p>
			</div>
			<MainContentInput />
			<MainContentBox />
		</div>
	)
}

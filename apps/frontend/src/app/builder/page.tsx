import Navbar from "@/components/client/navbar"
import decorationElement from "../../../public/templatesDecoration.svg"
import Image from "next/image"
import Footer from "@/components/client/footer"
import MainContentBuilder from "@/components/client/builder/mainContent"

export default function Builder() {
	return (
		<>
			<div
				className="fixed top-0 left-0 flex flex-col items-center justify-center scale-105 min-h-screen w-full opacity-30 z-[-1]"
				style={{
					backgroundImage: `linear-gradient(to right, var(--borderColor) 1px, transparent 1px), linear-gradient(to bottom, var(--borderColor) 1px, transparent 1px)`,
					backgroundSize: "32px 32px",
					backgroundColor: "var(--background)",
				}}></div>
			<div className="max-w-screen-2xl mx-auto w-full py-4 p-2">
				<Image src={decorationElement} alt="dekoracyjny element" className="absolute top-0 left-0 pointer-events-none z-[50]" />
				<Navbar />
				<MainContentBuilder />
			</div>
			<Footer />
		</>
	)
}

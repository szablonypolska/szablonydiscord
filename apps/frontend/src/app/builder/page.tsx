import Navbar from "@/components/client/navbar"
import decorationElement from "../../../public/templatesDecoration.svg"
import Image from "next/image"
import Footer from "@/components/client/footer"
import MainContentBox from "@/components/client/builder/shared/mainContentBox"
import MainContentHeader from "@/components/client/builder/shared/mainContentHeader"
import MainContentInput from "@/components/client/builder/shared/mainContentInput"
import { prisma } from "@repo/db"

export default async function Builder() {
	const decorationChannel = await prisma.decorationChannel.findMany({})
	const decorationCategory = await prisma.decorationCategory.findMany({})

	return (
		<>
			<div
				className="fixed top-0 left-0 flex flex-col items-center justify-center scale-105 min-h-screen w-full opacity-30 z-[-1]"
				style={{
					backgroundImage: `linear-gradient(to right, var(--borderColor) 1px, transparent 1px), linear-gradient(to bottom, var(--borderColor) 1px, transparent 1px)`,
					backgroundSize: "32px 32px",
					backgroundColor: "var(--background)",
				}}></div>
			<div className="max-w-(--breakpoint-2xl) mx-auto w-full py-4 p-2">
				<Image src={decorationElement} alt="dekoracyjny element" className="absolute top-0 left-0 pointer-events-none z-50" />
				<Navbar />
				<div className="flex flex-col items-center justify-center mt-24 relative scale-105">
					<div className="absolute -left-32 bg-primary-color w-28 h-28 blur-[100px]  max-md:blur-[100px] max-md:left-1/2 z-10"></div>
					<div className="absolute -right-32 top-96 bg-primary-color w-28 h-28 blur-[100px]  max-md:right-0 max-md:hidden z-10"></div>

					<MainContentHeader />
					<MainContentInput decorationChannel={decorationChannel} decorationCategory={decorationCategory} sourceTemplate={null} />
					<MainContentBox />
				</div>
			</div>
			<Footer />
		</>
	)
}

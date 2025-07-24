import MainContentInput from "./mainContentInput"
import MainContentBox from "./mainContentBox"
import MainContentHeader from "./mainContentHeader"
import { prisma } from "@repo/db"

export default async function MainContentBuilder() {
	const decorationChannel = await prisma.decorationChannel.findMany({})
	const decorationCategory = await prisma.decorationCategory.findMany({})

	return (
		<div className="flex flex-col items-center justify-center mt-24 relative scale-105">
			<div className="absolute -left-32 bg-primary-color w-28 h-28 blur-[100px] animate-pulse  max-md:blur-[100px] max-md:left-1/2 z-10"></div>
			<div className="absolute -right-32 top-96 bg-primary-color w-28 h-28 blur-[100px] animate-pulse max-md:right-0 max-md:hidden z-10"></div>

			<MainContentHeader />
			<MainContentInput decorationChannel={decorationChannel} decorationCategory={decorationCategory} />
			<MainContentBox />
		</div>
	)
}

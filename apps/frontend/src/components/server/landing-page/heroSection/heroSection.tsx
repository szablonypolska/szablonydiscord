import HeroContent from "@/components/client/landing-page/heroSection/heroContent"
import ScanTemplateList from "@/components/client/landing-page/heroSection/heroScanTemplateList"
import { prisma } from "@repo/db"

export default async function HeroSection() {
	// const response = await fetch(process.env.NEXT_PUBLIC_GET_REDIS_QUEUE || "")
	// const data = await response.json()

	// let templates = [
	// 	{
	// 		title: "elo",
	// 		id: 1,
	// 		usage: 20,
	// 		dateCreate: "20.03.2024",
	// 		templateId: "1",
	// 		waitElement: 40,
	// 	},
	// ]

	const templates = await prisma.templates.findMany({
		orderBy: { dateCreateSystem: "desc" },
		take: 50,
	})

	return (
		<header className="py-32 px-5 overflow-hidden max-lg:px-2 max-md:py-10 pr-12">
			<div className="flex gap-32 max-2xl:gap-10 max-md:flex-col max-md:items-center max-lg:gap-5">
				<HeroContent />
				<ScanTemplateList templates={templates} status={true} />
			</div>
		</header>
	)
}

// import HeroContent from "@/components/client/landing-page/heroSection/heroContent"
// import ScanTemplateList from "@/components/client/landing-page/heroSection/heroScanTemplateList"
// import { prisma } from "@repo/db"

// export default async function HeroSection() {
// 	const response = await fetch(process.env.NEXT_PUBLIC_GET_REDIS_QUEUE || "")
// 	const data = await response.json()

// 	let templates = []

// 	if (data) {
// 		templates = await prisma.template.findMany({
// 			take: 50,
// 		})
// 	} else {
// 		templates = await prisma.template.findMany({
// 			take: 4,
// 		})
// 	}

// 	return (
// 		<header className="py-32 px-5 overflow-hidden max-lg:px-2 max-md:py-10 pr-12">
// 			<div className="flex gap-32 max-2xl:gap-10 max-md:flex-col max-md:items-center max-lg:gap-5">
// 				<HeroContent />
// 				<ScanTemplateList templates={templates} status={data} />
// 			</div>
// 		</header>
// 	)
// }

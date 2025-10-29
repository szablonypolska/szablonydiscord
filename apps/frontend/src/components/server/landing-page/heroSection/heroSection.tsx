import HeroContent from "@/components/client/landing-page/heroSection/heroContent"
import ScanTemplateList from "@/components/client/landing-page/heroSection/heroScanTemplateList"
import { prisma } from "@repo/db"

export default async function HeroSection() {
	const templates = await prisma.templates.findMany({
		orderBy: { createdAt: "desc" },
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

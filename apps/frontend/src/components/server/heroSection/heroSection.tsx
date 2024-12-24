import HeroContent from "@/components/client/heroSection/heroContent"
import HeroContentElement from "@/components/client/heroSection/heroContentElement"
import ScanTemplateList from "@/components/client/heroSection/heroScanTemplateList"

export default async function HeroSection() {
	const response = await fetch(process.env.NEXT_PUBLIC_GET_REDIS_QUEUE || "")
	const data = await response.json()

	return (
		<header className="py-32 px-5 overflow-hidden max-lg:px-2 max-md:py-10 pr-12">
			<div className="flex gap-32 max-2xl:gap-10 max-md:flex-col max-md:items-center max-lg:gap-5">
				<HeroContent />
				<div className="w-[27rem] rounded-lg p-5 relative max-md:w-full max-md:p-0 max-lg:w-1/2">
					<HeroContentElement />
					<ScanTemplateList data={data} />
				</div>
			</div>
		</header>
	)
}

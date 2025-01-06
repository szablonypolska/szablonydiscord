import Image from "next/image"
import decorationElement from "../../public/decorationElement.svg"
import Navbar from "@/components/client/navbar"
import HeroSection from "@/components/server/heroSection/heroSection"
import CallToAction from "@/components/client/callToAction"
import EmblaCarousel from "@/components/client/opinion/emblaCarousel"
import Footer from "@/components/client/footer"
import Statistics from "@/components/client/statistics"
import GlobalToaster from "@/components/client/globalToaster"

export default function Home() {
	return (
		<>
			<div className="max-w-screen-2xl mx-auto w-full py-4 p-2">
				<Navbar />
				<GlobalToaster />
				<Image src={decorationElement} alt="dekoracyjny element" className="absolute top-0 left-0 z-10"></Image>
				<HeroSection />
				<Statistics />
				<EmblaCarousel slides={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
				<CallToAction />
			</div>
			<Footer />
		</>
	)
}

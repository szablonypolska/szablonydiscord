import Navbar from "@/components/client/navbar"
import decorationElement from "../../../public/templatesDecoration.svg"
import Image from "next/image"
import Footer from "@/components/client/footer"
import MainContentBuilder from "@/components/client/builder/mainContent"



export default function Builder() {
	return (
		<>
			<div className="max-w-screen-2xl mx-auto w-full py-4 p-2">
				<Image src={decorationElement} alt="dekoracyjny element" className="absolute top-0 left-0 pointer-events-none" />
				<Navbar />
				<MainContentBuilder />
			</div>
			<Footer />
		</>
	)
}

import Navbar from "@/components/client/navbar"
import HeaderTemplates from "@/components/client/templates/header"
import decorationElement from "../../../public/templatesDecoration.svg"
import Image from "next/image"
import Footer from "@/components/client/footer"
import LoadTemplates from "@/components/server/templates/loadTemplates"

export default function Templates() {
	return (
		<>
			<div className="max-w-screen-2xl mx-auto w-full py-4 p-2">
				<Image src={decorationElement} alt="dekoracyjny element" className="absolute top-0 left-0"></Image>
				<Navbar />
				<HeaderTemplates />
				<LoadTemplates />
			</div>
			<Footer />
		</>
	)
}

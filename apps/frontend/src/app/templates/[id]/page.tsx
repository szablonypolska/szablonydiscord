import Navbar from "@/components/client/navbar"
import decorationElement from "../../../../public/templatesDecoration.svg"
import Image from "next/image"
import Footer from "@/components/client/footer"
import LoadTemplatesData from "@/components/server/templates/loadTemplatesData"

interface Params {
	id: string
}

export default async function Templates({ params }: { params: Params }) {
	const { id } = params

	return (
		<>
			<>
				<h1>Template ID: {id}</h1>
				<div className="max-w-screen-2xl mx-auto w-full py-4 p-2">
					<Image src={decorationElement} alt="dekoracyjny element" className="absolute top-0 left-0" />
					<Navbar />
					<LoadTemplatesData params={id} />
				</div>
				<Footer />
			</>
		</>
	)
}

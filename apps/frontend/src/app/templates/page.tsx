import Navbar from "@/components/client/navbar"
import HeaderTemplates from "@/components/client/templates/main/header"
import decorationElement from "../../../public/templatesDecoration.svg"
import Image from "next/image"
import Footer from "@/components/client/footer"
import LoadTemplates from "@/components/server/templates/loadTemplates"

export default function Templates() {
	return (
		<>
			<HeaderTemplates />
			<LoadTemplates />
		</>
	)
}

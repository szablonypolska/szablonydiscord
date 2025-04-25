import type { Metadata } from "next"
import "../globals.css"
import Navbar from "@/components/client/navbar"
import decorationElement from "../../../public/templatesDecoration.svg"
import Image from "next/image"
import Footer from "@/components/client/footer"

export const metadata: Metadata = {
	title: "SzablonyDiscord - Szablony",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<div className="max-w-screen-2xl mx-auto w-full py-4 p-2">
				<Image src={decorationElement} alt="dekoracyjny element" className="absolute top-0 left-0 pointer-events-none" />
				<Navbar />
				{children}
			</div>
			<Footer />
		</>
	)
}

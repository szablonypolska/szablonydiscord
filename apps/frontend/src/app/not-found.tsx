import Footer from "@/components/client/footer"
import Navbar from "@/components/client/navbar"
import NotFoundWeb from "@/components/client/notFound"

export default function NotFound() {
	return (
		<>
			<div className="max-w-screen-2xl mx-auto w-full py-4 p-2">
				<Navbar />
				<NotFoundWeb />
			</div>
			<Footer />
		</>
	)
}

"use client"

import Footer from "@/components/client/footer"
import Navbar from "@/components/client/navbar"
import ErrordWeb from "@/components/client/error"

interface ErrorProps {
	error: string
	reset?: () => void
}

export default function Error({ error, reset }: ErrorProps) {
	return (
		<>
			<div className="max-w-screen-2xl mx-auto w-full py-4 p-2">
				<Navbar />
				<ErrordWeb error={error} reset={reset} />
			</div>
			<Footer />
		</>
	)
}

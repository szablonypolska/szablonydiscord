import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SeesionWrapper from "@/components/client/sessionWrapper"

export const dynamic = "force-dynamic"

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
})

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<html lang="pl">
				<SeesionWrapper>
					<body className={inter.className}>{children}</body>
				</SeesionWrapper>
			</html>
		</>
	)
}

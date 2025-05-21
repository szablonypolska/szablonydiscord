"use client"

import { useBuilderContext } from "@/context/BuilderContext"
import { Button } from "@nextui-org/button"
import { Loader2, Crown } from "lucide-react"
import Link from "next/link"

export default function SidebarFooter() {
	const { builderData } = useBuilderContext()

	const hasError = builderData.aiAnalysisError || builderData.authenticationError || builderData.categoryError || builderData.rolesError || builderData.channelError || builderData.configureServerError

	return (
		<div className="">
			<div className="w-full h-[1px] bg-borderColor rounded-full my-4"></div>
			{hasError && (
				<div className="my-5 p-4 bg-darknesErrorColor rounded-xl">
					<h2 className="text-red-600 font-semibold">Błąd generowania</h2>
					<p className="text-errorColor text-sm mt-0.5">Wystąpił błąd podczas generowania, spróbuj ponownie później.</p>
				</div>
			)}
			{!builderData.templateCode && !hasError && (
				<div className="flex items-center gap-3 rounded-lg ">
					<Loader2 className="animate-spin w-5 h-5 text-primaryColor" />
					<p className="text-sm text-textColor">Trwa generowanie szablonu</p>
				</div>
			)}
			{builderData.templateCode && (
				<Button className="w-full rounded-xl bg-borderColor opacity-90 hover:opacity-100">
					<Crown className="w-5 h-5" />
					<span className="text-sm">Opublikuj szablon</span>
				</Button>
			)}
			{hasError && (
				<Link href="/builder">
					<Button className="w-full rounded-xl bg-borderColor text-sm">Spróbuj ponownie</Button>
				</Link>
			)}
		</div>
	)
}

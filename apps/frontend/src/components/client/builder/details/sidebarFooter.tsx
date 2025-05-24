"use client"

import { useBuilderContext } from "@/context/BuilderContext"
import builderPublishApi from "@/lib/builder/publish"
import { Button } from "@nextui-org/button"
import { Loader2, Crown, MoveRight } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export default function SidebarFooter() {
	const { builderData, setBuilderData } = useBuilderContext()
	const [loader, setLoader] = useState<boolean>(false)
	const { data: session } = useSession()

	const hasError = builderData.aiAnalysisError || builderData.authenticationError || builderData.categoryError || builderData.rolesError || builderData.channelError || builderData.configureServerError

	const publishTemplate = async () => {
		try {
			setLoader(true)
			const data = await builderPublishApi(builderData.sessionId, session?.user.id || "")

			setBuilderData(prev => ({
				...prev,
				templateUrl: data.id,
			}))

			console.log(data)
			setLoader(false)
		} catch (err) {
			console.log(err)
		}
	}

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
			{builderData.templateCode && !builderData.templateUrl && (
				<Button className="w-full rounded-xl bg-borderColor opacity-90 hover:opacity-100 disabled:opacity-80" onPress={publishTemplate} disabled={loader}>
					{!loader && (
						<>
							<Crown className="w-5 h-5" />
							<span className="text-sm">Opublikuj szablon</span>
						</>
					)}
					{loader && <Loader2 className="text-textColor animate-spin" />}
				</Button>
			)}
			{hasError && (
				<Link href="/builder">
					<Button className="w-full rounded-xl bg-borderColor text-sm">Spróbuj ponownie</Button>
				</Link>
			)}
			{builderData.templateUrl && (
				<Link href={`/templates/${builderData.templateUrl}`}>
					<Button className="w-full rounded-xl bg-primaryColor text-sm">
						<span>Przejdz do szablonu</span> <MoveRight />
					</Button>
				</Link>
			)}
		</div>
	)
}

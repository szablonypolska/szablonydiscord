"use client"

import { useBuilderContext } from "@/context/BuilderContext"
import builderPublishApi from "@/lib/builder/publish"
import { Button } from "@nextui-org/button"
import { Loader2, Crown, MoveRight } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import { BuilderProcessStatus } from "@/components/interfaces/builder/common"

export default function SidebarFooter() {
	const { builderData, setBuilderData, setPopup } = useBuilderContext()
	const [loader, setLoader] = useState<boolean>(false)
	const { data: session } = useSession()

	const hasError = builderData.builderProcess?.stages.some(stage => stage.status === BuilderProcessStatus.FAILED)

	const publishTemplate = async () => {
		try {
			setLoader(true)
			const data = await builderPublishApi(builderData.sessionId, session?.user.id || "")

			setBuilderData(prev => ({
				...prev,
				templateUrl: data.id,
			}))

			setLoader(false)
			setPopup({ position: data.position, waitingInQueue: data.waitingInQueue })
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="">
			<div className="w-full h-px bg-border-color rounded-full my-4"></div>
			{hasError && (
				<div className="my-5 p-4 bg-darknes-error-color rounded-xl">
					<h2 className="text-red-600 font-semibold">Błąd generowania</h2>
					<p className="text-error-color text-sm mt-0.5">Wystąpił błąd podczas generowania, spróbuj ponownie później.</p>
				</div>
			)}
			{!builderData.templateCode && !hasError && (
				<div className="flex items-center gap-3 rounded-lg ">
					<Loader2 className="animate-spin w-5 h-5 text-primary-color" />
					<p className="text-sm text-text-color">Trwa generowanie szablonu</p>
				</div>
			)}
			{builderData.templateCode && !builderData.templateUrl && (
				<Button className="w-full rounded-xl bg-border-color opacity-90 hover:opacity-100 disabled:opacity-80 cursor-pointer" onPress={publishTemplate} disabled={loader}>
					{!loader && (
						<>
							<Crown className="w-5 h-5" />
							<span className="text-sm">Opublikuj szablon</span>
						</>
					)}
					{loader && <Loader2 className="text-text-color animate-spin" />}
				</Button>
			)}
			{hasError && (
				<Link href="/builder">
					<Button className="w-full rounded-xl bg-border-color text-sm cursor-pointer">Spróbuj ponownie</Button>
				</Link>
			)}
			{builderData.templateUrl && (
				<Link href={`/templates/${builderData.templateUrl}`}>
					<Button className="w-full rounded-xl bg-primary-color text-sm cursor-pointer">
						<span>Przejdz do szablonu</span> <MoveRight />
					</Button>
				</Link>
			)}
		</div>
	)
}

"use client"

import { CircleAlert } from "lucide-react"
import discordLogo from "../../../../../../../public/discord-white-icon.webp"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { SettingsOptionTokenSuccessConnect } from "./settingsOptionSuccessConnect"
import { SettingsOptionTokenSetToken } from "./settingsOptionTokenSetToken"
import getDiscordToken from "@/lib/settings/token/getToken"

export default function SettingsOptionToken() {
	const { data: session } = useSession()
	const [success, setSuccess] = useState<{ nickname: string; serverCount: number; serverLimit: number } | null>(null)
	const [getTokenLoader, setGetTokenLoader] = useState<boolean>(false)

	const getTokenData = useCallback(async () => {
		if (!session?.user.id) return
		setGetTokenLoader(true)

		const tokenData = await getDiscordToken(session.user.id)
		if (tokenData.ok) {
			setSuccess({ nickname: tokenData.username, serverCount: tokenData.server, serverLimit: tokenData.serverLimit })
		}
		setGetTokenLoader(false)
	}, [session?.user.id])

	useEffect(() => {
		getTokenData()
	}, [getTokenData])

	return (
		<div className="bg-sidebar-color/80 p-6 w-full">
			<div className="">
				<p className="text-lg font-medium">Intergracja</p>
				<span className="text-text-color text-sm">Połącz swoje konto z zewnętrznymi usługami</span>
			</div>
			<div className="mt-5 bg-box-color border border-border-color px-5 py-4 rounded-lg w-full  overflow-hidden">
				<div className="flex items-center gap-3">
					<div className="bg-primary-color p-3 rounded-lg w-fit flex-shrink-0">
						<Image src={discordLogo} alt="Discord Logo" className="w-6 h-6" />
					</div>
					<div className="flex flex-col">
						<p className="font-medium">Token discord</p>
						<span className="text-text-color text-sm mt-0.5">Wklej token aby uzyskać dostęp do wszystkich funkcji.</span>
					</div>
				</div>
				{!success && <SettingsOptionTokenSetToken userId={session?.user.id || ""} setSuccess={setSuccess} getTokenLoader={getTokenLoader} />}
				{success && <SettingsOptionTokenSuccessConnect nickname={success.nickname} serverCount={success.serverCount} serverLimit={success.serverLimit} />}
				{!success && (
					<div className="flex items-center gap-3 mt-5 bg-primary-color/10 border border-primary-color p-3 rounded-lg">
						<div className="p-2 rounded-full bg-primary-color/30 w-fit ">
							<CircleAlert className="text-primary-color w-4 h-4" />
						</div>
						<p className="text-sm text-primary-color">Połączenie z Discord odblokowuje dodatkowe funkcje, takie jak builder AI i więcej</p>
					</div>
				)}
			</div>
		</div>
	)
}

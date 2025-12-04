import setDiscordToken from "@/lib/settings/token/setToken"
import { Eye, EyeOff, CircleAlert, Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TokenSchema, tokenSchema } from "@/lib/validators/dashboard/settings/token.validator"
import clsx from "clsx"
import { Button } from "@nextui-org/button"

interface Props {
	userId: string
	setSuccess: React.Dispatch<React.SetStateAction<{ nickname: string; serverCount: number; serverLimit: number } | null>>
	getTokenLoader: boolean
}

export function SettingsOptionTokenSetToken({ userId, setSuccess, getTokenLoader }: Props) {
	const [showToken, setShowToken] = useState<boolean>(false)
	const [loader, setLoader] = useState<boolean>(false)
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<TokenSchema>({
		resolver: zodResolver(tokenSchema),
	})

	const onSubmit = async (data: TokenSchema) => {
		try {
			setLoader(true)
			const fetch = await setDiscordToken(userId, data.token)

			if (!fetch.ok) {
				setError("token", { message: "Token jest błędny" })
				return
			}
			setSuccess({ nickname: fetch.username, serverCount: fetch.server, serverLimit: fetch.serverLimit })
		} catch (err) {
			console.error("Error in onSubmit:", err)
			setError("token", { message: "Błąd podczas ustawiania tokena Discord" })
			setLoader(false)
		} finally {
			setLoader(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="bg-background border border-border-color p-5 rounded-lg my-5">
				{getTokenLoader ? <div className="h-4 w-52 bg-border-color rounded-lg"></div> : <p className="font-medium text-sm">Wklej token konta discord</p>}
				<div className="relative mt-3">
					{!getTokenLoader && <input {...register("token")} type={showToken ? "text" : "password"} placeholder="Wklej token discord" className={clsx("p-3 h-12 rounded-lg border  bg-box-color w-full  placeholder:font-normal place focus:ring-2 focus:ring-border-color outline-none", errors.token ? "border-error-color" : "border-border-color")} />}
					{getTokenLoader && <div className="h-12 bg-border-color rounded-lg animate-pulse"></div>}
					{!getTokenLoader && (
						<button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowToken(!showToken)}>
							{showToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
						</button>
					)}
				</div>
				{errors.token && (
					<div className="flex items-center gap-2 text-error-color mt-2">
						<CircleAlert className="w-4 h-4" />
						<p className="text-sm">{errors.token.message}</p>
					</div>
				)}
			</div>
			<Button type="submit" className="bg-border-color w-full rounded-lg py-6 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer" disabled={loader || getTokenLoader}>
				{loader ? <Loader2 className="animate-spin" /> : "Połącz z Discord"}
			</Button>
		</form>
	)
}

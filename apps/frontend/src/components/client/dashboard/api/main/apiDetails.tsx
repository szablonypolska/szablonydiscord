"use client"

import { Trash2, Eye, Copy, EyeOff, Settings } from "lucide-react"
import { User } from "@/components/interfaces/common"
import { Button } from "@nextui-org/button"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { formatData } from "@/utils/formatedData"
import updateApiKey from "@/lib/dasboard/api/updateApiKeyService"

interface CreateApiKeyProps {
	user: User
	updateUser: (user: User) => void
}

export default function ApiDetails({ user, updateUser }: CreateApiKeyProps) {
	const [visible, setVisible] = useState<boolean>(false)

	const copySecretKey = (secretKey: string) => {
		try {
			navigator.clipboard.writeText(secretKey)
			toast.success("skopiowano klucz do schowka")
		} catch (err) {
			console.log(err)
			toast.error("Wystąpił błąd ze skopiowaniem")
		}
	}

	const handlerUpdate = async (userId: string, apiKeyId: string, typeAction: "update" | "delete") => {
		try {
			const updateApi = await updateApiKey({
				userId,
				apiKeyId,
				type: typeAction,
			})

			let updatedApi = [...user.api]

			if (typeAction === "update") {
				updatedApi = updatedApi.map(el => (el.apiKeyId === updateApi.apiKeyId ? { ...el, status: updateApi.status } : el))
				toast.success(`Twój klucz API został ${updateApi.status ? "włączony" : "wyłączony"}`)
			} else {
				updatedApi = updatedApi.filter(el => el.apiKeyId !== updateApi.apiKeyId)
			}

			updateUser({
				...user,
				api: updatedApi,
			})
		} catch (err) {
			const errorMessage = err instanceof Error ? "Nie można usunąć klucza bo przekroczył max liczbe dozwolonych żądań (500)" : "Wystąpił wewnętrzny błąd serwera"
			toast.error(errorMessage)
		}
	}

	return (
		<>
			{user.api.map((el, index) => {
				const succesRate = (el.successCount / el.reqCount) * 100
				const errorRate = (el.errorCount / el.reqCount) * 100
				const monthlyUsage = (el.monthlyCount / el.monthlyLimit) * 100
				const dateCreateApi = formatData(el.dateCreate)
				const lastUsedApi = formatData(el.lastUsed as Date)

				return (
					<div className="flex flex-col  w-full bg-alt-background-color border border-border-color mt-7 rounded-xl  p-10 max-xl:p-5" key={el.id || index}>
						<div className="flex  justify-between max-md:flex-col">
							<div>
								<div className="flex items-center gap-5">
									<h3 className="text-xl font-semibold">{el.name}</h3>
									<span className={`px-3 py-1 ${el.status ? "bg-darknes-primary-color text-primary-color" : "bg-darknes-error-color text-error-color"} rounded-full`}>{el.status ? "Aktywny" : "Wyłączony"}</span>
								</div>
								<p className="text-silver-color text-md">Stworzony: {dateCreateApi}</p>
							</div>
							<div className="flex items-center gap-2 max-md:flex-col max-md:mt-4">
								<Link href={`dashboard/api/${el.apiKeyId}`} className="max-md:w-full">
									<Button className="flex items-center gap-1 bg-border-color rounded-xl py-6 px-5 max-md:w-full">
										<Settings />
										Konfiguruj
									</Button>
								</Link>
								<Button className={`flex items-center ${el.status ? "bg-border-color" : "bg-primary-color"} rounded-xl py-6 px-5 max-md:w-full`} onPress={() => handlerUpdate(el.userId, el.apiKeyId, "update")}>
									{el.status ? "Wyłącz" : "Włącz"}
								</Button>
								<Button className="flex items-center hover:bg-border-color py-6 px-3 rounded-xl max-md:w-full" onPress={() => handlerUpdate(el.userId, el.apiKeyId, "delete")}>
									<Trash2 className="text-red-500" />
								</Button>
							</div>
						</div>
						<div className="p-5  bg-sidebar-color rounded-xl mt-7">
							<div className="flex justify-between items-center mb-3">
								<p className="text-silver-color">Twój Secret key</p>
								<div className="flex items-center gap-1">
									<Button className="flex items-center hover:bg-border-color rounded-xl px-3 py-6" onPress={() => setVisible(!visible)}>
										{visible ? <EyeOff /> : <Eye />}
									</Button>
									<Button className="flex items-center hover:bg-border-color rounded-xl px-3 py-6" onPress={() => copySecretKey(el.secretKey)}>
										<Copy />
									</Button>
								</div>
							</div>
							<input type={`${visible ? "text" : "password"}`} value={el.secretKey} className="bg-box-color rounded-xl w-full p-3 outline-hidden" readOnly />
						</div>
						<div className="flex items-center gap-5 mt-5 max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1">
							<div className="bg-sidebar-color p-4 rounded-xl grow">
								<p className="text-silver-color">Wszystkie zapytania</p>
								<p className="text-2xl mt-1">{el.reqCount}</p>
								<p className="text-primary-color text-xs mt-1">↑ 0,0% w tym miesiącu</p>
							</div>
							<div className="bg-sidebar-color p-4 rounded-xl grow">
								<p className="text-silver-color">Wskaźnik sukcesu</p>
								<p className="text-2xl mt-1">{succesRate ? succesRate.toFixed(1) : "0,00"}%</p>
								<p className="text-primary-color text-xs mt-1">↑ 0,0% w tym miesiącu</p>
							</div>
							<div className="bg-sidebar-color p-4 rounded-xl grow">
								<p className="text-silver-color">Ostatnie zapytanie</p>
								<p className="text-2xl mt-1">{lastUsedApi === "01.01.1970" ? "Brak" : lastUsedApi}</p>
								<p className="text-primary-color text-xs mt-1">↑ 0,0% w tym miesiącu</p>
							</div>
							<div className="bg-sidebar-color p-4 rounded-xl grow">
								<p className="text-silver-color">Wskaźnik błędów</p>
								<p className="text-2xl mt-1">{errorRate ? errorRate.toFixed(1) : "0,00"}%</p>
								<p className="text-primary-color text-xs mt-1">↑ 0,0% w tym miesiącu</p>
							</div>
						</div>
						<div className="mt-8">
							<div className="flex items-center justify-between mb-2">
								<p className="text-silver-color">Miesięczny limit</p>
								<p className="text-silver-color">
									{el.monthlyCount}/{el.monthlyLimit}
								</p>
							</div>
							<div className="w-full h-2 bg-sidebar-color rounded-full">
								<div className="h-full bg-primary-color rounded-full" style={{ width: `${monthlyUsage}%` }}></div>
							</div>
						</div>
					</div>
				)
			})}
		</>
	)
}

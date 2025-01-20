"use client"

import { Trash2, Eye, Copy, EyeOff, Settings } from "lucide-react"
import { User } from "@/components/interfaces/common"
import { Button } from "@nextui-org/button"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"

interface CreateApiKeyProps {
	user: User
}

export default function ApiDetails({ user }: CreateApiKeyProps) {
	const [visible, setVisible] = useState<boolean>(false)

	const copySecretKey = (secretKey: string) => {
		try {
			navigator.clipboard.writeText(secretKey)
			toast.success("skopiowano klucz do schowka")
		} catch (err) {
			toast.error("Wystąpił błąd ze skopiowaniem")
		}
	}

	return (
		<>
			{user.api.map(el => {
				const succesRate = (el.successCount / el.reqCount) * 100
				const errorRate = (el.errorCount / el.reqCount) * 100
				const percentUsage = (el.reqCount / el.monthlyUsage) * 100
				const date = new Date(el.dateCreate)
				const formattedDate = date.toLocaleDateString("pl-PL", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				})

				console.log(el.dateCreate)

				return (
					<div className="flex flex-col  w-full bg-altBackgroundColor border border-borderColor mt-7 rounded-xl p-10 max-xl:p-5" key={el.id}>
						<div className="flex  justify-between max-md:flex-col">
							<div>
								<div className="flex items-center gap-5">
									<h3 className="text-xl font-semibold">{el.name}</h3>
									<span className="px-3 py-1 bg-darknesPrimaryColor text-primaryColor rounded-full">Aktywny</span>
								</div>
								<p className="text-silverColor text-md">Stworzony: {formattedDate}</p>
							</div>
							<div className="flex items-center gap-2 max-md:flex-col max-md:mt-4">
								<Link href={`dashboard/api/${el.apiKeyId}`}>
									<Button className="flex items-center gap-1 bg-borderColor rounded-xl py-6 px-5 max-md:w-full">
										<Settings />
										Konfiguruj
									</Button>
								</Link>
								<Button className="flex items-center bg-borderColor rounded-xl py-6 px-5 max-md:w-full">Wyłącz</Button>
								<Button className="flex items-center hover:bg-borderColor py-6 px-3 rounded-xl max-md:w-full">
									<Trash2 className="text-red-500" />
								</Button>
							</div>
						</div>
						<div className="p-5  bg-sidebarColor rounded-xl mt-7">
							<div className="flex justify-between items-center mb-3">
								<p className="text-silverColor">Twój Secret key</p>
								<div className="flex items-center gap-1">
									<Button className="flex items-center hover:bg-borderColor rounded-xl px-3 py-6" onPress={() => setVisible(!visible)}>
										{visible ? <EyeOff /> : <Eye />}
									</Button>
									<Button className="flex items-center hover:bg-borderColor rounded-xl px-3 py-6" onPress={() => copySecretKey(el.secretKey)}>
										<Copy />
									</Button>
								</div>
							</div>
							<input type={`${visible ? "text" : "password"}`} value={el.secretKey} className="bg-boxColor rounded-xl w-full p-3 outline-none" readOnly />
						</div>
						<div className="flex items-center gap-5 mt-5 max-lg:grid max-lg:grid-cols-2">
							<div className="bg-sidebarColor p-4 rounded-xl flex-grow">
								<p className="text-silverColor">Wszystkie zapytania</p>
								<p className="text-2xl mt-1">{el.reqCount}</p>
								<p className="text-primaryColor text-xs mt-1">↑ 0,0% w tym miesiącu</p>
							</div>
							<div className="bg-sidebarColor p-4 rounded-xl flex-grow">
								<p className="text-silverColor">Wskaźnik sukcesu</p>
								<p className="text-2xl mt-1">{succesRate ? succesRate.toFixed(1) : "0,00"}%</p>
								<p className="text-primaryColor text-xs mt-1">↑ 0,0% w tym miesiącu</p>
							</div>
							<div className="bg-sidebarColor p-4 rounded-xl flex-grow">
								<p className="text-silverColor">Ostatnie zapytanie</p>
								<p className="text-2xl mt-1">brak</p>
								<p className="text-primaryColor text-xs mt-1">↑ 0,0% w tym miesiącu</p>
							</div>
							<div className="bg-sidebarColor p-4 rounded-xl flex-grow">
								<p className="text-silverColor">Wskaźnik błędów</p>
								<p className="text-2xl mt-1">{errorRate ? errorRate.toFixed(1) : "0,00"}%</p>
								<p className="text-primaryColor text-xs mt-1">↑ 0,0% w tym miesiącu</p>
							</div>
						</div>
						<div className="mt-8">
							<div className="flex items-center justify-between mb-2">
								<p className="text-silverColor">Miesięczny limit</p>
								<p className="text-silverColor">
									{el.reqCount}/{el.monthlyUsage}
								</p>
							</div>
							<div className="w-full h-2 bg-sidebarColor rounded-full">
								<div className="h-full bg-primaryColor rounded-full" style={{ width: `${percentUsage}%` }}></div>
							</div>
						</div>
					</div>
				)
			})}
		</>
	)
}

"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@nextui-org/button"
import { CircleAlert } from "lucide-react"
import { LoaderCircle } from "lucide-react"
import { User } from "@/components/interfaces/common"
import { toast } from "sonner"
import createApiKey from "@/lib/api/createApiKeyService"

interface CreateApiKeyProps {
	setModal: React.Dispatch<React.SetStateAction<boolean>>
	user: User
	updateUser: (user: User) => void
}

export function CreateApiKey({ setModal, user, updateUser }: CreateApiKeyProps) {
	const [name, setName] = useState<string>("")
	const [error, setError] = useState<boolean>(true)
	const [option, setOption] = useState<number>(10000)
	const [loader, setLoader] = useState<boolean>(false)
	const percentApiKey = (user.api.length / user.limitApiKey) * 100

	const handleCreateApiKey = async () => {
		try {
			setLoader(true)

			const newApiKey = await createApiKey({
				userId: user.userId,
				name,
				requestCount: option,
			})

			console.log(newApiKey)

			const userUpdate = {
				...user,
				api: [...user.api, newApiKey],
			}

			setName("")
			setOption(10000)
			updateUser(userUpdate)
			setModal(false)
			setLoader(false)
		} catch (err) {
			console.log(err)
			toast.error("Wystąpił wewnętrzny błąd serwera")
			setLoader(false)
		}
	}

	useEffect(() => {
		setError(name.length < 15 || name.length > 30)
	}, [name])

	return (
		<div className="mt-5">
			<div>
				<label htmlFor="name" className="text-sm font-semibold">
					Nazwa klucza API
				</label>
				<input
					id="name"
					type="text"
					value={name}
					className={`w-full p-2 bg-box-color rounded-lg focus:ring-1 focus:ring-primary-color focus:outline-hidden border mt-1 ${error ? "border-error-color" : "border-border-color"}`}
					placeholder="np. Production API Key"
					onChange={e => setName(e.target.value)}
				/>
				<div className={`${!error && "hidden"} flex items-center gap-1.5 text-error-color`}>
					<CircleAlert size="15" className="font-bold" />
					<p className="text-sm">Nazwa musi mieć od 15 do 30 znaków.</p>
				</div>
			</div>
			<div className="mt-5">
				<label htmlFor="options" className="text-sm font-semibold">
					Miesięczny limit requestów
				</label>
				<select
					id="options"
					className="w-full p-2 bg-box-color rounded-lg focus:ring-2 focus:ring-primary-color focus:outline-hidden border-2 border-border-color mt-1"
					value={option}
					onChange={e => setOption(parseInt(e.target.value))}>
					<option value="10000">10,000 requestów/miesiąc</option>
					<option value="50000">50,000 requestów/miesiąc</option>
					<option value="100000">100,000 requestów/miesiąc</option>
				</select>
				<p className="text-sm text-silver-color mt-1">Pamiętaj! Limit nie może być potem zmieniony.</p>
			</div>
			<div className="mt-4 bg-box-color rounded-lg border-2 border-border-color p-5">
				<div className="flex items-center gap-2 text-silver-color text-sm">
					<CircleAlert size="20" />
					<p>Limity kluczy API na koncie</p>
				</div>
				<div className="mt-3">
					<div className="flex items-center justify-between my-1.5 text-sm">
						<p>Aktywne klucze</p>
						<p>
							{user.api.length}/{user.limitApiKey}
						</p>
					</div>
					<div className="w-full bg-sidebar-color h-2 rounded-lg">
						<div className="bg-primary-color h-full rounded-lg" style={{ width: `${percentApiKey}%` }}></div>
					</div>
				</div>
			</div>
			<div className="flex items-center gap-3 justify-end mt-5">
				<Button className="hover:bg-border-color px-4 py-1 rounded-lg" onPress={() => setModal(false)}>
					Anuluj
				</Button>
				<Button
					className="flex items-center px-4 py-1 bg-primary-color rounded-lg focus:ring-primary-color disabled:bg-disabled-button"
					disabled={error || loader}
					onPress={!error ? handleCreateApiKey : undefined}>
					{loader && <LoaderCircle className="animate-spin" />}
					{loader ? "Czekaj" : "Utwórz klucz"}
				</Button>
			</div>
		</div>
	)
}

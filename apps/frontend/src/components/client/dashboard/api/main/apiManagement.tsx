"use client"

import { Button } from "@nextui-org/button"
import { Key, Plus } from "lucide-react"
import { useState } from "react"
import ApiModal from "./modal/apiModal"
import { useDashboardContext } from "@/context/DashboardContext"
import ApiDetails from "./apiDetails"

interface Type {
	modal: boolean
	setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function NoExistsApiKey({ modal, setModal }: Type) {
	return (
		<div className="flex flex-col items-center w-full bg-alt-background-color border border-border-color mt-7 rounded-xl p-10">
			<Key size={75} color="#9ca3af" />
			<h3 className="text-xl mt-5">Nie masz jeszcze kluczy API</h3>
			<p className="text-silver-color mt-2">Stwórz swój pierwszy klucz API i zacznij kodzić razem z nami!</p>
			<Button className="flex items-center bg-primary-color py-6 rounded-xl mt-8" onPress={() => setModal(!modal)}>
				<Plus />
				Stwórz swój klucz api
			</Button>
		</div>
	)
}

export default function ApiMenagament() {
	const [modal, setModal] = useState<boolean>(false)
	const { user, updateUser } = useDashboardContext()

	return (
		<>
			<ApiModal modal={modal} setModal={setModal} />
			<div className="">
				<div className="flex md:items-center justify-between max-md:flex-col">
					<h2 className="text-2xl font-semibold">Zarządzaj kluczem API</h2>
					{user.api.length > 0 && (
						<Button className="flex items-center bg-primary-color py-6 rounded-xl max-md:mt-2 max-md:w-full " onPress={() => setModal(!modal)}>
							<Plus />
							Stwórz swój klucz api
						</Button>
					)}
				</div>
				{user.api.length > 0 ? <ApiDetails user={user} updateUser={updateUser} /> : <NoExistsApiKey modal={modal} setModal={setModal} />}
			</div>
		</>
	)
}

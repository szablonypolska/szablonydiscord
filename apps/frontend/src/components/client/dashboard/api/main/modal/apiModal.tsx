"use client"

import React, { useEffect, useRef } from "react"
import { CreateApiKey } from "./apiCreateApiKey"
import { Button } from "@nextui-org/button"
import { useDashboardContext } from "@/context/DashboardContext"
import ApiCreateError from "./apiCreateError"

interface ModalProps {
	modal: boolean
	setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ApiModal({ modal, setModal }: ModalProps) {
	const newRef = useRef<HTMLDivElement>(null)
	const { user, updateUser } = useDashboardContext()

	useEffect(() => {
		const changeVisibleModal = (e: MouseEvent) => {
			if (newRef.current && !newRef.current.contains(e.target as Node)) {
				setModal(false)
			}
		}

		if (modal) {
			document.addEventListener("mousedown", changeVisibleModal)
		}
		return () => {
			document.removeEventListener("mousedown", changeVisibleModal)
		}
	}, [modal, setModal])

	return (
		<>
			<div
				className={`fixed top-0 left-0 w-full h-full z-40 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out ${
					modal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				}`}></div>
			<div
				ref={newRef}
				className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[27rem] p-5 z-50 rounded-xl max-md:w-11/12 bg-sidebarColor border border-borderColor transition-all duration-300 ease-in-out origin-center transform ${
					modal ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
				}`}>
				{user.api.length !== user.limitApiKey && (
					<div className="flex items-center justify-between">
						<p className="text-lg font-semibold">Utwórz nowy klucz API</p>
						<Button className="material-symbols-outlined p-1 rounded-full" onPress={() => setModal(false)}>
							close
						</Button>
					</div>
				)}

				{user.api.length === user.limitApiKey ? <ApiCreateError setModal={setModal} user={user} /> : <CreateApiKey setModal={setModal} user={user} updateUser={updateUser} />}
			</div>
		</>
	)
}

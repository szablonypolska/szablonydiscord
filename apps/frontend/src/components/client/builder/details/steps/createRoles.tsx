"use client"

import { Shield } from "lucide-react"
import Progress from "../progress"
import { useEffect, useState } from "react"
import { useBuilderContext } from "@/context/BuilderContext"

export default function CreateRoles() {
	const [progress, setProgress] = useState<number>(0)
	const { builderData } = useBuilderContext()

	useEffect(() => {
		if (progress === 100 || builderData.rolesStatus !== "in_progress") return

		setProgress((builderData.roles.length / builderData.rolesNumber) * 100)
	}, [builderData])

	console.log(builderData.roles)

	return (
		<div className="">
			<Progress Icon={Shield} title="Tworzenie ról" description={`Tworzenie ról (${builderData.roles.length}/${builderData.rolesNumber})`} width={builderData.rolesStatus === "done" ? 100 : progress} active={builderData.rolesStatus === "done" || builderData.rolesStatus === "in_progress"} success={progress === 100 || builderData.rolesStatus === "done"} />
		</div>
	)
}

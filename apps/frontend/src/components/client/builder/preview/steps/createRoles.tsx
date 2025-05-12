"use client"

import { Shield } from "lucide-react"
import { useBuilderContext } from "@/context/BuilderContext"
import LoaderPreview from "../loader"

export default function CreateRoles() {
	const { builderData } = useBuilderContext()

	return <LoaderPreview Icon={Shield} title="Tworzenie ról" description="Trwa tworzenie ról" loader={builderData.rolesStatus === "in_progress"} active={builderData.rolesStatus === "in_progress" || builderData.rolesStatus === "done"} success={builderData.rolesStatus === "done"} data={builderData.roles} />
}

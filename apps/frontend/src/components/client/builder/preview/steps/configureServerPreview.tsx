"use client"

import { Crown } from "lucide-react"
import { useBuilderContext } from "@/context/BuilderContext"
import LoaderPreview from "../loader"

export default function ConfigureServerPreview() {
	const { builderData } = useBuilderContext()

	return <LoaderPreview Icon={Crown} title="Konfiguracja serwera" description="Trwa konfiguracja podstawowych informacji o serwerze" loader={builderData.configureServerStatus === "in_progress"} active={builderData.configureServerStatus === "in_progress" || builderData.configureServerStatus === "done"} success={builderData.configureServerStatus === "done"} />
}

"use client"

import { ChartBarStacked } from "lucide-react"
import Progress from "../progress"
import { useEffect, useState } from "react"
import { useBuilderContext } from "@/context/BuilderContext"

export default function CreateCategory() {
	const [progress, setProgress] = useState<number>(0)
	const { builderData } = useBuilderContext()

	useEffect(() => {
		if (progress === 100 || builderData.categoryStatus !== "in_progress") return

		setProgress((builderData.category.length / builderData.categoryNumber) * 100)
	}, [builderData])


	return (
		<div className="">
			<Progress Icon={ChartBarStacked} title="Tworzenie kategorii" description={`Tworzenie kategorii (${builderData.category && builderData.category.length}/${builderData.categoryNumber})`} width={builderData.categoryStatus === "done" ? 100 : progress} active={builderData.categoryStatus === "done" || builderData.categoryStatus === "in_progress"} success={progress === 100 || builderData.categoryStatus === "done"} error={builderData.categoryError} />
		</div>
	)
}

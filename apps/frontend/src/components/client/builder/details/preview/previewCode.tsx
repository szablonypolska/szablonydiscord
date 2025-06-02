"use client"

import React from "react"

import { CodeBlock } from "@/components/ui/code-block"
import { useBuilderContext } from "@/context/BuilderContext"

export default function PreviewCode() {
	const { builderData } = useBuilderContext()

	return (
		<div className="relative w-full">
			<CodeBlock language="json" filename="instructions.json" highlightLines={[9, 13, 14, 18]} code={builderData.code} />
			<div className="absolute bottom-0 w-full h-32 z-50 bg-gradient-to-t from-altBackgroundColor to-transparent"></div>
		</div>
	)
}

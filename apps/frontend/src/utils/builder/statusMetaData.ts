"use client"

import { BuilderProcessStatus } from "@/components/interfaces/builder/common"
import { Clock, CircleAlert, CircleCheck, ClockArrowUp } from "lucide-react"

export function getStatusMetadata(type: BuilderProcessStatus) {
	switch (type) {
		case BuilderProcessStatus.COMPLETED:
			return {
				title: "Zakończono",
				Icon: CircleCheck,
				styles: "bg-primary-dark text-primary-color",
			}

		case BuilderProcessStatus.FAILED:
			return {
				title: "Błąd",
				Icon: CircleAlert,
				styles: "bg-error-color/20 text-error-color",
			}

		case BuilderProcessStatus.WAITING:
			return {
				title: "Oczekuje",
				Icon: Clock,
				styles: " bg-border-color/50 text-text-color",
			}
		case BuilderProcessStatus.IN_PROGRESS:
			return {
				title: "W trakcie",
				Icon: ClockArrowUp,
				styles: "bg-warning-color/20 text-warning-color",
			}
	}
}

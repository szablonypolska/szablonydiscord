"use client"

import { BuilderStageType } from "@/components/interfaces/builder/common"
import { Bot, ChartBarStacked, Crown, SearchCode, Shield, Tv } from "lucide-react"

export function getStageMetadata(type: BuilderStageType, from?: number, to?: number) {
	switch (type) {
		case BuilderStageType.ANALYSIS:
			return {
				title: "Analiza AI",
				description: "Przygotowywanie danych przez AI",
				Icon: Bot,
			}
		case BuilderStageType.AUTHENTICATION:
			return {
				title: "Uwierzytelnianie API",
				description: "Zarządzanie dostępem do API",
				Icon: SearchCode,
			}
		case BuilderStageType.CONFIGURE_SERVER:
			return {
				title: "Konfiguracja serwera",
				description: "Zarządzanie ustawieniami serwera",
				Icon: Crown,
			}
		case BuilderStageType.CATEGORY:
			return {
				title: "Tworzenie kategorii",
				description: `Tworzenie kategorii (${from || 0}/${to || 0})`,
				Icon: ChartBarStacked,
			}
		case BuilderStageType.CHANNEL:
			return {
				title: "Tworzenie kanałów",
				description: `Tworzenie kanałów (${from || 0}/${to || 0})`,
				Icon: Tv,
			}
		case BuilderStageType.ROLES:
			return {
				title: "Tworzenie ról",
				description: `Tworzenie ról (${from || 0}/${to || 0})`,
				Icon: Shield,
			}
		default:
			return {
				title: "Nieznany etap",
				description: "Brak opisu dla tego etapu",
				Icon: Bot,
			}
	}
}

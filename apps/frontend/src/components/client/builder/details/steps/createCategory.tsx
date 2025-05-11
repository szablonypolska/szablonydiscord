"use client"

import { ChartBarStacked } from "lucide-react"
import Progress from "../progress"

export default function CreateCategory() {
	return <Progress Icon={ChartBarStacked} title="Tworzenie kategorii" description="Tworzenie kategorii (0/15)" width={30} active={false} success={false} />
}

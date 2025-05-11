"use client"

import { Shield } from "lucide-react"
import Progress from "../progress"

export default function CreateRoles() {
	return <Progress Icon={Shield} title="Tworzenie ról" description="Tworzenie ról (0/15)" width={30} active={false} success={false} />
}

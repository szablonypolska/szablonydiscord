"use client"

import { Button } from "@nextui-org/button"
import { signIn } from "next-auth/react"

export default function Login() {
	return (
		<>
			<Button onPress={() => signIn("discord", { callbackUrl: "/dashboard" })}>zaloguj sie</Button>
		</>
	)
}

"use client"

import LoginForm from "@/components/client/login/loginForm"
import LoginInfo from "@/components/client/login/LoginInfo"
import { Button } from "@nextui-org/button"
import { signIn } from "next-auth/react"

export default function Login() {
	return (
		<>
			<div className="flex  justify-center items-center h-screen">
				<div className="flex gap-10 items-start ">
					<LoginForm />
					<LoginInfo />
				</div>
				<Button onPress={() => signIn("discord", { callbackUrl: "/dashboard" })}>zaloguj sie</Button>
			</div>
		</>
	)
}

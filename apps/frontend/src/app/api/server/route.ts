import { NextRequest } from "next/server"
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import { getToken } from "next-auth/jwt"

export async function GET(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions)
		if (!session) throw new Error("Unauthorized")

		const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

		if (!token) throw new Error("Unauthorized")

		console.log(token)
	} catch (err) {
		console.log(err)
		throw err
	}
}

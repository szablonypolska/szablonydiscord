import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
	const generateCode = crypto.randomUUID()
	const cookies = request.cookies.get("sessionId")
	const response = NextResponse.next()

	if (!cookies) {
		response.cookies.set({
			name: "sessionId",
			value: generateCode,
			path: "/templates",
			httpOnly: true,
			maxAge: 60 * 60 * 24,
		})
	}

	return response
}

export const config = {
	matcher: ["/templates/:id"],
}

import { DefaultSession } from "next-auth"

declare module "next-auth" {
	interface Profile {
		id?: string
		avatar: string
		username: string
	}

	interface Session {
		user: {
			id: string
		} & DefaultSession["user"]
	}
}

declare module "next-auth/jwt" {
	export interface JWT {
		id?: string
		accessToken?: string
		refreshToken?: string
		expiresAt?: number
	}
}

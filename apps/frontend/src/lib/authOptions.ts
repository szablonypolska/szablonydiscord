import { AuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { prisma } from "@repo/db"
import { isBefore } from "date-fns"
import { JWT } from "next-auth/jwt"

const refreshAccessTokenDiscord = async (token: JWT) => {
	try {
		const response = await fetch("https://discord.com/api/v10/oauth2/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				client_id: process.env.DISCORD_CLIENT_ID!,
				client_secret: process.env.DISCORD_CLIENT_SECRET!,
				grant_type: "refresh_token",
				refresh_token: token.refreshToken!,
			}),
		})

		const data = await response.json()

		if (!response.ok) throw new Error(data.error)

		token.accessToken = data.access_token
		token.refreshToken = data.refresh_token
		token.expiresAt = Number(data.expires_in)
	} catch (err) {
		console.log(err)
	}
}

export const authOptions: AuthOptions = {
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID!,
			clientSecret: process.env.DISCORD_CLIENT_SECRET!,

			authorization: {
				params: {
					scope: "identify email guilds",
				},
			},
		}),
	],
	session: { strategy: "jwt" },
	callbacks: {
		async jwt({ token, account, profile }) {
			const passed = isBefore(new Date((token.expiresAt as number) * 1000), new Date())

			if (passed) {
				await refreshAccessTokenDiscord(token)
			}

			if (account) {
				token.accessToken = account.access_token
				token.refreshToken = account.refresh_token
				token.expiresAt = Number(account.expires_at)
			}

			if (!profile) return token

			const searchUser = await prisma.user.findUnique({
				where: { userId: profile.id },
			})

			if (searchUser && !searchUser.register) {
				await prisma.user.update({
					where: { userId: profile.id },
					data: {
						register: true,
						dateCreateAccount: new Date(),
						settings: { create: {} },
					},
				})
			}

			if (!searchUser) {
				await prisma.user.create({
					data: {
						userId: profile.id,
						email: profile.email,
						username: profile.username,
						slugUrl: profile.username,
						avatar: profile.avatar,
						register: true,
						dateCreateAccount: new Date(),
						settings: { create: {} },
					},
				})
			}

			if (profile) {
				token.id = profile.id
			}
			return token
		},
		async session({ session, token }) {
			if (session) {
				session.user.id = token.id as string
			}
			return session
		},
	},
}

import { AuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import { prisma } from "@repo/db"

export const authOptions: AuthOptions = {
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID!,
			clientSecret: process.env.DISCORD_CLIENT_SECRET!,
			authorization: {
				params: {
					scope: "identify email",
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, profile }) {
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
					},
				})
			}

			if (!searchUser) {
				await prisma.user.create({
					data: {
						userId: profile.id,
						username: profile.username,
						avatar: profile.avatar,
						register: true,
						dateCreateAccount: new Date(),
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

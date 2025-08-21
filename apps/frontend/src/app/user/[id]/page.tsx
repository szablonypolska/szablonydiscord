import { prisma } from "@repo/db"
import UserProfle from "@/components/client/user/userProfile"
import type { User } from "@/components/interfaces/common"
import ErrorWeb from "../../../components/client/error"
import type { Metadata } from "next"

interface Params {
	id: string
}

async function getUserData(id: string): Promise<User | null> {
	return await prisma.user.findUnique({
		where: { slugUrl: id },
		include: {
			authorTemplates: true,
		},
	})
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
	const { id } = await params
	const data = await getUserData(id)

	if (!data) {
		return {
			title: "Uzytkownik nie istnieje",
			description: "Wyszukany uzytkownik nistety nie istnieje..",
		}
	}

	return {
		title: data?.slugUrl,
		icons: `https://cdn.discordapp.com/avatars/${data?.userId}/${data?.avatar}.jpg`,
		openGraph: {
			title: `Profil użytkownika ${data.username}`,
			description: `Ilosc wyslanych szablonow: ${data.authorTemplates.length}`,
			images: `https://cdn.discordapp.com/avatars/${data?.userId}/${data?.avatar}.jpg`,
		},
	}
}

export default async function User({ params }: { params: Promise<Params> }) {
	const { id } = await params

	const searchUser = await getUserData(id)

	if (!searchUser) {
		return <ErrorWeb error="this user does not exist" />
	}

	return (
		<>
			<div className="max-w-(--breakpoint-xl) mx-auto w-full py-4 p-2">
				<UserProfle data={searchUser} />
			</div>
		</>
	)
}

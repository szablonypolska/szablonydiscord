import { prisma } from "@repo/db"
import type { User } from "@/components/interfaces/common"
import ErrorWeb from "../../../components/client/error"
import { redirect } from "next/navigation"

interface Params {
	id: string
}

export default async function ProfileRedirect(props: { params: Promise<Params> }) {
	const params = await props.params

	const { id } = params

	const searchUser: User = await prisma.user.findUnique({
		where: { userId: id },
		include: {
			template: true,
		},
	})

	if (!searchUser) {
		return <ErrorWeb error="this user does not exist" />
	}

	redirect(`/user/${searchUser.slugUrl}`)
}

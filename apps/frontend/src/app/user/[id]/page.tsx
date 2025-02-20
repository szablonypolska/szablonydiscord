import { prisma } from "@repo/db"
import UserProfle from "@/components/client/user/userProfile"
import type { User } from "@/components/interfaces/common"
import ErrorWeb from "../../../components/client/error"

interface Params {
	id: string
}

export default async function User(props: { params: Promise<Params> }) {
	const params = await props.params
	const { id } = params

	const searchUser: User = await prisma.user.findUnique({
		where: { slugUrl: id },
		include: {
			template: true,
		},
	})

	if (!searchUser) {
		return <ErrorWeb error="this user does not exist" />
	}

	return (
		<>
			<div className="max-w-screen-xl mx-auto w-full py-4 p-2">
				<UserProfle data={searchUser} />
			</div>
		</>
	)
}

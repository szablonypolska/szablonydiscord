import Navbar from "@/components/client/navbar"
import decorationElement from "../../../../public/templatesDecoration.svg"
import Image from "next/image"
import Footer from "@/components/client/footer"
import { prisma } from "@repo/db"
import UserProfle from "@/components/client/user/userProfile"

interface Params {
	id: string
}

export default async function User({ params }: { params: Params }) {
	const { id } = params

	const searchUser = await prisma.user.findUnique({
		where: { userId: id },
		include: {
			template: true,
		},
	})

	if (!searchUser) {
		return <div>tutaj cos kiedys bedzie</div>
	}

	return (
		<>
			<>
				<div className="max-w-screen-2xl mx-auto w-full py-4 p-2">
					<Image src={decorationElement} alt="dekoracyjny element" className="absolute top-0 left-0" />
					<Navbar />
					<div className="max-w-screen-xl mx-auto w-full py-4 p-2">
						<UserProfle data={searchUser} />
					</div>
				</div>
				<Footer />
			</>
		</>
	)
}

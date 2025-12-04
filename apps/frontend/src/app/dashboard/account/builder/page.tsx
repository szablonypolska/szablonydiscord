import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../../lib/authOptions"
import { prisma } from "@repo/db"
import { redirect } from "next/navigation"
import { AccountBuilderBox } from "@/components/client/dashboard/account/builder/AccountBuilderBox"
import { AccountBuilderTable } from "@/components/client/dashboard/account/builder/builder-list/AccountBuilderTable"
import { AccountBuilderLimit } from "@/components/client/dashboard/account/builder/AccountBuilderLimit"
import { Builder } from "@/components/interfaces/builder/common"
import { AccountError } from "@/components/client/dashboard/account/builder/AccountError"

export default async function AccountBuilderPage() {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect("/login")
	}

	const builder: Builder[] = await prisma.builder.findMany({
		where: { userId: session.user.id },
		take: 5,
		include: {
			builderProcess: {
				include: {
					stages: {
						include: {
							channel: {
								include: {
									channel: true,
								},
							},
							category: {
								include: {
									category: true,
								},
							},
							role: {
								include: {
									role: true,
								},
							},
						},
					},
				},
			},
		},
	})
	return (
		<div className="bg-box-color-dashboard border border-border-color w-full mt-7 rounded-lg">
			<div className=" p-5">
				<h2 className="text-lg font-semibold">Builder AI</h2>
			</div>
			<div className="w-full bg-border-color h-[1px] my-2"></div>

			<AccountError />
			<AccountBuilderBox builder={builder} />
			<div className="flex items-start gap-5 w-full p-5 min-w-0 max-2xl:flex-col ">
				<AccountBuilderTable builder={builder} />
				<AccountBuilderLimit />
			</div>
		</div>
	)
}

import { AccountHeader } from "@/components/client/dashboard/account/AccountHeader"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<AccountHeader />
			<main>{children}</main>
		</>
	)
}

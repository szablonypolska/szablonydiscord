import ApiCard from "@/components/client/dashboard/api/main/apiCards"
import ApiMenagament from "@/components/client/dashboard/api/main/apiManagement"

export default function Dashboard() {
	return (
		<>
			<div className="p-10 max-xl:p-5">
				<ApiMenagament />
				<ApiCard />
			</div>
		</>
	)
}

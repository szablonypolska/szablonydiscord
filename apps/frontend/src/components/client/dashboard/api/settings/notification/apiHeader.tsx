import { Bell } from "lucide-react"
import { TypeState } from "../../../../../interfaces/api/common"

export interface TypeStateProps {
	formData: TypeState
	handleChange: (key: keyof TypeState) => (value: string | boolean) => void
}

export default function ApiSettingsNotificationHeader({ formData, handleChange }: TypeStateProps) {
	return (
		<div className="flex justify-between items-center">
			<div className="flex items-center gap-3">
				<div className="bg-darknes-primary-color w-fit p-3 rounded-lg">
					<Bell className="text-primary-color" />
				</div>
				<div className="">
					<p>Discord Webhok</p>
					<p className="text-silver-color text-sm">Otrzymuj powiadomienia na Discorda!</p>
				</div>
			</div>
			<label className="inline-flex items-center cursor-pointer">
				<input type="checkbox" checked={formData.visible} className="sr-only peer" onChange={e => handleChange("visible")(e.target.checked)} />
				<div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-hidden  rounded-full peer dark:bg-silver-color peer-checked:after:translate-x-full peer-checked:rtl:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary-color"></div>
			</label>
		</div>
	)
}

import { Button } from "@nextui-org/button"
import { Tag } from "lucide-react"

export default function DiscountCode() {
	return (
		<>
			<div className="bg-boxColor border border-borderColor rounded-lg w-full mt-5">
				<p className="font-semibold p-5">Kod promocyjny</p>

				<div className="w-full h-[1px] bg-borderColor"></div>
				<div className="flex items-center gap-3   p-5">
					<input
						type="text"
						id="link"
						className="bg-altBackgroundColor border border-borderColor w-full p-3 h-12 rounded-xl focus:outline-none placeholder:text-placeHolderTextColor focus:ring-1 focus:ring-primaryColor
  "
						placeholder="Wpisz kod promocyjny"
					/>
					<Button className="flex items-center bg-borderColor rounded-xl h-12 px-8">Zastosuj</Button>
				</div>
			</div>
		</>
	)
}

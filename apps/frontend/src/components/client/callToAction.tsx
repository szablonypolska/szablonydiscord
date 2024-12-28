import Image from "next/image"
import decorationElementCallToAction from "../../../public/decorationElementCallToAction.svg"
import { Button } from "@nextui-org/button"

export default function CallToAction() {
	return (
		<div className="relative flex items-center justify-between mt-20 w-full bg-altBackgroundColor p-5 rounded-xl py-14 px-20 border border-borderColor">
			<Image src={decorationElementCallToAction} alt="dekoracyjny element" className="absolute top-0 left-0"></Image>
			<div className="">
				<h2 className="text-4xl">
					Zacznij już dzis korzystać z naszych<span className="text-primaryColor"> szablonów discord!</span>
				</h2>
				<p className="w-10/12 text-gray-300 mt-3">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti pariatur cumque eum vitae aperiam delectus
					accusamus nisi vel, rem facere. Nam, modi rerum rem amet perspiciatis beatae at quidem sint.
				</p>
			</div>
			<div className="">
				<Button className="px-8 py-2 bg-primaryColor rounded-full text-lg ">Skorzystaj</Button>
			</div>
		</div>
	)
}

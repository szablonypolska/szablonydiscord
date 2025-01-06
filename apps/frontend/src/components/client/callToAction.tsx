import Image from "next/image"
import decorationElementCallToAction from "../../../public/decorationElementCallToAction.svg"
import { Button } from "@nextui-org/button"

export default function CallToAction() {
	return (
		<div className="relative flex items-center justify-between mt-20 w-full bg-altBackgroundColor p-5 rounded-xl py-12 px-20 border border-borderColor overflow-hidden  max-md:flex-col max-md:text-center max-md:items-center">
			<Image src={decorationElementCallToAction} alt="dekoracyjny element" className="absolute top-0 left-0"></Image>
			<div className="z-50">
				<h2 className="text-3xl max-md:text-2xl">
					Zacznij już dzis korzystać z naszych<span className="text-primaryColor"> szablonów discord!</span>
				</h2>
				<p className="w-10/12 text-textColor mt-3 max-md:w-full">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti pariatur cumque eum vitae aperiam delectus
					accusamus nisi vel, rem facere. Nam, modi rerum rem amet perspiciatis beatae at quidem sint.
				</p>
			</div>
			<div>
				<Button className="px-8 py-2 bg-primaryColor rounded-full text-lg max-md:mt-5 ">Skorzystaj</Button>
			</div>
		</div>
	)
}

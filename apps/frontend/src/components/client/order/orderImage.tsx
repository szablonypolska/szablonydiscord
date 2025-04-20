import Image from "next/image"
import statusOne from "../../../../public/status/status-paid.svg"

export default function OrderImage() {
	return <Image src={statusOne} alt="order status" className="w-[35rem] h-[35rem] max-2xl:w-1/2 max-lg:hidden pointer-events-none" priority />
}

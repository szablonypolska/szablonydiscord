import Logo from "../../../../public/logo.svg"
import Image from "next/image"

export default function LoginForm() {
	return (
		<div className="w-96 bg-altBackgroundColor border border-borderColor p-5 rounded-lg">
			<div className="flex items-center justify-center gap-3">
				<Image src={Logo} alt="logo" />
				<h2 className="text-lg font-medium">SzablonyDiscord</h2>
			</div>
		</div>
	)
}

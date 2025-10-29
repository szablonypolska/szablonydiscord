import Image from "next/image"
import Link from "next/link"
import discordUserAvatar from "../../../../../../public/discordUserAvatar.jpg"

interface PropsCreator {
	id: string
	avatar: string
	username: string
}

export function PreviewCreator({ avatar, username, id }: PropsCreator) {
	return (
		<Link href={`/profile/${id}`} className="max-sm:w-full h-12">
			<div className="flex items-center gap-2  px-3 h-full bg-border-color w-fit rounded-xl max-sm:w-full cursor-pointer ">
				<Image src={`${avatar && id ? `${avatar}` : discordUserAvatar.src}`} width={0} height={0} alt="discord user avatar" className="w-7 h-7 rounded-full" />
				<div className="flex items-center gap-2">
					<p className="text-lg">Twórca:</p>
					<p className="text-lg">{username}</p>
				</div>
			</div>
		</Link>
	)
}

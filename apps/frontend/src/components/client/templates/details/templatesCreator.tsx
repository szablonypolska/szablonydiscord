"use client"

import Image from "next/image"
import Link from "next/link"
import discordUserAvatar from "../../../../../public/discordUserAvatar.jpg"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

interface PropsCreator {
	author: {
		avatar: string
		username: string
		userId: string
	}
	addingUser: {
		avatar: string
		username: string
		userId: string
	}
}

export function TemplatesUserCreator({ author, addingUser }: PropsCreator) {
	const [isHovered, setIsHovered] = useState<boolean>(false)

	return (
		<div className="relative max-sm:w-full" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			<Link href={`/profile/${author.userId}`} className="max-sm:w-full">
				<div className="px-3 h-12 bg-border-color w-fit rounded-xl max-sm:w-full cursor-pointer">
					<div className="flex items-center gap-2 h-full">
						<Image src={`${author.avatar ? `https://cdn.discordapp.com/avatars/${author.userId}/${author.avatar}.jpg` : discordUserAvatar.src}`} width={0} height={0} alt="discord user avatar" className="w-7 h-7 rounded-full" />
						<div className="flex items-center gap-2">
							<p className="text-lg">Twórca:</p>
							<p className="text-lg">{author.username}</p>
						</div>
					</div>
				</div>
			</Link>
			<AnimatePresence>
				{isHovered && (
					<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute mt-2 bg-alt-background-color border border-border-color p-3 rounded-lg z-10 w-62">
						<Link href={`/profile/${author.userId}`}>
							<div className="">
								<p className="text-xs text-text-color">Twórca szablonu</p>
								<div className="flex items-center gap-2 mt-2">
									<div className="relative flex items-center justify-center w-11 h-11">
										<Image src={`${author.avatar ? `https://cdn.discordapp.com/avatars/${author.userId}/${author.avatar}.jpg` : discordUserAvatar.src}`} width={0} height={0} alt="discord user avatar" className="w-9 h-9 rounded-full" />
										<div className="absolute inset-0 border-2 border-primary-color rounded-full"></div>
									</div>
									<div className="flex flex-col">
										<p className="font-medium">{author.username}</p>
										<span className="text-xs text-text-color">ID: {author.userId}</span>
									</div>
								</div>
							</div>
						</Link>
						<div className="w-full h-[1px] bg-border-color my-2"></div>
						<Link href={`/profile/${addingUser.userId}`}>
							<div className="">
								<p className="text-xs text-text-color">Osoba dodająca</p>
								{!addingUser.userId && <p className="text-sm font-semibold">Brak danych</p>}
								{addingUser.userId && (
									<div className="flex items-center gap-2 mt-2">
										<div className="relative flex items-center justify-center w-11 h-11">
											<Image src={`${addingUser.avatar ? `https://cdn.discordapp.com/avatars/${addingUser.userId}/${addingUser.avatar}.jpg` : discordUserAvatar.src}`} width={0} height={0} alt="discord user avatar" className="w-9 h-9 rounded-full" />
											<div className="absolute inset-0 border-2 border-advice-bot rounded-full"></div>
										</div>
										<div className="flex flex-col">
											<p className="font-medium">{addingUser.username}</p>
											<span className="text-xs text-text-color">ID: {addingUser.userId}</span>
										</div>
									</div>
								)}
							</div>
						</Link>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

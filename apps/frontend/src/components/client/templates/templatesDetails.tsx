import { Button } from "@nextui-org/button"
import { DiscordTemplate, BaseInforamtion } from "../../interfaces/common"
import Image from "next/image"

interface Props {
	data: DiscordTemplate
	base: BaseInforamtion
}

interface PropsCreator {
	id: string
	avatar: string
	username: string
}

interface Channel {
	name: string
	type: number
	postition: number
}

function UserCreator({ id, avatar, username }: PropsCreator) {
	return (
		<>
			<div className="px-3 h-12 bg-borderColor w-fit rounded-xl">
				<div className="flex items-center gap-2 h-full">
					<Image src={`https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`} width={0} height={0} alt="discord user avatar" className="w-7 h-7 rounded-full" />
					<div className="flex items-center gap-2">
						<p className="text-lg">Twórca:</p>
						<p className="text-lg">{username}</p>
					</div>
				</div>
			</div>
		</>
	)
}

function Visualization({ data }: any) {
	interface Roles {
		name: string
		color: number
		id: number
	}

	const channelStyles: { [key: number]: string } = {
		0: "flex items-center pl-4 mb-1  font-medium text-channelColor text-lg w-72  hover:bg-borderColor truncate rounded-lg", // Tekstowy
		2: "flex items-center gap-2 pl-4 mb-1 text-channelColor text-lg", // Głosowy
		4: "flex items-center gap-1 font-bold text-lg mt-2  text-textColor hover:text-white", // Kategoria
	}

	const channelIcons: { [key: number]: string } = {
		0: "tag",
		2: "volume_up",
		4: "keyboard_arrow_down",
	}

	const channelIconsStyle: { [key: number]: string } = {
		0: "text-2xl pr-2",
	}

	return (
		<>
			<section className="flex flex-col items-center mt-5 max-xl:w-11/12">
				<div className="flex w-[70rem] max-xl:w-full gap-5 rounded-xl">
					<article className="bg-altBackgroundColor border border-borderColor rounded-xl w-1/2 p-8">
						{data.channels.map((el: Channel) => (
							<p key={el.postition} className={channelStyles[el.type]}>
								<span className={`text-2xl text-channelColor material-symbols-outlined font-black ${channelIconsStyle[el.type]}`}>{channelIcons[el.type]}</span> {el.name}
							</p>
						))}
					</article>
					<article className="bg-altBackgroundColor border border-borderColor rounded-xl w-1/2 p-8">
						<div className="flex flex-wrap gap-2">
							{data.roles.map((el: Roles) => {
								const hexColor = `#${el.color.toString(16).padStart(6, "0")}`

								console.log(hexColor)

								return (
									<div style={{ borderColor: hexColor }} className="flex items-center gap-2 border-2 py-1 px-4 rounded-full" key={el.id}>
										<div style={{ backgroundColor: hexColor }} className="w-4 h-4 rounded-full"></div>
										<h2>{el.name}</h2>
									</div>
								)
							})}
						</div>
					</article>
				</div>
			</section>
		</>
	)
}

export default function TemplatesDetails({ data, base }: Props) {
	let test = 0

	return (
		<>
			<main className="flex flex-col items-center my-32">
				<section className="bg-altBackgroundColor w-[70rem] max-xl:w-11/12 p-8 rounded-xl border border-borderColor">
					<header>
						<div className="flex justify-between">
							<div className="flex items-center gap-4">
								<h1 className="text-2xl">{base.title}</h1>
								<div className="flex gap-1">
									<span className="px-4 py-1 bg-borderColor w-fit text-sm rounded-full">{base.categories}</span>
									<span className="px-4 py-1 bg-borderColor w-fit text-sm rounded-full">Gamingowy</span>
								</div>
							</div>
							<div className="flex items-center gap-1 px-3 py-1 bg-borderColor w-fit rounded-xl">
								<span className="material-symbols-outlined text-3xl">download</span>
								<p className="text-2xl">{data.usage_count}</p>
							</div>
						</div>
						<p className="text-textColor text-lg w-9/12">{base.description}</p>
					</header>

					<section className="flex items-center gap-2 mt-5">
						<UserCreator id={data.creator.id} avatar={data.creator.avatar} username={data.creator.username} />
						<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-fit rounded-xl">
							<span className="text-2xl">#</span>
							<p className="text-xl">25</p>
						</div>
						<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-fit rounded-xl">
							<span className="material-symbols-outlined text-2xl">volume_up</span>
							<p className="text-xl">25</p>
						</div>
						<div className="flex items-center gap-1 px-3 h-12 bg-borderColor w-fit rounded-xl">
							<span className="material-symbols-outlined text-2xl">people</span>
							<p className="text-xl">25</p>
						</div>
					</section>

					<section className="flex items-center gap-3 mt-10">
						<Button className="flex items-center bg-primaryColor px-8 py-6 rounded-xl">
							<span className="material-symbols-outlined text-2xl">add</span>
							Użyj szablonu
						</Button>
						<Button className="flex items-center bg-adviceBot px-8 py-6 rounded-xl">
							<span className="material-symbols-outlined text-2xl">smart_toy</span>
							Stwórz za pomocą AdviceBot
						</Button>
					</section>
				</section>

				<Visualization data={data.serialized_source_guild} />
			</main>
		</>
	)
}

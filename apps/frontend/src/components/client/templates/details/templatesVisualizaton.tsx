interface Channel {
	name: string
	type: number
	postition: number
	id: number
}

interface Roles {
	name: string
	color: number
	id: number
}

export default function TemplatesVisuzalization({ data }: any) {
	console.log(data)
	const channelStyles: { [key: number]: string } = {
		0: "flex items-center pl-4 mb-1  font-medium text-channelColor text-lg w-96  hover:bg-borderColor truncate rounded-lg", // Tekstowy
		2: "flex items-center gap-2 pl-4 mb-1 text-channelColor text-lg  w-96  hover:bg-borderColor truncate rounded-lg", // Głosowy
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
							<p key={el.id} className={channelStyles[el.type]}>
								<span className={`text-2xl text-channelColor material-symbols-outlined font-black ${channelIconsStyle[el.type]}`}>{channelIcons[el.type]}</span> {el.name}
							</p>
						))}
					</article>
					<article className="bg-altBackgroundColor border border-borderColor rounded-xl w-1/2 p-8">
						<div className="flex flex-wrap gap-2">
							{data.roles.map((el: Roles) => {
								const hexColor = `#${el.color.toString(16).padStart(6, "0")}`

								return (
									<div style={{ borderColor: hexColor }} className="flex items-center gap-2 border-2 py-1 px-4 rounded-full whitespace-nowrap overflow-hidden" key={el.id}>
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

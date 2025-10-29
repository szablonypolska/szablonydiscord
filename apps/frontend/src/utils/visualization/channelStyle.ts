export function channelStyle(type: number): string {
	switch (type) {
		case 0:
			return "flex items-center gap-1 pl-4 my-1  font-medium text-channel-color text-lg w-96 max-md:w-full  hover:bg-border-color truncate rounded-lg" // Tekstowy
		case 2:
			return "flex items-center gap-1 pl-4 my-1 text-channel-color text-lg  w-96 max-md:w-full hover:bg-border-color truncate rounded-lg" // Głosowy
		case 4:
			return "flex items-center gap-1 font-bold text-lg mt-2  text-text-color hover:text-white w-11/12 max-md:w-full" // Kategoria
		case 15:
			return "flex items-center gap-1 pl-4 my-1  font-medium text-channel-color text-lg w-96 max-md:w-full  hover:bg-border-color truncate rounded-lg"
		case 5:
			return "flex items-center gap-1 pl-4 my-1  font-medium text-channel-color text-lg w-96 max-md:w-full  hover:bg-border-color truncate rounded-lg"
		default:
			return ""
	}
}

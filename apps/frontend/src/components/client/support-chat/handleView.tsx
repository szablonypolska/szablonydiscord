import Chat from "./chat/chat"
import CreateChat from "./chat/createChat"
import HeaderSupportChat from "./headerSupportChat"
import LackTicket from "./main/lackTicket"

export default function HandleView() {
	return (
		<>
			<div className="bg-boxColor border border-borderColor w-96 fixed bottom-3 right-3 z-50 rounded-xl">
				<HeaderSupportChat />
				<div className="">
					<CreateChat />
				</div>
			</div>
		</>
	)
}

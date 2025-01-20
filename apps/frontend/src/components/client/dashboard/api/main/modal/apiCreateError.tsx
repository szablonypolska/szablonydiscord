import { Button } from "@nextui-org/button"
import { CircleAlert, Zap } from "lucide-react"
import { User } from "@/components/interfaces/common"

interface Props {
	setModal: React.Dispatch<React.SetStateAction<boolean>>
	user: User
}

export default function ApiCreateError({ setModal, user }: Props) {
	return (
		<div className="mt-5">
			<div className="flex items-center gap-3">
				<CircleAlert size="50" className="bg-darknesErrorColor text-errorColor py-2 w-20 rounded-lg" />
				<div className="">
					<h3 className="font-semibold">Limit kluczy api został osiągnięty!</h3>
					<p className="text-silverColor">Twoje konto osiągnęło maksymalną liczbę aktywnych kluczy API ({user.limitApiKey})</p>
				</div>
			</div>
			<div className="mt-5 bg-boxColor p-3 px-5 rounded-xl">
				<div className="flex items-center justify-between mb-2">
					<p className="text-silverColor text-sm">Aktywne klucze API</p>
					<p className="text-sm  tracking-widest">
						{user.limitApiKey}/{user.limitApiKey}
					</p>
				</div>
				<div className="w-full h-2 bg-errorColor rounded-xl"></div>
			</div>
			<div className="mt-5">
				<Button className="flex items-center gap-2 w-full bg-primaryColor rounded-xl">
					<Zap size="20" />
					Zwiększ limit kluczy
				</Button>
				<Button className="w-full mt-2 rounded-xl" onPress={() => setModal(false)}>
					Zamknij
				</Button>
			</div>
		</div>
	)
}

import { Hash, Lock } from "lucide-react"

export const ChannelPermission = ({ sizeHash, sizeLock }: { sizeHash: number; sizeLock: number }) => {
	return (
		<>
			<div className="relative  mr-1">
				<Hash className={`w-${sizeHash} h-${sizeHash} text-channelColor`} />
				<Lock className={`w-${sizeLock} h-${sizeLock} text-channelColor absolute top-0 right-0.5 bg-altBackgroundColor`} />
			</div>
		</>
	)
}

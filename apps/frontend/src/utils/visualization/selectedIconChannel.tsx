import { Channel } from "@/components/interfaces/templates/common"
import { ChannelIcon } from "@/components/client/icons/channel"
import { VoiceChannelIcon } from "@/components/client/icons/voiceChannel"
import { NsfwIcon } from "@/components/client/icons/nsfwIcon"
import { ChevronDown } from "lucide-react"
import ForumIcon from "@/components/client/icons/forum"
import { ChannelPermission } from "@/components/client/icons/channelPermissions"
import NewsIcon from "@/components/client/icons/news"
import StageIcon from "@/components/client/icons/stage"
import { VoiceChannelPermission } from "@/components/client/icons/voiceChannelPerrmisions"

export default function SelectedIconChannel(channel: Channel) {
	const isHavePermission = (channel.permission_overwrites && channel.permission_overwrites?.length > 0) || false

	switch (channel.type) {
		case 0:
			if (channel.nsfw) {
				return <NsfwIcon />
			} else if (isHavePermission) {
				return <ChannelPermission />
			} else {
				return <ChannelIcon />
			}
		case 4:
			return <ChevronDown className="text-channel-color w-4 h-4 mr-0.5" />
		case 2:
			return isHavePermission ? <VoiceChannelPermission /> : <VoiceChannelIcon />
		case 15:
			return <ForumIcon />
		case 5:
			return <NewsIcon />
		case 13:
			return <StageIcon />
	}
}

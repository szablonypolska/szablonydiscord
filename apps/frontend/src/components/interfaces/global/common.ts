import { Dispatch } from "react"
import { User } from "@/components/interfaces/common"

export type GlobalAction =
	| {
			type: "SET_VIEW_CHANNEL_PREVIEW"
			payload: boolean
	  }
	| {
			type: "SET_VIEW_ROLES_PREVIEW"
			payload: boolean
	  }
	| {
			type: "SET_USER"
			payload: User
	  }

export interface GlobalContextType {
	state: {
		viewChannelPreview: boolean
		viewRolesPreview?: boolean
		user: User
	}
	dispatch: Dispatch<GlobalAction>
}

import { SetStateAction, Dispatch } from "react"
import { Socket } from "socket.io-client"
import { Builder, BuilderWebsocketType } from "@/components/interfaces/builder/common"
import handleStatusUpdatedListener from "./status/status-updated"
import handleCodeUpdatedListener from "./status/code-updated"
import handleRolesCreatedListener from "./status/roles-created"
import handleCategoriesCreatedListener from "./status/categories-created"
import handleAnalysisCompletedListener from "./status/analysis-completed"

export default function handleGenerateListener(socket: Socket, setBuilderData: Dispatch<SetStateAction<Builder>>) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	socket.on("builder_update", (type: BuilderWebsocketType, payload: any) => {
		switch (type) {
			case "status_updated":
				handleStatusUpdatedListener(setBuilderData, payload)
				break
			case "code_updated":
				handleCodeUpdatedListener(setBuilderData, payload)
				break
			case "analysis_completed":
				handleAnalysisCompletedListener(setBuilderData, payload)
				break
			case "roles_created":
				handleRolesCreatedListener(setBuilderData, payload)
				break
			case "categories_created":
				handleCategoriesCreatedListener(setBuilderData, payload)
				break
		}
	})
}

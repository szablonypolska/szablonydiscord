import { BuilderProvider } from "@/context/BuilderContext"
import { Builder } from "@/components/interfaces/builder/common"

export default function BuilderWrapper({ children, id, data }: { children: React.ReactNode; id: string; data: Builder }) {
	return (
		<BuilderProvider id={id} data={data}>
			{children}
		</BuilderProvider>
	)
}

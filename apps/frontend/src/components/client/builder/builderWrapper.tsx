import { BuilderProvider } from "@/context/BuilderContext"
import { BuilderType } from "@/components/interfaces/builder/common"

export default function BuilderWrapper({ children, id, data }: { children: React.ReactNode; id: string; data: BuilderType }) {
	return (
		<BuilderProvider id={id} data={data}>
			{children}
		</BuilderProvider>
	)
}

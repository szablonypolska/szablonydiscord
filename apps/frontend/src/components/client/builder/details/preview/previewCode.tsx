"use client"
import React, { useEffect, useRef, useState } from "react"
import { FixedSizeList as List, ListChildComponentProps } from "react-window"
import { useBuilderContext } from "@/context/BuilderContext"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import AutoSizer from "react-virtualized-auto-sizer"
import { connectSocketBackend } from "@/lib/socket"
import { Code } from "lucide-react"

export default function PreviewCode() {
	const { builderData } = useBuilderContext()
	const codeRef = useRef<string>("")
	const socket = connectSocketBackend()
	const [update, setUpdate] = useState<number>(0)

	useEffect(() => {
		codeRef.current = builderData.code || ""
		setUpdate(prev => prev + 1)
	}, [builderData.sessionId, builderData.code])

	useEffect(() => {
		socket.on("update_code", message => {
			if (builderData.sessionId === message.sessionId) {
				codeRef.current += message.code
			}

			setTimeout(() => {
				setUpdate(prev => prev + 1)
			}, 200)
		})
	}, [builderData.sessionId, socket])

	const lines = React.useMemo(() => (codeRef.current || builderData.code).split(/\r?\n/), [update, builderData.sessionId, builderData.code])

	const listRef = useRef<List>(null)

	const Row = ({ index, style, data }: ListChildComponentProps<{ lines: string[] }>) => (
		<div style={style} className="px-4 flex">
			<div
				className="text-gray-500 select-none pr-4 text-right font-mono text-sm"
				style={{
					minWidth: `${Math.max(String(data.lines.length).length * 8 + 8, 32)}px`,
					lineHeight: "18px",
				}}>
				{codeRef.current && index + 1}
			</div>

			<div className="flex-1 overflow-hidden">
				<SyntaxHighlighter
					language="json"
					style={atomDark}
					PreTag="div"
					wrapLines={true}
					wrapLongLines={true}
					showLineNumbers={false}
					customStyle={{
						display: "block",
						margin: 0,
						padding: 0,
						background: "transparent",
						fontSize: "0.875rem",
						lineHeight: "18px",
						whiteSpace: "pre-wrap",
						wordBreak: "break-word",
						overflowWrap: "break-word",
					}}>
					{data.lines[index]}
				</SyntaxHighlighter>
			</div>
		</div>
	)

	useEffect(() => {
		listRef.current?.scrollToItem(lines.length - 1, "end")
	}, [lines])

	return (
		<div className="relative h-full w-full bg-alt-background-color scroll-smooth py-5">
			{codeRef.current === "" && (
				<div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
					<div className="text-center space-y-4  scale-110">
						<div className="w-16 h-16 mx-auto relative">
							<div className="absolute inset-0 rounded-full border-2 border-[#262626] border-t-[#00796b] animate-spin"></div>
							<Code className="w-6 h-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#00796b]" />
						</div>
						<div className="space-y-2">
							<p className="text-sm font-medium">Przygotowywanie kodu...</p>
							<p className="text-xs text-[#b3b3b3]">Formatowanie składni JSON</p>
						</div>
					</div>
				</div>
			)}
			<AutoSizer>
				{({ height, width }) => (
					<List ref={listRef} className="select-text scrollbar scrollbar-thumb-alt-border-color scrollbar-track-border-color overflow-y-scroll" itemData={{ lines }} itemCount={lines.length} itemSize={18} height={height} width={width}>
						{Row}
					</List>
				)}
			</AutoSizer>
		</div>
	)
}

import React from "react"
import ContentLoader, { Circle, Rect } from "react-content-loader/native"

export default function ActionsSkeleton({
	width,
	itemWidth = 96,
	gap = 16,
	paddingH = 16,
	circleR = 28,
	textW = 84,
	textH = 12,
}: {
	width: number
	itemWidth?: number
	gap?: number
	paddingH?: number
	circleR?: number
	textW?: number
	textH?: number
}) {
	const TOP_Y = 8
	const available = Math.max(1, Math.floor((width - paddingH * 2 + gap) / (itemWidth + gap)))
	const height = TOP_Y + circleR * 2 + 8 + textH + 16

	return (
		<ContentLoader
			speed={1.2}
			width={width}
			height={height}
			backgroundColor="#3f3f46"
			foregroundColor="#52525b"
		>
			{Array.from({ length: available }).map((_, i) => {
				const x = paddingH + i * (itemWidth + gap)
				const cx = x + itemWidth / 2
				const cy = TOP_Y + circleR
				const textX = x + (itemWidth - textW) / 2
				const textY = cy + circleR + 8
				return (
					<React.Fragment key={i}>
						<Circle cx={cx} cy={cy} r={circleR} />
						<Rect x={textX} y={textY} rx="4" ry="4" width={textW} height={textH} />
					</React.Fragment>
				)
			})}
		</ContentLoader>
	)
}

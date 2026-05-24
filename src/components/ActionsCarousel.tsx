import React, { forwardRef, memo, useCallback, useMemo } from "react"
import { FlatList, FlatListProps, ListRenderItemInfo, Text, View } from "react-native"

type ActionItem = {
	key: string
	title: string
	Icon: React.ReactNode // <Button.Icon.../> já pronto (ou qualquer ReactNode)
	onPress?: () => void
}

export type ActionsCarouselProps = {
	actions: ActionItem[]
	itemWidth?: number
	gap?: number
	paddingH?: number
	paddingV?: number
	circleSize?: number
	textLines?: number
	snap?: boolean
} & Omit<FlatListProps<ActionItem>, "data" | "renderItem" | "keyExtractor" | "horizontal">

const ActionsCarousel = forwardRef<FlatList, ActionsCarouselProps>(function ActionsCarousel(
	{
		actions,
		itemWidth = 96,
		gap = 16,
		paddingH = 16,
		paddingV = 16,
		circleSize = 64,
		textLines = 2,
		snap = true,
		...flatListProps
	},
	ref,
) {
	const keyExtractor = useCallback((it: ActionItem) => it.key, [])

	const getItemLayout = useCallback(
		(_: ActionItem[] | null | undefined, index: number) => ({
			length: itemWidth + gap,
			offset: (itemWidth + gap) * index + paddingH,
			index,
		}),
		[itemWidth, gap, paddingH],
	)

	const Item = useCallback(
		({ item }: ListRenderItemInfo<ActionItem>) => (
			<View style={{ width: itemWidth, alignItems: "center" }}>
				<View className="items-center" onTouchEnd={item.onPress}>
					{/* círculo fixo */}
					<View
						className="rounded-full bg-zinc-800 items-center justify-center mb-2"
						style={{ width: circleSize, height: circleSize }}
					>
						{item.Icon}
					</View>

					{/* título com 2 linhas */}
					<Text
						className="text-center font-semibold text-sm text-nu-brancoNU leading-tight"
						numberOfLines={textLines}
						style={{ minHeight: textLines === 2 ? 34 : undefined }}
					>
						{item.title}
					</Text>
				</View>
			</View>
		),
		[circleSize, itemWidth, textLines],
	)

	const snapProps = useMemo(
		() =>
			snap
				? {
						snapToAlignment: "start" as const,
						decelerationRate: "fast" as const,
						snapToInterval: itemWidth + gap,
					}
				: {},
		[snap, itemWidth, gap],
	)

	return (
		<FlatList
			ref={ref}
			horizontal
			data={actions}
			keyExtractor={keyExtractor}
			renderItem={Item}
			ItemSeparatorComponent={() => <View style={{ width: gap }} />}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingHorizontal: paddingH, paddingVertical: paddingV }}
			getItemLayout={getItemLayout}
			initialNumToRender={6}
			windowSize={5}
			removeClippedSubviews
			{...snapProps}
			{...flatListProps}
		/>
	)
})

export default memo(ActionsCarousel)

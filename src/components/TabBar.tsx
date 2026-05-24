import { ArrowDownUp, Smartphone } from "lucide-react-native"
import { CurrencyDollarSimpleIcon, ShoppingBagIcon } from "phosphor-react-native"
import { TouchableOpacity, View } from "react-native"

function TabBar({ state, descriptors, navigation }) {
	const icons = {
		index: (props) => <ArrowDownUp color={"#673ab7"} size={26} {...props} />,
		maney: (props) => <CurrencyDollarSimpleIcon color={"#673ab7"} size={26} {...props} />,
		store: (props) => <ShoppingBagIcon color={"#673ab7"} size={26} {...props} />,
		nucell: (props) => <Smartphone color={"#673ab7"} size={26} {...props} />,
	}
	return (
		<View
			style={{
				backgroundColor: "rgba(19, 19, 20, 0.8)", // gray-900 com 80% opacidade
				position: "absolute",
				bottom: 24,
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				paddingVertical: 20,
				marginHorizontal: 80,
				borderRadius: 9999,
			}}
		>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key]
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name

				if (["_sitemap", "+not-found"].includes(route.name)) return null

				const isFocused = state.index === index

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					})

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params)
					}
				}

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					})
				}

				return (
					<TouchableOpacity
						key={route.name}
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						className="flex-1 justify-center items-center"
					>
						{icons[route.name]({
							color: isFocused ? "#673ab7" : "#c9c9c9",
						})}
						{/* <Text
							style={{ color: isFocused ? "#673ab7" : "#c9c9c9" }}
						>
							{label}
						</Text> */}
					</TouchableOpacity>
				)
			})}
		</View>
	)
}

export { TabBar }

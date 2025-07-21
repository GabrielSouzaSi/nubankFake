import { colors } from "@/styles/colors"
import { View, ViewProps } from "react-native"
import { Activity } from "./activity"
import { Title } from "./text"

type LoadingPros = ViewProps

function Loading({ children, className, ...rest }: LoadingPros) {
	return (
		<View className={className} {...rest}>
			{children}
		</View>
	)
}
function OverlayLoading({ children, className, ...rest }: LoadingPros) {
	return (
		<View
			className={`absolute top-0 bottom-0 left-0 right-0 z-50 justify-center items-center bg-white/70 ${className}`}
			{...rest}
		>
			{children}
		</View>
	)
}

Loading.View = View
Loading.ActivityIndicator = Activity
Loading.Title = Title

export { Loading, OverlayLoading }

import { ActivityIndicator, ActivityIndicatorProps } from "react-native"

type ActivityProps = ActivityIndicatorProps

export function Activity({ ...rest }: ActivityProps) {
	return <ActivityIndicator {...rest} />
}

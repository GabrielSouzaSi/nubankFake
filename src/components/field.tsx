import { View, ViewProps } from "react-native"
import { IconPh } from "./icon"
import { Input } from "./input"
import { Title } from "./text"

type FieldProps = ViewProps

function Field({ children, className, ...rest }: FieldProps) {
	return (
		<View className={className} {...rest}>
			{children}
		</View>
	)
}

Field.Title = Title
Field.Input = Input
Field.Icon = IconPh

export { Field }

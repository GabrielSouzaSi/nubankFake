import { View, ViewProps } from "react-native"
import { IconLu, IconPh } from "./icon"
import { Title } from "./text"

type CardProps = ViewProps

function Card({ children, className, ...rest }: CardProps) {
	return (
		<View className={className} {...rest}>
			{children}
		</View>
	)
}

Card.Text = Title
Card.IconLu = IconLu
Card.IconPh = IconPh

export { Card }

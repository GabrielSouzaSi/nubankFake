import { TouchableOpacity, TouchableOpacityProps, View } from "react-native"
import { IconLu, IconPh } from "./icon"
import { Title } from "./text"

type ButtonProps = TouchableOpacityProps

function Button({ children, className, ...rest }: ButtonProps) {
	return (
		<TouchableOpacity className={className} {...rest}>
			{children}
		</TouchableOpacity>
	)
}

Button.Title = Title
Button.IconLu = IconLu
Button.IconPh = IconPh
Button.View = View

export { Button }

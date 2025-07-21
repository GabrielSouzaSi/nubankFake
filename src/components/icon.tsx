import * as LucideIcons from "lucide-react-native"
import {
	IconWeight,
	IconProps as PhosphorIconProps,
} from "phosphor-react-native"
import { ComponentType } from "react"

interface ButtonIconPhProps {
	Icon: React.ComponentType<PhosphorIconProps>
	size?: number
	color?: string
	weight?: IconWeight
}

interface ButtonIconLuProps {
	name: keyof typeof LucideIcons
	size?: number
	color?: string
}

export function IconPh({
	Icon,
	size = 24,
	weight = "bold",
	...rest
}: ButtonIconPhProps) {
	return <Icon size={size} weight={weight} {...rest} />
}

export function IconLu({
	name,
	size = 24,
	color = "black",
}: ButtonIconLuProps) {
	const LucideIcon = LucideIcons[name] as ComponentType<any>
	return <LucideIcon size={size} color={color} />
}

import { Text, TextProps } from "react-native";

export function Title({ children, className, ...rest }: TextProps) {
    return <Text className={className} {...rest}>{children}</Text>
}
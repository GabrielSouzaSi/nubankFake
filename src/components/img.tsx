import { Image, ImageProps } from "react-native";

export function Img({ className, ...rest }: ImageProps) {
    return <Image className={className} {...rest} />
}
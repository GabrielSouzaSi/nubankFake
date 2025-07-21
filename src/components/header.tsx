import { View, ViewProps } from "react-native";
import { Button } from "./button";
import { Img } from "./img";
import { Title } from "./text";

type HeaderProps = ViewProps;

function Header({ children, className, ...rest }: HeaderProps) {

    return <View className={className} {...rest} >{children}</View>
    
}

Header.Img = Img
Header.Button = Button
Header.Text = Title

export { Header }
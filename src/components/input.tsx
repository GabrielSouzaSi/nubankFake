import { TextInput, TextInputProps } from "react-native";

type InputProps = TextInputProps

export function Input({ className, ...rest }: InputProps) {
  return <TextInput className={className} {...rest} />
}

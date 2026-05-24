import { Text, useWindowDimensions, View } from "react-native"
import { useRouter } from "expo-router"
import { Button } from "@/components/button"
import { colors } from "@/styles/colors"
import { Card } from "@/components/card"
import {
	CurrencyCircleDollarIcon,
	FadersHorizontalIcon,
	QrCodeIcon,
	WhatsappLogoIcon,
	WifiMediumIcon,
} from "phosphor-react-native"
import { ShieldIcon } from "lucide-react-native"

export default function PixArea() {
	const { width } = useWindowDimensions()
	const Card_w = Math.floor(width / 3) - 12

	const router = useRouter()
	return (
		<View className="flex-1 bg-nu-pretoNU border-b border-b-nu-roxoNU">
			<View className="flex-row justify-between mt-12">
				<Button className="p-4" onPress={() => router.back()}>
					<Button.IconLu name="X" color={colors.nu.cinzaNU} />
				</Button>
				<Button className="p-4">
					<Button.IconLu name="CircleQuestionMark" size={24} color="#FFFFFF" />
				</Button>
			</View>
			<Text className="text-white pl-4 my-8 text-3xl font-bold">Área Pix</Text>

			<View className="flex-row justify-between mx-2">
				<View className="items-center " style={{ width: Card_w }}>
					<Button
						className="justify-between items-center"
						onPress={() => router.push("/(auth)/pages/pixKey")}
					>
						<View
							className="rounded-full bg-zinc-800 items-center justify-center mb-2"
							style={{ width: 64, height: 64 }}
						>
							{/* ajuste o 'size' conforme seu Button.Icon (28~32 funciona bem) */}
							<Button.IconLu
								name="BanknoteArrowUp"
								color={colors.nu.brancoNU}
								size={28}
							/>
						</View>

						<Button.Title
							className="text-center font-semibold text-sm text-nu-brancoNU leading-tight"
							numberOfLines={2}
							style={{ minHeight: 34 }} // garante 2 linhas
						>
							Transferir
						</Button.Title>
					</Button>
				</View>
				<View className="items-center " style={{ width: Card_w }}>
					<Button className="justify-between items-center">
						<View
							className="rounded-full bg-zinc-800 items-center justify-center mb-2"
							style={{ width: 64, height: 64 }}
						>
							{/* ajuste o 'size' conforme seu Button.Icon (28~32 funciona bem) */}
							<Button.IconLu name="Calendar1" color={colors.nu.brancoNU} size={28} />
						</View>

						<Button.Title
							className="text-center font-semibold text-sm text-nu-brancoNU leading-tight"
							numberOfLines={2}
							style={{ minHeight: 34 }} // garante 2 linhas
						>
							Programar
						</Button.Title>
					</Button>
				</View>
				<View className="items-center " style={{ width: Card_w }}>
					<Button className="justify-between items-center">
						<View
							className="rounded-full bg-zinc-800 items-center justify-center mb-2"
							style={{ width: 64, height: 64 }}
						>
							{/* ajuste o 'size' conforme seu Button.Icon (28~32 funciona bem) */}
							<Button.IconPh Icon={QrCodeIcon} color={colors.nu.brancoNU} size={28} />
						</View>

						<Button.Title
							className="text-center font-semibold text-sm text-nu-brancoNU leading-tight"
							numberOfLines={2}
							style={{ minHeight: 34 }} // garante 2 linhas
						>
							Ler QR code
						</Button.Title>
					</Button>
				</View>
			</View>

			<View className="flex-row justify-between mt-6 mx-2">
				<View className="items-center " style={{ width: Card_w }}>
					<Button className="justify-between items-center">
						<View
							className="rounded-full bg-zinc-800 items-center justify-center mb-2"
							style={{ width: 64, height: 64 }}
						>
							{/* ajuste o 'size' conforme seu Button.Icon (28~32 funciona bem) */}
							<View className="-rotate-90">
								<Button.IconLu name="Copy" color={colors.nu.brancoNU} size={28} />
							</View>
						</View>

						<Button.Title className="text-center font-semibold text-sm text-nu-brancoNU">
							Pix Copia e Cola
						</Button.Title>
					</Button>
				</View>
				<View className="items-center " style={{ width: Card_w }}>
					<Button className="justify-between items-center">
						<View
							className="rounded-full bg-zinc-800 items-center justify-center mb-2"
							style={{ width: 64, height: 64 }}
						>
							{/* ajuste o 'size' conforme seu Button.Icon (28~32 funciona bem) */}
							<Button.IconLu
								name="CircleDollarSign"
								color={colors.nu.brancoNU}
								size={28}
							/>
						</View>

						<Button.Title
							className="text-center font-semibold text-sm text-nu-brancoNU leading-tight"
							numberOfLines={2}
							style={{ minHeight: 34 }} // garante 2 linhas
						>
							Cobrar
						</Button.Title>
					</Button>
				</View>
				<View className="items-center " style={{ width: Card_w }}>
					<Button className="justify-between items-center">
						<View
							className="rounded-full bg-zinc-800 items-center justify-center mb-2"
							style={{ width: 64, height: 64 }}
						>
							{/* ajuste o 'size' conforme seu Button.Icon (28~32 funciona bem) */}
							<Button.IconLu
								name="BanknoteArrowDown"
								color={colors.nu.brancoNU}
								size={28}
							/>
						</View>

						<Button.Title
							className="text-center font-semibold text-sm text-nu-brancoNU leading-tight"
							numberOfLines={2}
							style={{ minHeight: 34 }} // garante 2 linhas
						>
							Depositar
						</Button.Title>
					</Button>
				</View>
			</View>

			<View className="flex-row justify-between mt-6 mx-2">
				<View className="items-center " style={{ width: Card_w }}>
					<Button className="justify-between items-center">
						<View
							className="rounded-full bg-zinc-800 items-center justify-center mb-2"
							style={{ width: 64, height: 64 }}
						>
							{/* ajuste o 'size' conforme seu Button.Icon (28~32 funciona bem) */}
							<Button.IconPh
								Icon={WhatsappLogoIcon}
								color={colors.nu.brancoNU}
								size={28}
							/>
							<View className="absolute bottom-0 bg-nu-roxoNU px-1 rounded-sm self-center ">
								<Text className="text-nu-brancoNU text-xs font-semibold">Novo</Text>
							</View>
						</View>

						<Button.Title className="text-center font-semibold text-sm text-nu-brancoNU">
							Pix no WhatsApp
						</Button.Title>
					</Button>
				</View>
				<View className="items-center" style={{ width: Card_w }}>
					<Button className="justify-between items-center">
						<View
							className="rounded-full bg-zinc-800 items-center justify-center mb-2"
							style={{ width: 64, height: 64 }}
						>
							{/* ajuste o 'size' conforme seu Button.Icon (28~32 funciona bem) */}
							<Button.IconLu name="BookUp" color={colors.nu.brancoNU} size={28} />
							<View className="absolute bottom-0 bg-nu-roxoNU px-1 rounded-sm self-center ">
								<Text className="text-nu-brancoNU text-xs font-semibold">
									R$ 3.000
								</Text>
							</View>
						</View>

						<Button.Title className="text-center font-semibold text-sm text-nu-brancoNU">
							Fazer Pix no crédito
						</Button.Title>
					</Button>
				</View>
				<View className="items-center" style={{ width: Card_w }}>
					<Button className="justify-between items-center">
						<View
							className="rounded-full bg-zinc-800 items-center justify-center mb-2"
							style={{ width: 64, height: 64 }}
						>
							<View className="rotate-90">
								<Button.IconPh
									Icon={WifiMediumIcon}
									color={colors.nu.brancoNU}
									size={28}
								/>
							</View>
							<View className="absolute bottom-0 bg-nu-roxoNU px-1 rounded-sm self-center ">
								<Text className="text-nu-brancoNU text-xs font-semibold">Novo</Text>
							</View>
						</View>

						<Button.Title className="text-center font-semibold text-sm text-nu-brancoNU">
							Pix por aproximação
						</Button.Title>
					</Button>
				</View>
			</View>

			<View className="border-b-2 border-zinc-700 mt-6" />

			<Text className="text-white pl-4 mt-6 text-lg font-medium">Preferências</Text>

			<Card className="flex-row justify-between items-center border-b border-zinc-800 p-4 mt-2">
				<Card className="flex-row gap-4">
					<Card.IconPh Icon={CurrencyCircleDollarIcon} color={colors.nu.brancoNU} />
					<Card.Text className="text-nu-brancoNU font-semibold text-xl">
						Pix automático
					</Card.Text>
				</Card>
				<Card.IconLu name="ChevronRight" color={colors.nu.brancoNU} />
			</Card>
			<Card className="flex-row justify-between items-center border-b border-zinc-800 p-4 mt-2">
				<Card className="flex-row gap-4">
					<Card.IconPh Icon={ShieldIcon} color={colors.nu.brancoNU} />
					<Card.Text className="text-nu-brancoNU font-semibold text-xl">
						Registrar ou trazer chaves
					</Card.Text>
				</Card>
				<Card.IconLu name="ChevronRight" color={colors.nu.brancoNU} />
			</Card>
			<Card className="flex-row justify-between items-center border-b border-zinc-800 p-4 mt-2">
				<Card className="flex-row gap-4">
					<Card.IconPh Icon={FadersHorizontalIcon} color={colors.nu.brancoNU} />
					<Card.Text className="text-nu-brancoNU font-semibold text-xl">
						Meus limites
					</Card.Text>
				</Card>
				<Card.IconLu name="ChevronRight" color={colors.nu.brancoNU} />
			</Card>
		</View>
	)
}

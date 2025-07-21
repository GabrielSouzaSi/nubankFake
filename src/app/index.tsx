import { Button } from "@/components/button"
import { Card } from "@/components/card"
import { colors } from "@/styles/colors"
import {
	DeviceMobileCameraIcon,
	EyeIcon,
	PixLogoIcon,
} from "phosphor-react-native"
import { useState } from "react"
import {
	Image,
	Modal,
	Pressable,
	ScrollView,
	StatusBar,
	Text,
	View,
} from "react-native"

export default function App() {
	const [modal, setModal] = useState(false)
	return (
		<View className="flex-1">
			<StatusBar
				backgroundColor={colors.nu.roxoNU}
				barStyle="dark-content"
			/>
			<View className="bg-nu-roxoNU">
				<View className="flex-row justify-between pt-12 px-7 mb-3">
					<View>
						<Button className="justify-center items-center">
							<Button.View className="rounded-full p-4 bg-purple-500">
								<Button.IconLu
									name="UserRound"
									color={colors.nu.cinzaNU}
								/>
							</Button.View>
						</Button>
					</View>
					<View className="flex-row gap-4">
						<Button className="justify-center items-center">
							<Button.View>
								<Button.IconPh
									Icon={EyeIcon}
									color={colors.nu.cinzaNU}
								/>
							</Button.View>
						</Button>
						<Button className="justify-center items-center">
							<Button.View>
								<Button.IconLu
									name="CircleQuestionMark"
									color={colors.nu.cinzaNU}
								/>
							</Button.View>
						</Button>
						<Button className="justify-center items-center">
							<Button.View>
								<Button.IconLu
									name="MailPlus"
									color={colors.nu.cinzaNU}
								/>
							</Button.View>
						</Button>
					</View>
				</View>
				<Text className="text-nu-cinzaNU pl-7 font-semibold text-xl py-4">
					Olá, Gabriel
				</Text>
			</View>
			<View className="bg-nu-pretoNU">
				<Card>
					<Card className="flex-row justify-between items-center pt-5 px-7">
						<Card.Text className="text-nu-brancoNU font-semibold text-xl">
							Saldo em Conta
						</Card.Text>
						<Card.IconLu
							name="ChevronRight"
							color={colors.nu.brancoNU}
						/>
					</Card>
					<Card.Text className="text-nu-brancoNU font-semibold text-2xl pl-7 py-3">
						R$ 73.723,66
					</Card.Text>
				</Card>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						padding: 16,
					}}
					className="flex-row"
				>
					<Button
						className="justify-center items-center w-24"
						onPress={() => setModal(true)}
					>
						<Button.View className="rounded-full p-6 bg-zinc-800 mb-2">
							<Button.IconPh
								Icon={PixLogoIcon}
								color={colors.nu.brancoNU}
							/>
						</Button.View>
						<Button.Title className="text-center font-semibold text-base text-nu-brancoNU leading-tight">
							Área Pix e Transferir
						</Button.Title>
					</Button>
					<Button className="justify-center items-center w-24">
						<Button.View className="rounded-full p-6 bg-zinc-800 mb-2">
							<Button.IconLu
								name="Barcode"
								color={colors.nu.brancoNU}
							/>
						</Button.View>
						<Button.Title className="text-center font-semibold text-base text-nu-brancoNU leading-tight min-h-[36px]">
							Pagar
						</Button.Title>
					</Button>
					<Button className="justify-center items-center w-24">
						<Button.View className="rounded-full p-6 bg-zinc-800 mb-2">
							<Button.IconLu
								name="HandCoins"
								color={colors.nu.brancoNU}
							/>
						</Button.View>
						<Button.Title className="text-center font-semibold text-base text-nu-brancoNU leading-tight">
							Pegar emprestado
						</Button.Title>
					</Button>
					<Button className="justify-center items-center w-24">
						<Button.View className="rounded-full p-6 bg-zinc-800 mb-2">
							<Button.IconLu
								name="Box"
								color={colors.nu.brancoNU}
							/>
						</Button.View>
						<Button.Title className="text-center font-semibold text-base text-nu-brancoNU leading-tight">
							Caixinha Turbo
						</Button.Title>
					</Button>
					<Button className="justify-center items-center w-24">
						<Button.View className="rounded-full p-6 bg-zinc-800 mb-2">
							<Button.IconPh
								Icon={DeviceMobileCameraIcon}
								color={colors.nu.brancoNU}
							/>
						</Button.View>
						<Button.Title className="text-center font-semibold text-base text-nu-brancoNU leading-tight">
							Recarga de celular
						</Button.Title>
					</Button>
					<Button className="justify-center items-center w-24">
						<Button.View className="rounded-full p-6 bg-zinc-800 mb-2">
							<Button.IconLu
								name="CircleDollarSign"
								color={colors.nu.brancoNU}
							/>
						</Button.View>
						<Button.Title className="text-center font-semibold text-base text-nu-brancoNU leading-tight">
							Caixinhas e investir
						</Button.Title>
					</Button>
				</ScrollView>
				<Card className="bg-zinc-800 rounded-xl mx-7 my-3">
					<Card className="flex-row items-center m-3">
						<Card.IconLu
							name="CreditCard"
							color={colors.nu.brancoNU}
						/>
						<Card.Text className="text-nu-brancoNU font-semibold text-lg ml-4">
							Meus cartões
						</Card.Text>
					</Card>
				</Card>
				<Card className="bg-zinc-800 rounded-xl mx-7 my-5 px-3 pt-3">
					<Card className="flex-row justify-between items-center">
						<Card.Text className="text-nu-brancoNU font-semibold text-lg flex-1 pr-3">
							Pague boletos no crédito em até 12x, direto pelo
							app.
						</Card.Text>
						<Card.IconLu
							name="CreditCard"
							color={colors.nu.brancoNU}
						/>
					</Card>
					<Card className="flex-row justify-center">
						<Card.IconLu
							name="Dot"
							color={colors.nu.brancoNU}
							size={30}
						/>
						<Card.IconLu
							name="Dot"
							color={colors.nu.pretoNU}
							size={30}
						/>
						<Card.IconLu
							name="Dot"
							color={colors.nu.pretoNU}
							size={30}
						/>
					</Card>
				</Card>
				<Card className="border-t border-zinc-400">
					<Card className="flex-row justify-between items-center pt-5 px-7">
						<Card.Text className="text-nu-brancoNU font-semibold text-xl">
							Cartão de crédito
						</Card.Text>
						<Card.IconLu
							name="ChevronRight"
							color={colors.nu.brancoNU}
						/>
					</Card>
					<Card.Text className="text-nu-brancoNU font-medium text-lg pl-7">
						Fatura atual
					</Card.Text>
					<Card.Text className="text-nu-brancoNU font-semibold text-xl pl-7 py-1">
						R$ 923,33
					</Card.Text>
					<Card.Text className="text-zinc-400 font-normal text-lg pl-7 py-3">
						Limite disponível R$ 4.076,67
					</Card.Text>
				</Card>
				<Card className="border-t border-zinc-400">
					<Card className="flex-row justify-between items-center pt-5 px-7">
						<Card.Text className="text-nu-brancoNU font-semibold text-xl">
							Empréstimo
						</Card.Text>
						<Card.IconLu
							name="ChevronRight"
							color={colors.nu.brancoNU}
						/>
					</Card>
					<Card.Text className="text-zinc-400 font-normal text-lg pl-7 py-3">
						Dinheiro do FGTS? Você pode antecipar até 12 parcelas do
						seu saque-aniversário.
					</Card.Text>
				</Card>
				<Card className="border-t border-zinc-400">
					<Card className="flex-row justify-between items-center pt-5 px-7">
						<Card.Text className="text-nu-brancoNU font-semibold text-xl">
							Próximo pagamento
						</Card.Text>
						<Card.IconLu
							name="ChevronRight"
							color={colors.nu.brancoNU}
						/>
					</Card>
					<Card.Text className="text-nu-brancoNU font-medium text-lg pl-7 py-3">
						Quarta-feira, 30 Jul
					</Card.Text>
				</Card>
				<Card className="border-t border-zinc-400">
					<Card className="flex-row justify-between items-center pt-5 px-7">
						<Card.Text className="text-nu-brancoNU font-semibold text-xl py-3">
							Descubra
						</Card.Text>
					</Card>
				</Card>
				<Card className="border-t border-zinc-400">
					<Card className="flex-row justify-between items-center pt-5 px-7">
						<Card.Text className="text-nu-brancoNU font-semibold text-xl py-3">
							Descubra
						</Card.Text>
					</Card>
				</Card>
			</View>
			<Modal
				visible={modal}
				animationType="slide"
				transparent
				statusBarTranslucent
				onRequestClose={() => setModal(false)}
			>
				{/* Fundo semitransparente */}
				<View
					style={{
						flex: 1,
						backgroundColor: "rgba(0,0,0,0.6)",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{/* Imagem centralizada */}
					<Image
						source={{ uri: "https://placekitten.com/400/400" }}
						style={{
							width: 300,
							height: 300,
							borderRadius: 16,
							resizeMode: "cover",
						}}
					/>

					{/* Botão para fechar */}
					<Pressable
						onPress={() => setModal(false)}
						style={{
							marginTop: 20,
							paddingVertical: 10,
							paddingHorizontal: 20,
							backgroundColor: "white",
							borderRadius: 8,
						}}
					>
						<Image
							source={require("@/assets/macaco.jpg")}
							className="w-[224px] h-[288px] dark:bg-white"
							resizeMode="contain"
						/>
					</Pressable>
				</View>
			</Modal>
		</View>
	)
}

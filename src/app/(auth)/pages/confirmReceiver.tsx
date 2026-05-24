import { Button } from "@/components/button"
import { Card } from "@/components/card"
import { colors } from "@/styles/colors"
import { router, useLocalSearchParams } from "expo-router"
import { BankIcon, PixLogoIcon } from "phosphor-react-native"
import { Text, View } from "react-native"

export default function ConfirmReceiver() {
	const { status } = useLocalSearchParams<{ status: string }>()
	const parsed = JSON.parse(status) as {
		exists: boolean
		user: {
			id: string
			name: string
			email: string
			phone: string
			cpf: string
		}
	}

	return (
		<View className="flex-1 bg-nu-pretoNU px-6 border-b border-b-nu-roxoNU">
			<Button className="mt-14" onPress={() => router.back()}>
				<Button.IconLu name="ChevronLeft" color={colors.nu.cinzaNU} />
			</Button>

			<Text className="text-white my-8 text-3xl font-bold">Confirme quem vai receber</Text>

			<Button className="justify-between items-center">
				<View
					className="rounded-full bg-zinc-800 items-center justify-center mb-2"
					style={{ width: 64, height: 64 }}
				>
					<Button.Title className="text-center font-extrabold text-2xl text-nu-brancoNU">
						GS
					</Button.Title>
				</View>

				<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
					Gabriel de Oliveira Souza
				</Button.Title>
			</Button>

			<Card className="flex-row justify-between items-center border-b border-zinc-800 p-4 mt-2">
				<Card className="flex-row gap-4">
					<Card.IconPh Icon={PixLogoIcon} color={colors.nu.brancoNU} />
					<Card.Text className="text-nu-brancoNU font-semibold text-xl">
						NU PAGAMENTOS - IP
					</Card.Text>
				</Card>
			</Card>
			<Card className="flex-row justify-between items-center border-b border-zinc-800 p-4 mt-2">
				<Card className="flex-row gap-4">
					<Card.IconPh Icon={PixLogoIcon} color={colors.nu.brancoNU} />
					<Card.Text className="text-nu-brancoNU font-semibold text-xl">
						{parsed.user.phone}
					</Card.Text>
				</Card>
			</Card>
			<Card className="flex-row justify-between items-center border-b border-zinc-800 p-4 mt-2">
				<Card className="flex-row gap-4">
					<Card.IconPh Icon={BankIcon} color={colors.nu.brancoNU} />
					<Card.Text className="text-nu-brancoNU font-semibold text-xl">
						Meus limites
					</Card.Text>
				</Card>
				<Card.IconLu name="ChevronRight" color={colors.nu.brancoNU} />
			</Card>
		</View>
	)
}

import { useCallback, useEffect, useState } from "react"
import {
	FlatList,
	RefreshControl,
	ScrollView,
	StatusBar,
	Text,
	useWindowDimensions,
	View,
} from "react-native"
import { useRouter } from "expo-router"
import ContentLoader, { Circle, Rect } from "react-content-loader/native"
import {
	BarcodeIcon,
	CubeIcon,
	CurrencyCircleDollarIcon,
	DeviceMobileCameraIcon,
	EyeIcon,
	HandCoinsIcon,
	PixLogoIcon,
} from "phosphor-react-native"
import ActionsSkeleton from "@/components/ActionsSkeleton"
import { Button } from "@/components/button"
import { Card } from "@/components/card"
import { useAuth } from "@/hooks/useAuth"
import { API } from "@/lib/api"
import { colors } from "@/styles/colors"
import { SafeAreaView } from "react-native-safe-area-context"

type OffersOptions = {
	title: string
	icon: React.ComponentType<any>
	onPress?: () => void
}

const ITEM_W = 96
const GAP = 16
const CIRCLE = 64

export default function App() {
	const router = useRouter()
	const [saldo, setSaldo] = useState("")
	const { user } = useAuth()
	const { signOut } = useAuth()
	const { width } = useWindowDimensions()
	const [refreshing, setRefreshing] = useState(false)
	const [options, setOptions] = useState<OffersOptions[]>([
		{
			title: "Área Pix e Transferir",
			icon: PixLogoIcon,
			onPress: () => {
				router.push("/(auth)/pages/pixArea")
			},
		},
		{
			title: "Pagar",
			icon: BarcodeIcon,
			onPress: () => {
				console.log("Clicou em Pagar")
			},
		},
		{
			title: "Pegar emprestado",
			icon: HandCoinsIcon,
			onPress: () => {
				console.log("Clicou em Pegar emprestado")
			},
		},
		{
			title: "Caixinha Turbo",
			icon: CubeIcon,
			onPress: () => {
				console.log("Clicou em Caixinha Turbo")
			},
		},
		{
			title: "Recarga de celular",
			icon: DeviceMobileCameraIcon,
			onPress: () => {
				console.log("Clicou em Recarga de celular")
			},
		},
		{
			title: "Caixinhas e investir",
			icon: CurrencyCircleDollarIcon,
			onPress: () => {
				console.log("Clicou em Caixinhas e investir")
			},
		},
	])

	async function reloadData() {
		// coloque aqui sua lógica de atualização (API, Supabase, etc.)
		await new Promise((r) => setTimeout(r, 800)) // simulação
	}

	const onRefresh = useCallback(async () => {
		setRefreshing(true)
		try {
			await reloadData()
		} finally {
			setRefreshing(false)
		}
	}, [])

	// Linha tipo "título + chevron" (ex.: "Cartão de crédito")
	function SectionHeaderSkeleton({
		width = 0,
		x = 20,
		y = 12,
	}: {
		width?: number
		x?: number
		y?: number
	}) {
		const titleW = Math.min(180, Math.max(120, width * 0.45))
		return (
			<>
				{/* Título */}
				<Rect x={x} y={y} rx="4" ry="4" width={titleW} height="20" />
				{/* Chevron à direita */}
				<Rect x={width - 28} y={y + 2} rx="2" ry="2" width="12" height="16" />
			</>
		)
	}

	// Card simples com ícone à esquerda e texto (ex.: "Meus cartões")
	function SimpleIconRowSkeleton({
		width = 0,
		height = 56,
		x = 16,
		y = 12,
	}: {
		width?: number
		height?: number
		x?: number
		y?: number
	}) {
		const iconR = 12
		return (
			<ContentLoader
				speed={1.2}
				width={width}
				height={height}
				backgroundColor="#3f3f46"
				foregroundColor="#52525b"
				style={{ borderRadius: 12, overflow: "hidden" }}
			>
				<Circle cx={x + iconR} cy={y + iconR} r={iconR} />
				<Rect
					x={x + iconR * 2 + 12}
					y={y + 4}
					rx="4"
					ry="4"
					width={Math.min(160, width * 0.5)}
					height="16"
				/>
			</ContentLoader>
		)
	}

	// Card de destaque (texto + ícone à direita + três “bolinhas” abaixo)
	function PromoCardSkeleton({ width = 0 }: { width: number }) {
		const padX = 12
		const padY = 12
		const line1W = Math.min(260, Math.max(180, width * 0.6))
		const line2W = Math.min(180, Math.max(120, width * 0.4))
		const iconSize = 22
		const dotsY = padY + 48

		return (
			<ContentLoader
				speed={1.2}
				width={width}
				height={84}
				backgroundColor="#3f3f46"
				foregroundColor="#52525b"
				style={{ borderRadius: 12, overflow: "hidden" }}
			>
				{/* Linhas de texto */}
				<Rect x={padX} y={padY} rx="4" ry="4" width={line1W} height="14" />
				<Rect x={padX} y={padY + 18} rx="4" ry="4" width={line2W} height="14" />
				{/* Ícone à direita */}
				<Rect
					x={width - padX - iconSize}
					y={padY}
					rx="6"
					ry="6"
					width={iconSize}
					height={iconSize}
				/>
				{/* Três bolinhas */}
				<Circle cx={width / 2 - 16} cy={dotsY} r="4" />
				<Circle cx={width / 2} cy={dotsY} r="4" />
				<Circle cx={width / 2 + 16} cy={dotsY} r="4" />
			</ContentLoader>
		)
	}

	// Seção “Cartão de crédito” (título, rótulo, valor, descrição)
	function CreditCardSectionSkeleton({ width = 0 }: { width: number }) {
		const baseY = 10
		const labelY = baseY + 28
		const amountY = labelY + 20
		const descY = amountY + 24

		return (
			<ContentLoader
				speed={1.2}
				width={width}
				height={descY + 22}
				backgroundColor="#3f3f46"
				foregroundColor="#52525b"
			>
				<SectionHeaderSkeleton width={width} x={20} y={baseY} />
				{/* "Fatura atual" */}
				<Rect x="20" y={labelY} rx="4" ry="4" width={100} height="14" />
				{/* Valor */}
				<Rect x="20" y={amountY} rx="6" ry="6" width={140} height="18" />
				{/* Descrição cinza */}
				<Rect x="20" y={descY} rx="4" ry="4" width={220} height="14" />
			</ContentLoader>
		)
	}

	// Seção com título + parágrafo (ex.: “Empréstimo”)
	function ParagraphSectionSkeleton({ width = 0 }: { width: number }) {
		const baseY = 10
		const textY = baseY + 28
		const lineW = Math.min(280, Math.max(180, width * 0.65))
		return (
			<ContentLoader
				speed={1.2}
				width={width}
				height={textY + 22}
				backgroundColor="#3f3f46"
				foregroundColor="#52525b"
			>
				<SectionHeaderSkeleton width={width} x={20} y={baseY} />
				<Rect x="20" y={textY} rx="4" ry="4" width={lineW} height="14" />
			</ContentLoader>
		)
	}

	// Seção com título + uma linha (ex.: “Próximo pagamento” + data)
	function SingleLineSectionSkeleton({ width = 0 }: { width: number }) {
		const baseY = 10
		const lineY = baseY + 30
		const w = Math.min(160, Math.max(100, width * 0.4))
		return (
			<ContentLoader
				speed={1.2}
				width={width}
				height={lineY + 20}
				backgroundColor="#3f3f46"
				foregroundColor="#52525b"
			>
				<SectionHeaderSkeleton width={width} x={20} y={baseY} />
				<Rect x="20" y={lineY} rx="4" ry="4" width={w} height="14" />
			</ContentLoader>
		)
	}

	// Seção com apenas o título (ex.: “Descubra”)
	function TitleOnlySectionSkeleton({ width = 0 }: { width: number }) {
		const baseY = 10
		return (
			<ContentLoader
				speed={1.2}
				width={width}
				height={baseY + 28}
				backgroundColor="#3f3f46"
				foregroundColor="#52525b"
			>
				<SectionHeaderSkeleton width={width} x={20} y={baseY} />
			</ContentLoader>
		)
	}

	const Option = ({ title, icon: Icon, onPress }: OffersOptions) => {
		return (
			<View style={{ width: 68, alignItems: "center" }}>
				<Button className="items-center" onPress={onPress}>
					<View
						className="rounded-full bg-zinc-800 items-center justify-center mb-2"
						style={{ width: CIRCLE, height: CIRCLE }}
					>
						{/* ajuste o 'size' conforme seu Button.Icon (28~32 funciona bem) */}
						<Button.IconPh Icon={Icon} color={colors.nu.brancoNU} size={28} />
					</View>

					<Button.Title
						className="text-center font-semibold text-sm text-nu-brancoNU leading-tight"
						numberOfLines={2}
						style={{ minHeight: 34 }} // garante 2 linhas
					>
						{title}
					</Button.Title>
				</Button>
			</View>
		)
	}

	async function fetchSaldo() {
		// Simula uma chamada de API para buscar o saldo
		const { data } = await API.get(`/wallet/balance/${user?.cpf}`)
		setSaldo(data.amountBRL)
	}

	useEffect(() => {
		// Simula uma chamada de API para buscar o saldo
		setTimeout(() => {
			fetchSaldo()
		}, 2000)
	}, [])

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: colors.nu.roxoNU }} edges={["top"]}>
			{/* deixe a StatusBar translúcida e o fundo do topo no próprio SafeArea */}
			<StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

			<ScrollView
				className="flex-1 bg-nu-pretoNU"
				contentContainerStyle={{ paddingBottom: 24 }}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={[colors.nu.roxoNU]}
						progressBackgroundColor={colors.nu.pretoNU}
					/>
				}
			>
				<View className="flex-1 bg-nu-roxoNU">
					<View className="flex-row justify-between px-7 mb-3">
						<View>
							<Button className="justify-center items-center" onPress={signOut}>
								<Button.View className="rounded-full p-4 bg-purple-500">
									<Button.IconLu name="UserRound" color={colors.nu.cinzaNU} />
								</Button.View>
							</Button>
						</View>
						<View className="flex-row gap-4">
							<Button className="justify-center items-center">
								<Button.View>
									<Button.IconPh Icon={EyeIcon} color={colors.nu.cinzaNU} />
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
									<Button.IconLu name="MailPlus" color={colors.nu.cinzaNU} />
								</Button.View>
							</Button>
						</View>
					</View>
					<Text className="text-nu-cinzaNU pl-7 font-semibold text-xl py-4">
						Olá, {user?.name.split(" ")[0]}
					</Text>
				</View>
				<View className="flex-1">
					{saldo === "" ? (
						<ContentLoader
							speed={1.2}
							width={width}
							height={80}
							backgroundColor="#3f3f46"
							foregroundColor="#52525b"
						>
							{/* Linha do título "Saldo em Conta" */}
							<Rect x="20" y="10" rx="4" ry="4" width="140" height="20" />
							{/* Linha do valor do saldo */}
							<Rect x="20" y="40" rx="6" ry="6" width="200" height="30" />
						</ContentLoader>
					) : (
						<Card>
							<Card className="flex-row justify-between items-center pt-5 px-7">
								<Card.Text className="text-nu-brancoNU font-semibold text-xl">
									Saldo em Conta
								</Card.Text>
								<Card.IconLu name="ChevronRight" color={colors.nu.brancoNU} />
							</Card>
							<Card.Text className="text-nu-brancoNU font-semibold text-2xl pl-7 py-3">
								{saldo}
							</Card.Text>
						</Card>
					)}
					{/* Skeleton dos atalhos OU os botões reais */}
					{saldo === "" ? (
						<ActionsSkeleton width={width} />
					) : (
						<View className="my">
							<FlatList
								data={options}
								horizontal
								showsHorizontalScrollIndicator={false}
								keyExtractor={(item) => item.title}
								renderItem={({ item }) => <Option {...item} />}
								ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
								contentContainerStyle={{
									paddingHorizontal: 16,
									paddingVertical: 16,
								}}
								snapToAlignment="start"
								decelerationRate="fast"
								snapToInterval={ITEM_W + GAP}
								getItemLayout={(_, index) => ({
									length: ITEM_W + GAP,
									offset: (ITEM_W + GAP) * index + 16, // +16 do padding left
									index,
								})}
								initialNumToRender={6}
								windowSize={5}
								removeClippedSubviews
							/>
						</View>
					)}
					{saldo === "" ? (
						// "Meus cartões" (card cinza)
						<View className="bg-zinc-800 rounded-xl mx-7 my-3 overflow-hidden">
							<SimpleIconRowSkeleton width={width - 28} />
						</View>
					) : (
						<Card className="bg-zinc-800 rounded-xl mx-7 mb-3">
							<Card className="flex-row items-center m-3">
								<Card.IconLu name="CreditCard" color={colors.nu.brancoNU} />
								<Card.Text className="text-nu-brancoNU font-semibold text-lg ml-4">
									Meus cartões
								</Card.Text>
							</Card>
						</Card>
					)}
					{saldo === "" ? (
						//Card de destaque (texto + ícone + bolinhas)
						<View className="bg-zinc-800 rounded-xl mx-7 my-5 px-3 pt-3 overflow-hidden">
							<PromoCardSkeleton width={width - 28} />
						</View>
					) : (
						<Card className="bg-zinc-800 rounded-xl mx-7 my-5 px-3 pt-3">
							<Card className="flex-row justify-between items-center">
								<Card.Text className="text-nu-brancoNU font-semibold text-lg flex-1 pr-3">
									Pague boletos no crédito em até 12x, direto pelo app.
								</Card.Text>
								<Card.IconLu name="CreditCard" color={colors.nu.brancoNU} />
							</Card>
							<Card className="flex-row justify-center">
								<Card.IconLu name="Dot" color={colors.nu.brancoNU} size={30} />
								<Card.IconLu name="Dot" color={colors.nu.pretoNU} size={30} />
								<Card.IconLu name="Dot" color={colors.nu.pretoNU} size={30} />
							</Card>
						</Card>
					)}
					{saldo === "" ? (
						// Cartão de crédito (seção com 4 linhas)
						<View className="border-t border-zinc-400 py-2">
							<CreditCardSectionSkeleton width={width} />
						</View>
					) : (
						<Card className="border-t border-zinc-400">
							<Card className="flex-row justify-between items-center pt-5 px-7">
								<Card.Text className="text-nu-brancoNU font-semibold text-xl">
									Cartão de crédito
								</Card.Text>
								<Card.IconLu name="ChevronRight" color={colors.nu.brancoNU} />
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
					)}
					{saldo === "" ? (
						// Empréstimo (título + parágrafo)
						<View className="border-t border-zinc-400 py-2">
							<ParagraphSectionSkeleton width={width} />
						</View>
					) : (
						<Card className="border-t border-zinc-400">
							<Card className="flex-row justify-between items-center pt-5 px-7">
								<Card.Text className="text-nu-brancoNU font-semibold text-xl">
									Empréstimo
								</Card.Text>
								<Card.IconLu name="ChevronRight" color={colors.nu.brancoNU} />
							</Card>
							<Card.Text className="text-zinc-400 font-normal text-lg pl-7 py-3">
								Dinheiro do FGTS? Você pode antecipar até 12 parcelas do seu
								saque-aniversário.
							</Card.Text>
						</Card>
					)}
					{saldo === "" ? (
						// Próximo pagamento (título + data)
						<View className="border-t border-zinc-400 py-2">
							<SingleLineSectionSkeleton width={width} />
						</View>
					) : (
						<Card className="border-t border-zinc-400">
							<Card className="flex-row justify-between items-center pt-5 px-7">
								<Card.Text className="text-nu-brancoNU font-semibold text-xl">
									Próximo pagamento
								</Card.Text>
								<Card.IconLu name="ChevronRight" color={colors.nu.brancoNU} />
							</Card>
							<Card.Text className="text-nu-brancoNU font-medium text-lg pl-7 py-3">
								Quarta-feira, 30 Jul
							</Card.Text>
						</Card>
					)}
					{saldo === "" ? (
						// Descubra (apenas título)
						<>
							<View className="border-t border-zinc-400 py-2">
								<TitleOnlySectionSkeleton width={width} />
							</View>
							<View className="border-t border-zinc-400 py-2">
								<TitleOnlySectionSkeleton width={width} />
							</View>
						</>
					) : (
						<>
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
						</>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

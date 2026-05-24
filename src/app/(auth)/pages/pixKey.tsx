import { Button } from "@/components/button"
import { API } from "@/lib/api"
import { colors } from "@/styles/colors"
import { useRouter } from "expo-router"
import { QrCodeIcon } from "phosphor-react-native"
import { useMemo, useRef, useState } from "react"
import { Text, TextInput, View, ScrollView, useWindowDimensions } from "react-native"
import {
	detectSearchKind,
	maskCPF,
	maskCNPJ,
	maskPhoneBR,
	isValidCPF,
	isValidCNPJ,
} from "@/utils/searchDetect"
import { ArrowRightIcon } from "lucide-react-native"

export default function PixKey() {
	const [query, setQuery] = useState("") // texto exibido no input (pode ser mascarado)
	const [raw, setRaw] = useState("") // texto cru digitado (sem máscara)
	const [loading, setLoading] = useState(false)
	const [errMsg, setErrMsg] = useState<string | null>(null)

	const router = useRouter()
	const inputRef = useRef<TextInput>(null)

	// opção: mascarar dinamicamente conforme o usuário digita
	const displayValue = useMemo(() => {
		const { kind } = detectSearchKind(raw)
		if (kind === "cpf") return maskCPF(raw)
		if (kind === "cnpj") return maskCNPJ(raw)
		if (kind === "phone") return maskPhoneBR(raw)
		return raw
	}, [raw])
	const { width } = useWindowDimensions()
	const Card_w = Math.floor(width / 3) - 12

	function onChange(t: string) {
		setErrMsg(null)
		setRaw(t)
		setQuery(t)
	}

	async function onSubmit() {
		const { kind, normalized } = detectSearchKind(raw)

		try {
			setLoading(true)
			setErrMsg(null)

			// Você pode unificar tudo em um endpoint: /search?kind=...&q=...
			// ou ramificar para endpoints específicos:
			let resp
			switch (kind) {
				case "email":
					//resp = await API.get(`/users/by-email/${encodeURIComponent(normalized)}`)
					console.log("search email", normalized)

					break
				case "pix_random":
					// resp = await API.get(`/pix/keys/${normalized}`)
					console.log("search pix_random", normalized)

					break
				case "cpf":
					checkCPF(normalized)
					console.log("search cpf", normalized)

					break
				case "cnpj":
					// resp = await API.get(`/companies/by-cnpj/${normalized}`) // 14 dígitos
					console.log("search cnpj", normalized)

					break
				case "phone":
					// resp = await API.get(`/users/by-phone/${encodeURIComponent(normalized)}`) // +55...
					console.log("search phone", normalized)

					break
				case "name":
					// resp = await API.get(`/users/search?name=${encodeURIComponent(normalized)}`)
					console.log("search name", normalized)

					break
			}
		} catch (e: any) {
			console.error(e)
			setErrMsg("Não foi possível buscar. Tente novamente.")
		} finally {
			setLoading(false)
		}
	}

	async function checkCPF(cpf: string) {
		try {
			setErrMsg(null)
			setLoading(true)
			const { data } = await API.get(`/users/check/${cpf}`) // { exists: boolean }
			router.push({
				pathname: "/(auth)/pages/confirmReceiver",
				params: {
					status: JSON.stringify(data),
				},
			} as any)
		} catch (e: any) {
			console.error(e)
			setErrMsg("Não foi possível verificar o CPF. Tente novamente.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<View className="flex-1 border-b border-b-nu-roxoNU">
			<View className="flex-1 bg-nu-pretoNU px-6">
				<Button className="mt-14" onPress={() => router.back()}>
					<Button.IconLu name="X" color={colors.nu.cinzaNU} />
				</Button>

				<Text className="text-white my-8 text-3xl font-bold">
					Para quem você quer transferir?
				</Text>

				<View className="flex-row justify-between border-b border-zinc-800 gap-4">
					<View className="flex-1">
						<Text className="text-nu-cinzaNU font-semibold text-base">
							Insira o dado de quem vai receber
						</Text>

						<TextInput
							ref={inputRef}
							value={displayValue}
							onChangeText={onChange}
							placeholder="Nome, CPF/CNPJ ou chave Pix"
							// Teclado: como há casos de letras e números, deixe "default" (ou "email-address" após detectar @)
							keyboardType="default"
							autoCapitalize="none"
							returnKeyType="search"
							onSubmitEditing={onSubmit}
							className="text-white text-lg py-3"
							placeholderTextColor={colors.nu.cinzaNU}
						/>

						{!!errMsg && <Text className="text-red-400">{errMsg}</Text>}
					</View>

					<Button className="self-end">
						<Button.IconPh Icon={QrCodeIcon} color={colors.nu.brancoNU} size={28} />
					</Button>
				</View>

				{true && (
					<Button
						onPress={() => checkCPF(raw)}
						className="justify-center items-center w-16 h-16 bg-nu-roxoNU rounded-full p-4"
					>
						<Button.IconPh Icon={ArrowRightIcon} color={colors.nu.cinzaNU} />
					</Button>
				)}

				{false && (
					<>
						<Text className="text-nu-cinzaNU font-semibold text-base my-6">
							Você sempre costuma pagar
						</Text>

						<View className="flex-row justify-between">
							<View className="items-center">
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
										Gabriel Souza
									</Button.Title>
									<Button.Title className="text-center font-semibold text-sm text-nu-brancoNU">
										NU PAGAMENTOS - IP
									</Button.Title>
								</Button>
							</View>
							<View className="items-center">
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
										Gabriel Souza
									</Button.Title>
									<Button.Title className="text-center font-semibold text-sm text-nu-brancoNU">
										NU PAGAMENTOS - IP
									</Button.Title>
								</Button>
							</View>
							<View className="items-center">
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
										Gabriel Souza
									</Button.Title>
									<Button.Title className="text-center font-semibold text-sm text-nu-brancoNU">
										NU PAGAMENTOS - IP
									</Button.Title>
								</Button>
							</View>
						</View>
					</>
				)}

				{false && (
					<>
						<Text className="text-nu-cinzaNU font-semibold text-base my-6">
							Todos os seus contatos
						</Text>
						<ScrollView
							className="flex-1 bg-nu-pretoNU"
							contentContainerStyle={{ paddingBottom: 24, gap: 24 }}
							showsVerticalScrollIndicator={false}
						>
							<Button className="flex-row gap-4">
								<View
									className="rounded-full bg-zinc-800 items-center justify-center"
									style={{ width: 40, height: 40 }}
								>
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										GS
									</Button.Title>
								</View>

								<View className="items-center justify-center">
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										Gabriel de Oliveira Souza
									</Button.Title>
								</View>
							</Button>
							<Button className="flex-row gap-4">
								<View
									className="rounded-full bg-zinc-800 items-center justify-center"
									style={{ width: 40, height: 40 }}
								>
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										GS
									</Button.Title>
								</View>

								<View className="items-center justify-center">
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										Gabriel de Oliveira Souza
									</Button.Title>
								</View>
							</Button>
							<Button className="flex-row gap-4">
								<View
									className="rounded-full bg-zinc-800 items-center justify-center"
									style={{ width: 40, height: 40 }}
								>
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										GS
									</Button.Title>
								</View>

								<View className="items-center justify-center">
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										Gabriel de Oliveira Souza
									</Button.Title>
								</View>
							</Button>
							<Button className="flex-row gap-4">
								<View
									className="rounded-full bg-zinc-800 items-center justify-center"
									style={{ width: 40, height: 40 }}
								>
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										GS
									</Button.Title>
								</View>

								<View className="items-center justify-center">
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										Gabriel de Oliveira Souza
									</Button.Title>
								</View>
							</Button>
							<Button className="flex-row gap-4">
								<View
									className="rounded-full bg-zinc-800 items-center justify-center"
									style={{ width: 40, height: 40 }}
								>
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										GS
									</Button.Title>
								</View>

								<View className="items-center justify-center">
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										Gabriel de Oliveira Souza
									</Button.Title>
								</View>
							</Button>
							<Button className="flex-row gap-4">
								<View
									className="rounded-full bg-zinc-800 items-center justify-center"
									style={{ width: 40, height: 40 }}
								>
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										GS
									</Button.Title>
								</View>

								<View className="items-center justify-center">
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										Gabriel de Oliveira Souza
									</Button.Title>
								</View>
							</Button>
							<Button className="flex-row gap-4">
								<View
									className="rounded-full bg-zinc-800 items-center justify-center"
									style={{ width: 40, height: 40 }}
								>
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										GS
									</Button.Title>
								</View>

								<View className="items-center justify-center">
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										Gabriel de Oliveira Souza
									</Button.Title>
								</View>
							</Button>
							<Button className="flex-row gap-4">
								<View
									className="rounded-full bg-zinc-800 items-center justify-center"
									style={{ width: 40, height: 40 }}
								>
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										GS
									</Button.Title>
								</View>

								<View className="items-center justify-center">
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										Gabriel de Oliveira Souza
									</Button.Title>
								</View>
							</Button>
							<Button className="flex-row gap-4">
								<View
									className="rounded-full bg-zinc-800 items-center justify-center"
									style={{ width: 40, height: 40 }}
								>
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										GS
									</Button.Title>
								</View>

								<View className="items-center justify-center">
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										Gabriel de Oliveira Souza
									</Button.Title>
								</View>
							</Button>
							<Button className="flex-row gap-4">
								<View
									className="rounded-full bg-zinc-800 items-center justify-center"
									style={{ width: 40, height: 40 }}
								>
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										GS
									</Button.Title>
								</View>

								<View className="items-center justify-center">
									<Button.Title className="text-center font-extrabold text-base text-nu-brancoNU">
										Gabriel de Oliveira Souza
									</Button.Title>
								</View>
							</Button>
						</ScrollView>
					</>
				)}
			</View>
		</View>
	)
}

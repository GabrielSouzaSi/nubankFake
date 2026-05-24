import { Button } from "@/components/button"
import { useAuth } from "@/hooks/useAuth"
import { API } from "@/lib/api"
import { colors } from "@/styles/colors"
import { ArrowLeftIcon, ArrowRightIcon } from "phosphor-react-native"
import { useEffect, useMemo, useRef, useState } from "react"
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StatusBar,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native"

// --- helpers ---
function maskCPF(digits: string) {
	const v = digits.replace(/\D/g, "").slice(0, 11)
	const p1 = v.slice(0, 3)
	const p2 = v.slice(3, 6)
	const p3 = v.slice(6, 9)
	const p4 = v.slice(9, 11)
	let out = p1
	if (p2) out += "." + p2
	if (p3) out += "." + p3
	if (p4) out += "-" + p4
	return out
}

function isValidCPF(raw: string) {
	const s = raw.replace(/\D/g, "")
	if (s.length !== 11) return false
	if (/^(\d)\1+$/.test(s)) return false // todos iguais
	const calc = (base: string, factor: number) => {
		let sum = 0
		for (let i = 0; i < base.length; i++) sum += Number(base[i]) * (factor - i)
		const rest = (sum * 10) % 11
		return rest === 10 ? 0 : rest
	}
	const d1 = calc(s.slice(0, 9), 10)
	const d2 = calc(s.slice(0, 10), 11)
	return d1 === Number(s[9]) && d2 === Number(s[10])
}

function maskPhoneBR(digits: string) {
	const v = digits.replace(/\D/g, "").slice(0, 11)
	if (!v) return "" // sem dígitos => não mostra nada (placeholder aparece)

	const ddd = v.slice(0, 2)

	if (v.length <= 2) {
		// "(9" / "(99"
		return `(${v}`
	}

	if (v.length <= 6) {
		// "(99) 9", "(99) 9999"
		return `(${ddd}) ${v.slice(2)}`
	}

	if (v.length <= 10) {
		// fixo: "(99) 9999-9999"
		return `(${ddd}) ${v.slice(2, 6)}-${v.slice(6)}`
	}

	// celular: "(99) 99999-9999"
	return `(${ddd}) ${v.slice(2, 7)}-${v.slice(7, 11)}`
}
const isValidPhoneBR = (v: string) => {
	const d = v.replace(/\D/g, "")
	return d.length === 10 || d.length === 11
}
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())

type Mode = "unknown" | "login" | "signup"
type Step = 0 | 1 | 2 | 3 | 4

export default function App() {
	const [mode, setMode] = useState<Mode>("unknown")
	const [step, setStep] = useState<Step>(0)

	const [cpfDigits, setCpfDigits] = useState("")
	const [nome, setNome] = useState("")
	const [email, setEmail] = useState("")
	const [telefone, setTelefone] = useState("")
	const [senha, setSenha] = useState("")

	const { signIn } = useAuth()

	const [loading, setLoading] = useState(false)
	const [errMsg, setErrMsg] = useState<string | null>(null)

	const cpfMasked = useMemo(() => maskCPF(cpfDigits), [cpfDigits])
	const telefoneMasked = useMemo(() => maskPhoneBR(telefone), [telefone])

	const TOTAL_STEPS = mode === "login" ? 2 : 5
	const currentStepIndex =
		mode === "login"
			? step === 0
				? 0
				: 1 // 0=cpf, 1=senha
			: step // 0..4

	// validação dinâmica por modo/etapa
	const canNext = (() => {
		if (mode === "login") {
			if (step === 0) return isValidCPF(cpfDigits)
			if (step === 4 || step === 1) return senha.trim().length >= 8 // senha (no login será step 1 logicamente)
			return false
		} else {
			switch (step) {
				case 0:
					return isValidCPF(cpfDigits)
				case 1:
					return nome.trim().length > 0
				case 2:
					return isValidEmail(email)
				case 3:
					return isValidPhoneBR(telefone)
				case 4:
					return senha.trim().length >= 8
				default:
					return false
			}
		}
	})()

	// refs
	const cpfRef = useRef<TextInput>(null)
	const nomeRef = useRef<TextInput>(null)
	const emailRef = useRef<TextInput>(null)
	const telefoneRef = useRef<TextInput>(null)
	const senhaRef = useRef<TextInput>(null)

	useEffect(() => {
		if (mode === "login") {
			if (step === 0) cpfRef.current?.focus()
			else senhaRef.current?.focus()
		} else {
			if (step === 0) cpfRef.current?.focus()
			if (step === 1) nomeRef.current?.focus()
			if (step === 2) emailRef.current?.focus()
			if (step === 3) telefoneRef.current?.focus()
			if (step === 4) senhaRef.current?.focus()
		}
	}, [mode, step])

	// se o usuário voltar para o CPF e editar, reseta o modo
	function onCpfChangeMasked(t: string) {
		setErrMsg(null)
		const only = t.replace(/\D/g, "")
		setCpfDigits(only)
		if (step === 0) setMode("unknown")
	}

	async function checkCPF(cpf: string) {
		try {
			setErrMsg(null)
			setLoading(true)
			const { data } = await API.get(`/users/check/${cpf}`) // { exists: boolean }
			if (data?.exists) {
				setMode("login")
				// ir direto para senha (mantemos step=4 para reuso de JSX da senha, mas o stepper mostrará 2/2)
				setStep(4)
			} else {
				setMode("signup")
				setStep(1)
			}
		} catch (e: any) {
			console.error(e)
			setErrMsg("Não foi possível verificar o CPF. Tente novamente.")
		} finally {
			setLoading(false)
		}
	}

	function handleBack() {
		setErrMsg(null)
		if (mode === "login") {
			if (step !== 0) setStep(0)
			setMode("unknown")
			return
		}
		if (step > 0) setStep((p) => (p - 1) as Step)
		if (step - 1 === 0) setMode("unknown")
	}

	async function handleNext() {
		if (!canNext || loading) return

		// etapa de CPF é comum aos dois fluxos
		if (step === 0) {
			await checkCPF(cpfDigits)
			return
		}

		if (mode === "login") {
			await login()
			return
		}

		// modo cadastro
		if (step < 4) {
			setStep((p) => (p + 1) as Step)
			return
		}
		await signup()
	}

	async function login() {
		try {
			setErrMsg(null)
			setLoading(true)
			await signIn(cpfDigits, senha)
		} catch (error) {
			console.log("Error =>", error)
			Alert.alert("Aviso!", "CPF ou senha inválidos!")
		} finally {
			setLoading(false)
		}
	}

	async function signup() {
		try {
			setErrMsg(null)
			setLoading(true)
			await API.post("/auth/register", {
				email,
				password: senha,
				name: nome,
				cpf: cpfDigits,
				phone: telefone, // só dígitos
			})
			// já autenticar usando o mesmo hook do login
			await signIn(cpfDigits, senha)
		} catch (e: any) {
			console.error(e)
			setErrMsg("Não foi possível concluir o cadastro.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<StatusBar backgroundColor={colors.nu.roxoNU} barStyle="light-content" translucent />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				className="flex-1 bg-nu-pretoNU"
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View className="flex-1 pt-14 px-7 bg-nu-pretoNU border-b border-nu-roxoNU">
						{/* stepper */}
						<View className="flex-row items-center mb-6">
							{Array.from({ length: TOTAL_STEPS }).map((_, i) => (
								<View
									key={i}
									className={`h-1 flex-1 rounded-full ${currentStepIndex >= i ? "bg-nu-roxoNU" : "bg-zinc-700"} ${i < TOTAL_STEPS - 1 ? "mr-2" : ""}`}
								/>
							))}
							<Text className="ml-3 text-zinc-400">
								{currentStepIndex + 1}/{TOTAL_STEPS}
							</Text>
						</View>

						{/* voltar (para qualquer etapa > 0) */}
						{mode !== "unknown" && (step > 0 || (mode === "login" && step === 4)) && (
							<View className="mb-4">
								<Button onPress={handleBack} disabled={loading}>
									<Button.View className="flex-row items-center gap-2">
										<Button.IconPh
											Icon={ArrowLeftIcon}
											color={colors.nu.cinzaNU}
										/>
										<Button.Title className="text-zinc-400">
											Voltar
										</Button.Title>
									</Button.View>
								</Button>
							</View>
						)}

						{!!errMsg && (
							<View className="mb-4">
								<Text className="text-red-400">{errMsg}</Text>
							</View>
						)}

						{/* etapa 0 - cpf */}
						{step === 0 && (
							<View className="gap-4">
								<Text className="text-nu-cinzaNU font-semibold text-xl">
									Boas-vindas ao Nubank! Qual o seu CPF?
								</Text>
								<Text className="text-zinc-400 font-normal text-lg">
									Precisamos dele para iniciar seu cadastro ou acessar o
									aplicativo
								</Text>

								<TextInput
									ref={cpfRef}
									value={cpfMasked}
									onChangeText={onCpfChangeMasked}
									placeholder="000.000.000-00"
									keyboardType="numeric"
									maxLength={14}
									returnKeyType="next"
									onSubmitEditing={() =>
										isValidCPF(cpfDigits) ? checkCPF(cpfDigits) : null
									}
									className="text-white text-lg py-3"
									placeholderTextColor={colors.nu.cinzaNU}
								/>
								{!isValidCPF(cpfDigits) && cpfDigits.length >= 11 && (
									<Text className="text-red-400">CPF inválido.</Text>
								)}
							</View>
						)}

						{/* fluxo CADASTRO: 1 Nome, 2 Email, 3 Telefone */}
						{mode !== "login" && step === 1 && (
							<View className="gap-4">
								<Text className="text-nu-cinzaNU font-semibold text-xl">
									Agora digite seu nome completo
								</Text>
								<TextInput
									ref={nomeRef}
									value={nome}
									onChangeText={setNome}
									placeholder="Nome completo"
									returnKeyType="next"
									onSubmitEditing={handleNext}
									className="text-white text-lg py-3"
									placeholderTextColor={colors.nu.cinzaNU}
								/>
							</View>
						)}
						{/* etapa 2 - email */}
						{mode !== "login" && step === 2 && (
							<View className="gap-4">
								<Text className="text-nu-cinzaNU font-semibold text-xl">
									Agora digite seu E-mail
								</Text>
								<TextInput
									ref={emailRef}
									value={email}
									onChangeText={setEmail}
									placeholder="Seu melhor e-mail"
									autoCapitalize="none"
									keyboardType="email-address"
									autoCorrect={false}
									returnKeyType="next"
									onSubmitEditing={handleNext}
									className="text-white text-lg py-3"
									placeholderTextColor={colors.nu.cinzaNU}
								/>
								{!isValidEmail(email) && email.length > 0 && (
									<Text className="text-red-400">E-mail inválido.</Text>
								)}
							</View>
						)}
						{/* etapa 3 - telefone */}
						{mode !== "login" && step === 3 && (
							<View className="gap-4">
								<Text className="text-nu-cinzaNU font-semibold text-xl">
									Agora digite seu Telefone
								</Text>
								<TextInput
									ref={telefoneRef}
									value={telefoneMasked}
									onChangeText={(t) => setTelefone(t.replace(/\D/g, ""))}
									placeholder="(00) 00000-0000"
									keyboardType="phone-pad"
									returnKeyType="next"
									onSubmitEditing={handleNext}
									className="text-white text-lg py-3"
									placeholderTextColor={colors.nu.cinzaNU}
								/>
								{!isValidPhoneBR(telefone) && telefone.length > 0 && (
									<Text className="text-red-400">Telefone inválido.</Text>
								)}
							</View>
						)}
						{/* senha — usada em AMBOS os fluxos */}
						{step === 4 && (
							<View className="gap-4">
								<Text className="text-nu-cinzaNU font-semibold text-xl">
									Agora digite sua senha do aplicativo
								</Text>
								<TextInput
									ref={senhaRef}
									value={senha}
									onChangeText={setSenha}
									placeholder="8 dígitos ou mais"
									secureTextEntry
									returnKeyType="done"
									onSubmitEditing={() =>
										senha.trim().length >= 8 ? handleNext() : null
									}
									className="text-white text-lg py-3"
									placeholderTextColor={colors.nu.cinzaNU}
								/>
								<Text className="text-zinc-400 font-normal text-lg">
									Essa é aquela senha que você usa para entrar na conta
								</Text>

								<Button
									onPress={() => {
										/* fluxo de esqueci senha */
									}}
								>
									<Button.View className="flex-row gap-2 py-2">
										<Button.Title className="text-nu-roxoNU">
											Esqueci a senha
										</Button.Title>
										<Button.IconPh
											Icon={ArrowRightIcon}
											color={colors.nu.roxoNU}
										/>
									</Button.View>
								</Button>
							</View>
						)}

						{/* CTA inferior */}
						<View className="flex-1 justify-end">
							<View className="flex-row justify-end mb-10">
								<Button
									onPress={handleNext}
									disabled={!canNext || loading}
									accessibilityHint={
										currentStepIndex < TOTAL_STEPS - 1
											? "Avançar"
											: mode === "login"
												? "Entrar"
												: "Cadastrar"
									}
								>
									<Button.View
										className={`rounded-full p-4 ${canNext && !loading ? "bg-nu-roxoNU" : "bg-zinc-700"}`}
									>
										<Button.IconPh
											Icon={ArrowRightIcon}
											color={canNext && !loading ? "#fff" : colors.nu.cinzaNU}
										/>
									</Button.View>
								</Button>
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</>
	)
}

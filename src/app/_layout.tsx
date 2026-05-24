// app/_layout.tsx (Expo Router 5)
import { AuthContextProvider } from "@/contexts/AuthContext"
import { useAuth } from "@/hooks/useAuth"
import { colors } from "@/styles/colors"
import "@/styles/global.css"
import { Stack, useRootNavigationState } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import * as SystemUI from "expo-system-ui"
import { useEffect } from "react"
import { StatusBar } from "react-native"

void SplashScreen.preventAutoHideAsync()

// defina a cor que combina com seu splash (hex é mais previsível)
void SystemUI.setBackgroundColorAsync("#0B0B0B")

function InitialLayout() {
	const { user, isBootstrapping } = useAuth()
	const nav = useRootNavigationState()

	// Esconde o Splash quando router e boot estiverem prontos
	useEffect(() => {
		if (!nav?.key) return
		if (isBootstrapping) return
		SplashScreen.hideAsync().catch(() => {})
	}, [nav?.key, isBootstrapping])

	// Durante o boot inicial, deixe o Splash cuidar da tela
	if (!nav?.key || isBootstrapping) return null

	const isLoggedIn = !!user?.id

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				// Deixe a cor de fundo do conteúdo igual ao splash para evitar “flash branco”
				contentStyle: { backgroundColor: "#0B0B0B" },
			}}
		>
			<Stack.Protected guard={isLoggedIn}>
				<Stack.Screen name="(auth)" />
			</Stack.Protected>

			<Stack.Protected guard={!isLoggedIn}>
				<Stack.Screen name="index" />
			</Stack.Protected>
		</Stack>
	)
}

export default function RootLayout() {
	return (
		// <PushNotificationsProvider>
		<AuthContextProvider>
			<InitialLayout />
		</AuthContextProvider>
		// </PushNotificationsProvider>
	)
}

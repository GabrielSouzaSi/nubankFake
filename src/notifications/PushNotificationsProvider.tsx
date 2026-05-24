// src/notifications/PushNotificationsProvider.tsx
import Constants from "expo-constants"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react"
import { AppState, Platform } from "react-native"

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowBanner: true,
		shouldShowList: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
})

type Ctx = {
	/** Expo Push Token atual (se já obtido) */
	pushToken?: string
	/** Garante/renova e retorna o token imediatamente (ou undefined se não disponível) */
	ensureRegistered: () => Promise<string | undefined>
}

const PushCtx = createContext<Ctx | null>(null)

export function PushNotificationsProvider({ children }: PropsWithChildren) {
	const [pushToken, setPushToken] = useState<string>()

	const ensureRegistered = useCallback(async (): Promise<string | undefined> => {
		if (!Device.isDevice) {
			console.warn("[push] Requer dispositivo físico")
			return
		}

		if (Platform.OS === "android") {
			await Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			})
		}

		// Permissões
		let { status } = await Notifications.getPermissionsAsync()
		if (status !== "granted") {
			const req = await Notifications.requestPermissionsAsync()
			status = req.status
		}
		if (status !== "granted") {
			console.warn("[push] Permissão negada")
			return
		}

		// Tenta achar o projectId (varia conforme build/ambiente)
		const projectId =
			(Constants as any)?.expoConfig?.extra?.eas?.projectId ??
			(Constants as any)?.easConfig?.projectId ??
			// opcional: fallback via env pública se você definir
			(process.env as any)?.EXPO_PUBLIC_EAS_PROJECT_ID

		try {
			const tokenResponse = projectId
				? await Notifications.getExpoPushTokenAsync({ projectId })
				: // fallback (ideal é configurar o projectId)
					await Notifications.getExpoPushTokenAsync()

			const token = tokenResponse?.data
			if (!token) {
				console.warn("[push] getExpoPushTokenAsync retornou vazio")
				return
			}

			if (token !== pushToken) {
				setPushToken(token)
			}

			return token
		} catch (e) {
			console.warn("[push] Erro ao obter token:", e)
			return
		}
	}, [pushToken])

	// Obtém/atualiza token ao abrir e quando o app volta para foreground
	useEffect(() => {
		ensureRegistered()
		const sub = AppState.addEventListener("change", (s) => {
			if (s === "active") ensureRegistered()
		})
		return () => sub.remove()
	}, [ensureRegistered])

	const value: Ctx = { pushToken, ensureRegistered }

	return <PushCtx.Provider value={value}>{children}</PushCtx.Provider>
}

/** Hook com falha-rápida se usado fora do Provider */
export function usePush(): Ctx {
	const ctx = useContext(PushCtx)
	if (!ctx) {
		throw new Error(
			"usePush deve ser usado DENTRO de <PushNotificationsProvider> (verifique a ordem/nível dos providers e os imports).",
		)
	}
	return ctx
}

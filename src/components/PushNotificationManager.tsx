// src/notifications/PushNotificationsProvider.tsx
import Constants from "expo-constants"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
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
	pushToken?: string
	ensureRegistered: () => Promise<string | undefined>
}

const PushCtx = createContext<Ctx>({ ensureRegistered: async () => undefined })

export const PushNotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [pushToken, setPushToken] = useState<string>()

	const ensureRegistered = useCallback(async () => {
		if (!Device.isDevice) {
			console.warn("Push Notifications requer dispositivo físico.")
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

		let { status } = await Notifications.getPermissionsAsync()
		if (status !== "granted") {
			const req = await Notifications.requestPermissionsAsync()
			status = req.status
		}
		if (status !== "granted") return

		const projectId = Constants.expoConfig?.extra?.eas?.projectId

		if (!projectId) {
			console.warn("Defina extra.eas.projectId no app config (EAS).")
			return
		}

		const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data
		if (token !== pushToken) setPushToken(token)
		console.log("Got push token:", token)

		return token
	}, [pushToken])

	// Garante/atualiza token ao abrir/voltar ao app
	useEffect(() => {
		ensureRegistered()
		const sub = AppState.addEventListener("change", (s) => {
			if (s === "active") ensureRegistered()
		})
		return () => sub.remove()
	}, [ensureRegistered])

	// (Opcional) listeners
	useEffect(() => {
		const recv = Notifications.addNotificationReceivedListener(() => {})
		const tap = Notifications.addNotificationResponseReceivedListener(() => {})
		return () => {
			recv.remove()
			tap.remove()
		}
	}, [])

	return <PushCtx.Provider value={{ pushToken, ensureRegistered }}>{children}</PushCtx.Provider>
}

export const usePush = () => useContext(PushCtx)

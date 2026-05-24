import Constants from "expo-constants"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import { Platform } from "react-native"

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

export const PushNotificationManager: React.FC<PropsWithChildren<{}>> = ({ children }) => {
	const [pushToken, setPushToken] = useState<string>()

	// Register for push notifications
	const registerForPushNotificationsAsync = async (): Promise<string | undefined> => {
		if (Platform.OS === "android") {
			await Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			})
		}

		if (Device.isDevice) {
			const { status: existingStatus } = await Notifications.getPermissionsAsync()
			let finalStatus = existingStatus

			// Request permissions if not already granted
			if (existingStatus !== "granted") {
				const { status } = await Notifications.requestPermissionsAsync()
				finalStatus = status
			}

			// Check if permissions are granted
			if (finalStatus !== "granted") {
				console.warn("Failed to get push token for push notification!")
				return
			}

			// Get Expo Push Token
			try {
				const projectId = Constants.expoConfig?.extra?.eas?.projectId

				if (!projectId) {
					console.error("No project ID found. Please configure in app.json")
					return
				}

				const token = (
					await Notifications.getExpoPushTokenAsync({
						projectId: projectId,
					})
				).data

				if (token !== pushToken) setPushToken(token)

				console.log("Push Token:", token)
				return token
			} catch (error) {
				console.error("Detailed Error getting push token:", error)

				if (error instanceof Error) {
					console.error("Error name:", error.name)
					console.error("Error message:", error.message)
					console.error("Error stack:", error.stack)
				}
			}
		} else {
			console.warn("Must use physical device for Push Notifications")
		}
	}

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => {
			if (token) {
			}
		})

		// Notification received listener
		const receivedSubscription = Notifications.addNotificationReceivedListener(
			(notification) => {
				console.log("Notification Received:", notification.request.content.data)
			},
		)

		// Notification tap listener
		const responseSubscription = Notifications.addNotificationResponseReceivedListener(
			(response) => {
				const data = response.notification.request.content.data
				console.log("Notification Tapped:", data)
			},
		)

		return () => {
			receivedSubscription.remove()
			responseSubscription.remove()
		}
	}, [])

	return <>{children}</>
}

export const usePush = () => useContext(PushCtx)

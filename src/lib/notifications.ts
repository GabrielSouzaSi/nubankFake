// lib/notifications.ts
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export async function setupNotifications(): Promise<string | null> {
    // precisa ser dispositivo físico
    if (!Device.isDevice) {
        console.warn("[push] Rode em dispositivo físico");
        return null;
    }

    // permissões (Android 13+ exige POST_NOTIFICATIONS)
    let { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
        const req = await Notifications.requestPermissionsAsync();
        status = req.status;
    }
    if (status !== "granted") {
        console.warn("[push] Permissão negada");
        return null;
    }

    // canal Android
    if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("pix-events", {
            name: "PIX - Eventos",
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
        });
    }

    // token (passe o projectId em EAS; no Expo Go é ignorado)
    const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        (Constants as any)?.easConfig?.projectId; // fallback para SDKs novos

    try {
        const args = projectId ? { projectId } : undefined;
        const { data } = await Notifications.getExpoPushTokenAsync(args as any);
        const token = data ?? null;

        if (!token) {
            console.warn("[push] Token vazio. Verifique projectId/permissões.");
            return null;
        }
        // valida formato
        if (!/^(Expo|Exponent)PushToken\[[A-Za-z0-9+\-/_=]+\]$/.test(token)) {
            console.warn("[push] Formato inesperado de token:", token);
        }
        return token;
    } catch (e: any) {
        console.warn("[push] Erro ao obter token:", e?.message ?? e);
        return null;
    }
}

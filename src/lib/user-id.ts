import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const KEY = 'userId';

export async function getUserId(): Promise<string> {
    let id = await AsyncStorage.getItem(KEY);
    if (!id) {
        id = uuidv4();              // UUID v4 válido
        await AsyncStorage.setItem(KEY, id);
    }
    return id;
}

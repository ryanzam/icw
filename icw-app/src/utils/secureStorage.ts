import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export const secureStorage = {
    async getItem(key: string): Promise<string | null> {
        if (Platform.OS === "web") {
            try {
                return localStorage.getItem(key);
            } catch {
                return null;
            }
        }
        return SecureStore.getItemAsync(key);
    },

    async setItem(key: string, value: string): Promise<void> {
        if (Platform.OS === "web") {
            try {
                localStorage.setItem(key, value);
            } catch {

            }
            return;
        }
        await SecureStore.setItemAsync(key, value);
    },

    async removeItem(key: string): Promise<void> {
        if (Platform.OS === "web") {
            try {
                localStorage.removeItem(key);
            } catch {

            }
            return;
        }
        await SecureStore.deleteItemAsync(key);
    },
};
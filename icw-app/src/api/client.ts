import axios, { AxiosError } from "axios";
import Constants from "expo-constants";
//import * as SecureStore from "expo-secure-store";
import { secureStorage } from "../utils/secureStorage";

const FALLBACK_URL = "http://localhost:4000/api";

export const API_URL =
    process.env.EXPO_PUBLIC_API_URL ||
    (Constants.expoConfig?.extra?.apiUrl as string | undefined) ||
    FALLBACK_URL;

export const TOKEN_KEY = "icw_auth_token";

export const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(async (config) => {
    const token = await secureStorage.getItem(TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

/* apiClient.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}); */

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const err = error as AxiosError<{ message?: string }>;
        return (
            err.response?.data?.message ||
            err.message ||
            "Something went wrong. Please try again."
        );
    }
    if (error instanceof Error) return error.message;
    return "Something went wrong. Please try again.";
}


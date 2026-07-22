import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "./Button";

interface EmptyStateProps {
    icon?: keyof typeof Ionicons.glyphMap;
    title: string;
    message?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export function EmptyState({ icon = "sparkles-outline", title, message, actionLabel, onAction }: EmptyStateProps) {
    return (
        <View className="flex-1 items-center justify-center px-10 py-16">
            <View className="mb-5 h-20 w-20 items-center justify-center rounded-full bg-blush-100">
                <Ionicons name={icon} size={32} color="#D97757" />
            </View>
            <Text className="text-center font-display text-xl text-plum-700">{title}</Text>
            {message ? (
                <Text className="mt-2 text-center font-sans text-sm text-plum-400">{message}</Text>
            ) : null}
            {actionLabel && onAction ? (
                <View className="mt-6">
                    <Button label={actionLabel} onPress={onAction} variant="primary" />
                </View>
            ) : null}
        </View>
    );
}

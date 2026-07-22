import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import * as Haptics from "expo-haptics";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
    label: string;
    onPress?: () => void;
    variant?: Variant;
    size?: Size;
    isLoading?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

const variantStyles: Record<Variant, { container: string; text: string }> = {
    primary: { container: "bg-plum-600 active:bg-plum-700", text: "text-cream" },
    secondary: { container: "bg-rose-500 active:bg-rose-600", text: "text-white" },
    outline: {
        container: "bg-transparent border border-plum-300 active:bg-plum-50",
        text: "text-plum-600",
    },
    ghost: { container: "bg-transparent active:bg-blush-100", text: "text-plum-600" },
};

const sizeStyles: Record<Size, { container: string; text: string }> = {
    sm: { container: "px-4 py-2 rounded-full", text: "text-sm" },
    md: { container: "px-6 py-3.5 rounded-full", text: "text-base" },
    lg: { container: "px-8 py-4 rounded-full", text: "text-base" },
};

export function Button({
    label,
    onPress,
    variant = "primary",
    size = "md",
    isLoading = false,
    disabled = false,
    icon,
    fullWidth = false,
}: ButtonProps) {
    const v = variantStyles[variant];
    const s = sizeStyles[size];
    const isDisabled = disabled || isLoading;

    return (
        <Pressable
            onPress={() => {
                if (isDisabled) return;
                Haptics.selectionAsync().catch(() => { });
                onPress?.();
            }}
            disabled={isDisabled}
            className={`flex-row items-center justify-center ${v.container} ${s.container} ${fullWidth ? "w-full" : ""
                } ${isDisabled ? "opacity-50" : ""}`}
        >
            {isLoading ? (
                <ActivityIndicator color={variant === "outline" || variant === "ghost" ? "#5B3455" : "#FFFBF8"} />
            ) : (
                <View className="flex-row items-center gap-2">
                    {icon}
                    <Text className={`font-sans-semibold ${v.text} ${s.text}`}>{label}</Text>
                </View>
            )}
        </Pressable>
    );
}

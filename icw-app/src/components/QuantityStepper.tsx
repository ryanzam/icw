import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface QuantityStepperProps {
    quantity: number;
    onChange: (next: number) => void;
    max?: number;
    min?: number;
}

export function QuantityStepper({ quantity, onChange, max = 99, min = 1 }: QuantityStepperProps) {
    return (
        <View className="flex-row items-center rounded-full border border-blush-200 bg-white">
            <Pressable
                onPress={() => onChange(Math.max(min, quantity - 1))}
                className="h-9 w-9 items-center justify-center"
            >
                <Ionicons name="remove" size={16} color="#5B3455" />
            </Pressable>
            <Text className="min-w-[24px] text-center font-sans-semibold text-sm text-plum-700">
                {quantity}
            </Text>
            <Pressable
                onPress={() => onChange(Math.min(max, quantity + 1))}
                className="h-9 w-9 items-center justify-center"
            >
                <Ionicons name="add" size={16} color="#5B3455" />
            </Pressable>
        </View>
    );
}

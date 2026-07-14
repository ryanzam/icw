import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StarRatingProps {
    rating: number;
    size?: number;
    showValue?: boolean;
    reviewCount?: number;
}

export function StarRating({ rating, size = 14, showValue = false, reviewCount }: StarRatingProps) {
    const stars = [1, 2, 3, 4, 5];
    return (
        <View className="flex-row items-center gap-1">
            <View className="flex-row">
                {stars.map((s) => (
                    <Ionicons
                        key={s}
                        name={rating >= s ? "star" : rating >= s - 0.5 ? "star-half" : "star-outline"}
                        size={size}
                        color="#C9A15C"
                    />
                ))}
            </View>
            {showValue ? (
                <Text className="font-sans-medium text-xs text-plum-400">
                    {rating.toFixed(1)}
                    {typeof reviewCount === "number" ? ` (${reviewCount})` : ""}
                </Text>
            ) : null}
        </View>
    );
}

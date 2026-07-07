import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SectionHeaderProps {
    eyebrow?: string;
    title: string;
    onPressAction?: () => void;
    actionLabel?: string;
}

export function SectionHeader({ eyebrow, title, onPressAction, actionLabel = "See all" }: SectionHeaderProps) {
    return (
        <View className="mb-4 flex-row items-end justify-between px-5">
            <View>
                {eyebrow ? (
                    <Text className="font-sans-semibold text-[11px] uppercase tracking-[2px] text-rose-500">
                        {eyebrow}
                    </Text>
                ) : null}
                <Text className="mt-1 font-display text-2xl text-plum-700">{title}</Text>
            </View>
            {onPressAction ? (
                <Pressable onPress={onPressAction} className="flex-row items-center gap-1 pb-1">
                    <Text className="font-sans-semibold text-xs text-plum-500">{actionLabel}</Text>
                    <Ionicons name="arrow-forward" size={14} color="#5B3455" />
                </Pressable>
            ) : null}
        </View>
    );
}

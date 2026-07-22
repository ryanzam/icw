import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

function TabIcon({
    name,
    focused,
    badge,
}: {
    name: keyof typeof Ionicons.glyphMap;
    focused: boolean;
    badge?: number;
}) {
    return (
        <View className="items-center justify-center">
            <View
                className={`h-9 w-9 items-center justify-center rounded-full ${focused ? "bg-plum-600" : "bg-transparent"
                    }`}
            >
                <Ionicons name={name} size={18} color={focused ? "#FFFBF8" : "#A5799D"} />
            </View>
            {badge ? (
                <View className="absolute -right-1 -top-1 h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1">
                    <Text className="font-sans-bold text-[9px] text-white">{badge > 9 ? "9+" : badge}</Text>
                </View>
            ) : null}
        </View>
    );
}

export default function TabsLayout() {
    const totalItems = 3 // replace this with actual data

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#5B3455",
                tabBarInactiveTintColor: "#A5799D",
                tabBarLabelStyle: { fontFamily: "Manrope_600SemiBold", fontSize: 11, marginTop: -2 },
                tabBarStyle: {
                    backgroundColor: "#FFFBF8",
                    borderTopColor: "#F5D3C6",
                    height: 65,
                    paddingTop: 10,
                    paddingBottom: 10,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="shop"
                options={{
                    title: "Shop",
                    tabBarIcon: ({ focused }) => <TabIcon name="grid" focused={focused} />,
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Cart",
                    tabBarIcon: ({ focused }) => (
                        <TabIcon name="bag-handle" focused={focused} badge={totalItems} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused }) => <TabIcon name="person" focused={focused} />,
                }}
            />
        </Tabs>
    );
}

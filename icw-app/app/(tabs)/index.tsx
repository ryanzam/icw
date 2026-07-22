import { Text, View, ScrollView, Pressable, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SectionHeader } from "@/components/SectionHeader";
import { CATEGORY_LABELS } from "@/constants/theme";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ProductCard";

const CATEGORY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  skincare: "water-outline",
  haircare: "cut-outline",
  fragrance: "flower-outline",
  cosmetics: "color-palette-outline",
  wellness: "leaf-outline",
};

export default function HomeScreen() {

  const featured = useProducts({ featured: true, limit: 6 });
  const sale = useProducts({ sale: true, limit: 6 });

  const isRefreshing = featured.isFetching || sale.isFetching;

  const onRefresh = () => {
    featured.refetch();
    sale.refetch();
  };

  return (
    <SafeAreaView className="flex-1" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor="#D97757" />}
      >
        <View className="flex-row items-center justify-between px-5 pt-2">
          <View>
            <Text className="font-sans text-xs text-plum-400">
              {"Welcome"}
            </Text>
            <Text className="font-display text-2xl text-plum-700">ICW</Text>
          </View>
          <Pressable
            onPress={() => router.push("/(tabs)/shop")}
            className="h-11 w-11 items-center justify-center rounded-full bg-blush-100"
          >
            <Ionicons name="search" size={18} color="#5B3455" />
          </Pressable>
        </View>

        <Pressable
          onPress={() => router.push({ pathname: "/(tabs)/shop", params: { sale: "true" } })}
          className="mx-5 mt-5 overflow-hidden rounded-3xl"
        >
          <LinearGradient
            colors={["#5B3455", "#3D2039"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 24, minHeight: 160, justifyContent: "center" }}
          >
            <Text className="font-sans-semibold text-[11px] uppercase tracking-[3px] text-gold">
              Limited time
            </Text>
            <Text className="mt-2 max-w-[220px] font-display text-2xl leading-7 text-cream">
              Up to 20% off best-selling beauty rituals
            </Text>
            <View className="mt-4 flex-row items-center gap-1.5">
              <Text className="font-sans-semibold text-xs text-blush-200">Shop the sale</Text>
              <Ionicons name="arrow-forward" size={14} color="#F5D3C6" />
            </View>
          </LinearGradient>
        </Pressable>

        <View className="mt-7">
          <SectionHeader eyebrow="Browse" title="Categories" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
          >
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <Pressable
                key={key}
                onPress={() => router.push({ pathname: "/(tabs)/shop", params: { category: key } })}
                className="w-24 items-center rounded-2xl bg-white px-3 py-4"
              >
                <View className="mb-2 h-12 w-12 items-center justify-center rounded-full bg-blush-100">
                  <Ionicons name={CATEGORY_ICONS[key] ?? "sparkles-outline"} size={20} color="#D97757" />
                </View>
                <Text numberOfLines={1} className="font-sans-medium text-xs text-plum-600">
                  {label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View className="mt-8">
          <SectionHeader
            eyebrow="Curated"
            title="Featured picks"
            onPressAction={() => router.push({ pathname: "/(tabs)/shop", params: { featured: "true" } })}
          />
          <FlatList
            data={featured.data?.data ?? []}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
            renderItem={({ item }) => <ProductCard product={item} width={168} />}
          />
        </View>

        <View className="mb-8 mt-8">
          <SectionHeader
            eyebrow="Don't miss"
            title="On sale now"
            onPressAction={() => router.push({ pathname: "/(tabs)/shop", params: { sale: "true" } })}
          />
          <FlatList
            data={sale.data?.data ?? []}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
            renderItem={({ item }) => <ProductCard product={item} width={168} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


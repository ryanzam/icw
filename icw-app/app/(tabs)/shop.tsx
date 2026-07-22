import { ProductQuery } from "@/api/products";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORY_LABELS } from "@/constants/theme";
import { useProducts } from "@/hooks/useProducts";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, TextInput, Pressable, ActivityIndicator, FlatList } from "react-native";

type SortOption = { key: NonNullable<ProductQuery["sort"]> | "default"; label: string };

const SORT_OPTIONS: SortOption[] = [
    { key: "default", label: "Newest" },
    { key: "price_asc", label: "Price: Low to High" },
    { key: "price_desc", label: "Price: High to Low" },
    { key: "rating", label: "Top rated" },
];

export default function ShopScreen() {
    const params = useLocalSearchParams<{ category?: string; sale?: string; featured?: string }>();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<string | undefined>(params.category);
    const [sort, setSort] = useState<SortOption["key"]>("default");
    const [showSortMenu, setShowSortMenu] = useState(false);

    const query: ProductQuery = useMemo(
        () => ({
            search: search.trim() || undefined,
            category,
            sale: params.sale === "true" ? true : undefined,
            featured: params.featured === "true" ? true : undefined,
            sort: sort === "default" ? undefined : sort,
            limit: 30,
        }),
        [search, category, sort, params.sale, params.featured]
    );

    const { data, isLoading, isFetching, refetch } = useProducts(query);
    const products = data?.data ?? [];

    return (
        <SafeAreaView className="flex-1 bg-cream">
            <View className="px-5 pt-2">
                <Text className="font-display text-2xl text-plum-700">Shop</Text>

                <View className="mt-4 flex-row items-center rounded-2xl border border-blush-200 bg-white px-4">
                    <Ionicons name="search" size={18} color="#A5799D" />
                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Search products, brands..."
                        placeholderTextColor="#C9AEC1"
                        className="ml-2 flex-1 py-3 font-sans text-sm text-ink"
                    />
                    {search ? (
                        <Pressable onPress={() => setSearch("")}>
                            <Ionicons name="close-circle" size={18} color="#C9AEC1" />
                        </Pressable>
                    ) : null}
                </View>

                <View className="mt-3 flex-row items-center justify-between">
                    <View className="flex-1 flex-row flex-wrap gap-2">
                        <Pressable
                            onPress={() => setCategory(undefined)}
                            className={`rounded-full px-3.5 py-1.5 ${!category ? "bg-plum-600" : "bg-white border border-blush-200"
                                }`}
                        >
                            <Text
                                className={`font-sans-medium text-xs ${!category ? "text-cream" : "text-plum-500"}`}
                            >
                                All
                            </Text>
                        </Pressable>
                        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                            <Pressable
                                key={key}
                                onPress={() => setCategory(key)}
                                className={`rounded-full px-3.5 py-1.5 ${category === key ? "bg-plum-600" : "bg-white border border-blush-200"
                                    }`}
                            >
                                <Text
                                    className={`font-sans-medium text-xs ${category === key ? "text-cream" : "text-plum-500"
                                        }`}
                                >
                                    {label}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                <View className="mt-3 flex-row items-center justify-between">
                    <Text className="font-sans text-xs text-plum-400">
                        {isLoading ? "Loading..." : `${data?.pagination.total ?? 0} products`}
                    </Text>
                    <Pressable
                        onPress={() => setShowSortMenu((v) => !v)}
                        className="flex-row items-center gap-1 rounded-full border border-blush-200 bg-white px-3 py-1.5"
                    >
                        <Ionicons name="swap-vertical" size={13} color="#5B3455" />
                        <Text className="font-sans-medium text-xs text-plum-600">
                            {SORT_OPTIONS.find((o) => o.key === sort)?.label}
                        </Text>
                    </Pressable>
                </View>

                {showSortMenu ? (
                    <View className="mt-2 rounded-2xl border border-blush-200 bg-white p-2">
                        {SORT_OPTIONS.map((opt) => (
                            <Pressable
                                key={opt.key}
                                onPress={() => {
                                    setSort(opt.key);
                                    setShowSortMenu(false);
                                }}
                                className="rounded-xl px-3 py-2.5"
                            >
                                <Text
                                    className={`font-sans-medium text-sm ${sort === opt.key ? "text-rose-500" : "text-plum-600"
                                        }`}
                                >
                                    {opt.label}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                ) : null}
            </View>

            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator color="#D97757" />
                </View>
            ) : products.length === 0 ? (
                <EmptyState
                    icon="search-outline"
                    title="No products found"
                    message="Try a different search term or clear your filters."
                />
            ) : (
                <FlatList
                    data={products}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    refreshing={isFetching}
                    onRefresh={refetch}
                    columnWrapperStyle={{ gap: 14, paddingHorizontal: 20 }}
                    contentContainerStyle={{ paddingTop: 16, paddingBottom: 24, gap: 0 }}
                    renderItem={({ item }) => (
                        <View style={{ flex: 1 }}>
                            <ProductCard product={item} />
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
}

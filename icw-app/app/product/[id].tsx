import React, { useState } from "react";
import { ActivityIndicator, Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";

import { useProduct } from "@/hooks/useProducts";
import { Button } from "@/components/Button";
import { StarRating } from "@/components/StarRating";
import { formatPrice } from "@/constants/theme";
import { useCartStore } from "@/store/cartStore";
import { QuantityStepper } from "@/components/QuantityStepper";

const { width } = Dimensions.get("window");

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: product, isLoading, isError } = useProduct(id);
    const addItem = useCartStore((s) => s.addItem);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-cream">
                <ActivityIndicator color="#D97757" />
            </SafeAreaView>
        );
    }

    if (isError || !product) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-cream px-8">
                <Text className="text-center font-display text-lg text-plum-700">
                    We couldn't find this product
                </Text>
                <View className="mt-4">
                    <Button label="Go back" onPress={() => router.back()} variant="outline" />
                </View>
            </SafeAreaView>
        );
    }

    const onAddToBag = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => { });
        addItem(product, quantity);
        router.push("/(tabs)/cart");
    };

    return (
        <SafeAreaView className="flex-1 bg-cream" edges={["top", "bottom"]}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="relative">
                    <Image
                        source={{ uri: product.images[activeImage] ?? product.images[0] }}
                        contentFit="cover"
                        transition={200}
                        style={{ width, height: width }}
                    />
                    <Pressable
                        onPress={() => router.back()}
                        className="absolute left-5 top-4 h-10 w-10 items-center justify-center rounded-full bg-white/90"
                    >
                        <Ionicons name="chevron-back" size={20} color="#241B24" />
                    </Pressable>

                    {product.isOnSale && product.discountPercent ? (
                        <View className="absolute right-5 top-4 rounded-full bg-rose-500 px-3 py-1.5">
                            <Text className="font-sans-bold text-xs text-white">
                                -{product.discountPercent}% OFF
                            </Text>
                        </View>
                    ) : null}
                </View>

                {product.images.length > 1 ? (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20, gap: 10, paddingTop: 14 }}
                    >
                        {product.images.map((img, idx) => (
                            <Pressable key={img + idx} onPress={() => setActiveImage(idx)}>
                                <Image
                                    source={{ uri: img }}
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 12,
                                        borderWidth: activeImage === idx ? 2 : 0,
                                        borderColor: "#D97757",
                                    }}
                                    contentFit="cover"
                                />
                            </Pressable>
                        ))}
                    </ScrollView>
                ) : null}

                <View className="px-5 pt-5">
                    {product.brand ? (
                        <Text className="font-sans-semibold text-[11px] uppercase tracking-widest text-rose-500">
                            {product.brand}
                        </Text>
                    ) : null}
                    <Text className="mt-1 font-display text-2xl leading-8 text-plum-700">
                        {product.name}
                    </Text>

                    <View className="mt-2">
                        <StarRating rating={product.rating} showValue reviewCount={product.numReviews} />
                    </View>

                    <View className="mt-3 flex-row items-center gap-3">
                        <Text className="font-sans-bold text-2xl text-plum-700">
                            {formatPrice(product.price)}
                        </Text>
                        {product.compareAtPrice ? (
                            <Text className="font-sans text-base text-plum-300 line-through">
                                {formatPrice(product.compareAtPrice)}
                            </Text>
                        ) : null}
                    </View>

                    <View className="mt-4 flex-row items-center gap-2">
                        <Ionicons
                            name={product.stock > 0 ? "checkmark-circle" : "close-circle"}
                            size={16}
                            color={product.stock > 0 ? "#4E8A5E" : "#C24B71"}
                        />
                        <Text className="font-sans-medium text-xs text-plum-500">
                            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                        </Text>
                        {product.freeDelivery ? (
                            <>
                                <Text className="text-plum-300">·</Text>
                                <Ionicons name="bicycle-outline" size={15} color="#5B3455" />
                                <Text className="font-sans-medium text-xs text-plum-500">Free delivery</Text>
                            </>
                        ) : null}
                    </View>

                    <View className="mt-6 h-[1px] bg-blush-200" />

                    <Text className="mt-5 font-display text-lg text-plum-700">Description</Text>
                    <Text className="mt-2 font-sans text-sm leading-6 text-plum-500">
                        {product.description}
                    </Text>

                    {product.tags.length > 0 ? (
                        <View className="mt-4 flex-row flex-wrap gap-2">
                            {product.tags.map((tag) => (
                                <View key={tag} className="rounded-full bg-blush-100 px-3 py-1">
                                    <Text className="font-sans-medium text-[11px] text-plum-500">#{tag}</Text>
                                </View>
                            ))}
                        </View>
                    ) : null}

                    <View className="mt-8 mb-4">
                        <Text className="mb-2 font-sans-medium text-sm text-plum-600">Quantity</Text>
                        <QuantityStepper quantity={quantity} onChange={setQuantity} max={product.stock} />
                    </View>
                </View>
            </ScrollView>

            <View className="flex-row gap-3 border-t border-blush-200 bg-cream px-5 py-4">
                <Button
                    label={product.stock > 0 ? "Add to cart" : "Out of stock"}
                    onPress={onAddToBag}
                    disabled={product.stock <= 0}
                    fullWidth
                    size="lg"
                    icon={<Ionicons name="bag-add-outline" size={18} color="#FFFBF8" />}
                />
            </View>
        </SafeAreaView>
    );
}

import React from "react";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import type { Product } from "@/types";
import { formatPrice } from "@/constants/theme";
//import { useCartStore } from "@/store/cartStore";
import { StarRating } from "./StarRating";

interface ProductCardProps {
    product: Product;
    width?: number;
}

export function ProductCard({ product, width }: ProductCardProps) {
    //const addItem = useCartStore((s) => s.addItem);
    const outOfStock = product.stock <= 0;

    return (
        <Pressable
            //onPress={() => router.push(`/product/${product._id}`)}
            style={width ? { width } : undefined}
            className="mb-4 overflow-hidden rounded-3xl bg-white"
        >
            <View className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-blush-100">
                <Image
                    source={{ uri: product.images[0] }}
                    contentFit="cover"
                    transition={200}
                    style={{ width: "100%", height: "100%" }}
                />

                {product.isOnSale && product.discountPercent ? (
                    <View className="absolute left-3 top-3 rounded-full bg-rose-500 px-2.5 py-1">
                        <Text className="font-sans-bold text-[10px] text-white">
                            -{product.discountPercent}%
                        </Text>
                    </View>
                ) : null}

                <Pressable
                    onPress={(e) => {
                        e.stopPropagation?.();
                        if (outOfStock) return;
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => { });
                        //addItem(product, 1);
                    }}
                    className="absolute bottom-3 right-3 h-10 w-10 items-center justify-center rounded-full bg-plum-600/90 shadow-sm"
                >
                    <Ionicons name={outOfStock ? "close" : "add"} size={20} color="#FFFBF8" />
                </Pressable>

                {outOfStock ? (
                    <View className="absolute inset-0 items-center justify-center bg-plum-800/40">
                        <Text className="font-sans-bold text-xs uppercase tracking-wide text-white">
                            Sold out
                        </Text>
                    </View>
                ) : null}
            </View>

            <View className="px-1 pt-3">
                {product.brand ? (
                    <Text
                        numberOfLines={1}
                        className="font-sans-semibold text-[10px] uppercase tracking-widest text-rose-500"
                    >
                        {product.brand}
                    </Text>
                ) : null}
                <Text numberOfLines={2} className="mt-1 font-display text-[15px] leading-5 text-plum-700">
                    {product.name}
                </Text>

                <View className="mt-1.5">
                    <StarRating rating={product.rating} size={11} />
                </View>

                <View className="mt-1.5 flex-row items-center gap-2">
                    <Text className="font-sans-bold text-[15px] text-plum-600">
                        {formatPrice(product.price)}
                    </Text>
                    {product.compareAtPrice ? (
                        <Text className="font-sans text-xs text-plum-300 line-through">
                            {formatPrice(product.compareAtPrice)}
                        </Text>
                    ) : null}
                </View>
            </View>
        </Pressable>
    );
}

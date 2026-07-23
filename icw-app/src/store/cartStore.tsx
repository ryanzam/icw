import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CartItem, Product } from "@/types";

interface CartState {
    items: CartItem[];
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clear: () => void;
    totalItems: () => number;
    subtotal: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, quantity = 1) => {
                const items = get().items;
                const existing = items.find((i) => i.product._id === product._id);
                if (existing) {
                    set({
                        items: items.map((i) =>
                            i.product._id === product._id
                                ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
                                : i
                        ),
                    });
                } else {
                    set({ items: [...items, { product, quantity: Math.min(quantity, product.stock) }] });
                }
            },

            removeItem: (productId) => {
                set({ items: get().items.filter((i) => i.product._id !== productId) });
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }
                set({
                    items: get().items.map((i) =>
                        i.product._id === productId
                            ? { ...i, quantity: Math.min(quantity, i.product.stock) }
                            : i
                    ),
                });
            },

            clear: () => set({ items: [] }),

            totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

            subtotal: () =>
                get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
        }),
        {
            name: "iris-cosmo-cart",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

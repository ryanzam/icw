export const colors = {
    blush50: "#FDF6F3",
    blush100: "#FBEAE3",
    blush200: "#F5D3C6",
    blush400: "#E39A7C",
    blush500: "#D97757",
    rose400: "#DB6A8B",
    rose500: "#C24B71",
    plum500: "#5B3455",
    plum600: "#3D2039",
    plum700: "#291526",
    plum800: "#1A0D18",
    cream: "#FFFBF8",
    gold: "#C9A15C",
    ink: "#241B24",
};

export const CATEGORY_LABELS: Record<string, string> = {
    skincare: "Skincare",
    haircare: "Haircare",
    fragrance: "Fragrance",
    cosmetics: "Cosmetics",
    wellness: "Wellness",
};

export const CURRENCY_SYMBOL = "Rs.";

export function formatPrice(amount: number): string {
    return `${CURRENCY_SYMBOL}${amount.toLocaleString("en-IN")}`;
}

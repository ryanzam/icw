export type Category = "skincare" | "haircare" | "fragrance" | "cosmetics" | "wellness";

export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    category: Category;
    brand?: string;
    images: string[];
    price: number;
    compareAtPrice?: number;
    currency: string;
    stock: number;
    rating: number;
    numReviews: number;
    isFeatured: boolean;
    isOnSale: boolean;
    freeDelivery: boolean;
    tags: string[];
    discountPercent?: number;
    createdAt: string;
}

export interface Paginated<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface ApiError {
    success: false;
    message: string;
}

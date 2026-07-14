import { apiClient } from "./client";
import type { Paginated, Product } from "../types/index";

export interface ProductQuery {
    search?: string;
    category?: string;
    sale?: boolean;
    featured?: boolean;
    page?: number;
    limit?: number;
    sort?: "price_asc" | "price_desc" | "rating";
}

export async function fetchProducts(query: ProductQuery = {}): Promise<Paginated<Product>> {
    const { data } = await apiClient.get<Paginated<Product>>("/products", {
        params: query,
    });
    return data;
}

export async function fetchProductById(id: string): Promise<Product> {
    const { data } = await apiClient.get<{ success: true; data: Product }>(`/products/${id}`);
    return data.data;
}

export async function fetchCategories(): Promise<string[]> {
    const { data } = await apiClient.get<{ success: true; data: string[] }>(
        "/products/categories"
    );
    return data.data;
}

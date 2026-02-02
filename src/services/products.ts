import type { Product } from "../types";

const API_URL = 'http://localhost:3000/api';

export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return response.json();
};
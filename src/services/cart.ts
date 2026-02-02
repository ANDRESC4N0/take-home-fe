// Minimal service to perhaps handle LocalStorage or future API mapping
import type { CartItem } from "../types";

export const saveCartToStorage = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items));
};

export const loadCartFromStorage = (): CartItem[] => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
};

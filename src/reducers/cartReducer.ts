import type { CartItem, Product } from '../types';

export type CartAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: { id: string } }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' };

export const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingIndex = state.findIndex(item => item.id === action.payload.id);
            if (existingIndex >= 0) {
                const newState = [...state];
                newState[existingIndex] = {
                    ...newState[existingIndex],
                    quantity: newState[existingIndex].quantity + 1
                };
                return newState;
            }
            return [...state, { ...action.payload, quantity: 1 }];
        }
        case 'REMOVE_ITEM':
            return state.filter(item => item.id !== action.payload.id);
        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload;
            if (quantity <= 0) {
                return state.filter(item => item.id !== id);
            }
            return state.map(item =>
                item.id === id ? { ...item, quantity } : item
            );
        }
        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
};

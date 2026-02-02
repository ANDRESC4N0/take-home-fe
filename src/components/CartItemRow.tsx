import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem } from '../types';

interface CartItemRowProps {
    item: CartItem;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <li className="p-6 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                />
            </div>
            <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex-1">
                    <h3 className="text-base font-medium text-gray-900">
                        {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {item.currency} {item.price.toFixed(2)}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-gray-600 hover:text-indigo-600 disabled:opacity-50"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium text-gray-900 w-8 text-center">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-gray-600 hover:text-indigo-600"
                            aria-label="Increase quantity"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Remove</span>
                    </button>
                </div>
            </div>
            <div className="text-right font-medium text-gray-900 sm:w-24">
                ${(item.price * item.quantity).toFixed(2)}
            </div>
        </li>
    );
};

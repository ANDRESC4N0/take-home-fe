import React from 'react';
import { Plus } from 'lucide-react';

import type { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm">
            <div className="relative pt-[50%] overflow-hidden">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-contain"
                    loading="lazy"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1" title={product.name}>
                        {product.name}
                    </h3>
                    <span className="font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                </div>
                <button
                    onClick={() => onAddToCart(product)}
                    className="bg-gray-900 text-white py-2.5 rounded-lg flex items-center"
                >
                    <Plus className="h-4 w-4" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

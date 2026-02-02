import React from 'react';
import { useProducts } from './hooks/useProducts';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { Loader2 } from 'lucide-react';

export const ProductListPage: React.FC = () => {
    const { products, loading, error } = useProducts();
    const { addToCart } = useCart();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-10">
                {error}
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Featured Products</h1>
            </div>

            <div className="grid grid-cols-1 grid-cols-3 gap-6">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                    />
                ))}
            </div>
        </div>
    );
};

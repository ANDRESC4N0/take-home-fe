import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { CartItemRow } from '../../components/CartItemRow';

export const CartPage: React.FC = () => {
    const { items, removeFromCart, updateQuantity, total } = useCart();

    if (items.length === 0) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added any products yet.</p>
                <Link
                    to="/"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* ... Existing JSX ... */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <ul className="divide-y divide-gray-200">
                    {items.map(item => (
                        <CartItemRow
                            key={item.id}
                            item={item}
                            onUpdateQuantity={updateQuantity}
                            onRemove={removeFromCart}
                        />
                    ))}
                </ul>
                <div className="bg-gray-50 px-6 py-6 sm:px-10 flex flex-col items-end border-t border-gray-200">
                    <div className="flex justify-between w-full sm:w-auto sm:min-w-[300px] mb-6">
                        <dt className="text-base font-medium text-gray-500">Subtotal</dt>
                        <dd className="text-lg font-bold text-gray-900">${total.toFixed(2)}</dd>
                    </div>
                    <Link
                        to="/checkout"
                        className="w-full sm:w-auto flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
                    >
                        Checkout <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

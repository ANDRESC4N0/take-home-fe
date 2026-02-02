import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types';

export const Layout: React.FC = () => {
    const { items } = useCart();
    const itemCount = items.reduce((acc: number, item: CartItem) => acc + item.quantity, 0);

    return (
        <div className="flex flex-col">
            <header className="top-0 z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <Link to="/" className="flex items-center gap-2">
                            <Store className="h-8 w-8" />
                        </Link>

                        <nav>
                            <Link to="/cart" className="relative p-2 text-gray-600 group">
                                <ShoppingCart className="h-6 w-6" />
                                {itemCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex">
                                        {itemCount}
                                    </span>
                                )}
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
                <Outlet />
            </main>
        </div>
    );
};

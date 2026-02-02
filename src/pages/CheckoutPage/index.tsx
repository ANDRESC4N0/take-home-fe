import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from './hooks/useCheckout';

export const CheckoutPage: React.FC = () => {
    const { total, clearCart } = useCart();
    const navigate = useNavigate();
    const { step, quoteData, balance, error, getQuote, initiatePayment, fetchBalance } = useCheckout();

    // Trigger balance check on return from payment
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('payment_status') === 'returned') {
            fetchBalance().then(() => {
                clearCart();
                // Clean URL
                window.history.replaceState({}, document.title, window.location.pathname);
            });
        }
    }, []);

    const handleGetQuote = () => {
        getQuote(total);
    };

    const handlePay = () => {
        if (!quoteData) return;

        const payload = {
            quoteId: quoteData.id,
            currency: quoteData.finalCurrency,
            amount: quoteData.finalAmount,
            referenceId: "REF-" + Date.now(),
            documentType: "CC",
            email: "customer@amazon.com",
            cellPhone: "+573001234567",
            document: "123456789",
            fullName: "Amazon Customer",
            description: "Purchase #12345",
            redirectUrl: window.location.origin + "/checkout?payment_status=returned"
        };

        initiatePayment(payload);
    };

    const formatCOP = (val: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(val);
    const formatUSD = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    const Spinner = () => (
        <div className="flex justify-center items-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            {/* Summary Step */}
            {step === 'summary' && (
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-2xl font-bold mb-2">Order Summary</h1>
                    <p className="text-gray-600 mb-6">Review your order before payment</p>

                    <div className="flex justify-between items-center py-4 border-b border-gray-200 mb-6">
                        <span className="text-gray-700 font-medium">Total to pay</span>
                        <span className="text-3xl font-bold text-gray-900">{formatUSD(total)}</span>
                    </div>

                    {error && <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">{error}</div>}

                    <button
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
                        onClick={handleGetQuote}
                        disabled={total === 0}
                    >
                        {total > 0 ? 'Get Quote' : 'Cart is Empty'}
                    </button>
                    {total === 0 && (
                        <button
                            className="w-full mt-4 bg-gray-100 text-gray-700 font-bold py-3 px-4 rounded-md hover:bg-gray-200 transition duration-300"
                            onClick={() => navigate('/')}
                        >
                            Return to Shop
                        </button>
                    )}
                </div>
            )}

            {/* Loading Step */}
            {step === 'loading' && (
                <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                    <Spinner />
                    <p className="text-gray-600 text-lg">Processing...</p>
                </div>
            )}

            {/* Quote Step */}
            {step === 'quote' && quoteData && (
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-2xl font-bold mb-2">Payment Quote</h1>
                    <p className="text-gray-600 mb-6">You are paying via localized method</p>

                    <div className="text-center py-6 bg-gray-50 rounded-lg mb-6">
                        <span className="block text-sm text-gray-500 mb-1">Total in COP</span>
                        <span className="text-4xl font-extrabold text-indigo-900">{formatCOP(quoteData.finalAmount / 100)}</span>
                    </div>

                    <div className="space-y-3 mb-8">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Exchange Rate</span>
                            <span className="font-medium text-gray-900">1 USD = {quoteData.exchangeRate} COP</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Valid until</span>
                            <span className="font-medium text-gray-900">{new Date(quoteData.expiresAt).toLocaleTimeString()}</span>
                        </div>
                    </div>

                    {error && <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">{error}</div>}

                    <button
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                        onClick={handlePay}
                    >
                        Pay with COP
                    </button>
                </div>
            )}

            {/* Success Step */}
            {step === 'success' && balance && (
                <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                    <p className="text-gray-600 mb-8">Transaction completed successfully.</p>

                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <p className="text-sm text-gray-500 mb-1">Your new USD Balance</p>
                        <div className="text-3xl font-bold text-gray-900">{formatUSD(balance.amount)}</div>
                    </div>

                    <button
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                        onClick={() => navigate('/')}
                    >
                        Back to Store
                    </button>
                </div>
            )}
        </div>
    );
};

import { useState } from 'react';

interface QuoteData {
    id: string;
    exchangeRate: number;
    finalAmount: number;
    finalCurrency: string;
    expiresAt: string;
}

interface OrderPayload {
    quoteId: string;
    currency: string;
    amount: number;
    referenceId: string;
    documentType: string;
    email: string;
    cellPhone: string;
    document: string;
    fullName: string;
    description: string;
    redirectUrl: string;
}

interface PaymentResponse {
    status: string;
    paymentLink: string;
}

type CheckoutStep = 'summary' | 'loading' | 'quote' | 'success';

interface Balance {
    amount: number;
    currency: string;
}

export const useCheckout = () => {
    const [step, setStep] = useState<CheckoutStep>('summary');
    const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
    const [balance, setBalance] = useState<Balance | null>(null);
    const [error, setError] = useState<string | null>(null);

    const API_BASE = '/api';

    const getQuote = async (initialAmount: number, initialCurrency: string = 'USD', finalCurrency: string = 'COP') => {
        setStep('loading');
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/quote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    initialCurrency,
                    finalCurrency,
                    initialAmount
                })
            });

            if (!res.ok) throw new Error(await res.text());
            const data: QuoteData = await res.json();
            setQuoteData(data);
            setStep('quote');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to fetch quote');
            setStep('summary');
        }
    };

    const initiatePayment = async (payload: OrderPayload) => {
        setStep('loading');
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/pay`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error(await res.text());
            const data: PaymentResponse = await res.json();

            if (data.paymentLink) {
                window.location.href = data.paymentLink;
            } else {
                throw new Error("No payment link returned");
            }

        } catch (err: any) {
            console.error(err);
            setError("Payment initiation failed: " + (err.message || 'Unknown error'));
            setStep('quote');
        }
    };

    const fetchBalance = async () => {
        setStep('loading');
        try {
            // Get Balance
            const balanceRes = await fetch(`${API_BASE}/balance`);
            const balanceList = await balanceRes.json();

            // Filter for USD
            const usdBalance = balanceList.find((b: any) => b.currency.toLowerCase() === 'usd');
            setBalance(usdBalance || { amount: 0, currency: 'USD' });
            setStep('success');
        } catch (err: any) {
            console.error(err);
            setError("Failed to verify payment: " + (err.message || 'Unknown error'));
            setStep('summary');
        }
    };

    const reset = () => {
        setStep('summary');
        setError(null);
        setQuoteData(null);
    };

    return {
        step,
        quoteData,
        balance,
        error,
        getQuote,
        initiatePayment,
        fetchBalance,
        reset
    };
};

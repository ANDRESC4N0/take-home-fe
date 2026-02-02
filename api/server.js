import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

const MOCK_PRODUCTS = [
    {
        id: "1",
        name: "Premium Wireless Headphones",
        description: "Experience crystal clear sound with our latest noise-cancelling technology. Perfect for travel and work.",
        price: 350.00,
        currency: "USD",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "2",
        name: "Ergonomic Office Chair",
        description: "Designed for comfort and productivity. Adjustable lumbar support and breathable mesh.",
        price: 199.99,
        currency: "USD",
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "3",
        name: "Smart Fitness Watch",
        description: "Track your health metrics, workouts, and sleep quality 24/7. Water-resistant and long battery life.",
        price: 129.50,
        currency: "USD",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "4",
        name: "Mechanical Keyboard",
        description: "Tactile switches for the ultimate typing experience. customizable RGB lighting.",
        price: 89.99,
        currency: "USD",
        imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b91a603?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "5",
        name: "4K Ultra HD Monitor",
        description: "Stunning visuals with HDR support. Ideal for creative professionals and gamers.",
        price: 450.00,
        currency: "USD",
        imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "6",
        name: "Portable Bluetooth Speaker",
        description: "Big sound in a small package. Waterproof and rugged design for outdoor adventures.",
        price: 59.95,
        currency: "USD",
        imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop"
    }
];

app.use(express.json());

app.get('/api/products', (req, res) => {
    setTimeout(() => {
        res.json(MOCK_PRODUCTS);
    }, 800);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

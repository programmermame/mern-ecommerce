import Stripe from 'stripe';
import Order from '../models/Order.js';
import { STRIPE_SECRET_KEY } from '../config/dotenv.js';

const stripe = Stripe(STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const { orderId } = req.body;
        const order = await Order.findById(orderId).populate('products.productId');
        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }

        const lineItems = order.products.map(product => {
            const productData = product.productId
            const price = Math.round(productData.price * 100);

            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: productData.name,
                        description: productData.description,
                        images: [productData.imageUrl]
                    },
                    unit_amount: price
                },
                quantity: product.quantity,
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            // success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
            // cancel_url: "http://localhost:5173/products",
            success_url: `https://pickout.onrender.com/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: "https://pickout.onrender.com/products",
        })
        res.json({ url: session.url });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Checkout session creation failed', message: error });
    }

}

export const verifySession = async (req, res) => {
    const { sessionId } = req.body;

    try {
        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Check if the payment was successful
        if (session.payment_status === 'paid') {
            res.json({ status: 'succeeded' });
        } else {
            res.json({ status: 'failed' });
        }
    } catch (err) {
        console.error("Error verifying session", err);
        res.status(400).json({ error: 'Error verifying session' });
    }
}
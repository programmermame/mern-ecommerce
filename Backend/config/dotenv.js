import 'dotenv/config'

export const PORT = process.env.PORT || 5000;
export const MONGO_URI = process.env.MONGO_URI;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
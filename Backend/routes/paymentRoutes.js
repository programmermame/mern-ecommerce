import express from 'express';
import { createCheckoutSession, verifySession } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);
router.post('/verify-session', verifySession);


export default router;
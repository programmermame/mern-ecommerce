import Order from "../models/Order.js";

const createOrders = async (req, res) => {
    const { user, products, totalAmount } = req.body;
    try {
        const newOrder = await Order.create(
            {
                user,
                products,
                totalAmount
            })
        res.status(201).json({ message: newOrder });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getUserOrders = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({ user: userId });
        res.status(200).json({ message: orders });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export { createOrders, getUserOrders }
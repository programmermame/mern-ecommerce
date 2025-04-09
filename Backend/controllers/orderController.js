import Order from "../models/Order.js";
import Product from "../models/Product.js";

const createOrders = async (req, res) => {
    const { user, products } = req.body;
    try {
        let totalAmount = 0;


        for (let i = 0; i < products.length; i++) {
            const product = await Product.findById(products[i].productId);

            if (product) {
                totalAmount += product.price * products[i].quantity;
            } else {
                return res.status(404).json({ message: `Product with ID ${products[i].productId} not found.` });
            }
        }

        const newOrder = await Order.create({
            user,
            products,
            totalAmount
        });

        res.status(201).json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
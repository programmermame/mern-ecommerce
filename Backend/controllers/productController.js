import Product from "../models/Product.js";

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: products });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

const createProduct = async (req, res) => {
    const { name, description, price, imageUrl } = req.body;
    try {
        const newProduct = await Product.create({ name, description, price, imageUrl });
        res.status(201).json({ message: newProduct });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



export { getProducts, createProduct };
const express = require('express');
const CartManager = require('../CartManager');
const cartManager = new CartManager('./carts.json');

const router = express.Router();

router.post('/', (req, res) => {
    try {
        const newCart = cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({error: "Error al crear el carrito"});
    }
});

router.get('/:cid', (req, res) => {
    try {
        const {cid} = req.params;
        const cartProducts = cartManager.getCartProducts(cid);
        if (!cartProducts) {
            return res.status(404).json({error: "Carrito no encontrado"});
        }
        res.json(cartProducts);
    } catch (error) {
        res.status(500).json({error: "Error al obtener los productos del carrito"});
    }
});

router.post('/:cid/products', (req, res) => {
    try{
        const {cid} = req.params;
        const {productId, quantity} = req.body;
        cartManager.addProductToCart(cid, productId, quantity);
        res.status(201).json({message: "Producto añadido al carrito"});
    } catch (error) {
        res.status(500).json({error: "Error al añadir el producto al carrito"});
    }
});

module.exports = router;
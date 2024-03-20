const fs = require('fs');

class CartManager {
    constructor(filePath) {
        this.path = filePath;
    }

    createCart() {
        let carts = [];
        if (fs.existsSync(this.path)) {
            carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        }

        const newCart = {
            id: Date.now(),
            products: []
        };

        carts.push(newCart);
        fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));

        return newCart;
    }

    addProductToCart(cartId, productId, quantity = 1) {
        const carts = JSON.parse(fs.readFileSync(this.path, 'utf8'));
        const cart = carts.find(c => c.id === cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        const productIndex = cart.products.findIndex(p => p.id === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({id: productId, quantity});
        }

        fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
    }

    getCartProducts(cartId) {
        const carts = JSON.parse(fs.readFileSync(this.path, 'utf8'));
        const cart = carts.find(c => c.id === cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        return cart.products;
    }
}

module.exports = CartManager;
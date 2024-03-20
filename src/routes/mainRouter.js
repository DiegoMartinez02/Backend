const express = require('express');
const router = express.Router();
const path = require("path");
const ProductManager = require("../ProductManager");
const productManager = new ProductManager("./products.json");

router.get("/products", async (request, response) => {
    try {
      const { limit } = request.query;
      let products = await productManager.getProducts();
      if (limit) {
        products = products.slice(0, Number(limit));
      }
      response.json(products);
    } catch (error) {
      response.status(500).json({ error: "Error al obtener los productos" });
    }
  });
  
  router.get("/products/:pid", async (request, response) => {
    try {
      const { pid } = request.params;
      const product = await productManager.getProductById(Number(pid));
      if (!product) {
        return response.status(404).json({ error: "Producto no encontrado" });
      }
      response.json(product);
    } catch (error) {
      response.status(500).json({ error: "Error al obtener el producto" });
    }
  });

module.exports = router;

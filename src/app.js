const port = 8080;
const express = require("express");
const path = require("path");
const ProductManager = require("./ProductManager");
const productManager = new ProductManager("./products.json");

const app = express();

app.use(express.json());

app.get("/products", async (request, response) => {
  try {
    const { limit } = request.query;
    let products = await productManager.getProducts();
    if (limit) {
      let products = products.slice(0, Number(limit));
    }
    response.json(products);
  } catch (error) {
    response.status(500).json({ error: "Error al obtener los productos" });
  }
});

app.get("/products/:pid", async (request, response) => {
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

app.listen(port, () => console.log("Servidor corriendo en el puerto ", port));

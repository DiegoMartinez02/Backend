module.exports = function (io) {
  const express = require("express");
  const router = require("express").Router();
  const ProductManager = require("../dao/services/ProductManager");
  const productManager = new ProductManager("./products.json");

  router.get("/", async (req, res) => {
    try {
      const { limit } = req.query;
      let products = await productManager.getAll();
      if (limit) {
        products = products.slice(0, Number(limit));
      }
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Error al listar los productos" });
    }
  });

  router.get("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productManager.getProductById(Number(pid));
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el producto" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails = [],
      } = req.body;
      const status = true;
      if (
        !title ||
        !description ||
        !code ||
        price === undefined ||
        stock === undefined ||
        !category
      ) {
        return res
          .status(400)
          .json({ error: "Faltan datos obligatorios para crear el producto" });
      }
      const newProduct = {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
      };
      productManager.addProduct(newProduct);
      io.emit("productUpdated", {action: "create", product: newProduct})
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: "Error al crear el producto" });
    }
  });

  router.put("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const product = await productManager.getProductById(Number(pid));
      if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      productManager.updateProduct(Number(pid), req.body);
      res.json({ message: "Producto actualizado" });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el producto" });
    }
  });

  router.delete("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const productDeleted = productManager.deleteProduct(Number(pid));
      if (!productDeleted) {
        return res
          .status(404)
          .json({ error: "Producto no encontrado o ya fue eliminado" });
      }
      io.emit("productUpdated", {action: "delete", productId: Number(pid)});
      res.json({ message: "Producto eliminado" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el producto" });
    }
  });

  return router;
};

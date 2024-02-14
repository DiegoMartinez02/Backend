const ProductManager = require("./ProductManager");

const productManager = new ProductManager("products.json");

console.log("getProducts al inicio:", productManager.getProducts());

productManager.addProduct({
  title: "Caña de pescar",
  description: "Caña para pesca de gran calidad",
  price: 10000,
  thumbnail: "linkdeimagen",
  code: "8010",
  stock: 8,
});

console.log(
  "getProducts después de agregar un producto:",
  productManager.getProducts()
);

const productId = 1;
console.log("getProductById:", productManager.getProductById(productId));

const updatedFields = { description: "Nuevo modelo de caña de pescar" };
const isUpdated = productManager.updateProduct(productId, updatedFields);
console.log("Producto actualizado:", isUpdated);
console.log("Productos después de actualizar:", productManager.getProducts());

productManager.deleteProduct(productId);
console.log("Productos después de eliminar:", productManager.getProducts());

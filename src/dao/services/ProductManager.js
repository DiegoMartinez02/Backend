const { prductsModel, default: productsModel } = require("../models/products");

class ProductManager {
  constructor() {
    console.log("Trabajando con productManager");
  }

  getAll = async (limit) => {
    let result = await productsModel.find().limit(limit);
    return result;
  };
  getById = async (id) => {
    let result = await productsModel.findById(id);
    return result;
  };
  addProduct = async (product) => {
    let result = await productsModel.create(product);
    return result;
  };
  updateProduct = async (id, product) => {
    let result = await productsModel.updateOne(
      { _id: id },
      { $set: productsData }
    );
    return result;
  };
  deleteProduct = async (id) => {
    let result = await productsModel.deleteOne({ _id: id });
    return result;
  };
}

module.exports = ProductManager;

// const fs = require("fs");

// class ProductManager {
//   constructor(filePath) {
//     this.path = filePath;
//   }

//   addProduct(product) {
//     let products = [];
//     if (fs.existsSync(this.path)) {
//       const data = fs.readFileSync(this.path, "utf8");
//       if (data) {
//         products = JSON.parse(data);
//       }
//     }

//     const lastProductId =
//       products.length > 0 ? products[products.length - 1].id : 0;
//     product.id = lastProductId + 1;

//     products.push(product);

//     fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
//   }

//   getProducts() {
//     if (fs.existsSync(this.path)) {
//       const data = fs.readFileSync(this.path, "utf8");
//       if (data) {
//         return JSON.parse(data);
//       }
//     }
//     return [];
//   }

//   getProductById(id) {
//     const products = this.getProducts();
//     return products.find((product) => product.id === id);
//   }

//   updateProduct(id, updatedFields) {
//     const products = this.getProducts();
//     const index = products.findIndex((product) => product.id === id);
//     if (index !== -1) {
//       products[index] = { ...products[index], ...updatedFields };
//       fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
//       return true;
//     }
//     return false;
//   }

//   deleteProduct(id) {
//     const products = this.getProducts();
//     const filteredProducts = products.filter((product) => product.id !== id);
//     fs.writeFileSync(this.path, JSON.stringify(filteredProducts, null, 2));
//   }
// }

// module.exports = ProductManager;

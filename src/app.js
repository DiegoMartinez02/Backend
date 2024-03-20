const express = require("express");
const mainRouter = require("./routes/mainRouter");
const productsRouter = require('./routes/productsRouter');
const cartsRouter = require('./routes/cartsRouter');

const app = express();
const port = 8080;

app.use(express.json());

app.use("/", mainRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter)

app.listen(port, () => console.log("Servidor corriendo en el puerto ", port));
